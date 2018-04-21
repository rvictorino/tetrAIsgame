class STetrimino extends Tetrimino {

  constructor(x, y) {
    super(x, y)

    for (var i = 0; i < 4; i++) {
      this.blocks.push(new Block(x, y, color(46, 204, 113)))
    }
    this.update()
  }


  update() {
    switch (this.state) {
      case 0:
        this.blocks[0].x = this.x
        this.blocks[0].y = this.y + 1
        this.blocks[1].x = this.x + 1
        this.blocks[1].y = this.y + 1
        this.blocks[2].x = this.x + 1
        this.blocks[2].y = this.y
        this.blocks[3].x = this.x + 2
        this.blocks[3].y = this.y
        break
      case 1:
        this.blocks[0].x = this.x + 1
        this.blocks[0].y = this.y
        this.blocks[1].x = this.x + 1
        this.blocks[1].y = this.y + 1
        this.blocks[2].x = this.x + 2
        this.blocks[2].y = this.y + 1
        this.blocks[3].x = this.x + 2
        this.blocks[3].y = this.y + 2
        break
      case 2:
        this.blocks[0].x = this.x + 2
        this.blocks[0].y = this.y + 1
        this.blocks[1].x = this.x + 1
        this.blocks[1].y = this.y + 1
        this.blocks[2].x = this.x + 1
        this.blocks[2].y = this.y + 2
        this.blocks[3].x = this.x
        this.blocks[3].y = this.y + 2
        break
      case 3:
        this.blocks[0].x = this.x + 1
        this.blocks[0].y = this.y + 2
        this.blocks[1].x = this.x + 1
        this.blocks[1].y = this.y + 1
        this.blocks[2].x = this.x
        this.blocks[2].y = this.y + 1
        this.blocks[3].x = this.x
        this.blocks[3].y = this.y
        break
    }
  }
}