//Courage's most hated item: Poison
//Once drank this poison  will raise will bring your Courage to the max

class Poison extends Items {
  // constructor
  //
  // Sets the initial values for poison property
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, scale, image) {
    super(x, y, speed, radius, scale, image);
    this.isEaten = false; //the poison is not drank yet
    this.timer = 0;
    this.startTime = 0;
  }

  // once the user has drank the poison , the courage bar will go back to its initial state (full)
  DropCourage(dog) {
    // console.log("RaiseCourage")
    let d = dist(this.x, this.y, dog.x, dog.y);
    //  console.log(d);
    // check if the player and gadget overlaps
    if (d < (this.image.width * this.scale) && this.isEaten === false) {
      //The courage energy is = to the max Energy that courage has been assigned to
      courageEnergy === 0;
      this.isEaten = true; //the poison has been drank!
      this.startTime = millis(); //starts the counter of 10 sec
      console.log("coll")
      this.timer = 0;
    }

  }

}
