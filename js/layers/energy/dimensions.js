energy.dimensions = new Dimensions({
    dimensions:[
        new Dimension({
            pos:1,
            cost: new Decimal(1),
            scaling: new Decimal(25),
            type: "energy",
            cpath: [()=>player.energy,"points"],
            multi: ()=>energy.boost.getBoost(1).times(energy.tickspeed.getBoost()),
            ppath: [()=>player.energy,"points"]
        }),
        new Dimension({
            pos:2,
            cost: new Decimal(100),
            scaling: new Decimal(50),
            type: "energy",
            cpath: [()=>player.energy,"points"],
            multi: ()=>energy.boost.getBoost(2).times(energy.tickspeed.getBoost()).div(10),
            ppath: [()=>player.energy.dimensions[0],"amount"],
            unlocked: ()=>player.energy.boost.gte(1)
        }),
        new Dimension({
            pos:3,
            cost: new Decimal(2500),
            scaling: new Decimal(100),
            type: "energy",
            cpath: [()=>player.energy,"points"],
            multi: ()=>energy.boost.getBoost(3).times(energy.tickspeed.getBoost()).div(100),
            ppath: [()=>player.energy.dimensions[1],"amount"],
            unlocked: ()=>player.energy.boost.gte(2)
        }),
        new Dimension({
            pos:4,
            cost: new Decimal(25000),
            scaling: new Decimal(250),
            type: "energy",
            cpath: [()=>player.energy,"points"],
            multi: ()=>energy.boost.getBoost(4).times(energy.tickspeed.getBoost()).div(1000),
            ppath: [()=>player.energy.dimensions[2],"amount"],
            unlocked: ()=>player.energy.boost.gte(3)
        }),
        new Dimension({
            pos:5,
            cost: new Decimal(1e5),
            scaling: new Decimal(750),
            type: "energy",
            cpath: [()=>player.energy,"points"],
            multi: ()=>energy.boost.getBoost(5).times(energy.tickspeed.getBoost()).div(10000),
            ppath: [()=>player.energy.dimensions[3],"amount"],
            unlocked: ()=>player.energy.boost.gte(4)
        }),
        new Dimension({
            pos:6,
            cost: new Decimal(2.5e7),
            scaling: new Decimal(2500),
            type: "energy",
            cpath: [()=>player.energy,"points"],
            multi: ()=>energy.boost.getBoost(6).times(energy.tickspeed.getBoost()).div(1e5),
            ppath: [()=>player.energy.dimensions[4],"amount"],
            unlocked: ()=>player.energy.boost.gte(5)
        }),
        new Dimension({
            pos:7,
            cost: new Decimal(1e10),
            scaling: new Decimal(50000),
            type: "energy",
            cpath: [()=>player.energy,"points"],
            multi: ()=>energy.boost.getBoost(6).times(energy.tickspeed.getBoost()).div(1e6),
            ppath: [()=>player.energy.dimensions[5],"amount"],
            unlocked: ()=>player.energy.boost.gte(6)
        }),
        new Dimension({
            pos:8,
            cost: new Decimal(1e15),
            scaling: new Decimal(1e7),
            type: "energy",
            cpath: [()=>player.energy,"points"],
            multi: ()=>energy.boost.getBoost(7).times(energy.tickspeed.getBoost()).div(1e7),
            ppath: [()=>player.energy.dimensions[6],"amount"],
            unlocked: ()=>player.energy.boost.gte(7)
        }),
        new Dimension({
            pos:9,
            cost: new Decimal(1e20),
            scaling: new Decimal(1e10),
            type: "energy",
            cpath: [()=>player.energy,"points"],
            multi: ()=>energy.boost.getBoost(8).times(energy.tickspeed.getBoost()).div(1e8),
            ppath: [()=>player.energy.dimensions[7],"amount"],
            unlocked: ()=>player.energy.boost.gte(8)
        })
    ],
    color: "#999900",
    type: "energy",
    parent: elements.get("energy-dims")
})

/*{
    amount: 2,
    costs: [
        {
            base: new Decimal(1),
            scaling: 25
        },
        {
            base: new Decimal(100),
            scaling: 500
        }
    ],
}*/