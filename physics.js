const canvas = document.getElementById("canvas")
var speed = .04 //.04
var jumpheight = 0
var canjump = 0

setInterval(function() {
  setpres()
  phys()
}, 1);

var variable = 0
var wallcollisions = false
var wallCollisions2 = false
var direction = 0
var lastdirection = 0
var ypos = 0
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

function collision(element) {
  rectSelection = document.getElementById(element).getBoundingClientRect();
  var GoodToGo = 0
  for (let i = 0; i < document.querySelectorAll(".mainWall").length; i++) {
    var rect = document.querySelectorAll(".mainWall")[i].getBoundingClientRect();
    if (element == "wallCollider") {
        
        variable++
        spans[1].textContent = rect.bottom > rectSelection.top
        spans[2].textContent = rect.right > rectSelection.left
        spans[3].textContent = rect.top < rectSelection.bottom
        spans[4].textContent = rect.left < rectSelection.right
      }
    if ((rect.bottom > rectSelection.top) &&
      (rect.right > rectSelection.left) &&
      (rect.top < rectSelection.bottom) &&
      (rect.left < rectSelection.right))
    {
      GoodToGo++
    } else {
      
    }
  }
  return GoodToGo
}


function setpres() {
  preypos = ypos
  preyvel = yvel
}

function phys() {
  if (collision("wallCollider")>-1){}
  xvel /= 1.2
  yvel /= 1.1
  dash /= 1.05
  
  jumpheight /= 1.05
  ypos += (yvel + jumpheight)
  xpos += xvel + (dash * direction)
  
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
      //if (preventspam2) {
        gravity = -.005
        dash = 2
        preventspam2 = false
      //}
    }
  } else {
      preventspam2 = true
    }
    
  
  
  if (collision("floorCollider")>0) {
   CG.style.marginTop = preypos + "vmin"
      yvel *= -1 //jumpheight = 2
      gravity = -.001
      causegravity = true
      canjump = 1
  } else {
      causegravity = true
  }
  
  if (collision("wallCollider")>0) {
    xvel = prexvel * -.1
  } else {
    prexvel = xvel
  }
  spans[0].textContent = variable
  
  if (collision("wallCollider2")) {
    gravity = .01
  } else {
    lastdirection = direction
  }
  
  
  if (causegravity) {
    gravity += .00015
    gravity *= (9.81 * 0.103)
    yvel -= gravity
    CG.style.marginTop = ypos + "vmin"
  }
  
  CG.style.marginLeft = xpos + "vmin"
      
  pm.style.marginTop = "calc(60vmin - "+ypos+"vmin)"
  pm.style.marginLeft = "calc(48.5vmin - "+xpos+"vmin)"
  
  document.querySelector("#grounds").style.perspectiveOrigin = "calc(48.5vmin - "+xpos+"vmin) calc(20vmin - "+ypos+"vmin)"
  
  canvas.style.left = "calc(50% - "+ (canvas.getBoundingClientRect().right - canvas.getBoundingClientRect().left)/2 +"px)"
}

