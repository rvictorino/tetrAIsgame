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

  constructor(cellSize) {
    this.score = 0;
    this.rotating = false
    this.cells = []
    for(var i = 0; i < 200; i++) {
      this.cells.push(new Cell(i % COLS, floor(i/COLS), cellSize))
    }
    
    //TODO use cells instead of (x, y) for pieces & blocks
    this.currentPiece = this.getRandomPiece(0, 0, cellSize)
    //this.nextPiece = this.getRandomPiece()
  }

  getRandomPiece(x, y, size) {
    //TODO change when all implemented
    switch(floor(random(2))) {
      case 0:
        return new ITetrimino(x, y, size)
      case 1:
        return new OTetrimino(x, y, size)
      case 2:
        return new TTetrimino(x, y, size)
      case 3:
        return new STetrimino(x, y, size)
      case 4:
        return new ZTetrimino(x, y, size)
    }
  }

  getCell(x, y) {
    return this.cells[x + y * COLS]
  }

  update() {
    if(this.rotating) {
      this.currentPiece.rotate()
      this.rotating = false
    }

    // always down for now
    this.currentPiece.down()
  }

  show() {
    //debug only
    this.cells.forEach( c => c.show() )

    this.currentPiece.show()
    //this.nextPiece.show()
  }

}
