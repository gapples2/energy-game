function loadFile(path){
    let script = document.createElement("script")
    script.src = path
    script.async = false
    document.head.appendChild(script)
}

const JSscripts = [
    "technical/b_e.js",
    "technical/saving.js",

    "helper/cssvar.js",
    "helper/classes/domcache.js",
    "helper/notations.js",
    "helper/format.js",
    "helper/classes/dimension.js",

    "player.js",

    "layers/energy/base.js",
    "layers/energy/dimensions.js",
    "layers/energy/boost.js",
    "layers/energy/tickspeed.js",
    "layers/energy/overclock.js",

    "main.js"
]
for(let x=0;x<JSscripts.length;x++)loadFile("js/"+JSscripts[x])