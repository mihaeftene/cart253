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
let playerCloverImage;
let playerSamImage;
let couragePlayerImage;

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
let gameOverBackground;
let winningBackground;

//backgrounds that changes in game variables
let backgroundNight;

//gadgets variables
let slowDryer;
let hiddenGoggles;
let redoStick;
let boostSkateboard;
//display images for Gadgets
let slowDryerImage;
let hiddenGogglesImage;
let redoStickImage;
let boostSkateboardImage;

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
  backgroundNight = loadImage("assets/images/backgroundGrass.png");

  //loading Courage Player
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

  //loading images for gadgets
  slowDryerImage = loadImage("assets/images/slowDryer.png");
  hiddenGogglesImage = loadImage("assets/images/hiddenGoggles.png");
  redoStickImage = loadImage("assets/images/redoLip.png");
  boostSkateboardImage = loadImage("assets/images/boostSkateboard.png");

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
  hiddenGoggles = new HiddenGoggles(300, 300, 10, 100, 0.7, hiddenGogglesImage); // the 0.7 sets the scale that we added in the constructor
  slowDryer = new DryerGadget(300, 300, 10, 100, 0.7, slowDryerImage); // the 0.7 sets the scale that we added in the constructor
  redoStick = new StickRedo(300, 300, 10, 100, 0.5, redoStickImage); // the 0.5 sets the scale that we added in the constructor
  boostSkateboard = new BoostSkateboard(300, 300, 10, 100, 0.7, boostSkateboardImage); // the 0.7 sets the scale that we added in the constructor
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

    //Display the amount of baddies caught by Alex (yellow)
    textFont("Impact");
    textAlign(RIGHT, BOTTOM);
    textSize(20);
    fill(255, 204, 0); //set fill to mustard yellow
    text("Alex - Baddies caught: " + couragePlayer.baddiesCaught, 1200, 800);

    //Display the dog Player
    couragePlayer.move();
    couragePlayer.display();
    couragePlayer.handleInput();

    //display and move the first class
    slowDryer.move();
    slowDryer.display();
    //display and move the second class
    hiddenGoggles.move();
    hiddenGoggles.display();
    //display and move third class
    redoStick.move();
    redoStick.display();
    //display and move fourth class
    boostSkateboard.move();
    boostSkateboard.display();

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
  boostSkateboard.reset();
  //has the click sounds
  clickButton.play();
  //loops the music once again
  mainMusic.loop();
  //stops the lose music
  loseMusic.stop();
  showGameOver = false;
  showGameWin = false;
}
