let player = {
    energy:{
        dimensions:[
            {bought:new Decimal(0),amount:new Decimal(0)},
            {bought:new Decimal(0),amount:new Decimal(0)},
            {bought:new Decimal(0),amount:new Decimal(0)},
            {bought:new Decimal(0),amount:new Decimal(0)},
            {bought:new Decimal(0),amount:new Decimal(0)},
            {bought:new Decimal(0),amount:new Decimal(0)},
            {bought:new Decimal(0),amount:new Decimal(0)},
            {bought:new Decimal(0),amount:new Decimal(0)},
            {bought:new Decimal(0),amount:new Decimal(0)}
        ],
        points: new Decimal(1),
        boost: new Decimal(0),
        tickspeed: new Decimal(0),
        tickspeedUnlocked: false,
        overclock: new Decimal(0),
        overclockUnlocked: false
    },
    time: Date.now()
}