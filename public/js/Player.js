class Player
{
    constructor()
    {
        this.technology = null;
        this.energyWeaponDesigns = [];
        this.missileWeaponDesigns = [];
    }

    save()
    {
        let out = JSON.stringify({clazz : "Player", data : this}, null, 3);

        console.log(out);

        return out;
    }

    load()
    {
        this.technology = new Technology();
    }
}