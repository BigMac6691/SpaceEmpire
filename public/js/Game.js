class Game
{
    constructor()
    {
        this.players = [];
    }

    tempSaveTestCode()
    {
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
        this.savePlayers();
    }

    load()
    {
        this.loadPlayers();
    }

    savePlayers()
    {
        console.log(this.players);

        this.tempSaveTestCode();

        let out = JSON.stringify(this.players, null, 3);

        console.log(out);

        localStorage.setItem("spaceempire.players", out);
    }

    loadPlayers()
    {
        let data = localStorage.getItem("spaceempire.players");

        console.log(data);

        if(data == null)
            return;

        let json = JSON.parse(data);

        json.forEach(p => this.players.push(new Player().fromJSON(p)));

        console.log(json);
        console.log(this);
    }
}