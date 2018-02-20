class Cell {

  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.size = size
  }


  show() {
    stroke(255)
    noFill()
    rect(this.x * this.size, this.y * this.size, this.size, this.size)
  }
}
