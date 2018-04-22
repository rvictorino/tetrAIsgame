// Game instance
let game
let i = 0
let noDown = false

function toggleDown() {
  noDown = !noDown
}

// follows Tetris Guidelines: 22 rows, 2 hidden at top
const INVISIBLE_ROWS = 2
const ROWS = 20 + INVISIBLE_ROWS
const COLS = 10
const INVISIBLE_CELLS = INVISIBLE_ROWS * COLS // first 2 rows are hidden
const MAX_ROTATIONS = 4

// canvas and cells calculation
const BASE_WIDTH = 400
const SIZE = Math.floor(2 * (BASE_WIDTH) / 3 / COLS)
const WIDTH = (COLS + 6) * SIZE
const HEIGHT = (ROWS - INVISIBLE_ROWS) * SIZE


function setup() {
  // init canvas, speed and game
  createCanvas(WIDTH, HEIGHT)
  game = new Tetris()
}


function draw() {
  // clear canvas
  background(52, 73, 94)
  if (!game.gameOver) {
    // update game and entities state
    game.update()
    // draw entities
    game.show()
  }
}


function keyPressed() {
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