import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-transition-group';

export default class CsvLoader extends Component {
  render() {
    return (
      <div>
        <h3>Cargar datos por csv</h3>
        <input type='file' className='input-file' />
      </div>
    );
  }
}
