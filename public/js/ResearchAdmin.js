class ResearchAdmin
{
    constructor(root)
    {
        this.player = null;
        this.body = UI.create("div");

        const header = UI.create("div");
        header.classList.add("header");
        root.append(UI.create("h2", {textContent: "Research Admin"}), this.body);
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
        this.description = UI.create("textarea", {textContent: I18N.getText(this.techList.getSelected().value)});
        details.append(createSVG(), this.description);

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
        
        settings.append(this.buildCurveTable(spec), this.svg = spec.fn.createSVG(true, 0));

        let valueDiv = UI.create("div");
        this.valueAt = UI.create("input", {type: "number", value: "0"});
        let valueIs = UI.create("input", {type: "number", value: spec.fn.getValueAt(+this.valueAt.value), disabled: true});
        this.valueAt.addEventListener("change", evt => 
        {
            valueIs.value = spec.fn.getValueAt(+this.valueAt.value);
            this.handleCurveChange(null);
        });
        valueDiv.append(UI.createLabel("Value at: ", this.valueAt), UI.createLabel(" is ", valueIs));

        let controlDiv = UI.create("div", {style: "display: grid"});
        this.xInput = UI.create("input", {type: "number", value: "0"});
        this.yInput = UI.create("input", {type: "number", value: "0"});
        let button = UI.create("button", {textContent: "Add"});
        button.addEventListener("click", evt => this.handleCurveAdd(evt));
        controlDiv.append(UI.createLabel("x:", this.xInput), UI.createLabel("y:", this.yInput), button);

        this.body.append(settings, valueDiv, controlDiv);
    }

    buildCurveTable(spec)
    {
        let table = UI.create("table", {innerHTML: "<thead><tr><th>x</th><th>y</th><th>Delete</th></tr></thead>"});
        let tableBody = UI.create("tbody");
        let cnt = 0;

        spec.data.forEach(i =>
        {
            let row = UI.create("tr", {id: "row" + cnt});
            let x = UI.create("td");
            let xinput = UI.create("input", {type: "number", value: i[0]});
            xinput.addEventListener("change", evt => this.handleCurveChange(evt));
            x.append(xinput);
            
            let y = UI.create("td");
            let yinput = UI.create("input", {type: "number", value: i[1]});
            yinput.addEventListener("change", evt => this.handleCurveChange(evt));
            y.append(yinput);

            let z = UI.create("td");
            let button = UI.create("button", {textContent: "Remove", name: "row" + cnt});
            button.addEventListener("click", evt => 
            {
                this.body.querySelector("#" + evt?.target?.name).remove();
                this.handleCurveChange(null);
            });
            z.append(button);

            row.append(x, y, z);
            tableBody.append(row);
            cnt++;
        });

        table.append(tableBody);

        return table;
    }

    handleCurveChange(evt)
    {
        let list = this.body.querySelectorAll("td input");
        let pts = [];

        for(let i = 0, row = 0; i < list.length; i += 2, row++)
            pts[row] = [+list[i].value, +list[i + 1].value];

        let tech = this.player.tech.get(this.techList.getSelected().value);
        let spec = tech.specs.get(this.specList.getSelected().value);
        spec.data = pts;
        spec.fn.setPoints(pts);

        let temp = spec.fn.createSVG(true, +this.valueAt.value);

        this.svg.replaceWith(temp);
        this.svg = temp;
    }

    handleCurveAdd(evt)
    {
        console.log(evt);

        let tech = this.player.tech.get(this.techList.getSelected().value);
        let spec = tech.specs.get(this.specList.getSelected().value);

        spec.data.push([+this.xInput.value, +this.yInput.value]);
        spec.data.sort((a, b) => a[0] - b[0]);

        this.body.querySelector("table").replaceWith(this.buildCurveTable(spec));
        this.handleCurveChange(null);
    }
}