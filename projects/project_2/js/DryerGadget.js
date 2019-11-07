// Gadget Number 1: Slow Dryer
//
// A class/gadgets that will slow the spies down.


// constructor
//
// Sets the initial values for the Predator's properties
// Either sets default values or uses the arguments provided

class DryerGadget extends Gadget {
  constructor(x, y, speed, radius, scale, image) {
    super(x, y, speed, radius, scale, image);
  }
  display() {
    push();
    noStroke();
    //added scaling functionality for my image
    image(this.image, this.x, this.y, this.image.width * this.scale, this.image.height * this.scale);
    pop();
  }

  // If a player touches this gadget, their speed will be reduced
  slowDown(spy) {
    let d = dist(this.x, this.y, spy.x, spy.y);
    // check if the player and gadget overlaps
    if (d < this.radius + spy.radius) {
      //slow down the spy gradually
      spy.speed = spy.speed - 0.3;
      if (spy.speed < 0) {
        spy.speed = 0;
      }
    }
  }
}
