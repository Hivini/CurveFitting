import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-transition-group';
import CurveFittingChart from '../CurveFittingChart/CurveFittingChart.lazy';

export default class InputLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      current_x: 0,
      current_y: 0,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    this.nameInput.focus();
    let newPair = { x: this.state.current_x, y: this.state.current_y };

    this.setState({
      data: [...this.state.data, newPair],
    });
    console.log(this.state.data);
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
    }
  };

  render() {
    return (
      <div>
        <h3>Cargar los datos por input</h3>
        <div className='col-2'>
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
                <input
                  type='submit'
                  value='ingresar'
                  className='button-submit'
                />
              </form>
            </div>
            <hr />
            <button
              className='button-big secondary'
              style={{ marginTop: '2rem' }}
            >
              Avanzar
            </button>
          </div>
          <div>
            <CurveFittingChart data={this.state.data}></CurveFittingChart>
          </div>
        </div>
      </div>
    );
  }
}
