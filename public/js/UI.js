class UI
{
    constructor()    {    }

    static createTextNode(type, text)
    {
        const n = document.createElement(type);
        n.textContent = text;

        return n;
    }

    static createInput(type, opts)
    {
        const n = document.createElement("input");
        n.type = type;

        if(opts !== undefined)
            for(const [k, v] of Object.entries(opts))
                n[k] = v;

        return n;
    }

    static createLabel(name, input)
    {
        const n = document.createElement("label");
        n.append(name, input);

        return n;
    }
}