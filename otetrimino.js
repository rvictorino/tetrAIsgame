class OTetrimino extends Tetrimino {

  constructor(x, y, size) {
    super(x, y)
    this.maxStates = 1

    var color = color(245, 171, 53)

    this.blocks.push(new Block(x, y, color))
    this.blocks.push(new Block(x+1, y, color))
    this.blocks.push(new Block(x+1, y+1, color)
    this.blocks.push(new Block(x, y+1, color)
  }

  update() {
    this.blocks[0].x = this.x
    this.blocks[0].y = this.y
    this.blocks[1].x = this.x + 1
    this.blocks[1].y = this.y
    this.blocks[2].x = this.x + 1
    this.blocks[2].y = this.y + 1
    this.blocks[3].x = this.x
    this.blocks[3].y = this.y + 1
  }
}
