class TechnologyAdmin
{
    constructor(root, tech)
    {
        this.tech = tech;
        this.body = UI.create("div");

        this.makeUI();

        const header = UI.create("div");
        header.classList.add("header");
        root.append(UI.create("h2", {textContent: "Technology Admin"}), this.body);
    }

    makeUI()
    {
        this.makeLists();

        this.icon = createSVG();
        this.description = UI.create("textarea", {value: I18N.getText(this.techList.getSelected().value)});
        
        // icon and description
        let middle = UI.create("div", {}, ["researchDetails"]);
        middle.append(this.icon, this.description, this.makeControl());

        this.table = this.buildTable();
        this.graph = this.createSVG();

        let bottom = UI.create("div", {}, ["researchTables"]);
        
        bottom.append(this.table, this.graph);

        this.body.append(middle, bottom);
    }

    updateUI()
    {
        this.icon.replaceWith(this.icon = createSVG());
        this.table.replaceWith(this.table = this.buildTable());
        this.graph.replaceWith(this.graph = this.createSVG());

        this.description.value = I18N.getText(this.techList.getSelected().value);
        this.valueIs.value = this.getSpec().fn.getValueAt(+this.valueAt.value);
    }

    getTech()
    {
        return this.tech.get(this.techList.getSelected().value);
    }

    getSpec()
    {
        return this.getTech().specs.get(this.specList.getSelected().value);
    }

    makeLists()
    {
        this.techList = new List(5).setRoot(this.body);
        this.techList.getList().addEventListener("change", evt => this.handleTechChange(evt));

        for(const [k, v] of this.tech.data)
            this.techList.add({value: k, textContent: v.title});

        this.techList.getList().selectedIndex = 0;

        this.specList = new List(5).setRoot(this.body);
        this.specList.getList().addEventListener("change", evt => this.handleSpecChange(evt));

        for(const [k, v] of this.getTech().specs)
            this.specList.add({value: k, textContent: I18N.getText(k)});

        this.specList.getList().selectedIndex = 0;
    }

    makeControl()
    {
        let controlDiv = UI.create("div", {style: "display: grid; row-gap: 0.25em;"});
        let valueDiv = UI.create("div", {style: "margin-top: 1em;"});

        this.valueAt = UI.create("input", {type: "number", value: "0"});
        this.valueIs = UI.create("output", {textContent: this.getSpec().fn.getValueAt(+this.valueAt.value)});
        this.valueAt.addEventListener("change", evt => this.handleCurveChange(evt));

        valueDiv.append(UI.createLabel("Value at: ", this.valueAt), UI.createLabel(" is ", this.valueIs));

        let addDiv = UI.create("div", {style: "display: grid; grid-template-columns: 1fr 1fr; gap: 0.25em;"});
        this.xInput = UI.create("input", {type: "number", value: "0"});
        this.yInput = UI.create("input", {type: "number", value: "0"});

        let addButton = UI.create("button", {textContent: "Add Point"});
        addButton.addEventListener("click", evt => this.handleAddPoint(evt));

        let saveButton = UI.create("button", {textContent: "Save"});
        saveButton.addEventListener("click", evt => this.handleSave(evt));

        addDiv.append(UI.createLabel("x:", this.xInput), UI.createLabel("y:", this.yInput), addButton, saveButton);

        controlDiv.append(addDiv, valueDiv);

        return controlDiv;
    }

    handleTechChange(evt)
    {
        console.log(evt);

        this.specList.clear();

        for(const [k, v] of this.getTech().specs)
            this.specList.add({value: k, textContent: I18N.getText(k)});

        this.specList.getList().selectedIndex = 0;

        this.updateUI();
    }

    handleSpecChange(evt)
    {
        console.log(evt);

        this.updateUI();
    }

    buildTable()
    {
        let spec = this.getSpec();
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
                // change to spec.data not tr
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

        let spec = this.getSpec();
        spec.data = pts;
        spec.fn.setPoints(pts);

        this.graph.replaceWith(this.graph = this.createSVG());
        this.valueIs.value = spec.fn.getValueAt(+this.valueAt.value);
    }

    handleAddPoint(evt)
    {
        let spec = this.getSpec();

        spec.data.push([+this.xInput.value, +this.yInput.value]);
        spec.data.sort((a, b) => a[0] - b[0]);

        this.table.replaceWith(this.table = this.buildTable());
        this.handleCurveChange(evt);
    }

    handleSave(evt)
    {

    }

    handleLoad()
    {

    }

    createSVG() 
    {
        let spec = this.getSpec();
        let svg = SVG.create({ type: "svg", attributes: {viewBox: "0 0 1000 1000", width: "100%", height: "100%", transform: "scale(1, -1)"}});
        let maxx = spec.data.reduce((max, num) => {return max > num[0] ? max : num[0]}, 0);
        let ys = [];

        for(let i = 0; i <= maxx; i += maxx / 200)
            ys.push([i, spec.fn.getValueAt(i)]);
        
        let maxy = ys.reduce((max, num) => {return max[1] > num[1] ? max : num}, [0, 0]);
        let scalex = 1000 / maxx, scaley = 1000 / maxy[1];
        let path = `M `;

        for (let i = 0; i < spec.data.length; i++) 
            svg.append(SVG.create({type: "circle", attributes: {"cx": spec.data[i][0] * scalex, "cy": spec.data[i][1] * scaley, r: 5, stroke: "lightgreen"}}));

        for(let i = 0; i <= maxx; i += maxx / 200)
            path += `${i * scalex},${Math.floor(100 * ys.shift()[1] * scaley + 0.5) / 100} `;

        svg.append(SVG.create({ type: "path", attributes: {d: path, stroke: "red", fill: "transparent"}}));

        let xOfMaxy = maxy[0] * scalex;

        svg.append(SVG.create({type: "line", attributes: {x1: +this.valueAt.value * scalex, y1: 0, x2: +this.valueAt.value * scalex, y2: 1000, stroke: "lightgreen"}}));
        svg.append(SVG.create({type: "line", attributes: {x1: xOfMaxy, y1: 0, x2: xOfMaxy, y2: 1000, stroke: "lightblue"}}));

        let coords = `${Math.floor(maxy[0])},${Math.floor(maxy[1])}`;

        svg.append(SVG.createText({text: coords, attributes: {stroke: "lightblue", fill: "lightblue", style: "font-size: 40", transform: `scale(1, -1) translate(${xOfMaxy < 500 ? xOfMaxy + 10 : xOfMaxy - (20 * coords.length)}, -500) `}}));
 
        return svg;
    }
}