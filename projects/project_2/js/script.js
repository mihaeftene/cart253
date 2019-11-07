// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.


// Player variables for our predators / spies
let playerCloverSpy;
let playerSamSpy;
let playerAlexSpy;

//display images of our predators/spies
let playerCloverImage;
let playerSamImage;
let playerAlexImage;

//to keep our code organized and clean, we will be using arrays for the spies because they have a few similarities such as display, move, handleEating, handleInput
let playersSpies = [];

// Add our 8 baddies (preys for the cspies to catch)
let baddieFlowerCharacter;
let baddieGangsterCharacter;
let baddieExplorerCharacter;
let baddieDollCharacter;
let baddieClownCharacter;
let baddieFashionistaCharacter;
let baddieRichCharacter;
let baddiePrinceCharacter;

// display images of our baddies
let baddieFlowerImage;
let baddieGangsterImage;
let baddieExplorerImage;
let baddieDollImage;
let baddieClownImage;
let baddieFashionistaImage;
let baddieRichImage;
let baddiePrinceImage;

//add an Array for baddies just as we did for the spies
let characterBaddies = [];

//backgrounds variables
let introBackground;
let instructionsBackground;
let gameOverBackground;
let winningBackground;

//backgrounds that changes in game variables
let outsideBackground;
let goldRoomBackground;
let redRoomBackground;
let paintingBackground;

//pre-load()
//adding a function preload to load images and sound
function preload() {
  //loading all backgrounds
  introBackground = loadImage("assets/images/backgroundIntro.png");
  instructionsBackground = loadImage("assets/images/backgroundInstructions.png");
  winningBackground = loadImage("assets/images/backgroundSuccess.png");
  gameOverBackground = loadImage("assets/images/backgroundGameOver.png");

  //loading all backgrounds for change scenes in gameOverBackground
  outsideBackground = loadImage("assets/images/backgroundOutside.png");
  goldRoomBackground = loadImage("assets/images/backgroundLivingRoom.png");
  redRoomBackground = loadImage("assets/images/backgroundRedRoom.png");
  paintingBackground = loadImage("assets/images/backgroundPainting.png");

  //loading the spies characters
  playerCloverImage = loadImage("assets/images/cloverPlayerCharacter.png");
  playerSamImage = loadImage("assets/images/samPlayerCharacter.png");
  playerAlexImage = loadImage("assets/images/alexPlayerCharacter.png");

  //loading the baddies characters
  baddieFlowerImage = loadImage("assets/images/flowerBadPerson.png");
  baddieGangsterImage = loadImage("assets/images/gangsterBadBoy.png");
  baddieExplorerImage = loadImage("assets/images/explorerBadPerson.png");
  baddieDollImage = loadImage("assets/images/dollBadPerson.png");
  baddieClownImage = loadImage("assets/images/clownBadPerson.png");
  baddieFashionistaImage = loadImage("assets/images/fashionistaBadPerson.png");
  baddieRichImage = loadImage("assets/images/richBadPerson.png");
  baddiePrinceImage = loadImage("assets/images/princeBadPerson.png");
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  //setting up our predators (spies)
  playerCloverSpy = new Predator(200, 200, 10, 100, 84, 70, 71, 72, playerCloverImage); //move CLOVER USING TFGH
  playerSamSpy = new Predator(300, 300, 10, 100, 73, 76, 75, 74, playerSamImage); //move SAM using ILKJ
  playerAlexSpy = new Predator(400, 400, 10, 100, 81, 65, 83, 68, playerAlexImage); //move ALEX using AWSD
  //place our spies into an array
  playersSpies = [playerCloverSpy, playerSamSpy, playerAlexSpy];

  //setting our preys (baddies)
  baddieFlowerCharacter = new Prey(200, 200, 10, 100, 0.5, baddieFlowerImage);
  baddieGangsterCharacter = new Prey(300, 300, 10, 100, 0.5,  baddieGangsterImage);
  baddieExplorerCharacter = new Prey(400, 400, 10, 100, 0.5, baddieExplorerImage);
  baddieDollCharacter = new Prey(200, 200, 10, 100, 0.5, baddieDollImage);
  baddieClownCharacter = new Prey(300, 300, 10, 100, 0.5, baddieClownImage);
  baddieFashionistaCharacter = new Prey(400, 400, 10, 100, 0.5, baddieFashionistaImage);
  baddieRichCharacter = new Prey(200, 200, 10, 100, 0.5, baddieRichImage);
  baddiePrinceCharacter = new Prey(300, 300, 10, 100, 0.5, baddiePrinceImage);
  //place our baddies into an array
  characterBaddies = [baddieFlowerCharacter, baddieGangsterCharacter, baddieExplorerCharacter, baddieDollCharacter, baddieClownCharacter, baddieFashionistaCharacter, baddieRichCharacter, baddiePrinceCharacter];
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  //setting the first background (outside) when game starts
  image(outsideBackground, 0, 0, windowWidth, windowHeight); // display background

  //Display the amount of baddies caught by Clover
  textFont("Impact");
  textAlign(LEFT, TOP);
  textSize(20);
  fill(255, 20, 0);
  text("Clover - Baddies caught: " + playerCloverSpy.baddiesCaught, 600, 20);

  //Display the amount of baddies caught by Sam
  textFont("Impact");
  textAlign(RIGHT, TOP);
  textSize(20);
  fill(220, 220, 0);
  text("Sam - Baddies caught: " + playerSamSpy.baddiesCaught, 400, 20);

  //Display the amount of baddies caught by Alex
  textFont("Impact");
  textAlign(RIGHT, TOP);
  textSize(20);
  fill(0, 0, 255);
  text("Alex - Baddies caught: " + playerAlexSpy.baddiesCaught, 1375, 20);


  // Arrays for the spies's handleInput, move, display and handleEating.
  for (let i = 0; i < playersSpies.length; i++) {
    playersSpies[i].move();
    playersSpies[i].display();
    playersSpies[i].handleInput();
    playersSpies[i].handleEating(baddieFlowerCharacter);
    playersSpies[i].handleEating(baddieGangsterCharacter);
    playersSpies[i].handleEating(baddieExplorerCharacter);
    playersSpies[i].handleEating(baddieDollCharacter);
    playersSpies[i].handleEating(baddieClownCharacter);
    playersSpies[i].handleEating(baddieFashionistaCharacter);
    playersSpies[i].handleEating(baddieRichCharacter);
    playersSpies[i].handleEating(baddiePrinceCharacter);
  }

  // Arrays for the baddie'move, display
  for (let i = 0; i < characterBaddies.length; i++) {
    characterBaddies[i].move();
    characterBaddies[i].display();
  }
}
