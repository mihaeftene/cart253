// Project 3: Courage to the Rescue
// by Mihaela Eftene
//
//Instructions:
//Yikes! Both of your owners disappeared! Where could they be? On your way to the woods, you see serveral monsters roaming around.
//Next to them, you see items of your owners laying around. Maybe they know something? Only way to find out!
//Help Courage find its owners by collecting 5 clues (clothing, hat etc.) to help him track down their scent.
//Watch out for the monsters! If you succeed to avoid them, every minute your "Powerbar" Will go up. Once it has reached ~90, you will be able to use your "heart shoot" skill pressing space key. Beware, next time that you use your skill, it can decrease your power energy without activating the skill.
//However, make sure to keep your eye on the "courage bar". Courage the is a scaredy dog and every minute the "courage bar" will drop by 10%. Once it has reached 0, you lose the game
//Every 10 seconds,"Courage's favorite pie" will spawn at different locations! Make sure to eat it as it can bring your courage bar up to max Beware of the poison though! It can kill you.

//check if game is playing, over, or winning
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
let badMonsters = [];

// Add our clues for the player to find
let shoeHint;
let wigHint;
let bootHint;
let newspaperHint;
let hatHint;

// display images of our clues
let shoeHintImage;
let wigHintImage;
let bootHintImage;
let newspaperHintImage;
let hatHintImage;

//add an array for clues
let cluesFind = [];

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

//music when the player has won the game
let successMusic;

//Timer variable for the courage bar
let timeBeforeCourageDrop = 0;
let courageEnergy = 500;
//max courage energy
let maxCourageEnergy = 500;

//Time variable for the Power energy bar
let timeToGrowPower = 0;
//power energy
let powerEnergy = 0;

//Items / images- pie and poison
let itemPie;
let itemPieImage;

let itemPoison;
let itemPoisonImage;

//declare bullet variable
let bulletImage;

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

  //loading items (pie and poison)
  itemPieImage = loadImage("assets/images/thePie.png");
  itemPoisonImage = loadImage("assets/images/thePoison.png");

  //loading clues
  shoeHintImage = loadImage("assets/images/shoeHint.png");
  wigHintImage = loadImage("assets/images/wigHint.png");
  bootHintImage = loadImage("assets/images/bootHint.png");
  newspaperHintImage = loadImage("assets/images/newspaperHint.png");
  hatHintImage = loadImage("assets/images/hatHint.png");

  //load the bullets
  bulletImage = loadImage("assets/images/heart.png");

  //loading Music
  mainMusic = loadSound('./assets/sounds/mainMusic.mp3'); //main bg music
  loseMusic = loadSound('./assets/sounds/loseMusic.mp3'); //lose background sound
  clickButton = loadSound('./assets/sounds/nextClick.wav'); //triggers the clicking sound
  itemCaughtSound = loadSound('./assets/sounds/gotYouItem.wav');
  successMusic = loadSound('./assets/sounds/successMusic.mp3');
}


// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  //setting up our predator (Courage)
  couragePlayer = new Predator(200, 200, 10, 100, 87, 83, 65, 68, 32, 0.5, couragePlayerImage, bulletImage); //move Courage using AWSD
  //setting our monsters
  catBadPerson = new Prey(600, 200, 10, 100, 0.5, catBadPersonImage);
  duckBadPerson = new Prey(500, 300, 10, 100, 0.7, duckPersonImage);
  oobhaBadPerson = new Prey(100, 300, 10, 100, 0.3, oobhaBadPersonImage);
  innerDogBadPerson = new Prey(200, 300, 10, 100, 0.15, innerDogPersonImage);
  whiteFaceBadPerson = new Prey(300, 300, 10, 100, 0.15, whiteFaceBadPersonImage);

  //setting clues class
  shoeHint = new Clues(-600, 800, 10, 100, 0.5, shoeHintImage);
  wigHint = new Clues(-900, 700, 10, 100, 0.3, wigHintImage);
  bootHint = new Clues(300, 300, 10, 100, 0.3, bootHintImage);
  newspaperHint = new Clues(-100, 300, 10, 100, 0.3, newspaperHintImage);
  hatHint = new Clues(200, 300, 10, 100, 0.3, hatHintImage);

  //setting our pie item and poison classes
  itemPie = new Pie(200, 300, 10, 100, 0.5, itemPieImage);
  itemPoison = new Poison(200, 300, 10, 100, 0.05, itemPoisonImage);

  //place our monsters into an array
  badMonsters = [catBadPerson, duckBadPerson, oobhaBadPerson, innerDogBadPerson, whiteFaceBadPerson];

  //place our clues into an Array
  cluesFind = [shoeHint, wigHint, bootHint, newspaperHint, hatHint];
}


// draw()
//
//draw whatever is in the function (Backgrounds, functions, display, handleInput etc.)
function draw() {
  //if its gameover show the background for gameover. If win is true, show the win background. If the game hasent started, show the intro.
  if (showGameOver === true) {
    image(gameOverBackground, 0, 0, windowWidth, windowHeight);
  } else if (showGameWin === true) {
    image(winningBackground, 0, 0, windowWidth, windowHeight);
  } else if (gameStart === false) {
    introScreen(); //main screen
  } else {
    //setting the background to a dark night grass background
    image(backgroundNight, 0, 0, windowWidth, windowHeight); // display background

    //check gameOver (if its game over or not)
    checkGameOver();
    checkIfWon();
    CourageBar();
    PowerBar();
    timeCounter();
    hintsFound();

    //item pie replenish the courage gauge
    itemPie.RaiseCourage(couragePlayer);
    //item poison that kills you instantly
    itemPoison.DropCourage(couragePlayer);
    //handleInput, display and move for courage
    couragePlayer.move();
    couragePlayer.display();
    couragePlayer.handleInput();

    //Display and Eats the pie or poison // constrain items to screen
    itemPie.constrainToScreen();
    itemPie.display();
    itemPoison.constrainToScreen();
    itemPoison.display();

    //for loop Arrays for the Monsters'move, display
    for (let i = 0; i < badMonsters.length; i++) {
      badMonsters[i].move();
      badMonsters[i].display();
      //Once the special skill has been activated, Courage will be able to shoot the monsters
      couragePlayer.updateBullets(badMonsters[i]);
    }

    //Arrays for the clues. The clues will move and display. Courage will be able to collect clues and have "the clues found" score updated at the top.
    for (let i = 0; i < cluesFind.length; i++) {
      if (cluesFind[i].isAlive === true) {
        cluesFind[i].move();
        cluesFind[i].display();
        couragePlayer.handleEatingClue(cluesFind[i]);
      }
    }
  }
}


//hintsFound()
//Display the amount of hints found
function hintsFound() {
  push();
  fill(255, 255, 255);
  textAlign(CENTER, RIGHT);
  textFont('Impact');
  textSize(30);
  text("# OF HINTS FOUND " + couragePlayer.cluesCaught, 630, 90);
  pop();
}

//timeCounter()
//Once the timer ends (0), Courage will lose "Courage"
function timeCounter() {
  timeToGrowPower += 1 / 60; // Count down based on frame rate
  if (timeToGrowPower > 3) {
    powerEnergy += 10;
    powerEnergy = constrain(powerEnergy, 0, 100); //constrain the power energy btw 0 and 100
    timeToGrowPower = 0;
  }
  //if courage bar reaches 60, lower the courage by -10
  timeBeforeCourageDrop += 1 / 60; // Count down based on frame rate
  if (timeBeforeCourageDrop > 3) // If the counter reaches zero, courage should drop
  {
    courageEnergy -= 10; // Drop courage
    timeBeforeCourageDrop = 0; // Reset timer to 3 seconds
  }
  push();
  fill(255, 255, 255);
  textAlign(CENTER, RIGHT);
  textFont('Impact');
  textSize(30);
  text("TIMER: " + floor(timeBeforeCourageDrop), 400, 90);
  text("TIMER POWER: " + floor(timeToGrowPower), 200, 90);
  pop();
}

//CourageBar()
//Draw a Courage Bar. It shows how much the Player dog has courage left
function CourageBar() {
  //constrain the courage bar so it will be btw 0 and 500
  let courageBarFill = 500 - courageEnergy;
  courageBarFill = constrain(courageBarFill, 0, 500);
  fill(255, 160, 136); //set the fill to red
  rect(1400, 200, 40, 500);
  fill(240, 248, 255);
  rect(1400, 200, 40, courageBarFill);
}

//PowerBar()
//Draw the power bar. it show how much Power Courage has accumulated. Once the bar has been filled the player will be able to click Shift to activate its skill.
function PowerBar() {
  let powerBarFill = map(powerEnergy, 0, 100, 0, 500);
  powerBarFill = constrain(powerBarFill, 0, 500);
  fill(109, 207, 246); //set the fill to blue
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
  if (showGameOver) { //if its game over reset the game once the mouse has been pressed
    resetGame();
  }
  if (showGameWin) {
    resetGame();
  } else if (gameStart === false) {
    gameStart = true;
    clickButton.play();
    //loops music
    mainMusic.loop();
    successMusic.stop();
    loseMusic.stop();
  }
}

//checkGameOver()
//checking if its game over. There are two possible ways in getting a gameover : The Courage has completely dropped to 0 (By normal cause or the player has drank the poison)
function checkGameOver() {
  if (courageEnergy === 0) {
    showGameOver = true;
    //stops music
    mainMusic.stop();
    //plays the lose song
    loseMusic.loop();
  }
}

//checkIfWon()
//checking if its a win for the player Courage. If the player caught 5 clues, its a win!
function checkIfWon() {
  if (couragePlayer.cluesCaught === 5) {
    showGameWin = true;
    mainMusic.stop();
    successMusic.loop();
  }
}

//resetGame()
//reset the game including its elements
function resetGame() {
  couragePlayer.reset();
  for (let i = 0; i < cluesFind.length; i++) {
    cluesFind[i].reset();
  }
  for (let i = 0; i < badMonsters.length; i++) {
    badMonsters[i].reset();
  }
  //has the click sounds
  clickButton.play();
  //loops the music once again
  mainMusic.loop();
  //stops the lose music
  loseMusic.stop();
  //stop the success music
  successMusic.stop();
  showGameOver = false;
  showGameWin = false;
  //Timer variable for the courage bar
  timeBeforeCourageDrop = 0;
  courageEnergy = 500;
  //max courage energy
  maxCourageEnergy = 500;
  //Time variable for the Power energy bar
  timeToGrowPower = 0;
  //power energy
  powerEnergy = 0;
  //variable that tracks how many clues it has caught. In this case it will be reseted to 0.
  couragePlayer.cluesCaught = 0;
  itemPie.reset(); //item pie resets
  itemPoison.reset(); //poison item resets
}
