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
        let svg = SVG.create({type: "svg", attributes: {viewBox: "0 0 1110 1110", width: "100%", height: "100%"}});

        let data = {type: "rect", attributes: {x: 97, y: 7, width: 1006, height: 1006, stroke: "gold", "stroke-width": 3}};
        svg.append(SVG.create(data));

        let maxx = 0, maxy = 0;
        this.pts.forEach(p => 
        {
            maxx = Math.max(maxx, p[0]);
            maxy = Math.max(maxy, p[1]);
        });

        data = {type: "text", text: `${maxy}`, attributes: {x: 7, y: 27, "font-size": "2em", stroke: "gold"}};
        svg.append(SVG.createText(data));

        let scalex = 1000 / maxx, scaley = 1000 / maxy;
        let delta = 0.0001;
        let path = `M ${100 + this.pts[0][0] * scalex} ${1010 - this.pts[0][1] * scaley}`;

        for(let i = 0; i < this.pts.length; i++)
        {
            let p = this.pts[i];
            let dataPts = {type: "circle", attributes: {cx: 100 + p[0] * scalex, cy: 1010 - p[1] * scaley, r: 5, stroke: "lightgreen"}};
    
            svg.append(SVG.create(dataPts));

            if(i < this.pts.length - 1)
            {
                let m = (p[1] - this.getValueAt(p[0] + delta))/(-delta);
                let run = (this.pts[i + 1][0] - this.pts[i][0]) / 2;
                let rise = m * run + p[1];

                path += ` Q ${100 + (p[0] + run) * scalex} ${1010 - rise * scaley} ${100 + this.pts[i + 1][0] * scalex} ${1010 - this.pts[i + 1][1] * scaley}`;

                console.log(`m=${m} run=${run} rise=${rise}`);
            }

        }

        console.log(path);
        console.log("(650) = " + this.getValueAt(650));
        console.log(this.coefs);

        svg.append(SVG.create({type: "path", attributes: {d: path, stroke: "white"}}));

        return svg;
    }
}