// Predator - Courage
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around the map and catch clues. Once the "power bar" requirement has been reached, it will be able to shoot bullets using the space bar
// the screen and consume Prey objects to maintain its health.

class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, upKey, downKey, leftKey, rightKey, space, scale, image, theBulletImage) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    //speed of the player
    this.speed = speed;
    //radius
    this.radius = radius;
    // Display properties
    this.scale = scale; //scale of the image
    this.image = image; // display the images of the dog
    //Adding the tint of the Image
    this.alpha = 255; //
    // Input properties
    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    //setting the special skill - heart shooter
    this.space = space;
    //tracking how many clues the player has caught
    this.cluesCaught = 0;
    //shoot hearts
    this.bulletHeart = [];
    this.bulletImage = theBulletImage;
    this.maxSpeed = 5;
    this.angle = PI;
    this.reachedNinety = false;
  }

  // handleInput()
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
    // Special Skill movement
    if (keyIsDown(this.space)) {
      //if the energy bar has reached 90 and PLUS (not below), shoot using space key.
      if (powerEnergy >= 90) {
        this.reachedNinety = true;
        this.shootHearts();
      }
      //However, it will decrease overtime and go back to its initial state
      if (this.reachedNinety === true) {
        powerEnergy -= 1;
      }
    }
  }

  //shootHearts()
  //special skills
  shootHearts() {
    var newBullet = {
      // Bullets should start at the location of the dog firing
      x: this.x,
      y: this.y,
      // And they should have a velocity matching the dog'angle
      // but should travel at maximum speed
      vx: this.maxSpeed * cos(this.angle),
      vy: this.maxSpeed * sin(this.angle)
    }
    // Add the bullet to the bulletHeart array of the dog
    this.bulletHeart.push(newBullet);
  }

  // updateBullets()
  //
  // Move all the bulletHeart fired by this dog
  // Note that in this simple version we never actually delete bulletHeart from the
  // array. For that we'd need to use either pop() or splice().
  updateBullets(badMonster) {
    // Go through all the bulletHeart of this dog
    // (Note this is hugely inefficient since it still looks at bulletHeart that were fired long ago,
    // we should really remove those from the array!)
    //use of for loop for bulletheart
    for (var i = 0; i < this.bulletHeart.length; i++) {
      // Get the bullet based on its index
      let bullet = this.bulletHeart[i];
      // Update its position based on velocity
      bullet.x += bullet.vx;
      bullet.y += bullet.vy;
      // Check if this bullet overlaps
      if (bullet.x > badMonster.x - badMonster.image.width / 2 && bullet.x < badMonster.x + badMonster.image.width / 2) {
        if (bullet.y > badMonster.y - badMonster.image.height / 2 && bullet.y < badMonster.y + badMonster.image.height / 2) {
          // If so, make the other dog grow (constrained)
          badMonster.isAlive = false; //if the bad monster is not alive do not shoot
        }
      }
    }
  }

  // move()
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

  // handleWrapping()
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

//handles the clues part. Gives the possibility for a clue to be collected
  //handleEatingClue()
  //
  handleEatingClue(clue) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, clue.x, clue.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < (this.radius + clue.radius) && clue.isAlive === true) {
      timeToGrowPower = 0;
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      //update the clues caught score if its not alive anymore
      this.cluesCaught += 1;
      itemCaughtSound.play(); //plays the catch sound when someone gets caught by spies
      clue.isAlive = false; //the clue is not alive anymore
    }
  }

  // display()
  //
  // draw the image
  // with a radius the same size as its current health.
  display() {
    push();
    tint(255, this.alpha); //adding the fading/ invisible
    image(this.image, this.x, this.y, this.image.width * this.scale, this.image.height * this.scale);
    fill(255);
    pop();
    // Go through all the bullets and display the image for each one
    for (var i = 0; i < this.bulletHeart.length; i++) {
      push();
      image(this.bulletImage, this.bulletHeart[i].x, this.bulletHeart[i].y, 50, 50);
      pop();
    }
  }

  // reset()
  //
  //Reset positions, locations and values
  reset() {
    this.y = random(0, windowHeight);
    this.cluesCaught = 0;
    this.alpha = 255; //fadding and invisbility being reseted
  }
}
