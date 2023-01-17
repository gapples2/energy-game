function setCSSVar(name,val){
    document.documentElement.style.setProperty(name,val)
}

function getCSSVar(name){
    document.documentElement.style.getPropertyValue(name)
}