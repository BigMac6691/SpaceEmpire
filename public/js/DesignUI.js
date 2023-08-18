class DesignUI
{
    constructor(root)
    {
        this.root = root;

        this.current = null;
        this.tech = null;

        this.fields = [];
        this.designs = [];

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
        this.sumMass = 0; 
        this.massList.forEach(v => this.sumMass += +v.value);
        this.mass.setValue(this.sumMass);

        this.sumVolume = 0;
        this.volumeList.forEach(v => this.sumVolume += +v.value);
        this.volume.setValue(this.sumVolume);

        this.sumCost = 0;
        this.costList.forEach(v => this.sumCost += +v.value);
        this.cost.setValue(this.sumCost);
    }

    getDesigns()
    {
        return this.designs;
    }

    setDesigns(designs)
    {
        this.designList.clear();

        this.designs = designs;

        this.designs.forEach(d => this.designList.add({value : d.id, innerHTML : d.name}));
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
        return this.designs.some(d => d.name === name);
    }

    createDesign(evt)
    {
        if(this.validate(evt))
            return;

        if(this.checkForDuplicate(this.fields[0].input.value))
        {
            alert("Name already being used.");
            return;
        }

        let design = this.makeDesignInstance();

        this.fields.forEach(f => design[f.name.toLowerCase()] = f.input.value);

        this.designs.push(design);
        this.current =  design;

        this.designList.add({value : design.id, innerHTML : design.name});
    }

    updateDesign(evt)
    {
        if(this.validate(evt) || this.current == null)
        {
            alert("Error cannot update.")

            return;
        }

        if(this.current.name != this.fields[0].input.value)
        {
            if(this.checkForDuplicate(this.fields[0].input.value))
            {
                alert("Name already being used.");
                return;
            }    
        }

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