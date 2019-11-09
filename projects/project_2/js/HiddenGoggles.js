// Prey
//
// A class that represents one of the stolen gadgets called "Hidden Goggles"
//If a player touches this gadget it make them become "hidden"
//this gadget uses the noise function to go around randomly
//uses alpha to become transparent

class HiddenGoggles {
  // constructor
  //
  // Sets the initial values for the Goggles properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, scale, image) { //added scale in the constructor to be able to modifiy the scaling each of my gadgets
    // Position
    this.x = random(0, windowWidth);
    this.y = random(0, windowWidth);
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 500); // To make x and y noise different
    this.ty = random(0, 500); // we use random starting values
    // Display properties
    this.radius = radius;
    this.scale = scale;
    this.image = image; // To display the googles image (its one of the gadgets)
  }

  // This new class makes the player fade away by reducing the spy's tint (alpha).
  hiddenNow(spy) {
    let d = dist(this.x, this.y, spy.x, spy.y);
    // Check if theres an overlap btw the spies and the gadget
    if (d < this.radius + spy.radius) {
      spy.alpha = spy.alpha - 1;
      if (spy.alpha < 0) {
        spy.alpha = 0;
      }
    }
  }

  // move
  //
  // Sets velocity based on the noise() function and the gadget's speed.
  // Moves based on the resulting velocity and handles wrapping.
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the gadget has gone off the canvas and wraps it to the other side if it did.
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  // display
  //
  // Display the gadget (Hidden Goggles)
  display() {
    push();
    noStroke();
    image(this.image, this.x, this.y, this.image.width * this.scale, this.image.height * this.scale);
    pop();
  }

  // reset
  //
  // Set the position to a random location.
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
  }
}
