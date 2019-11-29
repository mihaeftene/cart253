// Project 3 - Prototype 1 (Ex 7 )
// by Mihaela Eftene
//
//This is mainly a prototype for project 3. Images does not belong to me including sound.
//Help Courage find 5 hints that can help find its owner (Warning: It can be anything like a shoe, cloth)
//Watch out for the monsters! If you get hit you will lose 10% of your "Courage". The Tornado will kill you instantly.
//Look for "Courage's favorite pie" to get back a bit of your courage.
// (More information coming...)

//check is game is playing, over, or winning
let gameStart = false;
let showGameOver = false;
let showGameWin = false;

// Player variable for courage
let couragePlayer;

//display image of player
let couragePlayerImage;

// Add our 8 baddies - it will certainly be changed but for demo purposes
let baddieFlowerCharacter;
let baddieGangsterCharacter;
let baddieExplorerCharacter;
let baddieDollCharacter;
let baddieClownCharacter;
let baddieFashionistaCharacter;
let baddieRichCharacter;
let baddiePrinceCharacter;

// display images of our enemies
let baddieGangsterImage;
let baddieExplorerImage;
let baddieDollImage;
let baddieFashionistaImage;
let baddieRichImage;
let baddiePrinceImage;

//add an Array for baddies
let badMonsters = [];

//backgrounds variables
let introBackground;
let gameOverBackground;
let winningBackground;

//backgrounds that changes in game variables
let paintingBackground;

//Sound variables
//main music
let mainMusic;
//lose music
let loseMusic;
//if button pressed it will make that sound
let clickButton;
//when an item has been caught (baddies or gadget)
let itemCaughtSound;

//Timer variable for the counter
let timeBeforeCourageDrop = 60;
let courageEnergy = 100;

let timeToGrowPower = 0;
let powerEnergy = 0;

//pre-load()
//adding a function preload to load images and sound
function preload() {
  //loading all backgrounds
  introBackground = loadImage("assets/images/backgroundIntro.png");
  winningBackground = loadImage("assets/images/backgroundSuccess.png");
  gameOverBackground = loadImage("assets/images/backgroundGameOver.png");
  paintingBackground = loadImage("assets/images/backgroundPainting.png");

  //loading the spies characters
  couragePlayerImage = loadImage("assets/images/courageDogPlayerLeft.png");

  //loading the baddies characters
  baddieFlowerImage = loadImage("assets/images/flowerBadPerson.png");
  baddieGangsterImage = loadImage("assets/images/gangsterBadBoy.png");
  baddieExplorerImage = loadImage("assets/images/explorerBadPerson.png");
  baddieDollImage = loadImage("assets/images/dollBadPerson.png");
  baddieClownImage = loadImage("assets/images/clownBadPerson.png");
  baddieFashionistaImage = loadImage("assets/images/fashionistaBadPerson.png");
  baddieRichImage = loadImage("assets/images/richBadPerson.png");
  baddiePrinceImage = loadImage("assets/images/princeBadPerson.png");

  //loading Music
  mainMusic = loadSound('./assets/sounds/tsHereWeGo.mp3'); //main bg music
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
  couragePlayer = new Predator(200, 200, 10, 100, 87, 83, 65, 68, 0.5, couragePlayerImage); //Move Courage using WASD keys

  //setting our preys (baddies)
  baddieFlowerCharacter = new Prey(200, 200, 10, 100, 0.5, baddieFlowerImage);
  baddieGangsterCharacter = new Prey(300, 300, 10, 100, 0.5, baddieGangsterImage);
  baddieExplorerCharacter = new Prey(400, 400, 10, 100, 0.5, baddieExplorerImage);
  baddieDollCharacter = new Prey(200, 200, 10, 100, 0.5, baddieDollImage);
  baddieClownCharacter = new Prey(300, 300, 10, 100, 0.5, baddieClownImage);
  baddieFashionistaCharacter = new Prey(400, 400, 10, 100, 0.5, baddieFashionistaImage);
  baddieRichCharacter = new Prey(200, 200, 10, 100, 0.5, baddieRichImage);
  baddiePrinceCharacter = new Prey(300, 300, 10, 100, 0.5, baddiePrinceImage);
  //place our baddies into an array
  badMonsters = [baddieFlowerCharacter, baddieGangsterCharacter, baddieExplorerCharacter, baddieDollCharacter, baddieClownCharacter, baddieFashionistaCharacter, baddieRichCharacter, baddiePrinceCharacter];
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
    //setting the background of the WOOHP painting
    image(paintingBackground, 0, 0, windowWidth, windowHeight); // display background
    //check gameOver (if its game over or not)
    checkGameOver();
    checkIfWon();

    CourageBar();
    PowerBar();
    timeCounter();
    //hintsFound();

    //handleInput, move, display and handleEating for Courage.
    couragePlayer.checkIfAlive();
    couragePlayer.checkIfSceneSwitch();
    couragePlayer.move();
    couragePlayer.display();
    couragePlayer.handleInput();
    couragePlayer.handleEating(badMonsters);


    // Arrays for the baddie'move, display
    for (let i = 0; i < badMonsters.length; i++) {
      badMonsters[i].move();
      badMonsters[i].display();
    }
  }
}

//Display the amount of hints found
//function hintsFound() {
//  push();
//  fill(255,255,255);
//  textAlign(CENTER, RIGHT );
//  textFont('Impact');
//  textSize(30);
//  text("# OF HINTS FOUND " + couragePlayer.baddiesCaught, 400, 90);
//  pop();
//}

//timeCounter
//Once the timer ends (0), Courage will lose "Courage"
function timeCounter() {
  timeToGrowPower += 1 / 60;
  if (timeToGrowPower > 3)
  {
    powerEnergy += 10;
    timeToGrowPower = 0;
  }
  //if courage bar reaches 3, lower the courage by -10
  timeBeforeCourageDrop -= 1 / 60;
  if (timeBeforeCourageDrop > 3)
  {
    courageEnergy -= 10;
  }
  push();
  fill(255,255,255);
  textAlign(CENTER, RIGHT );
  textFont('Impact');
  textSize(30);
  text("TIMER: " + floor(timeBeforeCourageDrop), 800, 90);
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
 rect(1400, 20, 30, 300- courageBarFill -20);
}

//PowerBar()
//Draw a Health/Stamina bar. It facilitates the gameplay and the player can see how's Peach stamina is doing
function PowerBar() {
  let powerBarFill = map(powerEnergy, 0, 100, 0, 300);
  console.log(powerBarFill);
  fill(255, 160, 136);
  rect(40, 200, 40, 500);
  fill(240, 248, 255);
  rect(40, 200, 40, 300-powerBarFill + 20);
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
  //  mainMusic.loop();
  }
}

//checkGameOver()
//checking if its game over. Once the spies are gone its game over
function checkGameOver() {
  if (couragePlayer.spyGone) {
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
  if (couragePlayer.spyWin) {
    showGameWin = true;
  }
}

//resetGame()
//reset the game including its elements
function resetGame() {
  couragePlayer.reset();
  playerSamSpy.reset();
  badMonsters.reset()
  //has the click sounds
  clickButton.play();
  //loops the music once again
  mainMusic.loop();
  //stops the lose music
  loseMusic.stop();
  showGameOver = false;
  showGameWin = false;
}
