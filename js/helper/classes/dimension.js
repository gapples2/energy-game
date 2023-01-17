class Dimensions{
    div = document.createElement("table")
    constructor({dimensions,color,type,parent}){
        this.div.style.width = "100%"
        for(let x=0;x<dimensions.length;x++){
            if(!(dimensions[x] instanceof Dimension))throw new Error(`Invalid type given at index ${x}.`)
            dimensions[x].color = color
            let gainobj = dimensions[x+1]??{getGain(){return new Decimal(0)}}
            dimensions[x].nextGain = ()=>gainobj.getGain()
            this.div.appendChild(dimensions[x].elements.ele)
        }
        this.dimensions = dimensions
        parent.appendChild(this.div)
    }
    update(to={css:true,txt:true}){
        for(let x=this.dimensions.length-1;x>=0;x--)this.dimensions[x].update(to)
    }
}

class Dimension{
    constructor({pos,cost,scaling,type,cpath,multi,ppath,abbr,unlocked}){ // cpath=[function,index], cpath[0]()[index] = currency to spend
        this.pos = pos
        this.cost = {base:cost,scaling,cpath,abbr}
        this.type = type
        this.multi = multi
        this.ppath = ppath
        this.unlocked = unlocked??(()=>true)
        this.init()
    }
    init(){
        // goal: create dimension element
        let ele = document.createElement("tr")
        ele.innerHTML = `<td style="text-align:left;width:35%">${this.pos}${notations.normal.place(this.pos)} ${this.type.slice(0,1).toUpperCase()+this.type.slice(1)} Producer: <span id="${this.type}-dim-${this.pos}-multi"></span>x</td><td style="text-align:center;width:35%"><span id="${this.type}-dim-${this.pos}-amount"></span> [+<span id="${this.type}-dim-${this.pos}-gain"></span>%]</td><td style="text-align:right;width:50%"><button id="${this.type}-dim-${this.pos}-buy" style="width:80%"></button></td>`
        ele["dim-type"] = this.type
        ele.style.width = "100%"
        document.body.appendChild(ele)
        let multi = elements.get(`${this.type}-dim-${this.pos}-multi`)
        let button = elements.get(`${this.type}-dim-${this.pos}-buy`)
        let amount = elements.get(`${this.type}-dim-${this.pos}-amount`)
        let gain = elements.get(`${this.type}-dim-${this.pos}-gain`)
        document.body.removeChild(ele)
        button.addEventListener("click",()=>this.buy())
        button.addEventListener("mouseenter",()=>{this.over=true;this.update({css:true})})
        button.addEventListener("mouseleave",()=>{this.over=false;this.update({css:true})})
        this.elements = {ele,multi,button,amount,gain}
    }
    getAmount(type="bought"){
        return player[this.type].dimensions[this.pos-1][type]
    }
    setAmount(x,type="bought"){
        player[this.type].dimensions[this.pos-1][type] = x
    }
    getCost(x=0){
        return Decimal.sumGeometricSeries(this.maximumBuyAmount().min(x),this.cost.base,this.cost.scaling,this.getAmount())
        // (b^(x+1)-a^x)/(b-1)
        /*return this.cost.scaling.pow(this.getAmount().add(this.maximumBuyAmount().minus(1).min(x))).times(this.cost.base)*/
    }
    getCostOne(){
        return Decimal.pow(this.cost.scaling,this.getAmount()).times(this.cost.base)
    }
    maximumBuyAmount(){
        return Decimal.affordGeometricSeries(this.cost.cpath[0]()[this.cost.cpath[1]],this.cost.base,this.cost.scaling,this.getAmount())
    }
    canBuy(){
        return this.maximumBuyAmount().gte(1)
    }
    getMultiplier(){
        return this.multi()
    }
    getGain(){
        return this.getAmount("amount").times(this.getMultiplier())
    }
    buy(x=1){
        if(this.canBuy()){
            let amt = Decimal.min(x,this.maximumBuyAmount())
            let cost = this.getCost(x)
            this.setAmount(this.getAmount("amount").add(amt),"amount")
            this.setAmount(this.getAmount().add(amt))
            this.cost.cpath[0]()[this.cost.cpath[1]] = this.cost.cpath[0]()[this.cost.cpath[1]].sub(cost)
            this.update({css:true,txt:true})
        }
    }
    update(to={css:true,ticktxt:true}){
        if(to.css){
            let canbuy = this.canBuy()
            this.elements.button.style.borderColor = canbuy?this.color:"#555555"
            this.elements.button.style.backgroundColor = this.over?(canbuy?this.color:"#555555"):"inherit"
            this.elements.ele.style.display = this.unlocked()?"":"none"
        }
        if(to.txt){
            this.elements.button.textContent = `${formatWhole(this.getCostOne())} ${this.type.slice(0,1).toUpperCase()+this.type.slice(1)}`
        }
        if(to.ticktxt||to.txt){
            this.elements.multi.textContent = `${format(this.getMultiplier())}`
            this.elements.amount.textContent = `${formatWhole(this.getAmount())} bought, ${format(this.getAmount("amount"))}`
            this.elements.gain.textContent = this.getAmount().gt(0)?`${format(this.nextGain().div(this.getAmount("amount")).times(100))}`:"0.00"
        }
        if(to.gain){
            let a = this.ppath[0]()
            a[this.ppath[1]] = a[this.ppath[1]].add(this.getGain().times(to.diff))
        }
    }
}