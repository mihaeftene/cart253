// Class for all gadgets (what do they have in common?)
//
// A class that will store the basic properties of what a gadget can do (move, handleWrapping, reset)
//this is the parent
class Gadget {

// constructor
//
// Sets the initial values for the Predator's properties
// Either sets default values or uses the arguments provided
constructor(x, y, speed, radius, scale, image) { //added scale in the constructor to be able to modify the scaling each of my baddies
  // Position
  this.x = x;
  this.y = y;
  // Velocity and speed
  this.vx = 0;
  this.vy = 0;
  this.speed = speed;
  // Time properties for noise() function
  this.tx = random(0, 1000); // To make x and y noise different
  this.ty = random(0, 1000); // we use random starting values
  // Display properties
  this.scale=scale;
  this.image = image; // display the Dryer Gadget that will slowdown the spies
}

// move
//
// Sets velocity based on the noise() function and the Prey's speed
// Moves based on the resulting velocity and handles wrapping
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
// Checks if the prey has gone off the canvas and
// wraps it to the other side if so
handleWrapping() {
  // Off the left or right
  if (this.x < 0) {
    this.x += width;
  }
  else if (this.x > width) {
    this.x -= width;
  }
  // Off the top or bottom
  if (this.y < 0) {
    this.y += height;
  }
  else if (this.y > height) {
    this.y -= height;
  }
}

// reset
//
// Set the position to a random location and reset health
// and radius back to default
reset() {
  // Random position
  this.x = random(0, width);
  this.y = random(0, height);
}
}
