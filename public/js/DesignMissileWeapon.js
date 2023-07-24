class DesignMissileWeapon
{
    constructor(techBase, root)
    {
        this.nextId = 1;
        this.tech = techBase;

        this.root = root;
        this.current = null;
        this.designs = [];
        this.fields = [];
        this.massList = new Map();
        this.volumeList = new Map();
        this.costList = new Map();

        this.init();
        this.update();
    }

    init()
    {
        const header = UI.create("div");
        header.classList.add("header");
        this.root.append(UI.createTextNode("h2", "Design Missile Weapons"));

        const filters = document.createElement("div");
        
        this.filterObsolete = UI.createInput("checkbox");
        this.filterObsolete.addEventListener("change", evt => this.toggleObsolete(evt));
        this.filterInuse = UI.createInput("checkbox");
        this.filterInuse.addEventListener("change", evt => this.toggleInuse(evt));

        filters.append(UI.createLabel("Hide obsolete ", this.filterObsolete),
                       UI.createLabel(" Hide in use ", this.filterInuse));

        header.append(filters);

        this.designList = new List(header);
        this.designList.getList().addEventListener("change", evt => this.selectionChange(evt));

        const f = ["Name", "Armour", "Drive", "Fuel", "Warheads", "Decoys", "Power", "Computer", "Scanner", "Jammer", "Comms"];

        f.forEach(i =>
        {
            const n = i === "Name" ? UI.createInput("text")
                                   : UI.createInput("number", {value : 1});
            
            n.addEventListener("change", evt => this.validate(evt));
            n.addEventListener("change", evt => this.update(evt));

            this.massList.set(n, UI.createInput("number", {disabled : true}));
            this.volumeList.set(n, UI.createInput("number", {disabled : true}));
            this.costList.set(n, UI.createInput("number", {disabled : true}));

            this.fields.push({name:i, input: n});
        });

        this.mass = UI.createInput("number", {disabled : true});
        this.volume = UI.createInput("number", {disabled : true});
        this.cost = UI.createInput("number", {disabled : true});

        header.append(UI.createLabel("Name:", this.fields[0].input));

        this.root.append(header);

        this.grid = document.createElement("div");
        this.grid.classList.add("designGrid");

        this.grid.append(UI.createTextNode("span", " "),
                         UI.createTextNode("span", "Mass (kg)"),
                         UI.createTextNode("span", "Volume (m^3)"),
                         UI.createTextNode("span", "Cost ($)"),
                         UI.createTextNode("span", " "));
        
        for(let i = 1; i < this.fields.length; i++)
        {
            this.grid.append(UI.createLabel(this.fields[i].name + ":", this.fields[i].input),
                this.massList.get(this.fields[i].input),
                this.volumeList.get(this.fields[i].input),
                this.costList.get(this.fields[i].input), 
                UI.createTextNode("span", I18N.getText("design.weapon.missile." + this.fields[i].name.toLowerCase())));
        }

        this.grid.append(UI.createTextNode("span", "Total:"), 
                         this.mass, 
                         this.volume,
                         this.cost,
                         UI.createTextNode("span", " "));

        this.range = UI.createInput("range", {min : 1, max : 100});
        this.range.addEventListener("input", evt => this.update(evt));

        this.summary = document.createElement("p");
        this.summary.innerHTML = "";

        this.createButton = UI.createTextNode("button", "Create");
        this.createButton.addEventListener("click", evt => this.createDesign(evt));

        this.updateButton = UI.createTextNode("button", "Update");
        this.updateButton.addEventListener("click", evt => this.updateDesign(evt));

        this.deleteButton = UI.createTextNode("button", "Delete");
        this.deleteButton.addEventListener("click", evt => this.deleteDesign(evt));

        this.footer = document.createElement("div");
        this.footer.classList.add("designFooter");
        this.footer.append(UI.createLabel("Power density:", this.range),
                        this.summary,
                        this.createButton,
                        this.updateButton,
                        this.deleteButton);

        this.root.append(this.grid, this.footer);
    }

    update()
    {
        for(let i = 1; i < this.fields.length; i++)
        {
            let input = this.fields[i].input;
            let tc = this.tech.get("missile." + this.fields[i].name.toLowerCase());

            this.massList.get(input).value = tc.mass.getValueAt(input.value).toFixed(2);
            this.volumeList.get(input).value = tc.volume.getValueAt(input.value).toFixed(2);
            this.costList.get(input).value = tc.cost.getValueAt(input.value).toFixed(2);
        };

        let sumMass = 0;
        this.massList.forEach(v => sumMass += +v.value);
        this.mass.value = sumMass.toFixed(2);

        let sumVolume = 0;
        this.volumeList.forEach(v => sumVolume += +v.value);
        this.volume.value = sumVolume.toFixed(2);

        let sumCost = 0;
        this.costList.forEach(v => sumCost += +v.value);
        this.cost.value = sumCost.toFixed(2);
    }
}