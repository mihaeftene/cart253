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

// The three prey
let antelope;
let zebra;
let bee;

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

}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  //setting up our predators (spies)
  playerCloverSpy = new Predator(100, 100, 5, color(200, 200, 0), 40);
  playerSamSpy = new Predator(100, 100, 5, color(200, 200, 0), 40);
  playerAlexSpy = new Predator(100, 100, 5, color(200, 200, 0), 40);

  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {

    //setting the first background (outside) when game starts
    image(outsideBackground, 0, 0, windowWidth, windowHeight); // display background

    // Handle input for all the spies
    playerCloverSpy.handleInput();
    playerSamSpy.handleInput();
    playerAlexSpy.handleInput();

    // Move all spies
    playerCloverSpy.move();
    playerSamSpy.move();
    playerAlexSpy.move();

    antelope.move();
    zebra.move();
    bee.move();

    // Handle the playerCloverSpy eating any of the prey
    playerCloverSpy.handleEating(antelope);
    playerCloverSpy.handleEating(zebra);
    playerCloverSpy.handleEating(bee);

    // Handle the playerSamSpy eating any of the prey
    playerSamSpy.handleEating(antelope);
    playerSamSpy.handleEating(zebra);
    playerSamSpy.handleEating(bee);

    // Handle the playerAlexSpy eating any of the prey
    playerAlexSpy.handleEating(antelope);
    playerAlexSpy.handleEating(zebra);
    playerAlexSpy.handleEating(bee);

    // Display all spies
    playerCloverSpy.display();
    playerSamSpy.display();
    playerAlexSpy.display();

    antelope.display();
    zebra.display();
    bee.display();
  }
