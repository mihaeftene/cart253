// Exercise 1 - Movement
// Mihaela Eftene
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

//The current position and size of the First picture which is a texture//
let textureX;
let textureY;
let textureSize = 20;

//Texture Image variable//
let textureMove;

// Text variable and declaring x and y variables to give the current position//
let studytext = "more 4am studying!";
let studytextX;
let studytextY;


// preload()
//
// Nothing here

function preload() {
  // we are going to preload the image texture bar and make it go left to right
  textureMove = loadImage("assets/images/texture.png");
  }


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;

  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();

  //lets start our texture image at the left-center and goes to the right after//
  textureX = 0;
  textureY = height/2;
}


// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen

function draw() {
  // We don't fill the background so we get a drawing effect

  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);

  //Move texture image to the right//
  textureX += 1;
   // Display the image
   image(textureMove, textureX, textureY);

   // Display our "studytext" at the current mouse location//
   studytextX = mouseX;
   studytextY = mouseY;
   //fill our text in a coral color//
   fill(255,99,71);
   textSize(30);
   //variables that we want to display//
   text (studytext, studytextX, studytextY);

}
