//Courage's favorite pie
//Once eaten this pie will raise will bring your Courage to the max

class Pie extends Items { //Pie is a child from the parent class "Items"
  // constructor
  //
  // Sets the initial values for pie property
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, scale, image) {
    super(x, y, speed, radius, scale, image);
    this.isEaten = false; //the pie is not eaten yet
    this.timer = 0; //the timer has not started
    this.startTime = 0;
  }

  // once the user has eaten the pie, the courage bar will go back to its initial state (full)
  RaiseCourage(dog) {
    let d = dist(this.x, this.y, dog.x, dog.y);
    // check if the player and pie overlaps
    if (d < (this.image.width * this.scale) && this.isEaten === false) {
      //The courage energy is = to the max Energy that courage has been assigned to
      courageEnergy = maxCourageEnergy;
      this.isEaten = true; //the pie has been eaten!
      this.startTime = millis(); //starts the counter of 10 sec
      this.timer = 0;
    }
  }
}
