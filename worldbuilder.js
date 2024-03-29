const spans = document.querySelectorAll(".testspan")
var CG = document.getElementById("grounds") //CanvasGrounds
var player = document.getElementById("player")
var pm = document.getElementById("playermirror")

var pressedKeys = {};

const deepness = 70
//adding player collision boxes

const floorCollider = document.createElement("div")
floorCollider.style.width = "90%"
floorCollider.style.height = ".1vmin"
floorCollider.style.marginTop = "100%"
floorCollider.style.marginLeft = "5%"
floorCollider.style.backgroundColor = "rgba(255, 255, 0, 1)"
floorCollider.setAttribute("id", "floorCollider")
floorCollider.style.zIndex = "100"
floorCollider.setAttribute("class", "collider")
player.appendChild(floorCollider)

const floorCollideXtra = document.createElement("div")
floorCollideXtra.style.width = "50%"
floorCollideXtra.style.position = "absolute"
floorCollideXtra.style.height = ".01vmin"
floorCollideXtra.style.top = "0%"
floorCollideXtra.style.left = "25%"
floorCollideXtra.style.backgroundColor = "rgba(25, 255, 0, 1)"
floorCollideXtra.style.boxSizing = "border-box"
floorCollideXtra.style.borderStyle = "dashed"
floorCollideXtra.style.borderWidth = "1px"
floorCollideXtra.setAttribute("id", "floorCollideXtra")
floorCollideXtra.setAttribute("class", "collider")
player.appendChild(floorCollideXtra)

const wallCollider = document.createElement("div")
wallCollider.style.width = "calc(100% - .5vmin)"
wallCollider.style.height = "calc(100% - 1vmin)"
wallCollider.style.marginLeft = ".25vmin"
wallCollider.style.marginTop = "-6vmin"
wallCollider.style.backgroundColor = "rgba(255, 255, 255, 1)"
wallCollider.setAttribute("id", "wallCollider")
wallCollider.setAttribute("class", "collider")
player.appendChild(wallCollider)

const wallCollider2 = document.createElement("div")
wallCollider2.style.width = "calc(100% + .5vmin)"
wallCollider2.style.height = "calc(100% - 1vmin)"
wallCollider2.style.marginLeft = "-.25vmin"
wallCollider2.style.marginTop = "-6vmin"
wallCollider2.style.backgroundColor = "rgba(0, 255, 255, 0.5)"
wallCollider2.setAttribute("id", "wallCollider2")
wallCollider2.setAttribute("class", "collider")
player.appendChild(wallCollider2)


const cullMask = document.createElement("div")
cullMask.style.width = "40vmin"
cullMask.style.height = "40vmin"
cullMask.style.marginLeft = "-17.5vmin"
cullMask.style.marginTop = "-20vmin"
cullMask.style.backgroundColor = "rgba(0, 255, 255, .5)"
cullMask.style.boxSizing = "border-box"
cullMask.style.borderStyle = "dashed"
cullMask.style.borderWidth = "1px"
cullMask.setAttribute("id", "cullMask")
cullMask.setAttribute("class", "collider")
player.appendChild(cullMask)

//world builder
function plane(width, height, x, y, background) {
  const main = document.createElement("div")
  const top = document.createElement("div")
  const left = document.createElement("div")
  const bottom = document.createElement("div")
  const right = document.createElement("div")

  main.style.position = "absolute"
  main.style.width = width + "vmin"
  main.style.height = height + "vmin"
  main.style.left = x + "vmin"
  main.style.top = y + "vmin"
  main.setAttribute("class", "mainWall")

  top.style.position = "absolute"
  top.style.width = width + "vmin"
  top.style.height = deepness+"px"
  top.style.left = x + "vmin"
  top.style.top = "calc("+y+"vmin - "+deepness/2+"px)"
  top.classList.add("topWall")
  top.classList.add("performancetag")
  
  bottom.style.position = "absolute"
  bottom.style.width = width + "vmin"
  bottom.style.height = deepness+"px"
  bottom.style.left = x + "vmin"
  bottom.style.top = "calc("+y+"vmin + "+height+"vmin - "+deepness/2+"px)"
  bottom.classList.add("bottomWall")
  bottom.classList.add("performancetag")
  
  left.style.position = "absolute"
  left.style.width = deepness+"px"
  left.style.height = height + "vmin"
  left.style.left = x + "vmin"
  left.style.top = +y+"vmin"
  left.style.transform = "rotateY(90deg) translateX("+deepness/2+"px) translateZ(-"+deepness/2+"px)"
  left.classList.add("leftWall")
  left.classList.add("performancetag")
  
  right.style.position = "absolute"
  right.style.width = deepness+"px"
  right.style.height = height + "vmin"
  right.style.left = x+width + "vmin"
  right.style.top = +y+"vmin"
  right.style.transform = "rotateY(90deg)translateX("+deepness+"px) translateZ(-"+deepness+"px)"
  right.classList.add("rightWall")
  right.classList.add("performancetag")


  if (background) {
    
    main.setAttribute("class", "mainBackground")
    main.classList.add("performancetag")
    
    top.classList.add("topBackground")
    top.classList.remove("topWall")
    top.style.transform = ""
    top.style.height = "200px"
    
    bottom.classList.add("bottomBackground")
    bottom.classList.remove("bottomWall")
    bottom.style.transform = ""
    bottom.style.height = "200px"
    
    left.classList.add("leftBackground")
    left.classList.remove("leftWall")
    left.style.transform = ""
    left.style.width = "200px"
    
    right.classList.remove("rightWall")
    right.classList.add("rightBackground")
    right.style.transform = ""
    right.style.width = "200px"
  }
  
  CG.appendChild(main)
  CG.appendChild(top)
  CG.appendChild(bottom)
  CG.appendChild(left)
  CG.appendChild(right)
}

let spikewidth = 5
function spikes(width, height, x, y) {
  const main = document.createElement("div")
  
  main.style.position = "absolute"
  main.style.width = width + "vmin"
  main.style.height = height + "vmin"
  main.style.left = x + "vmin"
  main.style.top = y + "vmin"
  main.setAttribute("class", "spikesParent")
  
  CG.appendChild(main)
  for (let i = 0; i < (width/spikewidth/2); i++) {
    (createCones(height,(x + i*spikewidth*2),y ))
  }
}
function createCones(height, x, y, rotation) {
  const p = document.createElement("div")
  const f1 = document.createElement("div")
  const f2 = document.createElement("div")
  const f3 = document.createElement("div")
  const f4 = document.createElement("div")
  const f5 = document.createElement("div")
  const f6 = document.createElement("div")
  const f7 = document.createElement("div")
  
  
  
  for (let i = 2; i < 6; i++) {
    const f = eval("f"+i)
    
    f.style.position = "absolute"
    f.style.width = spikewidth + "vmin"
    f.style.height = height + "vmin"
    f.style.left = x + "vmin"
    f.style.top = y + "vmin"
    f.classList.add("spikes")
    f.classList.add("performancetag")
    f.style.transform = "translateZ(-35px) translateY(-40px) translateX(20px) rotateY("+ (360 / 7 * (i-4)) +"deg) rotateX(17deg) translateY(50px)"
    f.style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)"
    CG.appendChild(f)
  }
  
}

function npc(X,Y,name) {
  const main = document.createElement("div")
  //i could probably optimize this code by making it a function somehow, but it's fine. this works and doesn't really impact performance.
  //i honestly cant think of a way to make this a function actually, because of the local variable "main"
  main.style.position = "absolute"
  main.style.left = X + "vmin"
  main.style.top = Y + "vmin"
  main.setAttribute("class", "npc")
  main.style.backgroundImage = "url('textures/"+name+".png')"
  CG.appendChild(main)
  //if you put npc(0, 30, "grabdo", "1") then the dialogue would be the first set of lines in the "grabdo" section of "speech.json"
}