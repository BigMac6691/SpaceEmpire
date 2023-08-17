class DesignMissileWeapon extends DesignUI
{
    constructor(techBase, root)
    {
        super(root);

        this.tech = techBase;

        this.current = null;
        this.designs = [];
        
        this.init();
        this.update();
    }

    init()
    {
        const f = ["Name", "Armour", "Drive", "Fuel", "Warheads", "Decoys", "Power", "Computer", "Scanner", "Jammer", "Comms"];

        super.init("Design Missile Weapons", f, "design.weapon.missile.");

        this.range = UI.createInput("range", {min : 1, max : 10000, value : 5000});
        this.range.addEventListener("input", evt => this.update(evt));

        this.summary.innerHTML = "<p>This missile can accelerate at <span id='dmw.accel'></span> for <span id='dmw.t'></span> seconds reaching a terminal velocity of <span id='dmw.vf'></span> after travelling <span id='dmw.range'></span>.  At that point it can no longer maneuver and has no chance to hit.</p><p>Maximum range object with RCS of <span id='dmw.rcs'></span>m<sup>2</sup> can be detected is <span id='dmw.scan'></span>km.</p>";

        this.footer.insertBefore(UI.createLabel("Effective RCS:", this.range), this.summary);
    }

    validate()
    {
        console.log("Design Missile Weapon validate() called...");
    }

    update()
    {
        const DRIVE = 2, FUEL = 3, SCANNER = 8, WARHEADS = 4, POWER = 6;
        const WHC = this.fields[WARHEADS].input.value;

        for(let i = 1; i < this.fields.length; i++)
        {
            let input = this.fields[i].input;
            let tc = this.tech.get("missile." + this.fields[i].name.toLowerCase());
            let whc = i == POWER ? WHC : 1;

            this.massList.get(input).setValue(whc * tc.mass.getValueAt(input.value));
            this.volumeList.get(input).setValue(whc * tc.volume.getValueAt(input.value));
            this.costList.get(input).setValue(whc * tc.cost.getValueAt(input.value));
        };

        this.updateMVC();

        const a = 1000 * this.fields[DRIVE].input.value / sumMass;
        const t = this.fields[FUEL].input.value / this.fields[DRIVE].input.value;

        const dr = (a * t ** 2) / 2;
        const vf = a * t;
        const sbw = 2 * Math.PI * Math.sin(K.degToRad(UK.get("scanner.angle"))) ** 2; 
        const sr = Math.pow(((1000 * this.fields[SCANNER].input.value) ** 2 * this.range.value) / sbw, 0.25);

        document.getElementById("dmw.accel").textContent = (+a).toLocaleString(undefined, K.NF2);
        document.getElementById("dmw.range").textContent = (+dr).toLocaleString(undefined, K.NF2);
        document.getElementById("dmw.vf").textContent = (+vf).toLocaleString(undefined, K.NF2);
        document.getElementById("dmw.t").textContent = (+t).toLocaleString(undefined, K.NF2);
        document.getElementById("dmw.rcs").textContent = (+this.range.value).toLocaleString(undefined, K.NF0);
        document.getElementById("dmw.scan").textContent = (+sr).toLocaleString(undefined, K.NF2);
    }
}