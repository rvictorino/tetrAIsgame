class OTetrimino extends Tetrimino {

  constructor(x, y, size) {
    super(x, y)
    this.maxStates = 1

    this.blocks.push(new Block(x, y, 0, 0, size, color(248, 148, 6)))
    this.blocks.push(new Block(x, y, 1, 0, size, color(248, 148, 6)))
    this.blocks.push(new Block(x, y, 1, 1, size, color(248, 148, 6)))
    this.blocks.push(new Block(x, y, 0, 1, size, color(248, 148, 6)))
  }

  update() {
    this.blocks.forEach( b => {
      b.y = this.y
      b.x = this.x
    })
  }
}
