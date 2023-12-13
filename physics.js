var speed = .04
var jumpheight = 0
var canjump = false

setInterval(function() {
  setpres()
  phys()
}, 1);

var ypos = 0
var xpos = 0
var yvel = 0
var xvel = 0
var gravity = .00275

var jumpheight = speed

function setpres() {
  var preypos = 0
  var prexpos = 0
  var preyvel = 0
  var prexvel = 0
}

function phys() {
  preypos = ypos
  prexpos = xpos
  preyvel = yvel
  prexvel = xvel
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
    xvel += speed
    direction = -1
  }

  if (pressedKeys[68]) {
    xvel -= speed
    direction = 1
  }

  if (pressedKeys[87] && canjump == true) {
      jumpheight = 1
      canjump = false
  }
  
  if (pressedKeys[83]) {
      yvel -= speed
  }
  
  spans[0].innerHTML = preypos + " x " + prexpos + "<br>" + ypos + " x " + xpos
  
  var rectSelection = document.getElementById("floorCollider").getBoundingClientRect();
  for (let i = 0; i < document.querySelectorAll(".mainWall").length; i++) {
    var rect = document.querySelectorAll(".mainWall")[i].getBoundingClientRect();
    if ((rect.bottom > rectSelection.top) &&
      (rect.right > rectSelection.left) &&
      (rect.top < rectSelection.bottom) &&
      (rect.left < rectSelection.right))
    {
      spans[i + 1].textContent = "Colliding!"
      CG.style.marginTop = preypos + "vh" //CG.style.marginLeft = prexpos + "vw"
      yvel *= -1
      gravity = 0
      canjump = true
    } else {
      spans[i + 1].textContent = "nop!"
      gravity += .00001
      gravity *= 1.0002
      yvel -= gravity
      CG.style.marginTop = ypos + "vh"
    }

  }


      
      CG.style.marginLeft = xpos + "vw"
          
      pm.style.marginTop = "calc(50vh - "+ypos+"vh)"
      pm.style.marginLeft = "calc(50vw - "+xpos+"vw)"
}
