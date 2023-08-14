class EnergyWeapon
{
    constructor()
    {
        this.clazz = "EnergyWeapon";

        this.id;
        this.name;
        this.power;
        this.frequency;
        this.bore;
        this.capictor;
        this.coupling;
        
        this.mass;
        this.volume;
        this.cost;

        this.obsolete = false;
        this.inUse = false;
    }

    isObsolete()
    {
        return this.obsolete;
    }

    isUsed()
    {
        return this.inUse;
    }

    toJSON()
    {
        return this;
    }

    fromJSON(json)
    {
        Object.assign(this, json);
    }
}