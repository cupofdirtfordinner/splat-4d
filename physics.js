
const canvas = document.getElementById("canvas")
const dspan = document.getElementById("dialoguespan")
const nspan = document.getElementById("namespan")
const dbox = document.getElementById("dialoguebox")
var speed = .04 //.04
var jumpheight = 0
var canjump = 0

setInterval(function() {
  setpres()
  //cull()
  phys()
  //player(50, 50)
}, 2);

var wallcollisions = false
var wallCollisions2 = false
var direction = 0
var lastdirection = 0
var ypos = 0
var xpos = 0
var noclip = false
function player(x, y) {
  xpos = -x
  ypos = y
}
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
var preventSpamE = false
var dash = 0
var jumpheight = 0
var zcam = 0
var dashdecider = false
var Es = 0
var Epreventspamender = 0 

var wallz = document.querySelectorAll(".mainWall")
var culled = []

var mask = document.getElementById("cullMask") //this code is unused because it wouldn't have been that big of an optimization im pretty sure
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

function collision(element, WithIn) {
  var WithWhat = document.querySelectorAll(".mainWall");
  if (WithIn) {
    WithWhat = document.querySelectorAll(WithIn);
  }
  
  var rectSelection = document.getElementById(element).getBoundingClientRect();
  var GoodToGo = 0;
  var varI = -1;
  for (let i = 0; i < WithWhat.length; i++) {
    var rect = WithWhat[i].getBoundingClientRect();
    if ((rect.bottom > rectSelection.top) &&
      (rect.right > rectSelection.left) &&
      (rect.top < rectSelection.bottom) &&
      (rect.left < rectSelection.right))
    {
      GoodToGo++;
	  varI = i
    }
  }
  spans[0].textContent=element;
  if (WithIn) {
    return varI;
  } else {
    return GoodToGo
  }
}


function setpres() {
  preypos = ypos
  preyvel = yvel
  //idk if these are ever used, not sure if i should delete. it's probably fine.
}

function phys() {
  spans[3].innerHTML = "x: "+xpos+"<br>y: "+ypos
  xvel /= 1.2;
  yvel /= 1.1;
  dash /= 1.2;
  
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
  if (noclip) {
  speed = .1
  if (pressedKeys[87]) {
  yvel += .07
  }
  if (pressedKeys[83]) {
  yvel -= .07
  }
  } else {
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
    speed = .04
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
        dash = 1.5
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
  }
  
  if (collision("floorCollideXtra")>0) {
    yvel = -2
  }
  
  if (dash > 0.001) {
    yvel = 0
    ypos = ypos
  }
  }//end noclip
  
  //dialogue
  //or i guess monologue? whatever
  var ii = collision("cullMask", ".npc")
  if (ii>-1) {
	  //nspan.innerHTML = JSON.stringify(eval( npctable[ii].split(".").shift() ))
    if (Es < 1) {
      nspan.innerHTML = eval(npctable[ii].replace(/(?!.+?\.).+/, '') +".name")
      dspan.innerHTML = JSON.stringify(eval(npctable[ii])[Math.round(Es)])
    }
    dbox.style.visibility = "visible"
  } else {
    nspan.innerHTML = ""
    dspan.innerHTML = ""
    dbox.style.visibility = "hidden"
  	Es = 0
  }
  
  if (pressedKeys[69]) { // E
    Epreventspamender += 1
    if (preventSpamE == false) {
      Es += 1 //E's
      preventSpamE = true
      nspan.innerHTML = eval(npctable[ii].replace(/(?!.+?\.).+/, '') +".name")
      dspan.innerHTML = JSON.stringify(eval(npctable[ii])[Math.round(Es)])
      if (dspan.innerHTML == "undefined") {dspan.innerHTML = "<img style='width:200px;height:150px;transform: skew(-.1rad);opacity:.5;' src='https://media.istockphoto.com/id/1251099241/photo/i-dont-know-portrait-of-young-confused-man-in-blue-t-shirt-standing-and-shrugging-shoulders.jpg?s=612x612&w=0&k=20&c=qAViC7P6knDoES00ilJFJAtkUkBqTcs8oxWHe9P7mHI='>"}
	  } else {
      if (Epreventspamender > 250) {
        Es += .08
        nspan.innerHTML = eval(npctable[ii].replace(/(?!.+?\.).+/, '') +".name") //im just gonna copy and paste this. i dont even care
        dspan.innerHTML = eval(npctable[ii])[Math.round(Es)]
        if (dspan.innerHTML == "undefined") {dspan.innerHTML = "<img style='width:200px;height:150px;transform: skew(-.1rad);opacity:.5;' src='https://media.istockphoto.com/id/1251099241/photo/i-dont-know-portrait-of-young-confused-man-in-blue-t-shirt-standing-and-shrugging-shoulders.jpg?s=612x612&w=0&k=20&c=qAViC7P6knDoES00ilJFJAtkUkBqTcs8oxWHe9P7mHI='>"}
	    }
    }
  } else {
    preventSpamE = false;
    Epreventspamender = 0
  }


  spans[5].textContent = Es
  
  //finalizing display
  CG.style.marginLeft = xpos + 3 + "vmin"
      
  CG.style.marginTop = ypos - 1.5 + "vmin"
  pm.style.marginTop = "calc(47vmin - "+ (ypos) +"vmin + 80px)"
  pm.style.marginLeft = "calc(44vmin - "+ (xpos) +"vmin - 20px)"

  document.querySelector("#grounds").style.perspectiveOrigin = "calc(46vmin - "+xpos+"vmin) calc(50vmin - "+ypos+"vmin)"
}

