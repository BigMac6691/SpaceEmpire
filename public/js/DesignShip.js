class DesignShip extends DesignUI
{
    constructor(root)
    {
        super(root);

        this.player = null;

        this.init();
    }

    init()
    {
        const f = ["Name", "Armour", "Drive", "Fuel", "Cargo", "Computer", "Scanner", "Jammer", "Comms", "Crew"];

        super.init("Design Ship", f, "design.ship.");
    }

    initHeader(title)
    {
        this.root.append(UI.createTextNode("h2", title));

        const header = UI.create("div", {}, ["shipheader"]);
        const filters = document.createElement("div");
        
        this.filterObsolete = UI.createInput("checkbox");
        this.filterObsolete.addEventListener("change", evt => this.toggleObsolete(evt));
        this.filterInuse = UI.createInput("checkbox");
        this.filterInuse.addEventListener("change", evt => this.toggleInuse(evt));

        filters.append(UI.createLabel("Hide obsolete ", this.filterObsolete),
                       UI.createLabel(" Hide in use ", this.filterInuse));

        header.append(filters);

        this.weaponTypes = new List().setRoot(header);
        this.weaponTypes.add({value : "ewd", innerHTML : "Energy Weapon Designs"});
        this.weaponTypes.add({value : "mwd", innerHTML : "Missile Weapon Designs"});
        this.weaponTypes.getList().addEventListener("change", evt => this.weaponChange(evt));

        this.designList = new List(5).setRoot(header);
        this.designList.getList().addEventListener("change", evt => this.selectionChange(evt));

        this.weaponDesigns = new List(5).setRoot(header);

        header.append(UI.createLabel("Name:", this.fields[0].input));

        this.addWeaponButton = UI.create("button", {textContent : "Add"});
        this.addWeaponButton.addEventListener("click", evt => this.addWeapon(evt));
        header.append(this.addWeaponButton);

        this.root.append(header);
    }

    setPlayer(p)
    {
        this.player = p;
        this.tech = p.technology;

        this.weaponChange(null);

        this.update(null);
    }

    weaponChange(evt)
    {
        if(this.weaponTypes.getSelected().value == "ewd")
            this.setWeaponDesigns(this.player.energyWeaponDesigns);
        else
            this.setWeaponDesigns(this.player.missileWeaponDesigns);
    }

    addWeapon(evt)
    {
        console.log("Add Weapon button pressed...");
    }

    setWeaponDesigns(designs)
    {
        this.weaponDesigns.clear();

        // this.designs = designs;

        designs.forEach(d => this.weaponDesigns.add({value : d.id, innerHTML : d.name}));
    }

    validate()
    {
        console.log("ship validate() called...");
    }

    update()
    {
        console.log("ship update() called...");
    }

        // So I will need additional lists:
        //  List of ship designs (by class maybe?)
        //  Lists of each weapon available (or any other component design)
        //      Maybe just one list conrolled with a dropdown
        //  List of each weapon/component added
        //  Below all the lists is a bunch of the common stuff
}