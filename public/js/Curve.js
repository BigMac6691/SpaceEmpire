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

    createSVG(scale) 
    {
        let svg = SVG.create({ type: "svg", attributes: {viewBox: "0 0 1000 1000", width: "100%", height: "100%", transform: "scale(1, -1)"}});
        let maxx = this.points.reduce((max, num) => {return max > num[0] ? max : num[0]}, 0);
        let ys = [];

        for(let i = 0; i <= maxx; i += maxx / 200)
            ys.push([i, this.getValueAt(i)]);
        
        let maxy = ys.reduce((max, num) => {return max[1] > num[1] ? max : num}, [0, 0]);
        let scalex = scale ? 1000 / maxx : 1,
            scaley = scale ? 1000 / maxy[1] : 1;
        let path = `M `;

        for (let i = 0; i < this.points.length; i++) 
            svg.append(SVG.create({type: "circle", attributes: {"cx": this.points[i][0] * scalex, "cy": this.points[i][1] * scaley, r: 5, stroke: "lightgreen"}}));

        for(let i = 0; i <= maxx; i += maxx / 200)
            path += `${i * scalex},${Math.floor(100 * ys.shift()[1] * scaley + 0.5) / 100} `;

        svg.append(SVG.create({ type: "path", attributes: {d: path, stroke: "red", fill: "transparent"}}));

        if(scale)
        {
            svg.append(SVG.create({type: "line", attributes: {x1: maxy[0] * scalex, y1: 0, x2: maxy[0] * scalex, y2: 1000, stroke: "lightblue"}}));
            svg.append(SVG.createText({text: Math.floor(maxy[1]), attributes: {stroke: "lightblue", fill: "lightblue", style: "font-size: 60", transform: `scale(1, -1) translate(${maxy[0] * scalex - 90}, -500) `}}));
        }

        return svg;
    }
}