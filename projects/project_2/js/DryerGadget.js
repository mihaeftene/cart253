// Gadget Number 1: Slow Dryer
//
// A class/gadgets that will slow the spies down.

class DryerGadget {

// constructor
//
// Sets the initial values for the Predator's properties
// Either sets default values or uses the arguments provided
constructor(x, y, speed, radius, scale, image) { //added scale in the constructor to be able to modifiy the scaling each of my baddies
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
  // Health properties
  this.maxHealth = radius;
  this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
  // Display properties
  this.radius = this.health;
  this.scale=scale;
  this.image = image; // display the baddies'images
}

// move
//
// Sets velocity based on the noise() function and the Prey's speed
// Moves based on the resulting velocity and handles wrapping
move() {

}

// handleWrapping
//
// Checks if the prey has gone off the canvas and
// wraps it to the other side if so
handleWrapping() {

}

// display
//
// Draw the prey as an ellipse on the canvas
// with a radius the same size as its current health.
display() {
}

// reset
//
// Set the position to a random location and reset health
// and radius back to default
reset() {

}
}
