// Game instance
let game
let i = 0

//TODO follow Tetris Guidelines: 22 rows, 2 hidden at top
const INVISIBLE_ROWS = 2
const ROWS = 20 + INVISIBLE_ROWS
const COLS = 10
const INVISIBLE_CELLS = INVISIBLE_ROWS * COLS // first 2 rows are hidden
// canvas and cells calculation
const WIDTH = 400
const HEIGHT = 400
const SIZE = Math.floor(WIDTH / COLS / 2)


function setup() {
  // init canvas, speed and game
  createCanvas(WIDTH, HEIGHT)
  game = new Tetris()
}


function draw() {
  // clear canvas
  background(51)
  if (!game.gameOver) {
    // update game and entities state
    game.update()
    // draw entities
    game.show()
  }
}


function keyPressed() {

  // define delay between actions
  if (!game.actionCooldown) {
    return
  }

  // start cooldown
  if ([UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW].includes(keyCode)) {
    game.actionCooldown = false
    game.resetActionCooldown()
  }

  // detect human interaction
  // and trigger related action
  switch (keyCode) {
    case UP_ARROW:
      game.rotatePiece()
      break
    case LEFT_ARROW:
      game.movePiece(-1)
      break
    case RIGHT_ARROW:
      game.movePiece(1)
      break
    case DOWN_ARROW:
      game.quickFix()
      break
  }
}