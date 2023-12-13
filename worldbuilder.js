const spans = document.querySelectorAll(".testspan")
var CG = document.getElementById("grounds") //CanvasGrounds
var player = document.getElementById("player")
var pm = document.getElementById("playermirror")
var depth = 50

var pressedKeys = {};

//adding player collision boxes
const floorCollider = document.createElement("div")
floorCollider.style.width = "100%"
floorCollider.style.height = "1px"
floorCollider.style.marginTop = "calc(100% - 1px)"
floorCollider.style.backgroundColor = "rgba(255, 255, 0, .2)"
floorCollider.setAttribute("id", "floorCollider")
player.appendChild(floorCollider)

//world builder
function plane(width, height, x, y) {
  const main = document.createElement("div")
  const top = document.createElement("div")
  const left = document.createElement("div")
  const bottom = document.createElement("div")
  const right = document.createElement("div")

  main.style.position = "absolute"
  main.style.width = width + "vw"
  main.style.height = height + "vh"
  main.style.left = x + "vw"
  main.style.top = y + "vh"
  main.classList.add("mainWall")

  top.style.position = "absolute"
  top.style.width = width + "vw"
  top.style.height = "10vh"
  top.style.left = x + "vw"
  top.style.top = (y - 5) + "vh"
  top.classList.add("topWall")

  CG.appendChild(main)
  CG.appendChild(top)
}