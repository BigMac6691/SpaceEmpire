class DesignEnergyWeapon
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
        this.root.append(UI.createTextNode("h2", "Design Energy Weapons"));

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

        const D = 13;
        const f = ["Name", "Power", "Frequency", "Bore", "Capacitor", "Coupling"];

        f.forEach(i => 
        {
            const n = i === "Name" ? UI.createInput("text")
                                   : UI.createInput("number", {value : 1});

            n.addEventListener("change", evt => this.validate(evt));
            n.addEventListener("change", evt => this.update(evt));

            this.massList.set(n, new DisplayNumber(D));
            this.volumeList.set(n, new DisplayNumber(D));
            this.costList.set(n, new DisplayNumber(D));

            this.fields.push({name:i, input: n});
        });

        this.mass = new DisplayNumber(D);
        this.volume = new DisplayNumber(D);
        this.cost = new DisplayNumber(D);

        header.append(UI.createLabel("Name:", this.fields[0].input));

        this.root.append(header);

        this.grid = document.createElement("div");
        this.grid.classList.add("designGrid");

        this.grid.append(UI.createTextNode("span", " "),
                         UI.createTextNode("span", "Mass (kg)"),
                         UI.createTextNode("span", "Volume (m^3)"),
                         UI.createTextNode("span", "Cost ($)"),
                         UI.createTextNode("span", " "));

        // add input and display fields to screen
        for(let i = 1; i < this.fields.length; i++)
        {
            this.grid.append(UI.createLabel(this.fields[i].name + ":", this.fields[i].input),
                this.massList.get(this.fields[i].input).getNode(),
                this.volumeList.get(this.fields[i].input).getNode(),
                this.costList.get(this.fields[i].input).getNode(), 
                UI.createTextNode("span", I18N.getText("design.weapon.energy." + this.fields[i].name.toLowerCase())));
        }

        this.grid.append(UI.createTextNode("span", "Total:"), 
                         this.mass.getNode(), 
                         this.volume.getNode(),
                         this.cost.getNode(),
                         UI.createTextNode("span", " "));

        this.range = UI.createInput("range", {min : 1, max : 100});
        this.range.addEventListener("input", evt => this.update(evt));

        this.summary = document.createElement("p");
        this.summary.innerHTML = "The range at which emitted power is reduced to <span id='dew.percentage'></span>% is <span id='dew.range'></span>km.  The effective energy at that range is <span id='dew.effective'></span>.  The initial rate of fire is <span id='dew.rate'></span> and the sustained rate is <span id='dew.sustained'></span>.";

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

    load()
    {

    }

    save()
    {

    }
    
    selectionChange(evt)
    {
        this.current = this.designs.find(i => i.id === this.designList.getSelected().value);

        if(this.current == null)
            return;

        this.display(this.current);
    }

    display(design)
    {
        this.fields.forEach(f => f.input.value = design[f.name.toLowerCase()]);

        this.update(null);
    }

    checkForDuplicate(name)
    {
        return this.designs.some(i => i.name === name);
    }

    createDesign(evt)
    {
        if(this.validate(evt))
            return;

        if(this.checkForDuplicate(this.name.value))
        {
            alert("Name already being used.");
            return;
        }

        let design = new EnergyWeapon();
        design.id = "EWD." + this.nextId++;

        this.fields.forEach(f => design[f.name.toLowerCase()] = f.input.value);

        this.designs.push(design);
        this.current =  design;

        this.designList.add({value : design.id, innerHTML : design.name});
    }

    updateDesign(evt)
    {
        if(this.validate(evt) || this.current == null)
            return;

        this.fields.forEach(f => this.current[f.name.toLowerCase()] = f.input.value);

        this.designList.update(this.current.id, this.current.name);
    }

    deleteDesign(evt)
    {
        if(this.current == null)
            return;

        this.current.isObsolete = true;

        const option = this.designList.getSelected();
        
        if(option != null)
            option.classList.add("obsolete");
    }

    validate(evt)
    {
        this.fields.forEach(f =>
        {
            if(f.input.value === "")
                f.input.classList.add("error");
            else if(f.name !== "Name" && f.input.value <= 0)
                f.input.classList.add("error");
            else if(f.name === "Capacitor" && f.input.value < this.fields[1].input.value)
                f.input.classList.add("error");
            else
                f.input.classList.remove("error");
        });

        const n = this.root.querySelectorAll(".error");

        return n.length > 0;
    }

    update(evt)
    {
        console.log(this);
        const rate = this.fields[4].input.value / this.fields[1].input.value;
        const sustained = this.fields[5].input.value / this.fields[1].input.value;

        const THZ = 1000000000000; // 10^12
        const wl = Math.C / (this.fields[2].input.value * THZ);
        const da = wl / (Math.PI * 2 * this.fields[3].input.value);

        const a = this.range.value / 100;
        const b = 2 * a * this.fields[3].input.value;
        const c = (this.fields[3].input.value ** 2) * (a - 1);
        const r = (Math.sqrt(b * b - 4 * a * c) - b) / (2 * a);
        const d = r / Math.sin(da);
        const e = this.fields[1].input.value * a;

        document.getElementById("dew.percentage").textContent = this.range.value;
        document.getElementById("dew.range").textContent = (d / 1000).toLocaleString(undefined, K.NF2);
        document.getElementById("dew.effective").textContent = (+e).toLocaleString(undefined, K.NF2);
        document.getElementById("dew.rate").textContent = (+rate).toLocaleString(undefined, K.NF2);
        document.getElementById("dew.sustained").textContent = (+sustained).toLocaleString(undefined, K.NF2);

        for(let i = 1; i < this.fields.length; i++)
        {
            let input = this.fields[i].input;
            let tc = this.tech.get("emitter." + this.fields[i].name.toLowerCase());

            this.massList.get(input).setValue(tc.mass.getValueAt(input.value));
            this.volumeList.get(input).setValue(tc.volume.getValueAt(input.value));
            this.costList.get(input).setValue(tc.cost.getValueAt(input.value));
        };

        let sumMass = 0;
        this.massList.forEach(v => sumMass += +v.value);
        this.mass.setValue(sumMass);

        let sumVolume = 0;
        this.volumeList.forEach(v => sumVolume += +v.value);
        this.volume.setValue(sumVolume);

        let sumCost = 0;
        this.costList.forEach(v => sumCost += +v.value);
        this.cost.setValue(sumCost);
    }

    toggleObsolete(evt)
    {
        const list = this.designList.getList().querySelectorAll(".obsolete");

        if(this.filterObsolete.checked)
            list.forEach(i => i.style.display = "none");
        else
            list.forEach(i => i.style.display = "block");
    }

    toggleInuse(evt)
    {
        const list = this.designList.getList().querySelectorAll(".used");

        if(this.filterObsolete.checked)
            list.forEach(i => i.style.display = "none");
        else
            list.forEach(i => i.style.display = "block");
    }
}