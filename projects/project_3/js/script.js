// Project 3: Courage to the Rescue
// by Mihaela Eftene
//
//Instructions:
//Yikes! Both of your owners disappeared! Where could they be? On your way to the woods, you see serveral monsters roaming around.
//Next to them, you see items of your owners laying around. Maybe they know something? Only way to find out!
//Help Courage find its owners by collecting 5 clues (clothing, hat etc.) to help him track down their scent.
//Watch out for the monsters! If you succeed to avoid them, every minute your "Powerbar" Will go up. Once it has reached his max, you will be able to use your "heart shoot" skill pressing space key.
//However, make sure to keep your eye on the "courage bar". Courage the is a scaredy dog and every minute the "courage bar" will drop by 10%. Once it has reached 0, you lose the game
//Every 10 - 20 seconds, "Courage's favorite pie" will spawn at different locations! Make sure to eat it as it can bring your courage bar up to max.

//check is game is playing, over, or winning
let gameStart = false;
let showGameOver = false;
let showGameWin = false;

// Player variable for courage
let couragePlayer;

//display image of Dog player
let couragePlayerImage;

// Add our monsters variable
let catBadPerson;
let duckBadPerson;
let oobhaBadPerson;
let innerDogBadPerson;
let whiteFaceBadPerson;

// display images of our monsters
let catBadPersonImage;
let duckPersonImage;
let oobhaBadPersonImage;
let innerDogPersonImage;
let whiteFaceBadPersonImage;

//add an Array for the Monsters
let badMonsters  = [];

//declare backgrounds
let backgroundNight;
let introBackground;
let gameOverBackground;
let winningBackground;

//Sound variables
//main music
let mainMusic;
//lose music
let loseMusic;
//if button pressed it will make that sound
let clickButton;
//when an item has been caught (baddies or gadget)
let itemCaughtSound;

//Timer variable for the courage bar
let timeBeforeCourageDrop = 0;
let courageEnergy = 0;
//max courage energy
let maxCourageEnergy = 100;

//Time variable for the Power energy bar
let timeToGrowPower = 0;
//power energy
let powerEnergy = 0;

//Items
let itemPie;
let itemPieImage;

//pre-load()
//adding a function preload to load images and sound
function preload() {
  //loading all backgrounds
  introBackground = loadImage("assets/images/backgroundIntro.png");
  winningBackground = loadImage("assets/images/backgroundSuccess.png");
  gameOverBackground = loadImage("assets/images/backgroundGameOver.png");
  backgroundNight = loadImage("assets/images/backgroundGrass.png");

  //loading Courage Player
  couragePlayerImage = loadImage("assets/images/courageDogPlayerLeft.png");

  //loading the monsters characters
  catBadPersonImage = loadImage("assets/images/catBadPerson.png");
  duckPersonImage = loadImage("assets/images/duckBadPerson.png");
  oobhaBadPersonImage = loadImage("assets/images/ohbaBadPerson.png");
  innerDogPersonImage = loadImage("assets/images/innerDogBadPerson.png");
  whiteFaceBadPersonImage = loadImage("assets/images/oddWhiteFaceBadPerson.png");

  //loading items
  itemPieImage = loadImage("assets/images/thePie.png");

  //loading Music
  //mainMusic = loadSound('./assets/sounds/tsHereWeGo.mp3'); //main bg music
  loseMusic = loadSound('./assets/sounds/tsCompLose.wav'); //lose background sound
  clickButton = loadSound('./assets/sounds/nextClick.wav'); //triggers the clicking sound
  itemCaughtSound = loadSound('./assets/sounds/gotYouItem.wav');
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  //setting up our predator (Courage)
  couragePlayer = new Predator(200, 200, 10, 0.5, 87, 83, 65, 68, couragePlayerImage); //move Courage using AWSD
  //setting our preys (baddies)
  catBadPerson = new Prey(200, 200, 10, 100, 0.5, catBadPersonImage);
  duckBadPerson = new Prey(300, 300, 10, 100, 0.7, duckPersonImage);
  oobhaBadPerson = new Prey(300, 300, 10, 100, 0.3, oobhaBadPersonImage);
  innerDogBadPerson = new Prey(300, 300, 10, 100, 0.15, innerDogPersonImage);
  whiteFaceBadPerson = new Prey(300, 300, 10, 100, 0.15, whiteFaceBadPersonImage);

  //setting our pie item
  itemPie = new Pie(200, 300, 10, 100, 0.5, itemPieImage);

  //place our monsters into an array
  badMonsters  = [catBadPerson,duckBadPerson,oobhaBadPerson,innerDogBadPerson,whiteFaceBadPerson];
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects. Displays backgrounds when needed
function draw() {
  if (showGameOver === true) {
    image(gameOverBackground, 0, 0, windowWidth, windowHeight);
  } else if (showGameWin === true) {
    image(winningBackground, 0, 0, windowWidth, windowHeight);
  } else if (gameStart === false) {
    introScreen();
  }
  //setting the first background (outside) when game starts
  else {
    //setting the background of the Night Grass
    image(backgroundNight, 0, 0, windowWidth, windowHeight); // display background
    //check gameOver (if its game over or not)
    checkGameOver();
    checkIfWon();

    //call the time counter function, courage bar and power bar
    timeCounter();
    CourageBar();
    PowerBar();
    //once pie eaten, Courage gets back his max courage
    console.log(itemPie)
    itemPie.RaiseCourage(couragePlayer);

    //Display the dog Player
    couragePlayer.move();
    couragePlayer.display();
    couragePlayer.handleEating(itemPie);
    couragePlayer.handleInput();

    //display the Pie
    itemPie.display();

    // Arrays for the baddie'move, display
    for (let i = 0; i < badMonsters .length; i++) {
      badMonsters [i].move();
      badMonsters [i].display();
    }
  }
}

//timeCounter
//Once the timer reaches at 60, the power bar goes up by 10
function timeCounter() {
  timeToGrowPower += 1 / 60; // Count down based on frame rate
  if (timeToGrowPower > 3) {
    powerEnergy += 10;

    // console.log(powerEnergy);
    powerEnergy = constrain(powerEnergy, 0, 100);
    timeToGrowPower = 0;
  }
  //if courage bar reaches 60, lower the courage by -10
  timeBeforeCourageDrop += 1 / 60; // Count down based on frame rate
  if (timeBeforeCourageDrop > 3) // If the counter reaches zero, courage should drop
  {
    courageEnergy -= 10; // Drop courage
    maxCourageEnergy = constrain(maxCourageEnergy, 0, 100);
    timeBeforeCourageDrop = 0; // Reset timer to 3 seconds
    // console.log("Drop The Courage");
  }
  push();
  fill(255, 255, 255);
  textAlign(CENTER, RIGHT);
  textFont('Impact');
  textSize(30);
  text("COURAGE TIMER: " + floor(timeBeforeCourageDrop), 600, 90);
  text("TIMER POWER: " + floor(timeToGrowPower), 200, 90);
  pop();
}

//CourageBar()
//Draw a Courage Bar. It shows how much the Player dog has courage left
function CourageBar() {
  let courageBarFill = map(courageEnergy, 0, 100, 0, 100);
  fill(255, 160, 136);
  rect(1400, 200, 40, 500);
  fill(240, 248, 255);
  rect(1400, 200, 40, 0 - courageBarFill);
}

//PowerBar()
//Draw the power bar. it show how much Power Courage has accumulated. Once the bar has been filled the player will be able to click Shift to activate its skill.
function PowerBar() {
  let powerBarFill = map(powerEnergy, 0, 100, 0, 500);
  fill(255, 160, 136);
  rect(40, 200, 40, 500);
  fill(240, 248, 255);
  rect(40, 200, 40, 500 - powerBarFill);
}

// introScreen()
//setting the intro screen function - to have our intro page
function introScreen() {
  image(introBackground, 0, 0, windowWidth, windowHeight); // display background
}

// mousePressed()
//
// start the game with a mouse press
function mousePressed() {
  if (showGameOver) { //if its game over reset the game
    resetGame();
  }
  if (showGameWin) {
    resetGame();
  } else if (gameStart === false) {
    gameStart = true;
    //intro sound (small one before the music)
    clickButton.play();
    //loops music
    mainMusic.loop();
  }
}

//checkGameOver()
//checking if its game over. Once the spies are gone its game over
function checkGameOver() {
  if (couragePlayer.spyGone && playerCloverSpy.spyGone && couragePlayer.spyGone) {
    showGameOver = true;
    //stops music
    mainMusic.stop();
    //plays the lose song
    loseMusic.play();
  }
}

//checkIfWon()
//checking if its a win for the spies. It does not works for some reasons but I just wanted to show my initiative for this part. What am I missing?
function checkIfWon() {
  if (couragePlayer.spyWin && playerCloverSpy.spyWin && couragePlayer.spyWin) {
    showGameWin = true;
  }
}

//resetGame()
//reset the game including its elements
function resetGame() {
  couragePlayer.reset();
  badMonsters.reset();
  //has the click sounds
  clickButton.play();
  //loops the music once again
  mainMusic.loop();
  //stops the lose music
  loseMusic.stop();
  showGameOver = false;
  showGameWin = false;
}
