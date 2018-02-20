class ITetrimino extends Tetrimino {

  constructor(x, y, size) {
    super(x, y)
    this.maxStates = 2

    for(var i = 0; i < 4; i++) {
      this.blocks.push(new Block(x, y, 0, i, size, color(82, 179, 217)))
    }
  }

  update() {
    switch (this.state) {
      case 0:
        this.blocks.forEach( (b, i) => {
          b.xyOffset = 0 + this.x
          b.yOffset = i + this.y
        })
        break
      case 1:
        this.blocks.forEach( (b, i) => {
          b.xyOffset = i + this.x
          b.yOffset = 0 + this.y
        })
        break
    }
  }
}
