class Tetrimino {
  /*
    Make this an abstract class and
    make one tetrimino by type with its own
    update function
  */
  constructor() {
    this.x = COLS / 2 - 2
    this.y = 0
    this.blocks = []
    this.next = []
    this.state = 0
    this.nextState = 1
  }

  down() {
    // debug option
    if (noDown)
      return
    this.y += 1
    this.update()
    this.computeNextState()
  }

  rotate() {
    this.state = (this.state + 1) % MAX_ROTATIONS
    this.nextState = (this.state + 1) % MAX_ROTATIONS
    this.update()
    this.computeNextState()
  }

  update() {}

  computeNextState() {
    this.update(true)
  }

  moveLR(dir) {
    this.x += dir
    this.update()
    this.computeNextState()
  }

  show(x, y) {
    this.blocks.forEach(b => b.show(x, y))
  }
}