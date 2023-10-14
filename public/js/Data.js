/*
so do I add things like armour and drive where you can define instances of them?
	problem with that is things like drive you want to taylor to the specific need - especially missles
		so what if for things like drives you define a type but not a capacity?
		
so then category is drive and you define techs for drives
you then also have a technology called drive where you can select a type of drive defined by user???
	this doesn't seem to fit the pattern well - the tech list will now have design like things mixed in
	
what categories are there then?
	missiles
	beam
	ship
	??? everything else seems to be simple value based attributes not composed of parts
	
Ok then so how do we do drives?  Consider that you have different types of drives like so:
	chemical
	fission
	fusion
	etc.
	
	So would there be a separate entry for each kind of drive?
		That means the 9 attributes for missiles would easily become like 14... is that bad?
		
	Or we just say screw it for first relase there is just FTL and sublight and that's it! :)

ONE VERY BIG THING - STOP TRYING TO MAKE THIS REAL!  IT IS A GAME MAKE SHIT UP!
*/
const COMPONENTS = 
[
	{
		id: "missiles",
		title: "Missiles",
		tech: ["armour", "drive", "warheads", "decoys", "warhead.power", "computer", "scanner", "jammer", "comms"]
	},
	{
		id: "energy",
		title: "Energy",
		tech: ["emitter.power", "frequency", "bore", "capacitor", "coupling"]
	}
];

const CORE = ["mass", "volume", "cost", "area"];

const TECH =
[
	// Beam weapon tech
	{
		id: "emitter.power",
		title: "Beam Power",
        specs:
        [
		    {id: "mass", type: "curve", data: [[0,1],[100,10],[500,125],[1000,60]]},
			// {id: "mass", type: "curve", data: [[0,1],[100,10],[500,625],[1000,60]]},
		    {id: "volume", type: "curve", data: [[0,1],[100,5]]},
		    {id: "cost", type: "curve", data: [[0,1],[100,20],[500,50],[1000,200]]}
        ]
    },
	{
		id: "frequency",
		title: "Frequency",
        specs:
        [
		    {id: "mass", type: "curve", data: [[0,1],[100,10],[500,60],[1000,125]]},
		    {id: "volume", type: "curve", data: [[0,1],[100,5]]},
		    {id: "cost", type: "curve", data: [[0,1],[100,20],[500,50],[1000,200]]}
        ]
	},
	{
		id: "bore",
		title: "Bore",
        specs:
        [
		    {id: "mass", type: "curve", data: [[0,1],[100,10],[500,60],[1000,125]]},
		    {id: "volume", type: "curve", data: [[0,1],[100,5]]},
		    {id: "cost", type: "curve", data: [[0,1],[100,20],[500,50],[1000,200]]},
		    {id: "area", type: "curve", data: [[0,1],[100,5]]}
        ]
	},
	{
		id: "capacitor",
		title: "Capacitor",
        specs:
        [
		    {id: "mass", type: "curve", data: [[0,1],[100,10],[500,60],[1000,125]]},
		    {id: "volume", type: "curve", data: [[0,1],[100,5]]},
		    {id: "cost", type: "curve", data: [[0,1],[100,20],[500,50],[1000,200]]}
        ]
	},
	{
		id: "coupling",
		title: "Coupling",
        specs:
        [
		    {id: "mass", type: "curve", data: [[0,1],[100,10],[500,60],[1000,125]]},
		    {id: "volume", type: "curve", data: [[0,1],[100,5]]},
		    {id: "cost", type: "curve", data: [[0,1],[100,20],[500,50],[1000,200]]}
        ]
	},
	// missile weapon tech
	{
		id: "armour",
		title: "Armour",
        specs:
        [
		    {id: "mass", type: "curve", data: [[0,1],[100,10],[500,60],[1000,125]]},
		    {id: "volume", type: "curve", data: [[0,1],[100,5]]},
		    {id: "cost", type: "curve", data: [[0,1],[100,20],[500,50],[1000,200]]}
        ]
	},
	{
		id: "drive",
		title: "Drive",
        specs:
        [
		    {id: "mass", type: "curve", data: [[0,1],[100,10],[500,60],[1000,125]]},
		    {id: "volume", type: "curve", data: [[0,1],[100,5]]},
		    {id: "cost", type: "curve", data: [[0,1],[100,20],[500,50],[1000,200]]},
		    {id: "area", type: "curve", data: [[0,1],[100,5]]}
        ]
	},
	{
		id: "warheads",
		title: "Warheads",
        specs:
        [
		    {id: "mass", type: "curve", data: [[0,1],[100,10],[500,60],[1000,125]]},
		    {id: "volume", type: "curve", data: [[0,1],[100,5]]},
		    {id: "cost", type: "curve", data: [[0,1],[100,20],[500,50],[1000,200]]},
		    {id: "area", type: "curve", data: [[0,1],[100,5]]}
        ]
	},
	{
		id: "decoys",
		title: "Decoys",
        specs:
        [
		    {id: "mass", type: "curve", data: [[0,1],[100,10],[500,60],[1000,125]]},
		    {id: "volume", type: "curve", data: [[0,1],[100,5]]},
		    {id: "cost", type: "curve", data: [[0,1],[100,20],[500,50],[1000,200]]},
		    {id: "area", type: "curve", data: [[0,1],[100,5]]}
        ]
	},
	{
		id: "warhead.power",
		title: "Warhead Power",
        specs:
        [
		    {id: "mass", type: "curve", data: [[0,1],[100,10],[500,60],[1000,125]]},
		    {id: "volume", type: "curve", data: [[0,1],[100,5]]},
		    {id: "cost", type: "curve", data: [[0,1],[100,20],[500,50],[1000,200]]},
		    {id: "area", type: "curve", data: [[0,1],[100,5]]}
        ]
	},
	{
		id: "computer",
		title: "Computer",
        specs:
        [
		    {id: "mass", type: "curve", data: [[0,1],[100,10],[500,60],[1000,125]]},
		    {id: "volume", type: "curve", data: [[0,1],[100,5]]},
		    {id: "cost", type: "curve", data: [[0,1],[100,20],[500,50],[1000,200]]}
        ]
	},
	{
		id: "scanner",
		title: "Scanner",
        specs:
        [
		    {id: "mass", type: "curve", data: [[0,1],[100,10],[500,60],[1000,125]]},
		    {id: "volume", type: "curve", data: [[0,1],[100,5]]},
		    {id: "cost", type: "curve", data: [[0,1],[100,20],[500,50],[1000,200]]},
		    {id: "area", type: "curve", data: [[0,1],[100,5]]}
        ]
	},
	{
		id: "jammer",
		title: "Jammer",
        specs:
        [
		    {id: "mass", type: "curve", data: [[0,1],[100,10],[500,60],[1000,125]]},
		    {id: "volume", type: "curve", data: [[0,1],[100,5]]},
		    {id: "cost", type: "curve", data: [[0,1],[100,20],[500,50],[1000,200]]},
		    {id: "area", type: "curve", data: [[0,1],[100,5]]}
        ]
	},
	{
		id: "comms",
		title: "Comms",
        specs:
        [
		    {id: "mass", type: "curve", data: [[0,1],[100,10],[500,60],[1000,125]]},
		    {id: "volume", type: "curve", data: [[0,1],[100,5]]},
		    {id: "cost", type: "curve", data: [[0,1],[100,20],[500,50],[1000,200]]},
		    {id: "area", type: "curve", data: [[0,1],[100,5]]}
        ]
	}
]

const TEXT =
[
    // core
    {
		id: "mass",
		text: "Mass",
    },
    {
		id: "volume",
		text: "Volume",
    },
    {
		id: "cost",
		text: "Cost",
    },
    {
		id: "area",
		text: "Area",
    },
    // beam weapon tech
	{
		id: "emitter.power",
		text: "The amount of raw energy being emitted by the beam weapon.",
    },
	{
		id: "frequency",
		text: "The frequency of the energy being emitted.  Higher frequencies have longer effective ranges.",
	},
	{
		id: "bore",
		text: "The diameter of the beam. Used with the wavelength to determine beam divergence angle: θ = λ/(πω) where ω is the beam width.",
	},
	{
		id: "capacitor",
		text: "Capacitor",
	},
	{
		id: "coupling",
		text: "Coupling",
	},
	// missile weapon tech
	{
		id: "armour",
		text: "Armour",
	},
	{
		id: "drive",
		text: "Drive",
	},
	{
		id: "warheads",
		text: "Warheads",
	},
	{
		id: "decoys",
		text: "Decoys",
	},
	{
		id: "warhead.power",
		text: "Warhead Power",
	},
	{
		id: "computer",
		text: "Computer",
	},
	{
		id: "scanner",
		text: "Scanner",
	},
	{
		id: "jammer",
		text: "Jammer",
	},
	{
		id: "comms",
		text: "Comms",
	}
];