// Prey - Monsters
//
// A class that represents a simple prey that moves
// on screen based on a noise() function. It can move around
// the screen and be shot by Courage's bullets - they exist to annoy the player and make him from raising his "power"

class Prey {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, scale, image) { //added scale in the constructor to be able to modifiy the scaling each of my baddies
    // Position
    this.x = x;
    this.y = y;
    //Velocity and speed
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
    this.scale = scale;
    this.image = image; // displays the monsters
    this.isAlive = true; //the prey is alive right now, but i would like them to not be removed from the array once courage has shot them. Instead, I would like them to become "invisible"
  }

  // move()
  //
  // Sets velocity based on the noise() function and the Prey's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    if (this.isAlive === true) {
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
  }

  // handleWrapping()
  //
  // Checks if the prey has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    //if alive make them go around
    if (this.isAlive === true) {
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
  }

  // display()
  //
  // draw the prey (as an image)
  // with a radius the same size as its current health.
  display() {
    //condition where if they are alive (hasent been shot) display them
    if (this.isAlive === true) {
      push();
      noStroke();
      this.radius = this.health;
      //added scaling functionality for my image
      image(this.image, this.x, this.y, this.image.width * this.scale, this.image.height * this.scale);
      pop();
    }
  }

  // reset()
  //
  // Set the position to a random location and reset health
  // and radius back to default
  reset() {

    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
    // Default health
    this.health = this.maxHealth;
    // Default radius
    this.radius = this.health;
    //reset it alive
    this.isAlive = true;

  }
}
