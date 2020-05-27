import { create, all } from 'mathjs';

const config = {};
const math = create(all, config);
const parser = math.parser();

export function createExpression(type, args) {
  // Crea una expresion tipo string para darsela a mathEvaluate
  // type (string): enum de log, pol, origin
  // args (array): array con coeficientes de polinomio, si es log o origin, es el único coeficiente el primer elemento.

  let exp = '';

  switch (type) {
    case 'pol':
      for (let i = 0; i < args.length; i++) {
        if (i !== 0) {
          exp += args[i].toFixed(3) + '*x^' + i + ' ';
        } else {
          exp += args[i].toFixed(3) + ' ';
        }
        if (i !== args.length - 1) {
          exp += '+ ';
        }
      }
      break;
    case 'log':
      exp += args[0].toFixed(3) + '*log(x)';
      break;
    case 'origin':
      exp += args[0].toFixed(3) + '*x';
      break;
    default:
      break;
  }

  return exp;
}

export function mathEvaluate(npoints, exp, x0, xf) {
  //recibe no de puntos y la expresion como string
  parser.evaluate('f(x) = ' + exp);

  let x = [];
  let y = [];
  let step;

  if (xf - x0 + 1 < npoints) {
    step = (xf - x0) / (npoints);
  } else {
    step = (xf - x0) / (npoints - 1);
  }

  for (let i = parseFloat(x0); i <= xf; i += step) {
    x.push(i);
    y.push(parser.evaluate('f(' + i.toString() + ')'));
  }

  return { x, y };
}

export function polinomialFit(grade, xPoints, yPoints) {
  //retorna coeficientes de menor grado a mayor
  if (grade < 0) throw Error('There are not negative grades');

  console.log(grade);
  console.log(xPoints);

  if (grade === 0) {
    let sumOfY = 0;
    for (let i = 0; i < yPoints.length; i++) {
      sumOfY += yPoints[i];
    }
    let coefficient = sumOfY / yPoints.length;
    return [coefficient];
  }
  let equations = [];
  for (let i = 0; i <= grade; i++) {
    let coefficients = [];
    for (let y = 0; y <= grade; y++) {
      let sumOfX = 0;
      for (let x = 0; x < xPoints.length; x++) {
        sumOfX += Math.pow(xPoints[x], y + i);
      }
      coefficients.push(sumOfX);
    }
    let sumOfProduct = 0;
    for (let x = 0; x < xPoints.length; x++) {
      sumOfProduct += Math.pow(xPoints[x], i) * yPoints[x];
    }
    // Final coefficient positive to be processed by Gauss Jordan, because sign will need to change.
    coefficients.push(sumOfProduct);
    equations.push(coefficients);
  }
  return gauss(equations);
}

function gauss(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    // Get the major row.
    let gtEl = Math.abs(matrix[i][i]);
    let gtRow = i;
    for (let k = i + 1; k < matrix.length; k++) {
      if (Math.abs(matrix[k][i]) > gtEl) {
        gtEl = Math.abs(matrix[k][i]);
        gtRow = k;
      }
    }

    // Swap the major row
    for (let k = i; k < matrix.length + 1; k++) {
      let tmp = matrix[gtRow][k];
      matrix[gtRow][k] = matrix[i][k];
      matrix[i][k] = tmp;
    }

    // Make the zeros in the column
    for (let k = i + 1; k < matrix.length; k++) {
      let c = -matrix[k][i] / matrix[i][i];
      for (let j = i; j < matrix.length + 1; j++) {
        if (i === j) {
          matrix[k][j] = 0;
        } else {
          matrix[k][j] += c * matrix[i][j];
        }
      }
    }
  }

  // Get the coefficients
  let x = new Array(matrix.length);
  for (let i = matrix.length - 1; i > -1; i--) {
    x[i] = matrix[i][matrix.length] / matrix[i][i];
    for (let k = i - 1; k > -1; k--) {
      matrix[k][matrix.length] -= matrix[k][i] * x[i];
    }
  }
  return x;
}

export function originFit(xPoints, yPoints) {
  //retorna el a1 del a1x
  let sumOfProduct = 0;
  let sumOfX2 = 0;
  for (let i = 0; i < xPoints.length; i++) {
    sumOfProduct += xPoints[i] * yPoints[i];
    sumOfX2 += Math.pow(xPoints[i], 2);
  }
  return sumOfProduct / sumOfX2;
}

export function logFit(xPoints, yPoints) {
  // retorna el k de klog(x)
  let k1 = 0;
  let k2 = 0;
  for (let i = 0; i < xPoints.length; i++) {
    k1 += xPoints[i] * yPoints[i] * Math.log(xPoints[i]);
    k2 += Math.pow(xPoints[i], 2) * Math.pow(Math.log(xPoints[i]), 2);
  }

  return k1 / k2;
}
