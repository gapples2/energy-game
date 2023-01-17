const saving = {
    save(){
        localStorage.setItem("ad-copy",JSON.stringify(player))
    },
    restoreData(data,odata){
        let newdata = Array.isArray(odata)?[]:{}
        if((typeof data)=="object"){
            Object.keys(odata).forEach(o=>{
                let obj = odata[o]
                let old = data[o]
                if(obj instanceof Decimal)newdata[o] = new Decimal(old??obj)
                else{
                    if((typeof obj)=="object")newdata[o] = this.restoreData(old,obj)??obj
                    else newdata[o] = old??obj
                }
            })
        }
        return newdata
    },
    load(){
        let ldata = localStorage.getItem("ad-copy")
        if(!ldata||ldata=="null")return;
        player = this.restoreData(JSON.parse(ldata),player)
    },
    hardReset(){
        if(prompt("Are you sure you would like to hard reset your game? This doesn't give any boost.")){
            localStorage.setItem("ad-copy",JSON.stringify(null))
            window.navigation.reload()
        }
    }
}