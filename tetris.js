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
    this.cells = []
    for(var i = 0; i < 200; i++) {
      this.cells.push(new Cell(i % COLS, floor(i/COLS)))
    }

    //TODO use cells instead of (x, y) for pieces & blocks
    this.currentPiece = this.getRandomPiece(floor(COLS / 2) - 1, 0)
    this.nextPiece = this.getRandomPiece(15, 15)
  }

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

  getCell(x, y) {
    return this.cells[x + y * COLS]
  }


  canGoDown() {
    return this.currentPiece.blocks.reduce( (a, b) => a && (b.y < ROWS-1 ? !this.getCell(b.x, b.y + 1).occupied : false) , true)
  }

  fixCurrent() {
    this.currentPiece.blocks.forEach( b => {
      var c = this.getCell(b.x, b.y)
      c.occupied = true
      c.corlor = b.color
    })
    //TODO maybe something wiith references here
    this.currentPiece = this.nextPiece
    this.currentPiece.x = floor(COLS / 2) - 1
    this.currentPiece.y = 0
    this.nextPiece = this.getRandomPiece(15, 15)
  }


  update() {
    if(this.rotating) {
      this.currentPiece.rotate()
      this.rotating = false
    }

    // always down for now
    if(this.canGoDown()) {
      this.currentPiece.down()
    } else {
      this.fixCurrent()
    }
  }

  show() {
    //debug only
    this.cells.forEach( c => c.show() )

    this.currentPiece.show()
    this.nextPiece.show()
  }

}
