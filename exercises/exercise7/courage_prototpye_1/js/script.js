// Project 3 - Prototype 1 (Ex 7 )
// by Mihaela Eftene
//
//This is mainly a prototype for project 3. Images does not belong to me including sound.
//Help Courage find 10 hints that can help find its owner (Warning: It can be anything like a shoe, cloth)
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
let baddieFlowerImage;
let baddieGangsterImage;
let baddieExplorerImage;
let baddieDollImage;
let baddieClownImage;
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

//pre-load()
//adding a function preload to load images and sound
function preload() {
  //loading all backgrounds
  introBackground = loadImage("assets/images/backgroundIntro.png");
  winningBackground = loadImage("assets/images/backgroundSuccess.png");
  gameOverBackground = loadImage("assets/images/backgroundGameOver.png");
  paintingBackground = loadImage("assets/images/backgroundPainting.png");

  //loading the spies characters
  couragePlayerImage = loadImage("assets/images/cloverPlayerCharacter.png");

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
  //setting up our predators (spies)
  couragePlayer = new Predator(200, 200, 10, 100, 87, 83, 65, 68, couragePlayerImage); //Move Courage using WASD keys

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

    //Display the amount of baddies caught by Clover (Red)
    textFont("Impact");
    textAlign(LEFT, BOTTOM);
    textSize(20);
    fill(255, 51, 51); //set fill to red
    text("Clover - Baddies caught: " + couragePlayer.baddiesCaught, 600, 800);

    // Arrays for the spies's handleInput, move, display and handleEating.
      couragePlayer.checkIfAlive();
      couragePlayer.checkIfSceneSwitch();
      couragePlayer.move();
      couragePlayer.display();
      couragePlayer.handleInput();
      couragePlayer.handleEating(baddieFlowerCharacter);
      couragePlayer.handleEating(baddieGangsterCharacter);
      couragePlayer.handleEating(baddieExplorerCharacter);
      couragePlayer.handleEating(baddieDollCharacter);
      couragePlayer.handleEating(baddieClownCharacter);
      couragePlayer.handleEating(baddieFashionistaCharacter);
      couragePlayer.handleEating(baddieRichCharacter);
      couragePlayer.handleEating(baddiePrinceCharacter);

    // Arrays for the baddie'move, display
    for (let i = 0; i < badMonsters.length; i++) {
      badMonsters[i].move();
      badMonsters[i].display();
    }
  }
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
  baddieFlowerCharacter.reset();
  baddieGangsterCharacter.reset();
  baddieExplorerCharacter.reset();
  baddieDollCharacter.reset();
  baddieClownCharacter.reset();
  baddieFashionistaCharacter.reset();
  baddieRichCharacter.reset();
  baddiePrinceCharacter.reset();
  //has the click sounds
  clickButton.play();
  //loops the music once again
  mainMusic.loop();
  //stops the lose music
  loseMusic.stop();
  showGameOver = false;
  showGameWin = false;
}
