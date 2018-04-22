class TTetrimino extends Tetrimino {

  constructor() {
    super()

    for (var i = 0; i < 4; i++) {
      this.blocks.push(new Block(this.x, this.y, color(155, 89, 182)))
      this.next.push(new Block(this.x, this.y, color(0)))
    }

    this.update()
    this.computeNextState()
  }


  update(next) {
    var state = next ? this.nextState : this.state
    var blocks = next ? this.next : this.blocks
    switch (state) {
      case 0:
        blocks[0].x = this.x + 1
        blocks[0].y = this.y
        blocks[1].x = this.x
        blocks[1].y = this.y + 1
        blocks[2].x = this.x + 1
        blocks[2].y = this.y + 1
        blocks[3].x = this.x + 2
        blocks[3].y = this.y + 1
        break
      case 1:
        blocks[0].x = this.x + 2
        blocks[0].y = this.y + 1
        blocks[1].x = this.x + 1
        blocks[1].y = this.y
        blocks[2].x = this.x + 1
        blocks[2].y = this.y + 1
        blocks[3].x = this.x + 1
        blocks[3].y = this.y + 2
        break
      case 2:
        blocks[0].x = this.x + 1
        blocks[0].y = this.y + 2
        blocks[1].x = this.x + 2
        blocks[1].y = this.y + 1
        blocks[2].x = this.x + 1
        blocks[2].y = this.y + 1
        blocks[3].x = this.x
        blocks[3].y = this.y + 1
        break
      case 3:
        blocks[0].x = this.x
        blocks[0].y = this.y + 1
        blocks[1].x = this.x + 1
        blocks[1].y = this.y + 2
        blocks[2].x = this.x + 1
        blocks[2].y = this.y + 1
        blocks[3].x = this.x + 1
        blocks[3].y = this.y
        break
    }
  }
}