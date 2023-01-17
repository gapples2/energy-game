const notations = {
    bignum:{
        percent(x,whole=false){
            if(x.lt(2))return format(x.minus(1).mul(100),whole?0:2)+"%"
            return format(x)+"x"
        }
    },
    normal:{
        place(x){
            let m100 = x%100
            if(m100<10||m100>20)return (["th","st","nd","rd","th"])[Math.min(x%10,4)]
            return "th"
        }
    }
}