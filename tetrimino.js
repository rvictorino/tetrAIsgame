class Tetrimino {
  /*
    Make this an abstract class and
    make one tetrimino by type with its own
    update function
  */
  constructor(x, y) {
    this.x = x
    this.y = y
    this.blocks = []
    this.state = 0
  }

  down() {
    this.y++
    this.update()
  }

  rotate() {
    console.log('rotate')
    this.state = (this.state + 1) % this.maxStates
    this.update()
  }

  moveLR(dir) {
    this.x += dir
  }

  show() { this.blocks.forEach( b => b.show() ) }
}
