energy.boost = {
    toReset(){
        player.energy.dimensions.forEach((a,b)=>player.energy.dimensions[b]={bought:new Decimal(0),amount:new Decimal(0)})
        player.energy.points = new Decimal(1)
        player.energy.tickspeed = new Decimal(0)
        player.energy.overclock = new Decimal(0)
        energy.dimensions.update({css:true,txt:true})
        energy.tickspeed.update({css:true,txt:true})
        energy.overclock.update({css:true,txt:true})
    },
    canReset(){
        if(player.energy.boost.lt(9))return player.energy.dimensions[player.energy.boost.toNumber()].bought.gte(2)
        return player.energy.dimensions[8].gte(player.energy.boost.times(5))
    },
    reset(){
        if(this.canReset()){
            this.toReset()
            player.energy.boost = player.energy.boost.add(1)
            player.energy.tickspeedUnlocked = true
            if(player.energy.boost.gte(3))player.energy.overclockUnlocked = true
            this.update({css:true,txt:true})
        }
    },
    getBase(){
        return new Decimal(1.5)
    },
    getBoost(dim=1){
        return Decimal.pow(this.getBase(),player.energy.boost.minus(dim-1)).max(1)
    },
    producerTxt(){
        if(player.energy.boost.eq(0))return `energy producer 1`
        if(player.energy.boost.lt(8))return `energy producers 1-${player.energy.boost.toNumber()+1}`
        return `all energy producers`
    },
    update(to={css:true}){
        if(to.css){
            elements.get("energy-boost-button").className = this.canReset()?"energy-unlocked":"locked"
        }
        if(to.txt){
            elements.get("energy-boost-amt").textContent = formatWhole(player.energy.boost.add(1))
            elements.get("energy-boost-button").textContent = `Reset for${player.energy.boost.lt(8)?" a new producer and":""} a ${notations.bignum.percent(this.getBase(),true)} boost to ${this.producerTxt()}.`
        }
    }
}

elements.get("energy-boost-button").addEventListener("click",()=>{
    energy.boost.reset()
})