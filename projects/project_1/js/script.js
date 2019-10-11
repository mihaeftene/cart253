"use strict";

/******************************************************

Game - Chaser
Mihaela Eftene

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Track whether the game is over
let gameOver = false;

// Declare start
let state = "Start";

// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 40;
let playerVX = 0;
let playerVY = 0;
//changed the speed to 6. 2 was way too slow and it would be hard to win the game.
let playerMaxSpeed = 6;
// Player health
let playerHealth;
let playerMaxHealth = 255;
// Player fill color
let playerFill = 50;

// Prey position, size, velocity
let preyX;
let preyY;
let preyRadius = 25;
let preyVX;
let preyVY;
let preyMaxSpeed = 4;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
//Declare our Energy Stamina bar variable
let energyStamina;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

// Noise variables values
let noiseValueX = 0;
let noiseValueY = 0;

//Declare background Images
let mainBg;
let semiPeekingBg
let faceBearBg;
let bearHereBg;
let winBg;
let loseBg;
let introBg;

//Declare our player
let peachPlayer;
let itemEnemy;

//Declare sound variables
let introSound;
let collectSound;
let gameoverSound;

//meant to load images inside the game already
function preload() {
  // Load in all images
  peachPlayer = loadImage("assets/images/playerPeach.png");
  itemEnemy = loadImage("assets/images/item.png");
  mainBg = loadImage("assets/images/goneRyanBg.png");
  semiPeekingBg = loadImage("assets/images/SemiHeadRyanBg.png");
  faceBearBg = loadImage("assets/images/ryanPeekingBg.png");
  bearHereBg = loadImage("assets/images/gotHereRyanBg.png");
  winBg = loadImage("assets/images/BgWin.png");
  loseBg = loadImage("assets/images/BgLose.png");
  introBg = loadImage ("assets/images/info.png");

  //Preload sounds
  introSound = loadSound('assets/sounds/intro.mp3');
  collectSound = loadSound('assets/sounds/collect.wav');
  gameoverSound = loadSound('assets/sounds/gameover.wav');
}

// setup()
//
// Sets up the basic elements of the game
function setup() {

  createCanvas(500, 500);
  noStroke();

  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

function setupSound() {
  // Setting up the intro sound
    // introSound.play();
    introSound.loop();
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  //starting the background info
  if (state === "Start") {
  image(introBg, 0, 0, width, height);
}
  else if (state === "Play"){
  if (!gameOver) {
    handleInput();
    changeSizeItem();
    makePlayerSlower();
    backgroundChange();

    movePlayer();
    movePrey();

    updateHealth();
    showTheScore();
    StaminaBar();
    checkEating();

    drawPrey();
    drawPlayer();
  }
  else {
    showGameOver();
  }
}
}
// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }
  //adding the sprint functionality. If the player presses shift key they will be able to sprint. However! Their health will be down by 1.0
  if (keyIsDown(SHIFT)) {
    playerMaxSpeed = playerMaxSpeed + 0.04;
    playerHealth = playerHealth - 1.5;
  }
  //if the player is not sprinting then keep it normal speed (6)
  else {
    playerMaxSpeed = 6;
  }
}

//After a number of catching preys the prey gets smaller and faster.
function changeSizeItem(){
  if (preyEaten === 1){
    preyRadius = 20;
    preyMaxSpeed = 5;
  }
  if (preyEaten === 3){
    preyRadius = 18;
    preyMaxSpeed = 7;
  }
  if (preyEaten === 5){
    preyRadius = 16;
    preyMaxSpeed = 8;
  }
  if (preyEaten === 7){
    preyRadius = 14;
    preyMaxSpeed = 9;
  }
  if (preyEaten === 9){
    preyRadius = 12;
    preyMaxSpeed = 10;
  }
  if (preyEaten === 11){
    preyRadius = 10;
    preyMaxSpeed = 11;
  }
}

//After a number of caught items, the player gets tired.
function makePlayerSlower(){
  if (preyEaten >= 5) {
  playerMaxSpeed = playerMaxSpeed - 0.06;
}
  if (preyEaten >= 9) {
  playerMaxSpeed = playerMaxSpeed - 0.08;
}
  if (preyEaten >= 11){
  playerMaxSpeed = playerMaxSpeed - 0.10;
  }
}

//
function backgroundChange(){
  //Changing the game background. After a certain number of catches, the background will change
  // Setting up the main background
  if (preyEaten < 3){
  image(mainBg, 0, 0, width, height);
}
  if (preyEaten >= 3) {
  image(semiPeekingBg, 0, 0, width, height);
}
  if (preyEaten >= 7) {
  image(faceBearBg, 0, 0, width, height);
}
  if (preyEaten >= 11){
  image(bearHereBg, 0, 0, width, height);
  }
}
// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  }
  else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  }
  else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 0.5;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
      collectSound.play();
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
  if (random() < 0.05) {
    // Set velocity based on random values to get a new direction
    // and speed of movement
    //
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey
    //changing from random to noise the enemy's movement
      preyVX = map(noise(noiseValueX), 0, 1, -preyMaxSpeed, preyMaxSpeed);
      preyVY = map(noise(noiseValueY), 0, 1, -preyMaxSpeed, preyMaxSpeed);
      noiseValueX = noiseValueX + 5;
      noiseValueY = noiseValueY + 3;
    }
    // Update the prey position based on the velocity
    preyX = preyX + preyVX;
    preyY = preyY + preyVY;

    //noise increases
    noiseValueX += 0.05;
    noiseValueY += 0.05;

  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  }
  else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  }
  else if (preyY > height) {
    preyY = preyY - height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  tint(255, preyHealth);
  image(itemEnemy, preyX, preyY, preyRadius * 2, preyRadius * 2);
  tint(255);
}

// drawPlayer()
//
// Draw the player as a peach character and give it some kind of behaviour (PANIC)
function drawPlayer() {
  tint(255, playerHealth);
  image(peachPlayer, playerX, playerY, playerRadius * 2, playerRadius * 2);
  //setting some kind of lag (the peach is panicking because she is looking for her makeup before Ryan (The bear / Boyfriend) comes
  tint(255, 40);
}

//showTheScore()
//showing how many items have been caught//

// Create an action to that allows the music to be played once the user presses.
  function mousePressed() {
    if (state === "Start") {
      state = "Play";
      setupSound();
    }
    if (gameOver === true) {
        resetGame();
      }
}

// Reset the game to the start state with the previous values
function resetGame() {
  setupPrey();
  setupPlayer();
  gameOver = false;
  state = "Start";
  playerMaxHealth = 100;
  preyEaten = 0;
}


function showTheScore(){
textAlign(LEFT, TOP);
fill(0);
textSize(20);
text("Caught Items " + preyEaten, 10, 450);
}

//StaminaBar()
//Draw a Health/Stamina bar. It facilitates the gameplay and the player can see how's Peach stamina is doing
function StaminaBar(){
  energyStamina = map(playerHealth, 0, 255, 0, 300);
  fill (255, 160, 136);
  rect(10, 20, 300, 20);
  fill(240, 248, 255);
  rect(10, 20,energyStamina, 20);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  //background lost
  image(loseBg, 0, 0, width, height);
  //stopping the intro and collect makeup sounds to let the gameoverSound
  gameoverSound.play();
  collectSound.stop();
  introSound.stop();
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You caught " + preyEaten + " items\n";
  gameOverText = gameOverText + "before your date was cancelled."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}
