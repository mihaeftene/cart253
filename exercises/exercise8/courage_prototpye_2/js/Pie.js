//
//
// A class that represents one of the stolen gadgets called "Hidden Redo Lipstick"
//If a player touches this gadget they become visible again
//this gadget uses the noise function to go around randomly

class Pie extends Items {
  // constructor
  //
  // Sets the initial values for the stick properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, scale, image) {
    super(x, y, speed, radius, scale, image);
    this.isEaten = false; //the pie is not eaten yet
    this.timer = 0;
    this.startTime  = 0;
  }


  display() {
    if (this.isEaten ===true) {
      //timer for the pie poof
      this.timer = millis()-this.startTime;
      console.log(this.timer);
      if(this.timer >10000){
        this.isEaten =false;
        this.x = random(0,width);
        this.y = random(0,height);
      }
      return;
    }
    push();
    noStroke();
    //added scaling functionality for my image
    image(this.image, this.x, this.y, this.image.width * this.scale, this.image.height * this.scale);
    pop();
  }

  // If a player touches this gadget, their speed will be reduced
  RaiseCourage(dog) {
  //  console.log("RaiseCourage")
    let d = dist(this.x, this.y, dog.x, dog.y);
    //  console.log(d);
    // check if the player and gadget overlaps
    if (d < (this.image.width * this.scale)&&this.isEaten ===false) {
      //The courage energy is = to the max Energy that courage has been assigned to
      courageEnergy = maxCourageEnergy;
      this.isEaten = true; //the pie has been eaten!
      this.startTime =millis();
      console.log("coll")
      this.timer=0;
      }

  }

}
