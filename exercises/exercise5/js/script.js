// Predator-Prey Simulation
// by Mihaela Eftene
//
// Gotta catch em all!? Exactly! Play as either one of the characters and catch as many Pokemons as you can!


//declare variables for our two new predators
let pokemonBoy;
let pokemonGirl;

// The three prey
let antelope;
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  //adding our two new predators (pokemonBoy & pokemonGirl)
  //we will move pokemonGirl with WASD keys
  pokemonGirl = new Predator(250, 250, 5, color(203, 156, 203), 40, 87, 83, 65, 68); //W,A,S,D
  //we will move pokemonBoy with up, down, left and right arrow keys
  pokemonBoy = new Predator(100, 100, 5, color(66, 135, 245), 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW);
  //our pokemons to be catched
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  // Handle input for the pokemonBoy and pokemonGirl
  pokemonBoy.handleInput();
  pokemonGirl.handleInput();
  // Move all the "characters"
  pokemonBoy.move();
  pokemonGirl.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the pokemonBoy eating any of the prey
  pokemonBoy.handleEating(antelope);
  pokemonBoy.handleEating(zebra);
  pokemonBoy.handleEating(bee);
  pokemonGirl.handleEating(antelope);
  pokemonGirl.handleEating(zebra);
  pokemonGirl.handleEating(bee);

  // Display all the "animals"
  pokemonBoy.display();
  pokemonGirl.display();
  antelope.display();
  zebra.display();
  bee.display();
}
