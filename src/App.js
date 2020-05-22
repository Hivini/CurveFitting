import React from 'react';
import CurveFittingChart from "./components/CurveFittingChart/CurveFittingChart.lazy";
import './App.css';

const data = [
    {x: 1, y: 2},
    {x: 2, y: 5},
    {x: 3, y: 9},
    {x: 4, y: 4},
    {x: 8, y: 8},
];

const x = [1, 2, 3, 4, 8];

function App() {
  return (
    <div className="App">
      <header>
        <p>
          Example chart
        </p>
      </header>
        <CurveFittingChart data={data} x={x}/>
    </div>
  );
}

export default App;
