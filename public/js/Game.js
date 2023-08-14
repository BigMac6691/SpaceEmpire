class Game
{
    constructor()
    {
        this.players = [];
    }

    save()
    {
        this.players.forEach(p => p.save());
    }

    load()
    {

    }
}