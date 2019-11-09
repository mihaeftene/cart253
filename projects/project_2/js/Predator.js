// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.

class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, upKey, downKey, leftKey, rightKey, image, alpha) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    // Display properties
    this.radius = this.health; // Radius is defined in terms of health
    this.image = image; // display the spies'images
    //Adding the tint of the Image
    this.alpha = 255; //
    // Input properties
    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    //tracking how many baddies each spy has caught
    this.baddiesCaught = 0;
    //setting the if dead case
    this.spyGone = false;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    } else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the predator has gone off the canvas and
  // wraps it to the other side if so
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

  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleEating(prey) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      prey.health -= this.healthGainPerEat;
      // Check if the prey died and reset it if so
      if (prey.health < 0) {
        this.baddiesCaught += 1;
        itemCaughtSound.play();
        prey.reset();
        console.log("make noise");
      }
    }
  }

  // check the state is alive
  checkIfAlive() {
    if (this.health < 0.1 && this.health > 0) { //check if its alive or not
      this.spyGone = true;
    }
  }

  // display
  //
  // draw the images of the spies
  // with a radius the same size as its current health.
  display() {
    push();
    this.radius = this.health;
    tint(255, this.alpha); //adding the fading/ invisible
    image(this.image, this.x, this.y, 2 * this.radius, 2 * this.radius);
    fill(255);
    //adding the text to show the player how many baddies he caught
    text("You caught: " + this.baddiesCaught, this.x, this.y + this.radius + 10);
    pop();
  }
  // reset()
  //
  // Reset positions, locations and values of Pokeballs (predators)
  reset() {
    this.radius = 200; //size of spies
    this.health = this.radius;
    this.x = random(0, windowWidth);
    this.y = random(0, windowHeight);
    this.spyGone = false;
    this.baddiesCaught = 0;
    this.alpha = 255; //fadding and invisbility being reseted
  }
}
