class DesignEnergyWeapon
{
    constructor(techBase, root)
    {
        this.techBase = techBase;

        this.root = root;

        this.init();
    }

    init()
    {
        this.root.append(UI.createTextNode("h2", "Design Energy Weapons"));

        this.name = UI.createInput("text");
        this.power = UI.createInput("number");
        this.frequency = UI.createInput("number");
        this.bore = UI.createInput("number");
        this.capacitor = UI.createInput("number");
        this.coupling = UI.createInput("number");
        this.mass = UI.createInput("number", {disabled : true});
        this.volume = UI.createInput("number", {disabled : true});
        this.cost = UI.createInput("number", {disabled : true});

        this.grid = document.createElement("div");
        this.grid.classList.add("designGrid");

        this.grid.append(UI.createLabel("Name:", this.name), UI.createTextNode("span", I18N.getText("design.name")));
        this.grid.append(UI.createLabel("Power:", this.power), UI.createTextNode("span", I18N.getText("design.weapon.energy.power")));
        this.grid.append(UI.createLabel("Frequency:", this.frequency), UI.createTextNode("span", I18N.getText("design.weapon.energy.frequency")));
        this.grid.append(UI.createLabel("Bore:", this.bore), UI.createTextNode("span", I18N.getText("design.weapon.energy.bore")));
        this.grid.append(UI.createLabel("Capacitor:", this.capacitor), UI.createTextNode("span", I18N.getText("design.weapon.energy.capacitor")));
        this.grid.append(UI.createLabel("Coupling:", this.coupling), UI.createTextNode("span", I18N.getText("design.weapon.energy.coupling")));

        // These are calculated and not editable
        this.grid.append(UI.createLabel("Mass:", this.mass), UI.createTextNode("span", I18N.getText("design.mass")));
        this.grid.append(UI.createLabel("Volume:", this.volume), UI.createTextNode("span", I18N.getText("design.volume")));
        this.grid.append(UI.createLabel("Cost:", this.cost), UI.createTextNode("span", I18N.getText("design.cost")));

        this.save = UI.createTextNode("button", "Save");
        this.save.addEventListener("click", evt => this.validate(evt));
        this.root.append(this.grid, this.save);
    }   

    // show mass, volume and cost as columns?
    // show optimal value when known

    validate()
    {
        console.log("validating...");

        if(this.name.value == "")
            this.name.classList.add("error");
        else
            this.name.classList.remove("error");
    }
}