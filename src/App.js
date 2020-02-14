import React from 'react';
import logo from './logo.svg';
import './App.css';

function  BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  } else {
    return <p>The water would not boil.</p>;
  }
}
class Temperature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleNames: {
        c: 'Celsius',
        f: 'Fahrenheit'
      }
    };
  };

  handleChange = (e) => {
    this.props.onTemperatureChange(e.target.value);
      
  };
  
  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {this.state.scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    )
  }


}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class Calculator  extends React.Component {
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      temperature: '',
      scale: 'c'
    };
  }

  handleCelsiusChange = (temperature) => {
   this.setState({
     temperature: temperature,
     scale: 'c'
   })
  }
  handleFahrenheitChange = (temperature) => {
    this.setState({
      temperature: temperature,
      scale: 'f'
    })
   }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <Temperature scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
        <Temperature scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
        <BoilingVerdict celsius={parseFloat(celsius)}/>
      </div>
    )
  }
}

function App() {
  return (
    <Calculator />
  );
}

export default App;
