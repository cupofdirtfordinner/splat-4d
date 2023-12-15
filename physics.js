const canvas = document.getElementById("canvas")
var speed = .04 //.04
var jumpheight = 0
var canjump = 0

setInterval(function() {
  setpres()
  phys()
}, 1);

var direction
var lastdirection = 0
var ypos = 0
var xpos = 0
var yvel = 0
var xvel = 0
var gravity = .00275
var preypos = 0
var prexpos = 0
var preyvel = 0
var prexvel = 0

var escaper = 0
var preventspam = false
  
var jumpheight = 0

function setpres() {
  preypos = ypos
  preyvel = yvel
}

function phys() {
  xvel /= 1.2
  yvel /= 1.1
  
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
        jumpheight = 1
        canjump -= 1
        preventspam = false
      }
    }
  } else {
      preventspam = true
    }
  
  if (pressedKeys[83]) {
      yvel -= speed * 2
  }
  
  var causegravity = false
  var rectSelection = document.getElementById("floorCollider").getBoundingClientRect();
  for (let i = 0; i < document.querySelectorAll(".mainWall").length; i++) {
    var rect = document.querySelectorAll(".mainWall")[i].getBoundingClientRect();
    if ((rect.bottom > rectSelection.top) &&
      (rect.right > rectSelection.left) &&
      (rect.top < rectSelection.bottom) &&
      (rect.left < rectSelection.right))
    {
      CG.style.marginTop = preypos + "vmin"
      yvel *= -1
      gravity = 0
      canjump = 1
    } else {
      causegravity = true
    }
  
  }
  rectSelection = document.getElementById("wallCollider").getBoundingClientRect();
  for (let i = 0; i < document.querySelectorAll(".mainWall").length; i++) {
    var rect = document.querySelectorAll(".mainWall")[i].getBoundingClientRect();
    if ((rect.bottom > rectSelection.top) &&
      (rect.right > rectSelection.left) &&
      (rect.top < rectSelection.bottom) &&
      (rect.left < rectSelection.right))
    {
      CG.style.marginLeft = prexpos + "vmin"
      wallcollisions = true
      
    } else {
      wallcollisions = false
    }
  
  }
  rectSelection = document.getElementById("wallCollider2").getBoundingClientRect();
  for (let i = 0; i < document.querySelectorAll(".mainWall").length; i++) {
    var rect = document.querySelectorAll(".mainWall")[i].getBoundingClientRect();
    if ((rect.bottom > rectSelection.top) &&
      (rect.right > rectSelection.left) &&
      (rect.top < rectSelection.bottom) &&
      (rect.left < rectSelection.right))
    {
      wallcollisions2 = true
      
    } else {
      wallcollisions2 = false
      lastdirection = direction
    }
  
  }
  
  if (wallcollisions) {
    xvel = prexvel * -.1
  } else {
    prexvel = xvel
  }
  if (wallcollisions2) {
    gravity = .01
  }
  
  
  if (causegravity) {
    gravity += .00015
    gravity *= (9.81 * 0.103)
    yvel -= gravity
    CG.style.marginTop = ypos + "vmin"
  }
  
  CG.style.marginLeft = xpos + "vmin"
      
  pm.style.marginTop = "calc(57vmin - "+ypos+"vmin)"
  pm.style.marginLeft = "calc(48.5vmin - "+xpos+"vmin)"
  
  document.querySelector("#grounds").style.perspectiveOrigin = "calc(48.5vmin - "+xpos+"vmin) calc(20vmin - "+ypos+"vmin)"
  
  canvas.style.left = "calc(50% - "+ (canvas.getBoundingClientRect().right - canvas.getBoundingClientRect().left)/2 +"px)"

  spans[0].textContent = wallcollisions2
}

