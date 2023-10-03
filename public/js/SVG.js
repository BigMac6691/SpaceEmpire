class SVG
{
    constructor()    {    }

    static NS = "http://www.w3.org/2000/svg";

    static create(opts)
    {
        let n = document.createElementNS(this.NS, opts.type);

        if(opts.attributes)
            opts.attributes.forEach(a => n.setAttribute(a.key, a.value));

        return n;
    }

    static createText(opts)
    {
        let n = document.createElementNS(this.NS, opts.type);

        if(opts.attributes)
            opts.attributes.forEach(a => n.setAttribute(a.key, a.value));

        n.append(document.createTextNode(opts.text));

        return n;
    }
}