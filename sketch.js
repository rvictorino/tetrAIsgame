// Game instance
let game
let nn, inputs, outputs
let games, savedGames

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

const NN_POPULATION = 50


function setup() {
  // init canvas, speed and game
  createCanvas(WIDTH, HEIGHT)

  /**
   I: 226 (3 + 3 + 220) inputs: current piece type & position, next piece type & position, game grid cells (free / occupied) * 220
   H: Arbitrary ??: 25
   O: 5 outputs: Arrow Up, down, left, right, no action
  **/
  games = []
  for (var i = 0; i < NN_POPULATION; i++) {
    nn = new NeuralNetwork(226, 500, 5)
    game = new Tetris(nn)
    games.push(game)
  }
}


function draw() {
  // clear canvas
  background(52, 73, 94)
  games.forEach(g => {
    if (!g.gameOver) {
      // normalize inputs
      inputs = g.normalizedInputs()

      // determine which action to perform
      outputs = g.nn.predict(inputs)

      g.performAction(outputs)

      // update game and entities state
      g.update()

    }

    // draw entities
    // draw only one game of the population
    games[0].show()
  })
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