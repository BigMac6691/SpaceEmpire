class DesignEnergyWeapon
{
    constructor(techBase, root)
    {
        this.nextId = 1;
        this.tech = techBase;

        this.root = root;
        this.current = null;
        this.designs = [];
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

        this.name = UI.createInput("text");
        this.power = UI.createInput("number", {value : 1});
        this.frequency = UI.createInput("number", {value : 1});
        this.bore = UI.createInput("number", {value : 1});
        this.capacitor = UI.createInput("number", {value : 1});
        this.coupling = UI.createInput("number", {value : 1});

        const list = [this.power, this.frequency, this.bore, this.capacitor, this.coupling];

        list.forEach(i => 
        {
            i.addEventListener("change", evt => this.validate(evt));
            i.addEventListener("change", evt => this.update(evt));

            this.massList.set(i, UI.createInput("number", {disabled : true}));
            this.volumeList.set(i, UI.createInput("number", {disabled : true}));
            this.costList.set(i, UI.createInput("number", {disabled : true}));
        });

        this.mass = UI.createInput("number", {disabled : true});
        this.volume = UI.createInput("number", {disabled : true});
        this.cost = UI.createInput("number", {disabled : true});

        header.append(UI.createLabel("Name:", this.name));

        this.root.append(header);

        this.grid = document.createElement("div");
        this.grid.classList.add("designGrid");

        this.grid.append(UI.createTextNode("span", " "),
                         UI.createTextNode("span", "Mass (kg)"),
                         UI.createTextNode("span", "Volume (m^3)"),
                         UI.createTextNode("span", "Cost ($)"),
                         UI.createTextNode("span", " "));
        this.grid.append(UI.createLabel("Power:", this.power),
                         this.massList.get(this.power),
                         this.volumeList.get(this.power),
                         this.costList.get(this.power), 
                         UI.createTextNode("span", I18N.getText("design.weapon.energy.power")));
        this.grid.append(UI.createLabel("Frequency (THz):", this.frequency), 
                         this.massList.get(this.frequency),
                         this.volumeList.get(this.frequency),
                         this.costList.get(this.frequency),
                         UI.createTextNode("span", I18N.getText("design.weapon.energy.frequency")));
        this.grid.append(UI.createLabel("Bore:", this.bore), 
                         this.massList.get(this.bore),
                         this.volumeList.get(this.bore),
                         this.costList.get(this.bore),
                         UI.createTextNode("span", I18N.getText("design.weapon.energy.bore")));
        this.grid.append(UI.createLabel("Capacitor:", this.capacitor), 
                         this.massList.get(this.capacitor),
                         this.volumeList.get(this.capacitor),
                         this.costList.get(this.capacitor),
                         UI.createTextNode("span", I18N.getText("design.weapon.energy.capacitor")));
        this.grid.append(UI.createLabel("Coupling:", this.coupling), 
                         this.massList.get(this.coupling),
                         this.volumeList.get(this.coupling),
                         this.costList.get(this.coupling),
                         UI.createTextNode("span", I18N.getText("design.weapon.energy.coupling")));
        this.grid.append(UI.createTextNode("span", "Total:"), 
                         this.mass, 
                         this.volume,
                         this.cost,
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
        this.name.value = design.name;
        this.power.value = design.power;
        this.frequency.value = design.frequency;
        this.bore.value = design.bore;
        this.capacitor.value = design.capacitor;
        this.coupling.value = design.coupling;

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
        design.name = this.name.value;
        design.power = this.power.value;
        design.frequency = this.frequency.value;
        design.bore = this.bore.value;
        design.capacitor = this.capacitor.value;
        design.coupling = this.coupling.value;
        design.mass = this.mass.value;
        design.volume = this.volume.value;
        design.cost = this.cost.value;

        this.designs.push(design);
        this.current =  design;

        this.designList.add({value : design.id, innerHTML : design.name});
    }

    updateDesign(evt)
    {
        if(this.validate(evt) || this.current == null)
            return;

        this.current.name = this.name.value;
        this.current.power = this.power.value;
        this.current.frequency = this.frequency.value;
        this.current.bore = this.bore.value;
        this.current.capictor = this.capacitor.value;
        this.current.coupling = this.coupling.value;
        this.current.mass = this.mass.value;
        this.current.volume = this.volume.value;
        this.current.cost = this.cost.value;

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
        if(this.name.value == "")
            this.name.classList.add("error");
        else
            this.name.classList.remove("error");

        if(this.power.value == "" || this.power.value <= 0)
            this.power.classList.add("error");
        else
            this.power.classList.remove("error");

        if(this.frequency.value == "" || this.frequency.value <= 0)
            this.frequency.classList.add("error");
        else
            this.frequency.classList.remove("error");

        if(this.bore.value == "" || this.bore.value <= 0)
            this.bore.classList.add("error");
        else
            this.bore.classList.remove("error");

        if(this.capacitor.value == "" || this.capacitor.value < this.power.value)
            this.capacitor.classList.add("error");
        else
            this.capacitor.classList.remove("error");

        if(this.coupling.value == "" || this.coupling.value <= 0)
            this.coupling.classList.add("error");
        else
            this.coupling.classList.remove("error");

        const n = this.root.querySelectorAll(".error");

        return n.length > 0;
    }

    update(evt)
    {
        const rate = this.capacitor.value / this.power.value;
        const sustained = this.coupling.value / this.power.value;

        const THZ = 1000000000000; // 10^12
        const wl = Math.C / (this.frequency.value * THZ);
        const da = wl / (Math.PI * 2 * this.bore.value);

        const a = this.range.value / 100;
        const b = 2 * a * this.bore.value;
        const c = this.bore.value * this.bore.value * (a - 1);
        const r = (Math.sqrt(b * b - 4 * a * c) - b) / (2 * a);
        const d = r / Math.sin(da);
        const e = this.power.value * a;

        document.getElementById("dew.percentage").textContent = this.range.value;
        document.getElementById("dew.range").textContent = Math.ceil(d / 1000).toLocaleString("en-CA");
        document.getElementById("dew.effective").textContent = e.toLocaleString("en-CA");
        document.getElementById("dew.rate").textContent = rate.toLocaleString("en-CA");
        document.getElementById("dew.sustained").textContent = sustained.toLocaleString("en-CA");

        const list = [this.power, this.frequency, this.bore, this.capacitor, this.coupling];
        const techKey = new Map();
        techKey.set(this.power, "emitter.power");
        techKey.set(this.frequency, "emitter.frequency");
        techKey.set(this.bore, "emitter.bore");
        techKey.set(this.capacitor, "emitter.capacitor");
        techKey.set(this.coupling, "emitter.coupling");

        list.forEach(i => 
        {
            let t = techKey.get(i);

            if(t !== undefined)
            {
                let tc = this.tech.get(t);

                this.massList.get(i).value = tc.mass.getValueAt(i.value).toFixed(2);
                this.volumeList.get(i).value = tc.volume.getValueAt(i.value).toFixed(2);
                this.costList.get(i).value = tc.cost.getValueAt(i.value).toFixed(2);
            }
        });

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