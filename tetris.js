class Tetris {

  /*
    Things to keep in mind while developping
    this for future ML playing: input data, e.g.:
    score,
    number of rows done, number of double, triple, quadruples rows done
    current piece type, current piece state (rotation)
    current piece position (x, y)
    all cells states (occuppied or free)
    next piece type
    game overs
    total frames played or pieces played
    actual time played (maybe favorize using down arrow )
  */

  constructor() {
    this.score = 0
    this.cells = []
    this.gameOver = false

    // init game grid
    for(var i = 0; i < 200; i++) {
      this.cells.push(new Cell(i % COLS, floor(i/COLS)))
    }

    // init current and next pieces
    //TODO use cells instead of (x, y) for pieces & blocks
    this.currentPiece = this.getRandomPiece(floor(COLS / 2) - 1, 0)
    this.nextPiece = this.getRandomPiece(15, 15)
  }

  // handy to go from two-dimensionnal (x, y)
  // to one-dimensionnal cells array
  getCell(x, y) { return this.cells[x + y * COLS] }


  getRandomPiece(x, y) {
    //TODO change when all implemented
    switch(floor(random(2))) {
      case 0:
        return new ITetrimino(x, y)
      case 1:
        return new OTetrimino(x, y)
      case 2:
        return new TTetrimino(x, y)
      case 3:
        return new STetrimino(x, y)
      case 4:
        return new ZTetrimino(x, y)
    }
  }



  // called in the loop. Update all entities
  update() {
    if(this.canGoDown()) {
      this.currentPiece.down()
    } else {
      this.fixCurrent()
      this.deleteLines()
    }
  }

  canGoDown() {
    // all blocks are higher than bottom and have a free cell underneath
    return this.currentPiece.blocks.reduce(
      (a, b) => a && (b.y < ROWS-1 ? !this.getCell(b.x, b.y + 1).occupied : false)
    , true)
  }

  //TODO
  canRotate() {
    return true
  }

  canMove(direction) {
    // all blocks are between edges and have a free cell where it wants to move
    return this.currentPiece.blocks.reduce(
      (a, b) => a && (direction > 0 ? b.x < COLS-1 : b.x > 0 ? !this.getCell(b.x + direction, b.y).occupied : false)
    , true)
  }

  fixCurrent() {
    this.currentPiece.blocks.forEach( b => {
      var c = this.getCell(b.x, b.y)
      c.occupied = true
      c.color = b.color
    })

    //FIXME maybe something with references here
    this.currentPiece = this.getRandomPiece(floor(COLS / 2) - 1, 0)
    // this.currentPiece.x = floor(COLS / 2) - 1
    // this.currentPiece.y = 0
    // this.nextPiece = this.getRandomPiece(15, 15)
  }

  deleteLines() {
    //TODO
  }


  rotatePiece() {
    if(this.canRotate()) { this.currentPiece.rotate() }
  }

  movePiece(direction) {
    if(this.canMove(direction)) { this.currentPiece.moveLR(direction) }
  }

  // called in the loop. Dnaw game and entities
  show() {
    //debug only
    this.cells.forEach( c => c.show() )

    this.currentPiece.show()
    this.nextPiece.show()
  }

}
