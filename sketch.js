let game
// Tetris Guidelines
const ROWS = 20
const COLS = 10

const WIDTH = 400
const SIZE = Math.floor(WIDTH/COLS/2)



function setup() {
  createCanvas(WIDTH, 400)

  frameRate(10)

  game = new Tetris()
}


function draw() {
  background(51)

  game.update()
  game.show()
}


//test purpose
function mouseClicked() {
  game.rotating = true
}
