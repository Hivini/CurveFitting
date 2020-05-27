import React, { Component } from 'react';
import CurveFittingChart from './components/CurveFittingChart/CurveFittingChart.lazy';
import './App.scss';
import CsvLoader from './components/DataLoader/CsvLoader';
import InputLoader from './components/DataLoader/InputLoader';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { dataLoadType: '' };
  }

  render() {
    return (
      <div className='App'>
        <h1>Regresiones</h1>
        <p>
          Calculadora de regresión lineal, cuadrática, cúbica, logística y
          exponencial.
        </p>
        <div className='button-container'>
          <button
            className='button-big primary'
            onClick={() => {
              window.scrollTo(0, 250);
              this.setState({
                dataLoadType: 'input',
              });
            }}
          >
            Insertar datos
          </button>
        </div>

        <section>
          {this.state.dataLoadType == 'csv' && <CsvLoader></CsvLoader>}
          {this.state.dataLoadType == 'input' && <InputLoader></InputLoader>}
        </section>
      </div>
    );
  }
}
