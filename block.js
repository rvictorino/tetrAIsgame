class Block {

  constructor(x, y, xOffset, yOffset, size, color) {
    this.x = x
    this.y = y
    this.xOffset = xOffset
    this.yOffset = yOffset
    this.size = size
    this.color = color
  }

  down() {
    this.y++
  }

  show() {
    fill(this.color)
    noStroke()
    rect((this.xOffset + this.x) * this.size, (this.yOffset + this.y) * this.size, this.size, this.size)
  }
}
