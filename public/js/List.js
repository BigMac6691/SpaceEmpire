class List
{
    constructor(rows)
    {
        this.init(rows ?? 1);
    }

    init(rows)
    {
        this.list = UI.create("select", {size : rows});
    }

    setRoot(root)
    {
        this.root = root;

        this.root.append(this.list);

        return this;
    }

    add(opts)
    {
        this.list.append(UI.create("option", opts));
    }

    update(value, text)
    {
        for(let i = 0; i < this.list.options.length; i++)
            if(this.list.options[i].value == value)
            {
                this.list.options[i].innerHTML = text;

                return;
            }
    }

    clear()
    {
        while(this.list.options.length)
            this.list.remove(0);
    }

    remove(value)
    {
        for(let i = 0; i < this.list.options.length; i++)
            if(this.list.options[i].value = value)
            {
                this.list.remove(i);

                return;
            }
    }

    getSelected()
    {
        if(this.list.selectedIndex < 0)
            return null;
        else
            return this.list.options[this.list.selectedIndex];
    }

    getOptions()
    {
        return this.list.options;
    }

    getList()
    {
        return this.list;
    }

    findOption(value)
    {
        for(let i = 0; i < this.list.options.length; i++)
            if(this.list.options[i].value = value)
                return this.list.options[i];

        return null;
    }

    count()
    {
        return this.list.options.length;
    }
}