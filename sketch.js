let game
const ROWS = 20
const COLS = 10



function setup() {
  createCanvas(200, 400)
  // Tetris Guidelines

  cellSize = floor(width/COLS)
  frameRate(5)


  game = new Tetris(cellSize)
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
