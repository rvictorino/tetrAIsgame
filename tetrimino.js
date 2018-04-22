class Tetrimino {
  /*
    Make this an abstract class and
    make one tetrimino by type with its own
    update function
  */
  constructor() {
    this.x = COLS / 2 - 2
    this.y = -1
    this.blocks = []
    this.state = 0
  }

  down() {
    this.y += 1
    this.update()
  }

  rotate() {
    this.state = (this.state + 1) % MAX_ROTATIONS
    this.update()
  }

  moveLR(dir) {
    this.x += dir
  }

  show(x, y) {
    this.blocks.forEach(b => b.show(x, y))
  }
}