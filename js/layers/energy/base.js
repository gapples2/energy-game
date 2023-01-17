const energy = {
    update(diff){
        elements.get("energy-amt").textContent = format(player.energy.points)
        elements.get("energy-gain").textContent = format(this.dimensions.dimensions[0].getGain())

        this.dimensions.update({css:true,ticktxt:true,gain:true,diff})
        this.boost.update()
        this.tickspeed.update()
        this.overclock.update()
    },
    init(){
        elements.get("energy-amt").textContent = format(player.energy.points)
        elements.get("energy-gain").textContent = format(this.dimensions.dimensions[0].getGain())

        this.dimensions.update({css:true,txt:true})
        this.boost.update({css:true,txt:true})
        this.tickspeed.update({css:true,txt:true})
        this.overclock.update({css:true,txt:true})
    }
}