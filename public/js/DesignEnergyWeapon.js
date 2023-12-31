class DesignEnergyWeapon extends DesignUI
{
    constructor(root)
    {
        super(root);        

        this.init();
    }

    init()
    {
        const f = ["Name", "Power", "Frequency", "Bore", "Capacitor", "Coupling"];

        super.init("Design Energy Weapons", f, "design.weapon.energy.");

        this.range = UI.createInput("range", {min : 1, max : 100});
        this.range.addEventListener("input", evt => this.update(evt));

        this.summary.innerHTML = "The range at which emitted power is reduced to <span id='dew.percentage'></span>% is <span id='dew.range'></span>km.  The effective energy at that range is <span id='dew.effective'></span>.  The initial rate of fire is <span id='dew.rate'></span> and the sustained rate is <span id='dew.sustained'></span>.";

        this.footer.insertBefore(UI.createLabel("Power density:", this.range), this.summary);
    }  

    setPlayer(p)
    {
        this.tech = p.technology;

        this.setDesigns(p.energyWeaponDesigns);

        this.update(null);
    }

    makeDesignInstance()
    {
        let design = new EnergyWeapon();
        design.id = "EWD." + IDGen.nextId("energy.weapon.design");

        return design;
    }

    validate(evt)
    {
        this.fields.forEach(f =>
        {
            if(f.input.value === "")
                f.input.classList.add("error");
            else if(f.name !== "Name" && f.input.value <= 0)
                f.input.classList.add("error");
            else if(f.name === "Capacitor" && +f.input.value < +this.fields[1].input.value)
                f.input.classList.add("error");
            else
                f.input.classList.remove("error");
        });

        const n = this.root.querySelectorAll(".error");

        return n.length > 0;
    }

    update(evt)
    {
        for(let i = 1; i < this.fields.length; i++)
        {
            let input = this.fields[i].input;
            let tc = this.tech.get("emitter." + this.fields[i].name.toLowerCase());

            this.massList.get(input).setValue(tc.mass.getValueAt(input.value));
            this.volumeList.get(input).setValue(tc.volume.getValueAt(input.value));
            this.costList.get(input).setValue(tc.cost.getValueAt(input.value));
        };

        this.updateMVC();

        const rate = this.fields[4].input.value / this.fields[1].input.value;
        const sustained = this.fields[5].input.value / this.fields[1].input.value;

        const THZ = 1000000000000; // 10^12
        const wl = Math.C / (this.fields[2].input.value * THZ);
        const da = wl / (Math.PI * 2 * this.fields[3].input.value);

        const a = this.range.value / 100;
        const b = 2 * a * this.fields[3].input.value;
        const c = (this.fields[3].input.value ** 2) * (a - 1);
        const r = (Math.sqrt(b * b - 4 * a * c) - b) / (2 * a); // quadratic
        const d = r / Math.sin(da);
        const e = this.fields[1].input.value * a;

        document.getElementById("dew.percentage").textContent = this.range.value;
        document.getElementById("dew.range").textContent = (d / 1000).toLocaleString(undefined, K.NF2);
        document.getElementById("dew.effective").textContent = (+e).toLocaleString(undefined, K.NF2);
        document.getElementById("dew.rate").textContent = (+rate).toLocaleString(undefined, K.NF2);
        document.getElementById("dew.sustained").textContent = (+sustained).toLocaleString(undefined, K.NF2);
    }
}