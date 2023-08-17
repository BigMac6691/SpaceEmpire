class DesignUI
{
    constructor(root)
    {
        this.root = root;

        this.fields = [];

        this.massList = new Map();
        this.volumeList = new Map();
        this.costList = new Map();
    }

    init(title, labels, idRoot)
    {
        const header = UI.create("div");
        header.classList.add("header");
        this.root.append(UI.createTextNode("h2", title));

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

        // create input and display fields
        labels.forEach(i =>
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
                UI.createTextNode("span", I18N.getText(idRoot + this.fields[i].name.toLowerCase())));
        }

        this.grid.append(UI.createTextNode("span", "Total:"), 
                         this.mass.getNode(), 
                         this.volume.getNode(),
                         this.cost.getNode(),
                         UI.createTextNode("span", " "));

        this.summary = document.createElement("p");

        this.createButton = UI.createTextNode("button", "Create");
        this.createButton.addEventListener("click", evt => this.createDesign(evt));

        this.updateButton = UI.createTextNode("button", "Update");
        this.updateButton.addEventListener("click", evt => this.updateDesign(evt));

        this.deleteButton = UI.createTextNode("button", "Delete");
        this.deleteButton.addEventListener("click", evt => this.deleteDesign(evt));

        this.footer = document.createElement("div");
        this.footer.classList.add("designFooter");
        this.footer.append(this.summary,
                        this.createButton,
                        this.updateButton,
                        this.deleteButton);

        this.root.append(this.grid, this.footer);
    }

    // MVC means Mass Volume Cost
    updateMVC()
    {
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

        if(this.filterInuse.checked)
            list.forEach(i => i.style.display = "none");
        else
            list.forEach(i => i.style.display = "block");
    }
}