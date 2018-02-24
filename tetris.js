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
    this.level = 1
    this.cells = []
    this.gameOver = false
    this.fixing = false
    this.scrolling = false
    this.moving = 0

    // init game grid
    for(var i = 0; i < COLS * ROWS; i++) {
      this.cells.push(new Cell(i % COLS, floor(i/COLS)))
    }

    // init current and next pieces
    this.currentPiece = this.getRandomPiece(floor(COLS / 2) - 1, 0)
    this.nextPiece = this.getRandomPiece(14, 15)
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

  get speed() {
    return floor(20 / this.level)
  }



  // called in the loop. Update all entities
  update() {
    // check if game is lost
    if(this.spaceOccupied()) {
      this.gameOver = true
      console.log('Game Over !')
    }

    // this.rotatePiece()

    if(this.moving != 0) {
      this.movePiece(this.moving)
      this.moving = 0
    }

    var canGoDown = this.canGoDown()
    if(canGoDown && !this.fixing) {
      this.currentPiece.down()
    } else if(!canGoDown) {
      // cannot go down: fix next turn
      this.fixing = true
    }

    if(this.fixing) {
      // fix piece to grid
      this.fixCurrent()
      // manage lines
      this.deleteLines()
      this.fixing = false
    }

    if(this.scrolling) {
      this.scrollBoardDown()
      this.scrolling = false
    }
  }


  spaceOccupied(){
    return this.currentPiece.blocks.reduce( (a, b) => a || b.x < 0  || b.x > COLS - 1 || this.getCell(b.x, b.y).occupied, false )
  }


  canGoDown() {
    // all blocks are higher than bottom and have a free cell underneath
    return this.currentPiece.blocks.reduce(
      (a, b) => a && (b.y < ROWS-1 ? !this.getCell(b.x, b.y + 1).occupied : false)
    , true)
  }


  canRotate() {
    var result = true
    this.currentPiece.rotate()
    if(this.spaceOccupied()) {
      result = false
    }
    for(var i = 0; i < this.currentPiece.maxStates - 1; i++) {
      this.currentPiece.rotate()
    }
    return result
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
    //   console.log('a')
    //   this.currentPiece.rotate()
    // }OLS / 2) - 1, 0)
    // this.currentPiece.x = floor(COLS / 2) - 1
    // this.currentPiece.y = 0
    // this.nextPiece = this.getRandomPiece(15, 15)
  }

  deleteLines() {
    var lines = this.detectLines()
    console.log(lines.length)
    if(lines.length > 0){
      lines.forEach( l => {
        l.forEach( c => c.occupied = false )
      })
      this.scrolling = true
    }

    //TODO
    this.score += lines.length
    //this.level++
  }


  detectLines() {
    var lines = []
    for(var i = 0; i < ROWS; i++) {
      var line = []
      for(var j = 0; j - COLS; j++) {
        line.push(this.getCell(j, i))
      }
      if(line.reduce( (a, c) => a && c.occupied , true)) {
        lines.push(line)
      }
    }
    return lines
  }

  scrollBoardDown(lines) {
    // slice array, add lines up
    //TODO

    // reset x & y for all cells
    //TODO
    // for(var i = 0; i < this.cells.length; i++) {
    //   this.cells[i].x = i % COLS
    //   this.cells[i].y = floor(i / ROWS) //TODO <- wrong calculation here
    // }
  }


  rotatePiece() {
    console.log(this.canRotate()  )
    if(this.canRotate()) { this.currentPiece.rotate() }
  }

  movePiece(direction) {
    if(this.canMove(direction)) { this.currentPiece.moveLR(direction) }
  }

  quickFix() {
    while(this.canGoDown())
      this.currentPiece.down()
  }

  // called in the loop. Dnaw game and entities
  show() {
    //debug only
    this.cells.forEach( c => c.show() )

    this.currentPiece.show()
    this.nextPiece.show()
  }

}
