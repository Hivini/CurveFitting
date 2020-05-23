export function polinomialFit(grade, xPoints, yPoints) {
    if (grade < 0) throw Error("There are not negative grades");

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
        for(let k = i + 1; k < matrix.length; k++) {
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
            for(let j = i; j < matrix.length + 1; j++) {
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