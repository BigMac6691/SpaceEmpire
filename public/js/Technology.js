class Technology
{
    constructor()
    {
        this.data = new Map();
    }

    init()
    {
        this.data.set("emitter.power", {mass : new Curve([[0,1],[100,10],[500,60],[1000,125]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});
        this.data.set("emitter.frequency", {mass : new Curve([[0,1],[100,20],[500,50],[1000,200]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});
        this.data.set("emitter.bore", {mass : new Curve([[0,1],[100,20],[500,50],[1000,200]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});
        this.data.set("emitter.capacitor", {mass : new Curve([[0,1],[100,5],[500,15],[1000,50]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});
        this.data.set("emitter.coupling", {mass : new Curve([[0,1],[100,20],[500,50],[1000,200]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});

        this.data.set("missile.armour", {mass : new Curve([[0,0],[1,10]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});
        this.data.set("missile.drive", {mass : new Curve([[0,0],[100,20],[500,50],[1000,200]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});
        this.data.set("missile.fuel", {mass : new Curve([[0,0], [1,0.01]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});
        this.data.set("missile.warheads", {mass : new Curve([[0,0]]), cost : new Curve([[0,0]]), volume : new Curve([[0,0]])});
        this.data.set("missile.decoys", {mass : new Curve([[0,0],[1,1]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});
        this.data.set("missile.power", {mass : new Curve([[0,0],[100,10],[500,60],[1000,125]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});
        this.data.set("missile.computer", {mass : new Curve([[0,0],[100,2],[500,5],[1000,20]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});
        this.data.set("missile.scanner", {mass : new Curve([[0,0],[100,2],[500,5],[1000,20]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});
        this.data.set("missile.jammer", {mass : new Curve([[0,0],[100,0.5],[500,1.5],[1000,5]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});
        this.data.set("missile.comms", {mass : new Curve([[0,0],[100,2],[500,5],[1000,20]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});
    }

    set(k, v)
    {
        this.data.set(k, v);
    }

    get(k)
    {
        return this.data.get(k);
    }

    toJSON()
    {
        let out = Object.assign({}, this);

        out.data = [...this.data];

        return out;
    }

    fromJSON(json)
    {
        Object.assign(this, json);

        this.data = new Map();

        json.data.forEach(t => 
        {
            let details = {};

            for(const [k, v] of Object.entries(t[1]))
                details[k] = new Curve(v.pts);

            this.data.set(t[0], details);
        });

        return this;
    }
}