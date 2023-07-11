class Technology
{
    constructor()
    {
        this.data = new Map();

        this.init();
    }

    init()
    {
        this.data.set("mass", {cost : 0.01}); // base cost of materials

        this.data.set("emitter.power", {mass : new Curve([[0,1],[100,10],[500,60],[1000,125]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});
        this.data.set("emitter.frequency", {mass : new Curve([[0,1],[100,20],[500,50],[1000,200]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});
        this.data.set("emitter.bore", {mass : new Curve([[0,1],[100,20],[500,50],[1000,200]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});
        this.data.set("emitter.capacitor", {mass : new Curve([[0,1],[100,20],[500,50],[1000,200]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});
        this.data.set("emitter.coupling", {mass : new Curve([[0,1],[100,20],[500,50],[1000,200]]), cost : new Curve([[0,1],[100,20],[500,50],[1000,200]]), volume : new Curve([[0,1],[100,5]])});
    }

    get(k)
    {
        return this.data.get(k);
    }
}