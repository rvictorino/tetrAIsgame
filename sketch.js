// Game instance
let game
let i = 0

//TODO follow Tetris Guidelines: 22 rows, 2 hidden at top
const ROWS = 20
const COLS = 10
// canvas and cells calculation
const WIDTH = 400
const SIZE = Math.floor(WIDTH/COLS/2)


function setup() {
  // init canvas, speed and game
  createCanvas(WIDTH, 400)
  game = new Tetris()
}


function draw() {
  // clear canvas
  background(51)
  if(!game.gameOver) {
    // update game and entities state
    if(i == game.speed) {
      game.update()
    }
    // draw entities
    game.show()
  }
  i = i >= game.speed ? 0 : i + 1
}


function keyPressed() {
  // detect human interaction
  // and trigger related action
  if(keyCode == UP_ARROW) {
    //game.rotatePiece()
    game.rotating = true
  } else if(keyCode === LEFT_ARROW) {
    game.moving = -1
  } else if(keyCode === RIGHT_ARROW) {
    game.moving = 1
  } else if(keyCode === DOWN_ARROW) {
    game.quickFix()
  }
}
