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
    this.score = 0;
    this.rotating = false
    this.movingDirection = 0
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

  canMove() {
    // all blocks are between edges and have a free cell where it wants to move
    return this.currentPiece.blocks.reduce(
      (a, b) => a && ((b.x < COLS-1 && b.x > 0) ? !this.getCell(b.x + this.movingDirection, b.y).occupied : false)
    , true)
  }

  fixCurrent() {
    this.currentPiece.blocks.forEach( b => {
      var c = this.getCell(b.x, b.y)
      c.occupied = true
      c.color = b.color
    })
    //TODO maybe something wiith references here
    this.currentPiece = this.getRandomPiece(floor(COLS / 2) - 1, 0)
    // this.currentPiece.x = floor(COLS / 2) - 1
    // this.currentPiece.y = 0
    // this.nextPiece = this.getRandomPiece(15, 15)
  }

  // called in the loop. Update all entities
  update() {
    if(this.canGoDown()) {
      this.currentPiece.down()
    } else {
      this.fixCurrent()
    }

    if(this.rotating && this.canRotate()) {
      this.currentPiece.rotate()
      this.rotating = false
    }
    if(this.movingDirection !== 0 && this.canMove()) {
      this.currentPiece.moveLR(this.movingDirection)
    }
    // reset state
    this.rotating = false
    this.movingDirection = 0
  }

  // called in the loop. Dnaw game and entities
  show() {
    //debug only
    this.cells.forEach( c => c.show() )

    this.currentPiece.show()
    this.nextPiece.show()
  }

}
