class Block {

  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.color = color
  }


  show(x, y) {
    var xOffset = x || 0
    var yOffset = y || 0
    fill(this.color)
    noStroke()
    rect((this.x + xOffset) * SIZE, (this.y - 2 + yOffset) * SIZE, SIZE, SIZE)
  }
}