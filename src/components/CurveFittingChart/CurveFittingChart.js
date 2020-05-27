import React from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

const CurveFittingChart = (props) => <C3Chart data={props.data} type='spline' />;

export default CurveFittingChart;
