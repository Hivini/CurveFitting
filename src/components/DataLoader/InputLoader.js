import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-transition-group';
import CurveFittingChart from '../CurveFittingChart/CurveFittingChart.lazy';
import '../../utils/utils';
import {
  polinomialFit,
  mathEvaluate,
  logFit,
  originFit,
  createExpression,
} from '../../utils/utils';

export default class InputLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: [],
      y: [],
      xr: [],
      yr: [],
      current_x: 0,
      current_y: 0,
      type: 'pol',
      grado: 1,
      n: 10,
      x0: 0,
      xf: 100,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    this.nameInput.focus();

    this.setState({
      x: [...this.state.x, this.state.current_x],
      y: [...this.state.y, this.state.current_y],
    });
  };

  handleCalculate = (event) => {
    event.preventDefault();

    var exp = '';

    if (this.state.type == 'pol') {
      if (this.state.x.length <= this.state.grade) {
        alert('necesitas mas puntos');
        return;
      }
      var polargs = polinomialFit(this.state.grado, this.state.x, this.state.y);
      exp = createExpression('pol', polargs);
    }
    if (this.state.type == 'log') {
      if (this.state.x.length <= 2) {
        alert('necesitas mas puntos');
        return;
      }
      if (this.state.x0 == 0) {
        alert('no puede ser 0 el x0');
        return;
      }
      var logargs = [logFit(this.state.x, this.state.y)];
      exp = createExpression('log', logargs);
    }
    if (this.state.type == 'origin') {
      if (this.state.x.length <= 2) {
        alert('necesitas mas puntos');
        return;
      }

      var originargs = [originFit(this.state.x, this.state.y)];
      exp = createExpression('origin', originargs);
    }

    let calculated_points = mathEvaluate(
      this.state.n,
      exp,
      this.state.x0,
      this.state.xf
    );

    let x_calc = calculated_points.x;
    let y_calc = calculated_points.y;
    console.log(x_calc);
    console.log(y_calc);

    this.setState({ xr: x_calc, yr: y_calc });
  };

  handleChange = (event) => {
    if (event.target.name == 'x') {
      this.setState({
        current_x: event.target.value,
      });
    } else if (event.target.name == 'y') {
      this.setState({
        current_y: event.target.value,
      });
    } else if (event.target.name == 'n') {
      this.setState({
        n: event.target.value,
      });
    } else if (event.target.name == 'x0') {
      this.setState({
        x0: event.target.value,
      });
    } else if (event.target.name == 'xf') {
      this.setState({
        xf: event.target.value,
      });
    } else if (event.target.name == 'grado') {
      this.setState({
        grado: event.target.value,
      });
    } else if (event.target.name == 'type') {
      this.setState({
        type: event.target.value,
      });
    }
  };

  render() {
    return (
      <div>
        <h3>Cargar los datos por input</h3>
        <div>
          <div>Ingresa los datos pulsando enter.</div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type='number'
                name='x'
                placeholder='x'
                id='x'
                required
                ref={(input) => {
                  this.nameInput = input;
                }}
                onChange={this.handleChange}
              />
              <input
                type='number'
                name='y'
                id='y'
                placeholder='y'
                required
                onChange={this.handleChange}
              />
              <input type='submit' value='ingresar' className='button-submit' />
            </form>
          </div>
          <hr />
          <form onSubmit={this.handleCalculate}>
            <p>Elige el tipo de regresión</p>
            <div>
              <div class='center'>
                <div className='select'>
                  <select
                    name='type'
                    onChange={this.handleChange}
                    value={this.type}
                  >
                    <option value='pol'>Polinomial</option>
                    <option value='log'>Logística</option>
                    <option value='origin'>Lineal por el origen</option>
                  </select>
                </div>
              </div>
              <div class='center'>
                {this.state.type == 'pol' && (
                  <div>
                    Grado
                    <input
                      type='number'
                      name='grado'
                      id='grado'
                      placeholder='Grado polinomio'
                      required
                      class='small'
                      value={this.state.grado}
                      onChange={this.handleChange}
                    />
                  </div>
                )}
                <div>
                  Número de puntos
                  <input
                    type='number'
                    name='n'
                    required
                    value={this.state.n}
                    class='small'
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  Punto inicial
                  <input
                    type='number'
                    name='x0'
                    required
                    class='small'
                    value={this.state.x0}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  Punto final
                  <input
                    type='number'
                    name='xf'
                    required
                    class='small'
                    value={this.state.xf}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              className='button-big secondary'
              style={{ marginTop: '2rem' }}
              type='submit'
            >
              Calcular
            </button>
          </form>
        </div>
        <div className='center'>
          <CurveFittingChart
            data={{
              xs: {
                y: 'x',
                yr: 'xr',
              },
              colors: {
                y: '#212529',
              },
              columns: [
                ['x', ...this.state.x],
                ['y', ...this.state.y],
                ['xr', ...this.state.xr],
                ['yr', ...this.state.yr],
              ],
            }}
          ></CurveFittingChart>
        </div>
      </div>
    );
  }
}
