/******************************************************

Game - The Artful Dodger
Mihaela Eftene

-help Cynical Rabbit to stay out of trouble and get through the night by avoiding his bad thoughts! He enjoys going out at night and being a troublemaker

A simple dodging game with keyboard controls

******************************************************/

// The position and size of rabbit player
let avatarX;
let avatarY;
let avatarSize = 50;

//Setting the background

// The speed and velocity of our rabbit player
let avatarSpeed = 10;
let avatarVX = 0;
let avatarVY = 0;

// The position and size of the rabbit enemy
let enemyX;
let enemyY;
let enemySize = 50;

// Speed and size of the enemy
let enemyIncreaseSpeed = 1;
let enemySizeIncrease = 3;

// The speed and velocity of our rabbit enemy
let enemySpeed = 2;
let enemyVX = 5;

// How many hours the player has made (hours of Sleep)
let hours = 0;

//Declare background Images
let dayBg;
let sunriseBg;
let nightBg;
let winBg;

//Declare our characters
let rabbitPlayer;
let rabbitEnemy;

//Add counter for the winning background (frames)
let counter = 300;


//meant to load images inside the game already
function preload() {
  // Load in all images
  rabbitPlayer = loadImage("assets/images/SleepPlayer.png");
  rabbitEnemy = loadImage("assets/images/EnemyRabbit.png");
  dayBg = loadImage("assets/images/backgroundDay.png");
  sunriseBg = loadImage("assets/images/backgroundSunrise.png");
  nightBg = loadImage("assets/images/backgroundNight.png");
  winBg = loadImage("assets/images/winBg.png");
}


// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500, 500);

  // Put the rabbit player in the centre
  avatarX = width / 2;
  avatarY = height / 2;

  // Put the rabbit enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0, height);

  // No stroke so it looks cleaner
  noStroke();
}


// draw()
//
// Handle moving the rabbit player, rabbit enemy and checking for hours and
// game over situations.
function draw() {
  //draw the "winning background"//
  if (hours >= 12 && counter > 0) {
    image(winBg, 0, 0, width, height);
    enemyX = 0;
    enemyY = random(0, height);
    avatarX = width / 2;
    avatarY = height / 2;
    counter -= 1;
    // if statement for the counter to go back to the scene
    if (counter <= 0) {
      hours = 0;
      counter = 300;
      enemySpeed = 2;
    }
    return
  }

  // Adds the initial image (day)
  //background(255,220,220);

  // Default the rabbit player's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the rabbit player's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the rabbit player according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The rabbit enemy always moves at enemySpeed
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the rabbit enemy and player overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX, enemyY, avatarX, avatarY) < enemySize / 2 + avatarSize / 2) {
    // Tell the rabbit player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0, height);
    // Reset the rabbit player's position
    avatarX = width / 2;
    avatarY = height / 2;
    // Reset the dodge counter
    hours = 0;
    //Reset the rabbit enemy's size and Speed
    enemySpeed = 2;
    enemySize = 50;
  }

  // Check if the the rabbit player has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0, height);
    avatarX = width / 2;
    avatarY = height / 2;
    hours = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the rabbit player dodged so update its dodge statistic
    hours = hours + 1;
    // Tell them how many hours they have made
    console.log(hours + " hours!");
    // Reset the rabbit enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0, height);
    //Increase the speed and size after a number certain number of hours
    enemySpeed += enemyIncreaseSpeed;
    enemySize += enemySizeIncrease;
  }

  // Display the number of successful hours in the console
  console.log(hours);

  // Adds the initial image (day)
  image(nightBg, 0, 0, width, height);

  // Adds a condition: Once the player reaches a number of hours the scene changes...

  //Scene is being switched to sunrise
  if (hours >= 6) {
    image(sunriseBg, 0, 0, width, height);
  }
  //Scene is being switched to day
  if (hours >= 10) {
    image(dayBg, 0, 0, width, height);
  }

  //  Draw the number of hours slept(score)-Center top
  fill(255);
  textAlign(CENTER, CENTER);
  text(hours + " hours passed", width / 2 - 8, height / 8);
  textFont("impact");
  textSize(36);

  // Draw the rabbit player
  image(rabbitPlayer, avatarX, avatarY, avatarSize, avatarSize);

  // Draw the enemy rabbit
  image(rabbitEnemy, enemyX, enemyY, enemySize, enemySize);
}
