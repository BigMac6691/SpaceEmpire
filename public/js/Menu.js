class Menu
{
    constructor(root)
    {
        this.root = root;

        this.items = new Map();
        this.links = new Map();
    }

    addItem(name, content)
    {
        this.items.set(name, content);

        const link = UI.create("a", {href:"#" + name, innerHTML:name});
        link.addEventListener("click", evt => this.handleClick(evt));

        this.links.set(name, link);
        this.root.append(link);
    }

    handleClick(evt)
    {
        let active = this.root.querySelector(".active");

        if(active != null)
        {
            active.classList.remove("active");
            this.items.get(active.innerHTML).style.display = "none";
        }

        evt.target.classList.add("active");
        this.items.get(evt.target.innerHTML).style.display = "block";
    }
}