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

  constructor(nn) {
    this.score = 0
    this.level = 1
    this.cells = []
    this.gameOver = false
    this.fixing = false
    this.scrolling = false
    this.deleting = false

    this.downCooldown = true

    if (nn) {
      this.nn = nn
    }

    // init game grid
    for (var y = 0; y < ROWS; y++) {
      var row = []
      for (var x = 0; x < COLS; x++) {
        row.push(new Cell(x, y))
      }
      this.cells.push(row)
    }

    // init current and next pieces
    this.currentPiece = this.getRandomPiece()
    this.nextPiece = this.getRandomPiece()
  }


  getCell(x, y) {
    if (x < 0 || x > COLS - 1 || y < 0 || y > ROWS - 1)
      return undefined
    return this.cells[y][x]
  }


  getRandomPiece() {
    switch (floor(random(7))) {
      case 0:
        return new ITetrimino()
      case 1:
        return new OTetrimino()
      case 2:
        return new JTetrimino()
      case 3:
        return new LTetrimino()
      case 4:
        return new STetrimino()
      case 5:
        return new ZTetrimino()
      case 6:
        return new TTetrimino()
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
    }
  }


  spaceOccupied() {
    // be more effective with breaking when possible
    for (var b of this.currentPiece.blocks) {
      var cell = this.getCell(b.x, b.y)
      if (cell == undefined || cell.occupied) {
        return true
      }
    }
    return false
  }


  canGoDown() {
    // all blocks are higher than bottom and have a free cell underneath
    for (var b of this.currentPiece.blocks) {
      var cell = this.getCell(b.x, b.y + 1)
      if (cell == undefined || cell.occupied) {
        return false
      }
    }
    return true
  }


  canRotate() {
    // be more effective with breaking when possible
    for (var b of this.currentPiece.next) {
      var cell = this.getCell(b.x, b.y)
      if (cell == undefined || cell.occupied) {
        return false
      }
    }
    return true
  }

  canMove(direction) {
    // all blocks are between edges and have a free cell where it wants to move
    // be more effective with breaking when possible
    for (var b of this.currentPiece.blocks) {
      var cell = this.getCell(b.x + direction, b.y)
      if (b.x + direction < 0 || b.x + direction > ROWS - 1 || cell == undefined || cell.occupied) {
        return false
      }
    }
    return true
  }

  fixCurrent() {
    this.currentPiece.blocks.forEach(b => {
      var c = this.getCell(b.x, b.y)
      c.occupied = true
      c.color = b.color
    })

    this.currentPiece = this.nextPiece
    this.nextPiece = this.getRandomPiece()
  }

  detectLinesToDelete() {
    for (var i = 0; i < this.cells.length; i++) {
      var row = this.cells[i]
      if (row.reduce((a, c) => a && c.occupied, true)) {
        row.forEach((c) => c.color = color(44, 62, 80))
        this.deleting = true
      }
    }
  }

  deleteLines() {
    var count = 0
    for (var i = 0; i < this.cells.length; i++) {
      var row = this.cells[i]
      if (row.reduce((a, c) => a && c.occupied, true)) {
        count++
        this.cells.splice(i, 1)
        var newLine = new Array(COLS).fill(0).map(() => new Cell(0, 0))
        this.cells.unshift(newLine)
        this.updateCellsXY()
      }
    }

    //TODO
    this.score += count
    //this.level++
  }

  updateCellsXY() {
    this.cells.forEach((row, y) => {
      row.forEach((c, x) => {
        c.x = x
        c.y = y
      })
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

  resetDownCooldown() {
    setTimeout(() => this.downCooldown = true, this.speed * 10)
  }


  // called in the loop. Dnaw game and entities
  show() {
    this.cells.forEach((row, i) => {
      if (i >= INVISIBLE_ROWS) {
        row.forEach(c => {
          c.show()
        })
      }
    })

    this.currentPiece.show()

    fill(44, 62, 80)
    rect(COLS * SIZE, 0, WIDTH - COLS * SIZE, ROWS * SIZE)
    this.nextPiece.show(8, 16)

    fill(236, 240, 241)
    textFont('monospace')
    textSize(SIZE)
    textAlign(LEFT, CENTER)
    text(this.score, COLS * SIZE + SIZE, SIZE * 3)
  }

}