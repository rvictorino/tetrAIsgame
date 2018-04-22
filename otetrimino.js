class OTetrimino extends Tetrimino {

  constructor() {
    super()

    for (var i = 0; i < 4; i++) {
      this.blocks.push(new Block(this.x, this.y, color(241, 196, 15)))
    }
    this.update()
  }

  update() {
    this.blocks[0].x = this.x + 1
    this.blocks[0].y = this.y
    this.blocks[1].x = this.x + 2
    this.blocks[1].y = this.y
    this.blocks[2].x = this.x + 2
    this.blocks[2].y = this.y + 1
    this.blocks[3].x = this.x + 1
    this.blocks[3].y = this.y + 1
  }

}