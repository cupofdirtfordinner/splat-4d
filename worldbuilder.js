const spans = document.querySelectorAll(".testspan")
var CG = document.getElementById("grounds") //CanvasGrounds
var player = document.getElementById("player")
var pm = document.getElementById("playermirror")
var depth = 50

var pressedKeys = {};

//adding player collision boxes
const floorCollider = document.createElement("div")
floorCollider.style.width = "100%"
floorCollider.style.height = "5px"
floorCollider.style.marginTop = "100%"
floorCollider.style.backgroundColor = "rgba(255, 255, 0, 1)"
floorCollider.setAttribute("id", "floorCollider")
player.appendChild(floorCollider)
const wallCollider = document.createElement("div")
wallCollider.style.width = "calc(100% - .5vmin)"
wallCollider.style.height = "calc(100% - 1vmin)"
wallCollider.style.marginLeft = ".25vmin"
wallCollider.style.marginTop = "-6vmin"
wallCollider.style.backgroundColor = "rgba(255, 255, 255, 1)"
wallCollider.setAttribute("id", "wallCollider")
player.appendChild(wallCollider)
const wallCollider2 = document.createElement("div")
wallCollider2.style.width = "calc(100% + .5vmin)"
wallCollider2.style.height = "calc(100% - 1vmin)"
wallCollider2.style.marginLeft = "-.25vmin"
wallCollider2.style.marginTop = "-6vmin"
wallCollider2.style.backgroundColor = "rgba(0, 255, 255, 1)"
wallCollider2.setAttribute("id", "wallCollider2")
player.appendChild(wallCollider2)

//world builder
function plane(width, height, x, y) {
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
  main.classList.add("mainWall")

  top.style.position = "absolute"
  top.style.width = width + "vmin"
  top.style.height = "70px"
  top.style.left = x + "vmin"
  top.style.top = "calc("+y+"vmin - "+70/2+"px)"
  top.classList.add("topWall")
  
  bottom.style.position = "absolute"
  bottom.style.width = width + "vmin"
  bottom.style.height = "70px"
  bottom.style.left = x + "vmin"
  bottom.style.top = "calc("+y+"vmin + "+height+"vmin - "+70/2+"px)"
  bottom.classList.add("bottomWall")

  CG.appendChild(main)
  CG.appendChild(top)
  CG.appendChild(bottom)
}