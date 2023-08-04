class UK
{
    static LISTENERS = new Map();
    static VALUES = new Map();

    static addListener(k, callback)
    {
        if(!this.LISTENERS.has(k))
            this.LISTENERS.set(k, []);

        this.LISTENERS.get(k).push(callback);
    }

    static setValue(k, value)
    {
        this.VALUES.set(k, value);

        if(this.LISTENERS.has(k))
            this.LISTENERS.get(k).forEach(callback => callback(k));
    }

    static get(k)
    {
        return this.VALUES.get(k);
    }
}