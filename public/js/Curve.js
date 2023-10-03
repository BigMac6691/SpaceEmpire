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

    createSVG()
    {
        let svg = SVG.create({type: "svg", attributes : [{key: "viewBox", value: "0 0 1110 1110"}, {key: "width", value: "100%"}, {key: "height", value: "100%"}]});

        let data =
        {
            type: "rect",
            attributes:
            [
                {key: "x", value: 97},
                {key: "y", value: 7},
                {key: "width", value: 1006},
                {key: "height", value: 1006},
                {key: "stroke", value: "gold"},
                {key: "stroke-width", value: 3}
            ]
        };
        svg.append(SVG.create(data));

        let maxx = 0, maxy = 0;
        this.pts.forEach(p => 
        {
            maxx = Math.max(maxx, p[0]);
            maxy = Math.max(maxy, p[1]);
        });

        data =
        {
            type: "text",
            text: `${maxy}`,
            attributes:
            [
                {key: "x", value: 7},
                {key: "y", value: 27},
                {key: "font-size", value: "2em"},
                {key: "stroke", value: "gold"},
            ]
        };
        svg.append(SVG.createText(data));

        let scalex = 1000 / maxx, scaley = 1000 / maxy;

        this.pts.forEach(p => 
            {
                maxx = Math.max(maxx, p[0]);
                maxy = Math.max(maxy, p[1]);
    
                let data =
                {
                    type: "circle",
                    attributes:
                    [
                        {key: "cx", value: 100 + p[0] * scalex},
                        {key: "cy", value: 1010 - p[1] * scaley},
                        {key: "r", value: 5},
                        {key: "stroke", value: "lightgreen"}
                    ]
                };
    
                svg.append(SVG.create(data));
            });

        return svg;
    }
}