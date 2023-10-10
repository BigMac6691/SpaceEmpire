class Research
{
    constructor(root)
    {
        this.player = null;
        this.body = UI.create("div");

        const header = UI.create("div");
        header.classList.add("header");
        root.append(UI.createTextNode("h2", "Research"), this.body);
    }

    setPlayer(p)
    {
        this.player = p;

        this.makeUI();
    }

    makeUI()
    {
        this.body.innerHTML = "";

        this.list = new List(5).setRoot(this.body);

        for(const [k, v] of this.player.tech.data)
            this.list.add({value: k, textContent: v.title});

        this.list.getList().selectedIndex = 0;

        this.attributes = new List(5).setRoot(this.body);
        let tech = this.player.tech.get(this.list.getSelected().value);

        tech.data.forEach(a => this.attributes.add({value: a.id, textContent: I18N.getText(a.id)}));

        this.attributes.getList().selectedIndex = 0;

        let details = UI.create("div", {}, ["researchDetails"]);
        details.append(createSVG(), UI.create("div", {innerText: I18N.getText(this.list.getSelected().value)}));

        let settings = UI.create("div", {}, ["researchTables"]);
        let tables = UI.create("table");
        let tableBody = UI.create("tbody");

        let view = tech.data.find(i => i.id === this.attributes.getSelected().value);

        view.data.forEach(i =>
        {
            let row = UI.create("tr");
            let x = UI.create("td", {textContent: i[0]});
            let y = UI.create("td", {textContent: i[1]});

            row.append(x, y);
            tableBody.append(row);
        });

        tables.append(tableBody);
        settings.append(tables, view.fn.createSVG(true));

        this.body.append(details, settings);
    }
}