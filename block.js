class Block {

  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.color = color
  }
  

  show() {
    fill(this.color)
    noStroke()
    rect(this.x * SIZE, this.y * SIZE, SIZE, SIZE)
  }
}
