class IDGen
{
    static ids = new Map();

    static initId(id, v)
    {
        this.ids.set(id, v);
    }

    static nextId(id)
    {
        let v = this.ids.get(id);

        this.ids.set(id, ++v);

        return v;
    }

    static toJSON()
    {
        let out = Object.assign({}, this);

        out.ids = [...this.ids];

        return out;
    }

    static fromJSON(json)
    {
        Object.assign(this, json);

        this.ids = new Map(json.ids);

        return this;
    }
}