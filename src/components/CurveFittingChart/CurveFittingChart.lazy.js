import React, { lazy, Suspense } from 'react';

const LazyCurveFittingChart = lazy(() => import('./CurveFittingChart'));

const CurveFittingChart = props => (
  <Suspense fallback={null}>
    <LazyCurveFittingChart {...props} />
  </Suspense>
);

export default CurveFittingChart;
