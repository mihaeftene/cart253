// Items
//
// A class that represents one of the stolen gadgets called "Hidden Redo Lipstick"
//If a player touches this gadget they become visible again
//this gadget uses the noise function to go around randomly

class Items {
  // constructor
  //
  // Sets the initial values for the stick properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, scale, image) { //added scale in the constructor to be able to modifiy the scaling each of my gadgets
    // Position
    this.x = random(0, windowWidth);
    this.y = random(0, windowWidth);
    this.speed = speed;
    // Display properties
    this.scale = scale;
    this.image = image; // To display the stick image (its one of the gadgets)
  }
  // display()
  //
  // Display the gadget (Redo hidden stick)
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
