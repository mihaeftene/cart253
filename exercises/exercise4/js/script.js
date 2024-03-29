"use strict";

// Pong
// By Mihaela Eftene
//
// A "simple" implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle

// Whether the game has started
let playing = false;

// Game colors (using hexadecimal)
let bgColor = 0;
let fgColor = 255;


//CHICKEN TO BE CATCHED

//declaring the item image that will be catched (Chicken)
let catchChickenImage;

// A chicken object with the properties of
// position, size, velocity, and speed
let chicken = {
  x: 0,
  y: 0,
  size: 70,
  vx: 0,
  vy: 0,
  speed: 5
}

// PADDLES
// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let leftPaddle = {
  x: 0,
  y: 0,
  w: 70,
  h: 140,
  vy: 0,
  speed: 5,
  upKey: 87,
  downKey: 83
}

// RIGHT PADDLE (MOUSE)

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let rightPaddle = {
  x: 0,
  y: 0,
  w: 70,
  h: 140,
  vy: 0,
  speed: 5,
  upKey: 38,
  downKey: 40
}

let notOnScreen; // check when chicken off screen

//Mouse player Information (image,Size, health, max Health and number of lives)
let mousePlayerImage;
let playerMouseSize = 70;
let playerMouseMaxHealth = 5;
let playerMouseHealth = playerMouseMaxHealth;
//variable to display the number of lives for the mouse (as drumsticks)
let playerMouseLives;

//Cat player Information (Size, health, max Health and number of lives)
let catPlayerImage;
let playerCatSize = 70;
let playerCatMaxHealth = 5;
let playerCatHealth = playerCatMaxHealth;
//variable to display the number of lives for the cat player (as drumsticks)
let playerCatLives;

//declares the background variable
let kitchenBackground;

// A variable to hold the beep sound we will play on bouncing
let beepSFX;
// variable for the cat sound
let catSFX;
//variable for the mouse sound
let mouseSFX;

// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  catSFX = new Audio("assets/sounds/catMoew.wav"); //cat sounds
  mouseSFX = new Audio("assets/sounds/mouseHi.wav"); //mouse sounds

  //images for the game
  playerCatLives = loadImage("assets/images/drumsticks.png"); //drumsticks lives
  playerMouseLives = loadImage("assets/images/drumsticks.png"); //drumsticks lives
  catchChickenImage = loadImage('assets/images/chickenFood.png'); //Chicken to be catched
  kitchenBackground = loadImage('assets/images/kitchenBackground.png'); //Kitchen background
  catPlayerImage = loadImage('assets/images/tomPlayer.png'); //cat player image
  mousePlayerImage = loadImage('assets/images/jerryPlayer.png'); //mouse player image
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and chicken positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640, 480);
  rectMode(CENTER);
  noStroke();
  fill(fgColor);

  setupPaddles();
  resetBall();
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w;
  rightPaddle.y = height / 2;
}

// draw()
//
// Calls the appropriate functions to run the game
// See how tidy it looks?!
function draw() {
  // Filling the Background
  push();
  //Kitchen Background
  image(kitchenBackground, 0, 0);
  pop();

  if (playing) {
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    //characters health functions
    displayMouseHealth();
    displayCatHealth();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);

    // Check if the chicken went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (chickenIsOutOfBounds()) {
      // If it went off either side, reset it
      resetBall();
      // This is where we would likely count points, depending on which side
      // the chicken went off...
    }
  } else {
    // Otherwise we display the message to start the game
    displayStartMessage();
  }

  // We always display the paddles and chicken so it looks like Pong!
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();
}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  } else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and chicken based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
}

// updateBall()
//
// Sets the position of the chicken based on its velocity
function updateBall() {
  // Update the chicken's position based on velocity
  chicken.x += chicken.vx;
  chicken.y += chicken.vy;
}

// chickenIsOutOfBounds()
//
// Checks if the chicken has gone off the left or right
// Returns true if so, false otherwise
//If the miss the catch, the losing player will become smaller
function chickenIsOutOfBounds() {
  // Check for chicken going off sides (not on screen)
  if (chicken.x - chicken.size < 0) {
    //records which direction it goes to off screen
    //doing it for left side
    notOnScreen = "left";
    //if the chicken is off screen on left side then the player (mouse) health is decreasing by one
    playerMouseHealth--;
    //On top of losing drumsticks (lives), the mouse player will become smaller
    leftPaddle.h -= 7, constrain(leftPaddle.h, 0, 75);
    leftPaddle.w -= 4, constrain(leftPaddle.w, 0, 20);
    //and the cat laughs at the mouse
    catSFX.play();
    return true;
  } else if (chicken.x + chicken.size > width) {
    //doing it for right side
    notOnScreen = "right";
    //if the chicken is off screen on right side then the player (cat) health is decreasing by one
    playerCatHealth--;
    //On top of losing drumsticks (lives), the cat player will become smaller
    rightPaddle.h -= 7, constrain(leftPaddle.h, 0, 75);
    rightPaddle.w -= 4, constrain(leftPaddle.w, 0, 20);
    //and the mouse laughs at the cat
    mouseSFX.play();
    return true;
  } else {
    return false;
  }

}

// checkBallWallCollision()
//
// Check if the chicken has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (chicken.y < 0 || chicken.y > height) {
    // It hit so reverse velocity
    chicken.vy = -chicken.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the chicken and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the chicken to make our conditionals easier to read...
  let chickenTop = chicken.y - chicken.size / 2;
  let chickenBottom = chicken.y + chicken.size / 2;
  let chickenLeft = chicken.x - chicken.size / 2;
  let chickenRight = chicken.x + chicken.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  // First check the chicken is in the vertical range of the paddle
  if (chickenBottom > paddleTop && chickenTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (chickenLeft < paddleRight && chickenRight > paddleLeft) {
      // Then the chicken is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      chicken.vx = -chicken.vx;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles (cat and mouse)
  //image for left paddle (cat)
  image(mousePlayerImage, leftPaddle.x, leftPaddle.y, leftPaddle.w, leftPaddle.h);
  //image for right paddle (mouse)
  image(catPlayerImage, rightPaddle.x, rightPaddle.y, rightPaddle.w, rightPaddle.h);
}

// displayBall()
//
// Draws the chicken to be catched on screen
function displayBall() {
  // Draw the chicken
  image(catchChickenImage, chicken.x, chicken.y, chicken.size, chicken.size);
}

// resetBall()
//
// Sets the starting position and velocity of the chicken
function resetBall() {
  // Initialise the chicken's position and velocity
  chicken.x = width / 2;
  chicken.y = height / 2;

  if (random(0, 1) < 0.4) {
    //sends it towards the winning side
    chicken.vx = chicken.speed;
  } else {
    chicken.vx = -chicken.speed;
  }
  //random velocity
  chicken.vy = random(-6, 6);
}

//displayMouseHealth();
//Display the number of drumsticks (lives) of the mouse player
function displayMouseHealth() {
  //set x position for the mouse drumstick
  let playerMouseLivesX = playerMouseLives.width - 3;

  //display the number of drumsticks (lives) for player mouse (according to player's health value)
  for (let i = 0; i < playerMouseHealth; i++) {
    image(playerMouseLives, playerMouseLivesX, 7);

    //set the x position of the next drumstick
    playerMouseLivesX += playerMouseLives.width + 3;
  }
}

//displayCatHealth();
//Display the number of drumsticks (lives) of the cat player
function displayCatHealth() {
  //set x position for the cat's lives (drumsticks)
  let playerCatLivesX = width - playerCatLives.width - 3;

  //display the number of drumsticks (lives) for player mouse (according to player's health value)
  for (let i = 0; i < playerCatHealth; i++) {
    image(playerCatLives, playerCatLivesX, 4);

    //set the x position of the next drumstick
    playerCatLivesX -= playerCatLives.width + 3;
  }
}

// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {
  push();
  fill(0, 102, 153);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("CATCH THE CHICKEN!", width / 2, height / 2);
  pop();
}

// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  playing = true;
}
