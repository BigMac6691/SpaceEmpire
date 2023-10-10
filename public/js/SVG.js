class SVG
{
    constructor()    {    }

    static NS = "http://www.w3.org/2000/svg";

    static create(opts)
    {
        let n = document.createElementNS(this.NS, opts.type);

        if(opts.attributes)
            for(const[k, v] of Object.entries(opts.attributes))
                n.setAttribute(k, v);

        return n;
    }

    static createText(opts)
    {
        let n = document.createElementNS(this.NS, "text");

        if(opts.attributes)
            for(const[k, v] of Object.entries(opts.attributes))
                n.setAttribute(k, v);

        n.append(document.createTextNode(opts.text));

        return n;
    }
}