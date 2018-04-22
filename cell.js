class Cell {

  constructor(x, y) {
    this.x = x
    this.y = y
    this.occupied = false
    this.color = undefined
  }


  show() {
    noStroke()
    if (this.color) {
      fill(this.color)
    } else {
      noFill()
    }
    rect(this.x * SIZE, (this.y - 2) * SIZE, SIZE, SIZE)
  }
}