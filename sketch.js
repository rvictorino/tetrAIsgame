// Game instance
let game

//TODO follow Tetris Guidelines: 22 rows, 2 hidden at top
const ROWS = 20
const COLS = 10
// canvas and cells calculation
const WIDTH = 400
const SIZE = Math.floor(WIDTH/COLS/2)


function setup() {
  // init canvas, speed and game
  createCanvas(WIDTH, 400)
  frameRate(5)
  game = new Tetris()
}


function draw() {
  // clear canvas
  background(51)
  // update game and entities state
  game.update()
  // draw entities
  game.show()
}


function keyPressed() {
  // detect human interaction
  // and trigger related action
  if(key == ' ') {
    game.rotatePiece()
  } else if(keyCode === LEFT_ARROW) {
    game.movePiece(-1)
  } else if(keyCode === RIGHT_ARROW) {
    game.movePiece(1)
  }
}
