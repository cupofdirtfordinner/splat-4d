const canvas = document.getElementById("canvas")
var speed = .04 //.04
var jumpheight = 0
var canjump = 0

setInterval(function() {
  setpres()
  //cull()
  phys()
}, 1);

var wallcollisions = false
var wallCollisions2 = false
var direction = 0
var lastdirection = 0
var ypos = 50
var xpos = 0
var yvel = 0
var xvel = 0
var gravity = 0
var preypos = 0
var prexpos = 0
var preyvel = 0
var prexvel = 0
var causegravity = false
var escaper = 0
var preventspam = false
var preventspam2 = false
var dash = 0
var jumpheight = 0
var zcam = 0
var dashdecider = false


var wallz = document.querySelectorAll(".mainWall")
var culled = []

var mask = document.getElementById("cullMask")
function cull() {
  culled = []
  var rectSelection = mask.getBoundingClientRect();
  var unculledWalls = []
  for (let i = 0; i < unculled.length; i++) {
    var rect = unculled[i].getBoundingClientRect();
    if ((rect.bottom > rectSelection.top) &&
      (rect.right > rectSelection.left) &&
      (rect.top < rectSelection.bottom) &&
      (rect.left < rectSelection.right))
    {
      unculledWalls.push(unculled[i])
    } else {
      culled = unculledWalls
    }
  }
  //spans[0].textContent = JSON.stringify(unculledWalls)//JSON.stringify(unculled)
  culled = unculledWalls
}

function collision(element) {
  var rectSelection = document.getElementById(element).getBoundingClientRect();
  var GoodToGo = 0
  for (let i = 0; i < document.querySelectorAll(".mainWall").length; i++) {
    var rect = document.querySelectorAll(".mainWall")[i].getBoundingClientRect();
    if ((rect.bottom > rectSelection.top) &&
      (rect.right > rectSelection.left) &&
      (rect.top < rectSelection.bottom) &&
      (rect.left < rectSelection.right))
    {
      GoodToGo++
    }
  }
  spans[0].textContent=element
  return GoodToGo
}


function setpres() {
  preypos = ypos
  preyvel = yvel
}

function phys() {
  //if (collision("wallCollider")>-1){}
  xvel /= 1.2;
  yvel /= 1.1;
  dash /= 1.1;
  
  jumpheight /= 1.05
  ypos += (yvel + jumpheight)
  xpos += xvel
  
  //controls
  window.onkeyup = function(e) {
    pressedKeys[e.keyCode] = false;
  }
  window.onkeydown = function(e) {
    pressedKeys[e.keyCode] = true;
  }


  if (pressedKeys[65]) {
    direction = 1
    xvel += direction * speed
  }

  if (pressedKeys[68]) {
    direction = -1
    xvel += direction * speed
  }
  
  if (pressedKeys[87]) {
    if (canjump > 0) {
      if (preventspam) {
        gravity = 0
        jumpheight = 1.4
        canjump -= 1
        preventspam = false
      }
    }
  } else {
      preventspam = true
    }
  
  if (pressedKeys[83]) {
      yvel -= speed * 2
      if (wallCollisions2) {
        gravity = 1
      }
  }
  if (pressedKeys[16]) {
    if (dash < .1) {
      if (preventspam2) {
        gravity = -.005
        dash = .8
        preventspam2 = false
      }
    }
  } else {
      preventspam2 = true
  }

  if (pressedKeys[73]) {
    zcam += speed
  }
  if (pressedKeys[75]) {
    zcam += speed
  }
    
  //spans[0].textContent = wallCollisions
  
  if (collision("floorCollider")>0) {
   CG.style.marginTop = preypos + "vmin"
      yvel *= -1 //jumpheight = 2
      gravity = -.001
      causegravity = true
      canjump = 1
      spans[1].textContent = "if"
  } else {
      causegravity = true
      spans[1].textContent = "else"
  }
  
  if (collision("wallCollider")>0) {
    xvel = prexvel * -.1
    wallCollisions = true
  } else {
    prexvel = xvel
    xvel += dash * direction
    wallCollisions = false
  }
  
  if (collision("wallCollider2")) {
      canjump = 1
    if (collision("floorCollider")<=0) {
      gravity = 0.004
    }
  } else {
    lastdirection = direction
  }
  
  
  if (causegravity) {
    gravity += .00015
    gravity *= (9.81 * 0.103)
    yvel -= gravity
    CG.style.marginTop = ypos - 1.5 + "vmin"
  }
  
  if (collision("floorCollideXtra")>0) {
    yvel = -2
  }
  
  if (dash > 0.01) {
    yvel = 0
  }
  CG.style.marginLeft = xpos + 3 + "vmin"
      
  pm.style.marginTop = "calc(50vmin - "+ (ypos) +"vmin + 80px)"
  pm.style.marginLeft = "calc(48.5vmin - "+ (xpos) +"vmin - 20px)"

  document.querySelector("#grounds").style.perspectiveOrigin = "calc(48.5vmin - "+xpos+"vmin) calc(50vmin - "+ypos+"vmin)"
}

