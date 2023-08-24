class Tree
{
	// consider adding sorting, maybe as an option
	constructor(root)
	{
		this.root = root;
			
		if(root == null)
			this.root = document.createElement("ul");
					
		if(!this.root.classList.contains("tree"))
			this.root.classList.add("tree");
			
		this.root.tabIndex = "-1";
		
		this.initListeners();
	}
	
	initListeners()
	{
		this.root.addEventListener("click", evt => this.mouseHandler(evt));
		this.root.addEventListener("keydown", evt => this.keyHandler(evt));
	}
	
	toggleCollapse(evt)
	{
		let node = evt.target.nextElementSibling;

		if(node == null || node.nodeName != "UL")
			return;
	
		if(node.classList.contains("open")) 
		{
			node.classList.remove('open');
       
			let opensubs = node.querySelectorAll(':scope .open');
       
			for(let i = 0; i < opensubs.length; i++) 
				opensubs[i].classList.remove('open'); 
		} 
		else 
			node.classList.add('open'); 
	}
	
	mouseHandler(evt)
	{
		this.toggleCollapse(evt);
	
		let node = this.getSelected();

		if(node != null)
			node.classList.remove("selectedNode");
	
		evt.target.classList.add("selectedNode");
		
		this.root.dispatchEvent(new Event("selected"));
	}
	
	keyHandler(evt)
	{
		let node = this.getSelected();
	
		if(!node)
			return;
	
		let found = -1, nextNode = null;
		let list = this.root.querySelectorAll(":scope li");
	
		for(let i = 0; i < list.length && found < 0; i++)
			if(list[i] == node)
				found = i;

		switch (evt.key) 
		{
			case "Down": // IE/Edge specific value
			case "ArrowDown":
				for(let i = found + 1; i < list.length && nextNode == null; i++)
					if(list[i].offsetParent != null)
						nextNode = list[i];
			break;
		
			case "Up": // IE/Edge specific value
			case "ArrowUp":
				for(let i = found - 1; i >= 0 && nextNode == null; i--)
					if(list[i].offsetParent != null)
						nextNode = list[i];
			break;

			default:
				return; // Quit when this doesn't handle the key event.
		}

		if(nextNode != null)
		{
			node.classList.remove("selectedNode");
			nextNode.classList.add("selectedNode");
	
			this.root.dispatchEvent(new Event("selected"));
		}
	}
	
	getRoot()
	{
		return this.root;
	}
			
	getSelected()
	{
		return this.root.querySelector(":scope .selectedNode");
	}
	
	addNode(name)
	{
		let atNode = this.getSelected();
		let node = document.createElement("li");
		node.textContent = name;
	
		if(atNode == null)
			this.root.appendChild(node);
		else if(atNode.nextElementSibling.nodeName == "UL")
		{
			atNode.nextElementSibling.appendChild(node);
			
			if(!atNode.nextElementSibling.classList.contains("open"))
				atNode.nextElementSibling.classList.add("open");
		}
		else
			atNode.after(node);
	
		return node;
	}
	
	addBranch(name)
	{
		let node = this.addNode(name);

		node.after(document.createElement("ul"));

		return node;
	}
}