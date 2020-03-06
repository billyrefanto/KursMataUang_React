import React from "react";
import "./App.css";
import InputanUang from "./InputanUang";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

class App extends React.Component {
  state = {
    tukarUangOption: []
  };

  componentDidMount() {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          tukarUangOption: [data.base, ...Object.keys(data.rates)]
        });
      });
  }

  render() {
    console.log(this.state.tukarUangOption);
    return (
      <React.Fragment>
        <h1> Monney Charger</h1>
        <InputanUang tukarUangOption={this.state.tukarUangOption} />
        <h1> =</h1>
        <InputanUang tukarUangOption={this.state.tukarUangOption} />
      </React.Fragment>
    );
  }
}

export default App;
