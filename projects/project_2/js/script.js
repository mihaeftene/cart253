// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

//check is game is playing
let gameStart = false;
let showGameOver = false;
// Player variables for our predators / spies
let playerCloverSpy;
let playerSamSpy;
let playerAlexSpy;

//display images of our predators/spies
let playerCloverImage;
let playerSamImage;
let playerAlexImage;

//to keep our code organized and clean, we will be using arrays for the spies because they have a few similarities such as display, move, handleEating, handleInput
let playersSpies = [];

// Add our 8 baddies (preys for the cspies to catch)
let baddieFlowerCharacter;
let baddieGangsterCharacter;
let baddieExplorerCharacter;
let baddieDollCharacter;
let baddieClownCharacter;
let baddieFashionistaCharacter;
let baddieRichCharacter;
let baddiePrinceCharacter;

// display images of our baddies
let baddieFlowerImage;
let baddieGangsterImage;
let baddieExplorerImage;
let baddieDollImage;
let baddieClownImage;
let baddieFashionistaImage;
let baddieRichImage;
let baddiePrinceImage;

//add an Array for baddies just as we did for the spies
let characterBaddies = [];

//backgrounds variables
let introBackground;
let instructionsBackground;
let gameOverBackground;
let winningBackground;

//backgrounds that changes in game variables
let outsideBackground;
let goldRoomBackground;
let redRoomBackground;
let paintingBackground;

//gadgets variables
let slowDryer;
let hiddenGoggles;
let redoStick;
//display images for Gadgets
let slowDryerImage;
let hiddenGogglesImage;
let redoStickImage;

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
  instructionsBackground = loadImage("assets/images/backgroundInstructions.png");
  winningBackground = loadImage("assets/images/backgroundSuccess.png");
  gameOverBackground = loadImage("assets/images/backgroundGameOver.png");

  //loading all backgrounds for change scenes in gameOverBackground
  outsideBackground = loadImage("assets/images/backgroundOutside.png");
  goldRoomBackground = loadImage("assets/images/backgroundLivingRoom.png");
  redRoomBackground = loadImage("assets/images/backgroundRedRoom.png");
  paintingBackground = loadImage("assets/images/backgroundPainting.png");

  //loading the spies characters
  playerCloverImage = loadImage("assets/images/cloverPlayerCharacter.png");
  playerSamImage = loadImage("assets/images/samPlayerCharacter.png");
  playerAlexImage = loadImage("assets/images/alexPlayerCharacter.png");

  //loading the baddies characters
  baddieFlowerImage = loadImage("assets/images/flowerBadPerson.png");
  baddieGangsterImage = loadImage("assets/images/gangsterBadBoy.png");
  baddieExplorerImage = loadImage("assets/images/explorerBadPerson.png");
  baddieDollImage = loadImage("assets/images/dollBadPerson.png");
  baddieClownImage = loadImage("assets/images/clownBadPerson.png");
  baddieFashionistaImage = loadImage("assets/images/fashionistaBadPerson.png");
  baddieRichImage = loadImage("assets/images/richBadPerson.png");
  baddiePrinceImage = loadImage("assets/images/princeBadPerson.png");

  //loading images for gadgets
  slowDryerImage = loadImage("assets/images/slowDryer.png");
  hiddenGogglesImage = loadImage("assets/images/hiddenGoggles.png");
  redoStickImage = loadImage("assets/images/redoLip.png");

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
  playerCloverSpy = new Predator(200, 200, 10, 100, 84, 70, 71, 72, playerCloverImage); //move CLOVER USING TFGH
  playerSamSpy = new Predator(300, 300, 10, 100, 73, 76, 75, 74, playerSamImage); //move SAM using ILKJ
  playerAlexSpy = new Predator(400, 400, 10, 100, 87, 83, 65, 68, playerAlexImage); //move ALEX using AWSD
  //place our spies into an array
  playersSpies = [playerCloverSpy, playerSamSpy, playerAlexSpy];
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
  characterBaddies = [baddieFlowerCharacter, baddieGangsterCharacter, baddieExplorerCharacter, baddieDollCharacter, baddieClownCharacter, baddieFashionistaCharacter, baddieRichCharacter, baddiePrinceCharacter];
  //set all the gadgets
  hiddenGoggles = new HiddenGoggles(300, 300, 10, 100, 0.7, hiddenGogglesImage); // the o.7 sets the scale that we added in the constructor
  slowDryer = new DryerGadget(300, 300, 10, 100, 0.7, slowDryerImage); // the o.7 sets the scale that we added in the constructor
  redoStick = new StickRedo(300, 300, 10, 100, 0.5, redoStickImage); // the o.5 sets the scale that we added in the constructor
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  if (showGameOver === true) {
    image(gameOverBackground, 0, 0, windowWidth, windowHeight);
  } else if (gameStart === false) {
    introScreen();
  }
  //setting the first background (outside) when game starts
  else {
    //setting the first background (outside) when game starts
    image(outsideBackground, 0, 0, windowWidth, windowHeight); // display background
    //check gameOver (if its game over or not)
    checkGameOver();

    //Display the amount of baddies caught by Clover (Red)
    textFont("Impact");
    textAlign(LEFT, TOP);
    textSize(20);
    fill(255, 51, 51); //set fill to red
    text("Clover - Baddies caught: " + playerCloverSpy.baddiesCaught, 600, 800);

    //Display the amount of baddies caught by Sam (Green)
    textFont("Impact");
    textAlign(RIGHT, TOP);
    textSize(20);
    fill(0, 153, 51); //set fill to green
    text("Sam - Baddies caught: " + playerSamSpy.baddiesCaught, 400, 800);

    //Display the amount of baddies caught by Alex (yellow)
    textFont("Impact");
    textAlign(RIGHT, TOP);
    textSize(20);
    fill(255, 204, 0); //set fill to mustard yellow
    text("Alex - Baddies caught: " + playerAlexSpy.baddiesCaught, 1200, 800);

    // Arrays for the spies's handleInput, move, display and handleEating.
    for (let i = 0; i < playersSpies.length; i++) {
      playersSpies[i].checkIfAlive();
      playersSpies[i].move();
      playersSpies[i].display();
      playersSpies[i].handleInput();
      redoStick.visibleNow(playersSpies[i]);
      //    slowDryer.slowDown(playersSpies[i]);
      //hiddenGoggles.hiddenNow(playersSpies[i]);
      //playersSpies[i].handleEating(baddieFlowerCharacter);
      //playersSpies[i].handleEating(baddieGangsterCharacter);
      //playersSpies[i].handleEating(baddieExplorerCharacter);
      //playersSpies[i].handleEating(baddieDollCharacter);
      //playersSpies[i].handleEating(baddieClownCharacter);
      //  playersSpies[i].handleEating(baddieFashionistaCharacter);
      //    playersSpies[i].handleEating(baddieRichCharacter);
      //  playersSpies[i].handleEating(baddiePrinceCharacter);
    }
    //display and move the first class
    slowDryer.move();
    slowDryer.display();
    //display and move the second class
    hiddenGoggles.move();
    hiddenGoggles.display();
    //display and move third class
    redoStick.move();
    redoStick.display();
    // Arrays for the baddie'move, display
    for (let i = 0; i < characterBaddies.length; i++) {
      characterBaddies[i].move();
      characterBaddies[i].display();
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
  if (playerAlexSpy.spyGone && playerCloverSpy.spyGone && playerSamSpy.spyGone) {
    showGameOver = true;
    //stops music
    mainMusic.stop();
    loseMusic.play();
  }
}
//reset the game including its elements
function resetGame() {
  playerCloverSpy.reset();
  playerSamSpy.reset();
  playerAlexSpy.reset();
  baddieFlowerCharacter.reset();
  baddieGangsterCharacter.reset();
  baddieExplorerCharacter.reset();
  baddieDollCharacter.reset();
  baddieClownCharacter.reset();
  baddieFashionistaCharacter.reset();
  baddieRichCharacter.reset();
  baddiePrinceCharacter.reset();
  slowDryer.reset();
  hiddenGoggles.reset();
  redoStick.reset();
  //has the click sounds
  clickButton.play();
  //loops the music once again
  mainMusic.loop();
  //stops the lose music
  loseMusic.stop();
  showGameOver = false;
}
