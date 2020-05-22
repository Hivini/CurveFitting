import React from 'react';
import PropTypes from 'prop-types';
import './CurveFittingChart.css';
import {Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";



const CurveFittingChart = (props) => (
    <LineChart
        width={500}
        height={300}
        data={props.data}
        margin={{
            top: 5, right: 30, left: 20, bottom: 5,
        }}
    >
        <XAxis dataKey='x' type='number' ticks={props.x}/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 2 }} />
    </LineChart>
);

CurveFittingChart.propTypes = {};

CurveFittingChart.defaultProps = {};

export default CurveFittingChart;
