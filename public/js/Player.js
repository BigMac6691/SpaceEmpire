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

        console.log("Inside Player.fromJSON() EWD count = " + this.energyWeaponDesigns.length);

        this.technology = new Technology().fromJSON(json.technology);

        let temp = [];
        json.energyWeaponDesigns.forEach(d => temp.push(new EnergyWeapon().fromJSON(d)));
        this.energyWeaponDesigns = temp;
        // json.missileWeaponDesigns.forEach(d => this.missileWeaponDesigns.push(new EnergyWeapon().fromJSON(d)));

        return this;
    }
}