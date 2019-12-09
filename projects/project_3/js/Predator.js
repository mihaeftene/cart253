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
  constructor(x, y, speed, radius, upKey, downKey, leftKey, rightKey, space, scale, image, theBulletImage) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;

    // Display properties
    this.scale = scale; //scale of the f
    this.image = image; // display the spies'images
    //Adding the tint of the Image
    this.alpha = 255; //
    // Input properties
    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    //setting the special skill - heart shooter
    this.space = space;
    //tracking how many baddies each dog has caught
    this.baddiesCaught = 0;
    //setting the if dead case
    this.dogGone = false;
    //setting the if win scene (I seriously am not sure why its not displaying but its an initiave at least)
    this.dogWin = false;

    //shoot hearts
    this.bulletHeart = [];
    this.bulletImage = theBulletImage;
    this.maxSpeed = 5;
    this.angle= PI;
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
      if (powerEnergy === 100) {
        this.shootHearts();
      }

    }
  }

  shootHearts() {
    //console.log("shoot");
  var newBullet = {
      // Bullets should start at the location of the dog firing
      x: this.x,
      y: this.y,
      // And they should have a velocity matching the dogs' angle
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
 // Check if they hit the other dog and update its size
 // Note that in this simple version we never actually delete bulletHeart from the
 // array. For that we'd need to use either pop() or splice().
 updateBullets(badMonsters) {
   // Go through all the bulletHeart of this dog
   // (Note this is hugely inefficient since it still looks at bulletHeart that were fired long ago,
   // we should really remove those from the array!)

// console.log(`in handle bullet for ${badMonsters.y}`);

   for (var i = 0; i < this.bulletHeart.length; i++) {
     // Get the bullet based on its index
     let bullet = this.bulletHeart[i];
     // Update its position based on velocity
     bullet.x += bullet.vx;
     bullet.y += bullet.vy;
     // Check if this bullet overlaps

       if (bullet.x > badMonsters.x - badMonsters.image.width / 2 && bullet.x < badMonsters.x + badMonsters.image.width / 2) {
         if (bullet.y > badMonsters.y - badMonsters.image.height  / 2 && bullet.y < badMonsters.y + badMonsters.image.height  / 2) {
           // If so, make the other dog grow (constrained)
           //badMonsters.scale += badMonsters.growPerBullet;
          // badMonsters.scale = constrain(badMonsters.scale, badMonsters.minSize, badMonsters.maxSize);
          console.log("hit");

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

  // handleEating()
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleEating(prey) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      timeToGrowPower = 0;
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      prey.health -= this.healthGainPerEat;
      // Check if the prey died and reset it if so
      if (prey.health < 0) {
        this.baddiesCaught += 1;
        itemCaughtSound.play(); //plays the catch sound when someone gets caught by spies
        prey.reset();
      }
    }
  }

  // check the state is alive
  checkIfAlive() {
    if (this.health < 0.1 && this.health > 0) { //check if its alive or not
      this.dogGone = true;
    }
  }

  //setting another scene ending - in this case it would be a happy ending.
  checkIfSceneSwitch() {
    if (this.baddiesCaught === 4) { //triggers that amount of baddies that each dog should get
      console.log("itstrue") // I feel like this part is half working. It does not trigger the amount of spies properly but it was an iniative.
    }
  }

  // display()
  //
  // draw the images of the spies
  // with a radius the same size as its current health.
  display() {
    push();
    this.radius = this.health;
    tint(255, this.alpha); //adding the fading/ invisible
    image(this.image, this.x, this.y, this.image.width * this.scale, this.image.height * this.scale);
    fill(255);
    pop();

    // Go through all the bullets and display the image for each one

   for (var i = 0; i < this.bulletHeart.length; i++) {
     //console.log(this.bulletHeart[i].x);
     push();

     image(this.bulletImage, this.bulletHeart[i].x, this.bulletHeart[i].y, 50, 50);

     pop();

   }
  }

  // reset()
  //
  // Reset positions, locations and values of Pokeballs (predators)
  reset() {
    this.radius = 200; //size of spies
    this.y = random(0, windowHeight);
    this.dogGone = false;
    this.dogWin = false;
    this.baddiesCaught = 0;
    this.alpha = 255; //fadding and invisbility being reseted
  }
}
