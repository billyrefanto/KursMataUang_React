import React from "react";
import "./App.css";
import InputanUang from "./InputanUang";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

class App extends React.Component {
  state = {
    tukarUangOption: [],
    uangASal: "",
    uangTujuan: "",

    uang: 1,
    kurs: "",
    isUangDariUangAsal: true
  };

  componentDidMount() {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => {
        const uangTujuanPertama = Object.keys(data.rates)[10];
        this.setState({
          tukarUangOption: [data.base, ...Object.keys(data.rates)],
          uangASal: data.base,
          uangTujuan: uangTujuanPertama,
          kurs: data.rates[uangTujuanPertama]
        });
      });
  }

  componentDidUpdate() {
    fetch(
      `${BASE_URL}?base=${this.state.uangASal}&symbols=${this.state.uangTujuan}`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ kurs: data.rates[this.state.uangTujuan] });
      });
  }

  fungsiUbahJumlahUangAsal = event => {
    this.setState({
      uang: event.target.value,
      isUangDariUangAsal: true
    });
  };

  fungsiUbahJumlahUangTujuan = event => {
    this.setState({
      uang: event.target.value,
      isUangDariUangAsal: false
    });
  };

  render() {
    // console.log(this.state.tukarUangOption);
    let jumlahUangAsal, jumlahUangTujuan;
    const { isUangDariUangAsal, uang, kurs, uangASal, uangTujuan } = this.state;

    if (isUangDariUangAsal) {
      jumlahUangAsal = uang;
      jumlahUangTujuan = uang * kurs;
    } else {
      jumlahUangAsal = uang / kurs;
      jumlahUangTujuan = uang;
    }
    return (
      <React.Fragment>
        <h1> Monney Charger</h1>
        <InputanUang
          tukarUangOption={this.state.tukarUangOption}
          uangTerpilih={uangASal}
          jumlahUang={jumlahUangAsal}
          onChangeSelectUang={event =>
            this.setState({ uangASal: event.target.value })
          }
          onChangeValueUang={this.fungsiUbahJumlahUangAsal}
        />
        <h1> =</h1>
        <InputanUang
          tukarUangOption={this.state.tukarUangOption}
          uangTerpilih={uangTujuan}
          jumlahUang={jumlahUangTujuan}
          onChangeSelectUang={event =>
            this.setState({ uangTujuan: event.target.value })
          }
          onChangeValueUang={this.fungsiUbahJumlahUangTujuan}
        />
      </React.Fragment>
    );
  }
}

export default App;
