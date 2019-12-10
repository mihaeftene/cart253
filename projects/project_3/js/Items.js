//Items
//A class parent that represents all items in the game (clues, consummable items)

class Items {
  // constructor
  //
  // Sets the initial values for the stick properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, scale, image) { //added the scale to be able to modify the size of items
    // Position
    this.x = random(0, windowWidth);
    this.y = random(0, windowHeight);
    this.speed = speed;
    // Display properties
    this.scale = scale;
    this.image = image;
  }

  // display()
  //
  // Display the item
  display() {
    if (this.isEaten === true) { //if the item has been eaten start the timer
      //timer for the pie to disappear
      this.timer = millis() - this.startTime;
      if (this.timer > 10000) { //10 seconds before spawning
        //if it has not been eaten. position it randomly
        this.isEaten = false;
        this.x = random(0, width);
        this.y = random(0, height);
      }
      return;
    }
    push();
    noStroke();
    //added scaling functionality for my image
    image(this.image, this.x, this.y, this.image.width * this.scale, this.image.height * this.scale);
    pop();
  }

  //making the objects (parent) be constrained
  //constrainToScreen()
  constrainToScreen() {
    this.x = constrain(this.x, 0, (width - this.image.width));
    this.y = constrain(this.y, 0, (height - this.image.height));
  }

  // reset()
  //
  // Set the position to a random location.
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
  }
}
