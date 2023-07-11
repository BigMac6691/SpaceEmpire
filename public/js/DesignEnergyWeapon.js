class DesignEnergyWeapon
{
    constructor(techBase, root)
    {
        this.tech = techBase;

        this.root = root;
        this.massList = new Map();
        this.volumeList = new Map();
        this.costList = new Map();

        this.init();
        this.update();
    }

    // add a list

    init()
    {
        this.root.append(UI.createTextNode("h2", "Design Energy Weapons"));

        this.designs = new List(this.root);

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

        this.root.append(UI.createLabel("Name:", this.name));

        this.grid = document.createElement("div");
        this.grid.classList.add("designGrid");

        this.grid.append(UI.createTextNode("span", " "),
                         UI.createTextNode("span", "Mass"),
                         UI.createTextNode("span", "Volume"),
                         UI.createTextNode("span", "Cost"),
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

        this.save = UI.createTextNode("button", "Save");
        this.save.addEventListener("click", evt => this.validate(evt));

        this.footer = document.createElement("div");
        this.footer.classList.add("designFooter");
        this.footer.append(UI.createLabel("Power density:", this.range),
                        this.summary,
                        this.save);

        this.root.append(this.grid, this.footer);
    }   

    validate(evt)
    {
        console.log("validating...");

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

        console.log("validate resulted in " + n.length);

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
}