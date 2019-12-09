//items
//A class parent that represents all items in the game (clues, consummable items)

class Items {
  // constructor
  //
  // Sets the initial values for the stick properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, scale, image) { //added the scale to be able to modify the size of items
    // Position
    this.x = random(0, windowWidth);
    this.y = random(0, windowWidth);
    this.speed = speed;
    // Display properties
    this.scale = scale;
    this.image = image;
  }

  // display()
  //
  // Display the item
  display() {
    push();
    noStroke();
    image(this.image, this.x, this.y, this.image.width * this.scale, this.image.height * this.scale);
    pop();
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
