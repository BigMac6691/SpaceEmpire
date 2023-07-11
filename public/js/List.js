class List
{
    constructor(root)
    {
        this.root = root;

        this.init()
    }

    init()
    {
        this.list = UI.create("select", {size : 5});

        this.root.append(this.list);
    }

    add(item)
    {

    }

    remove(item)
    {

    }

    getSelected()
    {

    }
}