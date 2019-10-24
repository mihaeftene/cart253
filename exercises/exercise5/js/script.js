// Predator-Prey Simulation
// by Mihaela Eftene
//
// Gotta catch em all!? Exactly! Play as either one of the characters and catch as many Pokemons as you can!
//Commands:
//Player 1: LEFT, RIGHT, UP, DOWN ARROW to move. Use shift to sprint
//Player2: WASD to move. Use R to sprint

//declare variables for our two new predators
let pokemonBoy;
let pokemonGirl;

// The three pokemons
let pikachuYellow;
let pikachuYellowImage;
let frogGreen;
let frogGreenImage;
let turtleBlue;
let turtleBlueImage;

//background variable
let backgroundImage;

//pre-load()
//adding a function preload to load images and sound
function preload() {
  //image
  pikachuYellowImage = loadImage("assets/images/pikachuFace.png");
  frogGreenImage = loadImage("assets/images/bulbaFace.png");
  turtleBlueImage = loadImage("assets/images/squiddleFace.png");
  backgroundImage = loadImage("assets/images/background.png");
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  //adding our two new predators (pokemonBoy & pokemonGirl)
  //we will move pokemonGirl (its a circle and not an image because it can be anyone) with WASD (R for sprint) keys
  pokemonGirl = new Predator(250, 250, 5, color(203, 156, 203), 40, 87, 83, 65, 68, 82); //W,A,S,D,R
  //we will move pokemonBoy (its a circle and not an image because it can be anyone) with up, down, left and right arrow keys
  pokemonBoy = new Predator(100, 100, 5, color(66, 135, 245), 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, SHIFT);
  //our pokemons to be catched
  pikachuYellow = new Prey(900, 900, 20, 50, pikachuYellowImage);
  frogGreen = new Prey(600, 600, 10, 50, frogGreenImage);
  turtleBlue = new Prey(600, 600, 10, 50, turtleBlueImage);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // use the background image assigned
  image(backgroundImage, 0, 0, windowWidth, windowHeight); // display background

  // Handle input for the pokemonBoy and pokemonGirl
  pokemonBoy.handleInput();
  pokemonGirl.handleInput();
  // Move all the "characters"
  pokemonBoy.move();
  pokemonGirl.move();
  pikachuYellow.move();
  frogGreen.move();
  turtleBlue.move();

  // Handle the pokemonBoy eating any of the prey
  pokemonBoy.handleEating(pikachuYellow);
  pokemonBoy.handleEating(frogGreen);
  pokemonBoy.handleEating(turtleBlue);
  pokemonGirl.handleEating(pikachuYellow);
  pokemonGirl.handleEating(frogGreen);
  pokemonGirl.handleEating(turtleBlue);

  // Display all the "pokemons"
  pokemonBoy.display();
  pokemonGirl.display();
  pikachuYellow.display();
  frogGreen.display();
  turtleBlue.display();
}
