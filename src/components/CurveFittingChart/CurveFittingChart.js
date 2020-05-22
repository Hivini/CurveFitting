import React from 'react';
import './CurveFittingChart.css';
import {
  ScatterChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Scatter,
} from 'recharts';

const CurveFittingChart = (props) => (
  <ScatterChart
    width={400}
    height={400}
    margin={{
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    }}
  >
    <CartesianGrid />
    <XAxis type='number' dataKey='x' name='x' />
    <YAxis type='number' dataKey='y' name='y' />
    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
    <Scatter name='Preview' data={props.data} fill='#212529' />
  </ScatterChart>
);

CurveFittingChart.propTypes = {};

CurveFittingChart.defaultProps = {};

export default CurveFittingChart;
