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
        this.graph = this.createGraph();

        let bottom = UI.create("div", {}, ["researchTables"]);
        bottom.append(this.table, this.graph);

        this.body.append(middle, bottom);
    }

    updateUI()
    {
        this.icon.replaceWith(this.icon = createSVG());
        this.table.replaceWith(this.table = this.buildTable());
        this.graph.replaceWith(this.graph = this.createGraph());

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
        let listsDiv = UI.create("div", {style: "display: grid; column-gap: 1em; justify-content: center; grid-template-columns: 30% 30%;"});

        // technologies
        let techDiv = UI.create("div", {style: "display: grid; gap: 1em; grid-template-columns: 1fr 1fr; justify-items: center; padding: 3px; border: solid lightblue 1px;"});
        techDiv.append(UI.create("div", {textContent: "Technologies", style: "grid-column: 1 / span 2;"}));

        this.techList = new List(5).setRoot(techDiv);
        this.techList.getList().addEventListener("change", evt => this.handleTechChange(evt));

        let techEditDiv = UI.create("div", {style: "display: grid; grid-template-columns: 1fr; gap: 0.05em; justify-items: end;"});
        this.techInputId = UI.create("input");
        this.techInputTitle = UI.create("input");
        this.createTech = UI.create("button", {textContent: "Create Tech"});
        techEditDiv.append(UI.createLabel("Id: ", this.techInputId), UI.createLabel("Title: ", this.techInputTitle), this.createTech);
        techDiv.append(techEditDiv);

        for(const [k, v] of this.tech.data)
            this.techList.add({value: k, textContent: v.title});

        this.techList.getList().selectedIndex = 0;

        // specifications
        let specDiv = UI.create("div", {style: "display: grid; gap: 1em; grid-template-columns: 1fr 1fr; justify-items: center; padding: 3px; border: solid lightblue 1px;"});
        specDiv.append(UI.create("div", {textContent: "Specifications", style: "grid-column: 1 / span 2;"}));
        this.specList = new List(5).setRoot(specDiv);
        this.specList.getList().addEventListener("change", evt => this.handleSpecChange(evt));

        let specEditDiv = UI.create("div", {style: "display: grid; grid-template-columns: 1fr; gap: 0.05em; justify-items: end;"});
        this.specInputId = UI.create("input");
        this.specInputTitle = UI.create("input");
        this.createSpec = UI.create("button", {textContent: "Create Spec"});
        specEditDiv.append(UI.createLabel("Id: ", this.specInputId), UI.createLabel("Title: ", this.specInputTitle), this.createSpec);
        specDiv.append(specEditDiv);

        for(const [k, v] of this.getTech().specs)
            this.specList.add({value: k, textContent: I18N.getText(k)});

        this.specList.getList().selectedIndex = 0;

        listsDiv.append(techDiv, specDiv);
        this.body.append(listsDiv);
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

        addDiv.append(UI.createLabel("x: ", this.xInput), UI.createLabel("y: ", this.yInput), addButton, saveButton);

        controlDiv.append(addDiv, valueDiv);

        return controlDiv;
    }

    handleTechChange(evt)
    {
        this.specList.clear();

        for(const [k, v] of this.getTech().specs)
            this.specList.add({value: k, textContent: I18N.getText(k)});

        this.specList.getList().selectedIndex = 0;

        this.updateUI();
    }

    handleSpecChange(evt)
    {
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

        this.graph.replaceWith(this.graph = this.createGraph());
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

    createGraph() 
    {
        let spec = this.getSpec();
        let svg = SVG.create({ type: "svg", attributes: {viewBox: "0 0 1000 1000", width: "100%", height: "100%", transform: "scale(1, -1)"}});

        if(spec.data.length === 0)
            svg.append(SVG.createText({text: "No data", attributes: {stroke: "lightblue", fill: "lightblue", style: "font-size: 40", transform: `scale(1, -1) translate(440, -500) `}}));
        else
        {
            let maxx = spec.data.reduce((max, num) => {return max > num[0] ? max : num[0]}, 0);
            let xInc = maxx ? maxx / 200: 5;
            let ys = [];

            for(let i = 0, x = 0; i <= 200; i++, x += xInc)
                ys.push([x, spec.fn.getValueAt(x)]);
        
            let maxy = ys.reduce((max, num) => {return max[1] > num[1] ? max : num}, [0, 0]);
            let miny = ys.reduce((min, num) => {return min[1] < num[1] ? min : num}, [0, Infinity]);
            let range = Math.abs(maxy[1]) + Math.abs(miny[1]);
            let scalex = maxx ? 1000 / maxx : 1, scaley = maxy[1] ? 990 / range : 0.99;
            let path = `M `;

            for (let i = 0; i < spec.data.length; i++) 
                svg.append(SVG.create({type: "circle", attributes: {"cx": spec.data[i][0] * scalex, "cy": 5 + (Math.abs(miny[1]) + spec.data[i][1]) * scaley, r: 5, stroke: "lightgreen"}}));

            for(let i = 0; i < ys.length; i++)
                path += `${ys[i][0] * scalex},${5 + Math.floor(100 * (Math.abs(miny[1]) + ys[i][1]) * scaley + 0.5) / 100} `;

            svg.append(SVG.create({ type: "path", attributes: {d: path, stroke: "red", "stroke-width": "2", fill: "transparent"}}));

            let xOfMaxy = maxy[0] * scalex;

            svg.append(SVG.create({type: "line", attributes: {x1: +this.valueAt.value * scalex, y1: 0, x2: +this.valueAt.value * scalex, y2: 1000, stroke: "lightgreen"}}));
            svg.append(SVG.create({type: "line", attributes: {x1: xOfMaxy, y1: 0, x2: xOfMaxy, y2: 1000, stroke: "lightblue"}}));

            if(miny[1] < 0)
            {
                let xOfMinY = miny[0] * scalex;

                svg.append(SVG.create({type: "line", attributes: {x1: xOfMinY, y1: 0, x2: xOfMinY, y2: 1000, stroke: "lightblue"}}));
                svg.append(SVG.create({type: "line", attributes: {x1: 0, y1: -miny[1] * scaley, x2: 1000, y2: -miny[1] * scaley, stroke: "lightgray"}}));

                let coords = `${Math.floor(miny[0] + 0.5)},${Math.floor(miny[1] + 0.5)}`;

                svg.append(SVG.createText({text: coords, attributes: {stroke: "lightblue", fill: "lightblue", style: "font-size: 40", transform: `scale(1, -1) translate(${xOfMinY < 500 ? xOfMinY + 10 : xOfMinY - (20 * coords.length)}, -250) `}}));
            }
            
            let coords = `${Math.floor(maxy[0] + 0.5)},${Math.floor(maxy[1] + 0.5)}`;

            svg.append(SVG.createText({text: coords, attributes: {stroke: "lightblue", fill: "lightblue", style: "font-size: 40", transform: `scale(1, -1) translate(${xOfMaxy < 500 ? xOfMaxy + 10 : xOfMaxy - (20 * coords.length)}, -500) `}}));
        }
 
        return svg;
    }
}