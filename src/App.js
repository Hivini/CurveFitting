import React from 'react';
import CurveFittingChart from "./components/CurveFittingChart/CurveFittingChart.lazy";
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <p>
          Example chart
        </p>
      </header>
        <CurveFittingChart/>
    </div>
  );
}

export default App;
