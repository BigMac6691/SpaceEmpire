class Game
{
    constructor()
    {
        this.players = [];
    }

    tempSaveTestCode()
    {
        if(IDGen.ids.size == 0)
            IDGen.initId("energy.weapon.design", 0);

        if(this.players.length == 0)
            this.players.push(new Player());

        this.players.forEach(p =>
        {
            if(p.technology === null)
            {
                p.technology = new Technology();
                p.technology.init();
            }
        });
    }

    save()
    {
        this.tempSaveTestCode();

        this.saveIds();
        this.savePlayers();
    }

    load()
    {
        this.loadIds();
        this.loadPlayers();
    }

    saveIds()
    {
        localStorage.setItem("spaceempire.ids", JSON.stringify(IDGen));
    }

    savePlayers()
    {
        console.log(this.players);

        localStorage.setItem("spaceempire.players", JSON.stringify(this.players, null, 3));
    }

    loadIds()
    {
        let data = localStorage.getItem("spaceempire.ids");

        if(data == null)
            return;

        IDGen.fromJSON(JSON.parse(data));
    }
    
    loadPlayers()
    {
        let data = localStorage.getItem("spaceempire.players");

        if(data == null)
            return;

        let json = JSON.parse(data);

        json.forEach(p => this.players.push(new Player().fromJSON(p)));

        console.log(this);
    }
}