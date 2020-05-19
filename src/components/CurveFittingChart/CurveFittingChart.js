import React from 'react';
import PropTypes from 'prop-types';
import './CurveFittingChart.css';
import {Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const data = [
    {x: 1, y: 2},
    {x: 2, y: 5},
    {x: 3, y: 9},
    {x: 4, y: 4},
    {x: 8, y: 8},
];

const x = [1, 2, 3, 4, 8];

const CurveFittingChart = () => (
    <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
            top: 5, right: 30, left: 20, bottom: 5,
        }}
    >
        <XAxis dataKey='x' type='number' ticks={x}/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 2 }} />
    </LineChart>
);

CurveFittingChart.propTypes = {};

CurveFittingChart.defaultProps = {};

export default CurveFittingChart;
