energy.overclock = {
    toReset(){
        player.energy.dimensions.forEach((a,b)=>player.energy.dimensions[b].amount=a.bought)
        energy.dimensions.update({css:true,txt:true})
        energy.tickspeed.update({css:true,txt:true})
    },
    getAmount(){
        return player.energy.overclock
    },
    requirement(){
        return Decimal.pow(100,this.getAmount().pow(2).add(this.getAmount()).div(2).add(2))
    },
    canReset(){
        return player.energy.points.gte(this.requirement())
    },
    reset(){
        if(this.canReset()){
            player.energy.points = player.energy.points.minus(this.requirement())
            player.energy.overclock = player.energy.overclock.add(1)
            this.toReset()
            this.update({css:true,txt:true})
        }
    },
    getBoost(){
        let b = Decimal.pow(1.04,player.energy.overclock)
        if(b.gte(1.5))b=new Decimal(2.5).minus(Decimal.div(1,b.minus(1).log2().add(1).sqrt()))
        return b
    },
    update(to={css:true}){
        if(to.css){
            elements.get("energy-overclock-button").className = this.canReset()?"energy-unlocked":"locked"
            elements.get("energy-overclock").style.display = player.energy.overclockUnlocked?"":"none"
        }
        if(to.txt){
            elements.get("energy-overclock-button").textContent = `Overclock your generators to make them 4% more effective for ${format(this.requirement())} energy`
        }
    }
}

elements.get("energy-overclock-button").addEventListener("click",()=>{
    energy.overclock.reset()
})