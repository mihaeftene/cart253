//Courage's most hated item: Poison
//Once the poison has been drank this poison will kill you and result a gameover

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

  // once the user has drank the poison , the courage bar will instantly drop and make a game over
  DropCourage(dog) {
    let d = dist(this.x, this.y, dog.x, dog.y);
    //  console.log(d);
    // check if the player and gadget overlaps
    if (d < (this.image.width * this.scale) && this.isEaten === false) {
      //The courage energy will drop at 0 and make a game over
      this.isEaten = true; //the poison has been drank!
      courageEnergy = 0; //drops the courage bar completely
      console.log("Drop that hp bar")
      this.startTime = millis(); //starts the counter of 10 sec
      console.log("That annoying Poison")
      this.timer = 0;
    }
  }
}
