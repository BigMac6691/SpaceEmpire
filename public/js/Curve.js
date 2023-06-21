class Curve
{
    constructor(pts)
    {
        this.pts = pts;
        this.coefs = [];

        this.processPoints();
    }

    processPoints()
    {
        let m = [];

        // build matrix
        for(let r = 0; r < this.pts.length; r++)
        {
            m[r] = [];

            for(let c = 0; c < this.pts.length; c++)
                m[r][c] = this.pts[r][0] ** c;

            m[r].push(this.pts[r][1]);
        }

        // isolate coefficients
        for(let r = 0; r < this.pts.length; r++)
            for(let i = 0; i < this.pts.length; i++)
            {
                if(i == r)
                    continue;

                let f = m[i][r] / m[r][r];

                for(let j = 0; j < m[r].length; j++)
                    m[i][j] = m[i][j] - f * m[r][j];
            }

        // simplify coefficients
        for(let i = 0; i < this.pts.length; i++)
            this.coefs[i] = m[i][this.pts.length] / m[i][i];
    }

    getValueAt(x)
    {
        let sum = 0;

        for(let p = 0; p < this.coefs.length; p++)
            sum += this.coefs[p] * x ** p;

        return sum;
    }
}