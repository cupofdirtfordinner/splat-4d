setInterval(function() {
  stylish()
}, 40);

const x = "x"
const y = "y"
function Gradients(initRGB, toRGB, distance, dimension) {
  var pos = 0
  if (dimension == "x") {
    pos = xpos
  } else if (dimension == "y") {
    pos = ypos
  }
  return ""+ ((xpos / -distance)*(toRGB.r-initRGB.r)+initRGB.r) +", "+ ((xpos / -distance)*(toRGB.g-initRGB.g)+initRGB.g) +", "+ ((xpos / -distance)*(toRGB.b-initRGB.b)+initRGB.b)
}

function stylish() {
  document.getElementById("canvas").style.background = "radial-gradient(circle, rgb("+Gradients( colors3d[0][0], colors3d[1][0], 350, 'x' )+") 0%, rgb("+Gradients( colors3d[0][1], colors3d[1][1], 300, 'x' )+") 50%, rgb("+Gradients( colors3d[0][2], colors3d[1][2], 450, 'x' )+") 100%)"

  //options
  var performancetag = document.querySelectorAll(".performancetag")
  if (document.getElementById("performance").checked) {
    for (let i = 0; i < performancetag.length; i++) {
      performancetag[i].style.display = "none"
    }
  } else {
    for (let i = 0; i < performancetag.length; i++) {
      performancetag[i].style.display = "block"
    }
  }
  //disable anim
  if (document.getElementById("performance").checked) {
    document.getElementById("grounds").style.animation = ""
  } else {
    document.getElementById("grounds").style.animation = "perspectiveAnim 1s linear infinite"
    document.getElementById("grounds").style.animationDirection = "alternate"
    //document.getElementById("grounds").styl
  }
  if (document.getElementById("noclip").checked) {
    noclip = true
  } else {
    noclip = false
  }
}

var colors3d = [
  [ {r:22,g:234,b:254}, {r:83,g:150,b:255}, {r:18,g:255,b:205} ],
  [ {r:220,g:23,b:140}, {r:39,g:222,b:12}, {r:90,g:4,b:6} ],
  [ {}, {}, {} ]
]

//this system isnt nearly as flexible as i'll need it to be (only 2 colors before things go beyond my defined colors)
//gotta think of something else soon. this'll do for now.