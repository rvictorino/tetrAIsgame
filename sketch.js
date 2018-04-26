let nn, inputs, outputs
let ga, game
let brainOK, brainKO

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

// GA
const NN_POPULATION = 50
const MAX_GENERATIONS = 50
const VIZ_NB_PER_LINE = 10
const VIZ_SIZE =  Math.floor(BASE_WIDTH / VIZ_NB_PER_LINE)
const IMG_PADDING = 5

// switch from player to IA playing mode
const PLAYER_MODE = false

function preload() {
  brainOK = loadImage('assets/brain_64_OK.png')
  brainKO = loadImage('assets/brain_64_KO.png')
}


function setup() {
  // init canvas, speed and game
  createCanvas(WIDTH * (PLAYER_MODE ? 1 : 2), HEIGHT)

  if(PLAYER_MODE) {
    game = new Tetris()
  } else {
    /** Neural Networks settings:
     I: 226 (3 + 3 + 220) inputs: current piece type & position, next piece type & position, game grid cells (free / occupied) * 220
     H: Arbitrary ??: 500
     O: 5 outputs: Arrow Up, down, left, right, no action
    **/
    ga = new GA(NN_POPULATION, MAX_GENERATIONS,
      // individual creation function
      () =>  new Tetris(new NeuralNetwork(226, 500, 5)),
      // fitness function: score + time played
      i  => i.score + (Date.now() - i.startTime),
      // crossover function
      function(a, b) {
        var child1 = new NeuralNetwork(226, 500, 5)
        var child2 = new NeuralNetwork(226, 500, 5)
        child1.crossover(a, b)
        child2.crossover(b, a)
        return [child1, child2]
      },
      // mutation function
      i => i.nn.mutate(0.1),
      // function to know if inviv is in final state, waiting to evolve to next gen
      i => i.gameOver,
      // run function, going through individual lifecycle
      i => {
        // normalize inputs
        var inputs = i.normalizedInputs()

        // determine which action to perform
        var outputs = i.nn.predict(inputs)

        // act as a smart machine :)
        i.performAction(outputs)

        // update game and entities state
        i.update()
      })
  }
}


function draw() {
  // clear canvas
  background(52, 73, 94)
  if(PLAYER_MODE && !game.gameOver) {
    game.update()
    game.show()
  } else {
    // evolve if needed
    if(ga.needToEvolve() && ga.currentGen < MAX_GENERATIONS) {
      ga.nextGen()
    }

    // show data about population
    ga.show()

    // play all!
    ga.run()

    // draw only the best of previous gen
    ga.best.show()
  }
}


function keyPressed() {
  if(!PLAYER_MODE)
    return
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
