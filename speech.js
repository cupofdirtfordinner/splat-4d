const npctable = [ //in order of being definied in the level file
  'speech.grabaldoh.one',
  'speech.sglogglest'
  ]
const speech = {
  "grabaldoh": {
    //pronounced gra-baah-ldo, like italian
	"name": "<span style='color: lime; font-family: cursive;'>Grabaldoh</Span>",
    "one": [ //I could just do this as words instead of numbers, or I could just use an array, but this is easier to keep track of in my head.
  	  "Hello, gaybo!",
      "You look stuck in the floor. Press WASD to move about!",
      "oh yeah! those were some moves!<br><span style='font-size:.7em;opacity:.5;'>(I assume you just moved around then, I have no way of knowing. I have no eyes)</span>",
      "I am <span style='color: lime; font-family: cursive;'>Grabaldoh</Span>, but you can just call me <span style='color: lime; font-family: cursive;'>Rabaldo</Span>",
      "<span style='animation:cool 1s linear infinite;'>please go to the right for a while!</span>"
    ],
    "two": [
      "oh yeah!",
      "oh sorry about that, I was just doing some yoga!",
      "how has your journey been so far? <br> <button>awe-inspiring</button> <button>stunningq</button> <button disabled='true'>swaggy</button>(requires SWAG)"
    ]
  },

  "sglogglest": {
    "name": "sglogglest",
    "one": [
      "hello!",
      "splat? more like Poop!"
    ],
    "two": [
      "poop! just kidding!",
      "Lorem? Ipsum! Dolor sit Amet!"
    ]
  }
  
  
}
//I wanted to just use a JSON file, but that seems impossible without a server.
//and, because I usually code on not my home computer, and instead do all of this shit at school, that's not really an option.
//so whatever. not that big of a deal.

//it's unfortunate this is hard-coded, and custom levels won't have custom dialog support.
//actually, I could probably add that really easily by just putting this in level files because it's javascript
//i'll do it later