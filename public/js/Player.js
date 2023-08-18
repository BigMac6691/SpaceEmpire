class Player
{
    constructor()
    {
        this.technology = null;
        this.energyWeaponDesigns = [];
        this.missileWeaponDesigns = [];
    }

    toJSON()
    {
        let out = Object.assign({}, this);

        return out;
    }

    fromJSON(json)
    {
        Object.assign(this, json);

        this.technology = new Technology().fromJSON(json.technology);

        let temp = [];
        json.energyWeaponDesigns.forEach(d => temp.push(new EnergyWeapon().fromJSON(d)));
        this.energyWeaponDesigns = temp;

        temp = [];
        json.missileWeaponDesigns.forEach(d => temp.push(new MissileWeapon().fromJSON(d)));
        this.missileWeaponDesigns = temp;

        return this;
    }
}