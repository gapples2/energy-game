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
        return Decimal.pow(10,this.getAmount().pow(1.1).add(4))
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
    getBoost(x=0){
        let b = Decimal.pow(1.1,player.energy.overclock.add(x).add(player.energy.overclock.add(x).gte(1)?2:0))
        if(b.gte(4))b=new Decimal(10).minus(Decimal.div(10,b.minus(4).log2().add(4).sqrt()))
        return b
    },
    update(to={css:true}){
        if(to.css){
            elements.get("energy-overclock-button").className = this.canReset()?"energy-unlocked":"locked"
            elements.get("energy-overclock").style.display = player.energy.overclockUnlocked?"":"none"
        }
        if(to.txt){
            elements.get("energy-overclock-button").textContent = `Overclock your generators to make them more effective for ${format(this.requirement())} energy`
            elements.get("energy-overclock-boost").textContent = `+${format(this.getBoost().div(10).minus(0.1))}x, next: +${format(this.getBoost(1).div(10).minus(0.1))}x`
        }
    }
}

elements.get("energy-overclock-button").addEventListener("click",()=>{
    energy.overclock.reset()
})