"use strict";

// Predator-Prey Simulation
// by Mihaela Eftene
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

////////////////////
// 10 ERRORS IN HERE
////////////////////

// Our predator
let tiger;

// The three prey
/////FIXED: fixed the spelling "antelope" not "antelop"
let antelope;
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
////// FIXED: sepreate function and setup//////
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, , 100, 5, color(200, 200, 0), 40);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  backgroun(0);

  // Handle input for the tiger

  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  ////FIXED: Issue with the naming once again. If you name your variable at the top "antelope", then its that. Else there will be an error. antelop to antelope
  antelope.display();
  zebra.disploy();
  b.display();
}
