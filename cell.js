class Cell {

  constructor(x, y) {
    this.x = x
    this.y = y
    this.occupied = false
    this.color = undefined
  }


  show() {
    stroke(255)
    if(this.color) {
      fill(color)
    } else {
      noFill()
    }
    if(!this.occupied) {
      // debug only
      fill(0, 255, 0)
    }
    rect(this.x * SIZE, this.y * SIZE, SIZE, SIZE)
  }
}
