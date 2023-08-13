class UK
{
    static LISTENERS = new Map();
    static VALUES = new Map();

    static init()
    {
        this.VALUES.set("scanner.angle", 2);
    }

    static addListener(k, listener)
    {
        if(!this.LISTENERS.has(k))
            this.LISTENERS.set(k, []);

        this.LISTENERS.get(k).push(listener);
    }

    static setValue(k, value)
    {
        this.VALUES.set(k, value);

        if(this.LISTENERS.has(k))
            this.LISTENERS.get(k).forEach(listener => listener.update());
    }

    static listen(evt)
    {
        this.setValue(evt.target.id.substring(3), evt.target.value);
    }

    static get(k)
    {
        return this.VALUES.get(k);
    }

    static makeUI(root)
    {
        const header = UI.create("div");
        header.classList.add("header");
        root.append(UI.createTextNode("h2", "Maintain Game Constants"));

        for(const [k, v] of this.VALUES)
        {
            const n = UI.createInput("text", {id : "uk." + k, value : v});
            n.addEventListener("change", evt => this.listen(evt));

            root.append(UI.createLabel(k + ":", n));
        }
    }
}