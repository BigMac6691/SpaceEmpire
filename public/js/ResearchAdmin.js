class ResearchAdmin
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

        // lefthand list
        this.techList = new List(5).setRoot(this.body);

        for(const [k, v] of this.player.tech.data)
            this.techList.add({value: k, textContent: v.title});

        this.techList.getList().selectedIndex = 0;

        // righthand list
        this.specList = new List(5).setRoot(this.body);
        let tech = this.player.tech.get(this.techList.getSelected().value);

        tech.specs.forEach(s => this.specList.add({value: s.id, textContent: I18N.getText(s.id)}));

        this.specList.getList().selectedIndex = 0;

        // icon and description
        let details = UI.create("div", {}, ["researchDetails"]);
        details.append(createSVG(), UI.create("div", {innerText: I18N.getText(this.techList.getSelected().value)}));

        this.body.append(details);

        // detailed data - this should be based on the data type of the selected attribute
        let spec = tech.specs.get(this.specList.getSelected().value);

        switch(spec.type)
        {
            case "curve":
                this.uiCurve(spec);
        }
    }

    uiCurve(spec)
    {
        let settings = UI.create("div", {}, ["researchTables"]);
        let table = UI.create("table", {innerHTML: "<thead><tr><th>x</th><th>y</th></tr></thead>"});
        let tableBody = UI.create("tbody");
        let cnt = 0;

        spec.data.forEach(i =>
        {
            let row = UI.create("tr");
            let x = UI.create("td");
            let xinput = UI.create("input", {id: "x" + cnt, type: "number", value: i[0]});
            xinput.addEventListener("change", evt => this.handleCurveChange(evt));
            x.append(xinput);
            
            let y = UI.create("td");
            let yinput = UI.create("input", {id: "y" + cnt, type: "number", value: i[1]});
            yinput.addEventListener("change", evt => this.handleCurveChange(evt));
            y.append(yinput);

            row.append(x, y);
            tableBody.append(row);
            cnt++;
        });

        this.svg = spec.fn.createSVG(true);

        table.append(tableBody);
        settings.append(table, this.svg);

        this.body.append(settings);
    }

    handleCurveChange(evt)
    {
        let list = this.body.querySelectorAll("td input");
        let pts = [];

        for(let i = 0; i < list.length; i += 2)
        {
            let row = +list[i].id.substring(1);

            pts[row] = [+list[i].value, +list[i + 1].value];
        }

        let tech = this.player.tech.get(this.techList.getSelected().value);
        let spec = tech.specs.get(this.specList.getSelected().value);
        spec.fn.setPoints(pts);

        let temp = spec.fn.createSVG(true);

        this.svg.replaceWith(temp);
        this.svg = temp;
    }
}