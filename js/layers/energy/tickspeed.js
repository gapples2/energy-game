energy.tickspeed = {
    getAmount(){
        return player.energy.tickspeed
    },
    getBase(){
        return new Decimal(0.1).times(energy.overclock.getBoost()).add(1)
    },
    getBoost(){
        return Decimal.pow(this.getBase(),this.getAmount())
    },
    getScaling(){
        return new Decimal(5)
    },
    maximumBuyAmount(){
        // 5^amt*100
        return Decimal.affordGeometricSeries(player.energy.points,15,this.getScaling(),this.getAmount())
    },
    getCost(x=0,y=0){
        return Decimal.sumGeometricSeries(this.maximumBuyAmount().add(y).min(x),15,this.getScaling(),this.getAmount())
    },
    getCostOne(){
        return this.getCost(1,1)
    },
    canBuy(){
        return this.maximumBuyAmount().gte(1)
    },
    buy(x=1){
        if(this.canBuy()){
            let amt = this.maximumBuyAmount().min(x)
            let cost = this.getCost(x)
            player.energy.tickspeed = player.energy.tickspeed.add(amt)
            player.energy.points = player.energy.points.minus(cost)
            this.update({css:true,txt:true})
        }
    },
    update(to={css:true}){
        if(to.css){
            elements.get("energy-tickspeed-button").className = this.canBuy()?"energy-unlocked":"locked"
            elements.get("energy-tickspeed").style.display = player.energy.tickspeedUnlocked?"":"none"
            elements.get("energy-tickspeed-br").style.display = player.energy.tickspeedUnlocked?"":"none"
        }
        if(to.txt){
            elements.get("energy-tickspeed-boost").textContent = `${format(this.getBoost())}x [${format(this.getBase())}x]`
            elements.get("energy-tickspeed-button").textContent = `${formatWhole(this.getCostOne())} energy`
        }
    }
}

elements.get("energy-tickspeed-button").addEventListener("click",()=>{
    energy.tickspeed.buy()
})