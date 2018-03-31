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
    this.deleting = false

    this.actionCooldown = true
    this.downCooldown = true

    // init game grid
    for (var i = 0 - INVISIBLE_CELLS; i < COLS * ROWS; i++) {
      this.cells.push(new Cell(i % COLS, floor(i / COLS)))
    }

    // init current and next pieces
    this.currentPiece = this.getRandomPiece(floor(COLS / 2) - 1, 0)
    this.nextPiece = this.getRandomPiece(14, 15)
  }

  // handy to go from two-dimensionnal (x, y)
  // to one-dimensionnal cells array
  getCell(x, y) {
    return this.cells[INVISIBLE_CELLS + x + y * COLS]
  }


  getRandomPiece(x, y) {
    //TODO change when all implemented
    switch (floor(random(2))) {
      case 0:
        return new ITetrimino(x, y)
      case 1:
        return new OTetrimino(x, y)

        // case 1:
        //   return new JTetrimino(x, y)
        // case 2:
        //   return new LTetrimino(x, y)
        // case 3:
        //   return new OTetrimino(x, y)
        // case 4:
        //   return new STetrimino(x, y)
        // case 5:
        //   return new TTetrimino(x, y)
        // case 6:
        //   return new ZTetrimino(x, y)
    }
  }

  get speed() {
    return floor(20 / this.level)
  }



  // called in the loop. Update all entities
  update() {
    // check if game is lost
    if (this.spaceOccupied()) {
      this.gameOver = true
      console.log('Game Over !')
    }

    if (this.downCooldown) {
      this.downCooldown = false
      this.resetDownCooldown()
      var canGoDown = this.canGoDown()
      if (canGoDown && !this.fixing) {
        this.currentPiece.down()
      } else if (!canGoDown) {
        // cannot go down: fix next turn
        this.fixing = true
      }

      if (this.deleting) {
        this.deleteLines()
        this.deleting = false
      }

      if (this.fixing) {
        // fix piece to grid
        this.fixCurrent()
        // manage lines
        this.fixing = false

        this.detectLinesToDelete()
      }
      // if (this.scrolling) {
      //   this.scrollBoardDown()
      //   this.scrolling = false
      // }
    }
  }


  spaceOccupied() {
    return this.currentPiece.blocks.reduce((a, b) => a || b.x < 0 || b.x > COLS - 1 || this.getCell(b.x, b.y).occupied, false)
  }


  canGoDown() {
    // all blocks are higher than bottom and have a free cell underneath
    return this.currentPiece.blocks.reduce(
      (a, b) => a && (b.y < ROWS - 1 ? !this.getCell(b.x, b.y + 1).occupied : false), true)
  }


  canRotate() {
    var result = true
    this.currentPiece.rotate()
    if (this.spaceOccupied()) {
      result = false
    }
    for (var i = 0; i < this.currentPiece.maxStates - 1; i++) {
      this.currentPiece.rotate()
    }
    return result
  }

  canMove(direction) {
    // all blocks are between edges and have a free cell where it wants to move
    return this.currentPiece.blocks.reduce(
      (a, b) => a && (direction > 0 ? b.x < COLS - 1 : b.x > 0 ? !this.getCell(b.x + direction, b.y).occupied : false), true)
  }

  fixCurrent() {
    this.currentPiece.blocks.forEach(b => {
      var c = this.getCell(b.x, b.y)
      c.occupied = true
      c.color = b.color
    })

    //FIXME maybe something with references here
    this.currentPiece = this.getRandomPiece(floor(COLS / 2) - 1, 0)
    // this.nextPiece = this.getRandomPiece(15, 15)
  }

  detectLinesToDelete() {
    for (var i = this.cells.length - COLS; i >= 0; i -= COLS) {
      var line = this.cells.slice(i, i + COLS)
      if (line.reduce((a, c) => a && c.occupied, true)) {
        //TODO background should be part of game object?
        line.forEach((c) => c.color = color(51))
        this.deleting = true
      }
    }
  }

  deleteLines() {
    var count = 0
    for (var i = this.cells.length - COLS; i >= 0; i -= COLS) {
      var line = this.cells.slice(i, i + COLS)
      if (line.reduce((a, c) => a && c.occupied, true)) {
        count++
        this.cells.splice(INVISIBLE_CELLS + line[0].y * COLS, COLS)
        // add empty line on top, x,y will be updated just after
        var newLine = new Array(COLS).fill(0).map(() => new Cell(0, 0))
        // we need to spread the created array into splice arguments list
        this.cells.unshift(...newLine)
        this.updateCellsXY()
        // restart for bottom
        i = this.cells.length
      }
    }

    //TODO
    this.score += count
    //this.level++
  }

  updateCellsXY() {
    this.cells.forEach((c, i) => {
      c.x = i % COLS
      c.y = floor(i / COLS) - INVISIBLE_ROWS
    })
  }



  rotatePiece() {
    if (this.canRotate()) {
      this.currentPiece.rotate()
    }
  }

  movePiece(direction) {
    if (this.canMove(direction)) {
      this.currentPiece.moveLR(direction)
    }
  }

  quickFix() {
    while (this.canGoDown())
      this.currentPiece.down()
  }


  resetActionCooldown() {
    setTimeout(() => this.actionCooldown = true, 200)
  }

  resetDownCooldown() {
    setTimeout(() => this.downCooldown = true, this.speed * 10)
  }


  // called in the loop. Dnaw game and entities
  show() {
    //debug only
    this.cells.forEach((c, i) => {
      if (i >= INVISIBLE_CELLS) {
        c.show()
      }
    })

    this.currentPiece.show()
    this.nextPiece.show()
  }

}