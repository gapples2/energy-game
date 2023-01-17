let tickSpeed = 1

function mainLoop(){
    let time = Date.now()
    let diff = (time-player.time)/1000*tickSpeed
    let simulatedTicks = Math.min(Math.floor(diff/0.25),1e4)
    player.time = time

    for(let x=0;x<simulatedTicks;x++)update(0.25)
    update(diff%0.1)

    requestAnimationFrame(mainLoop)
}

function update(diff){
    energy.update(diff)
}

function init(){
    energy.init()
}

function loadGame(){
    saving.load()
    setInterval(saving.save,5000)
    init()
    requestAnimationFrame(mainLoop)
}

loadGame()