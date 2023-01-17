class DOMCache{
    elements = {}
    constructor(){
    }
    get(id){
        if(this.elements[id])return this.elements[id]
        let ele = document.getElementById(id)
        if(!ele)throw new Error(`"${id}" is not a valid element.`)
        this.elements[id] = ele
        return ele
    }
}

const elements = new DOMCache()