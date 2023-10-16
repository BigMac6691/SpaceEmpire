class Curve 
{
    constructor(pts) 
    {
        this.setPoints(pts);
    }

    setPoints(pts)
    {
        this.points = JSON.parse(JSON.stringify(pts));
        this.coefs = [];

        this.processPoints();
    }

    processPoints() 
    {
        const degree = this.points.length - 1;
        const equations = [];

        for (let i = 0; i <= degree; i++) 
        {
            const row = [];

            for (let j = 0; j <= degree; j++)
                row.push(this.points[i][0] ** j);

            row.push(this.points[i][1]);
            equations.push(row);
        }

        this.coefs = this.gaussElimination(equations);
    }

    gaussElimination(matrix) 
    {
        const n = matrix.length;
    
        for (let i = 0; i < n; i++) 
        {
          const diagonal = matrix[i][i];
    
          for (let j = i; j < n + 1; j++) 
            matrix[i][j] /= diagonal;
    
          for (let k = 0; k < n; k++) 
          {
            if (k !== i) 
            {
              const factor = matrix[k][i];
              
              for (let j = i; j < n + 1; j++) 
                matrix[k][j] -= factor * matrix[i][j];
            }
          }
        }
    
        return matrix.map((row) => row[n]);
    }

    getValueAt(x) 
    {
        let sum = 0;

        for (let p = 0; p < this.coefs.length; p++)
            sum += this.coefs[p] * x ** p;

        return sum;
    }
}