class OTetrimino extends Tetrimino {

  constructor() {
    super()

    for (var i = 0; i < 4; i++) {
      this.blocks.push(new Block(this.x, this.y, color(241, 196, 15)))
      this.next.push(new Block(this.x, this.y, color(0)))
    }

    this.update()
    this.computeNextState()
  }


  update(next) {
    var blocks = next ? this.next : this.blocks
    blocks[0].x = this.x + 1
    blocks[0].y = this.y
    blocks[1].x = this.x + 2
    blocks[1].y = this.y
    blocks[2].x = this.x + 2
    blocks[2].y = this.y + 1
    blocks[3].x = this.x + 1
    blocks[3].y = this.y + 1
  }

}