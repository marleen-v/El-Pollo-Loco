const imgRef = document.querySelectorAll(".key");
const startScreenRef = document.getElementById("start");
const dialog = document.querySelector("dialog");
const closeBtn = document.getElementById("close-btn");
const btnContainer = document.getElementById('btn-container')
const btnContainerMobile = document.getElementById('mobileBtn-container')
const buttons = document.querySelectorAll('button');


let fullscreen_on = false;
let gameStarted = false;

let canvas;
let world;
let keyboard = new Keyboard();
let soundManager;


// Start the app when the page is fully loaded  ------ in onload rein?----------------
document.addEventListener("DOMContentLoaded", initializeApp);

// Initializing the app when loading the page
function initializeApp() {

  initializeMobileControls();
  initializeKeyboardControls();
  addOrientationListeners();
}



function startGame() {
  canvas = document.getElementById("canvas");

  soundManager = new SoundManager();
  world = new World(canvas, keyboard);

  showGameScreen();
  gameStarted = true; // for button mobile eventlistener
} 




function openDialog() {
  dialog.classList.add("bg");
  dialog.showModal();
}

function dialogClose() {
  dialog.close();
  dialog.classList.remove("bg");
}

function initializeKeyboardControls() {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
}

function handleKeyDown(event) {
  if (event.key == "ArrowRight") {
    keyboard.RIGHT = true;
    toggleDisplay(5, 6);
  }
  if (event.key == "ArrowLeft") {
    keyboard.LEFT = true;
    toggleDisplay(2, 3);
  }
  if (event.key == "ArrowUp") {
    keyboard.UP = true;
    toggleDisplay(0, 1);
  }
  if (event.key == "ArrowDown") {
    keyboard.DOWN = true;
  }
  if (event.key == " ") {
    keyboard.SPACE = true;
  }
  if (event.key == "d") {
    keyboard.D = true;
    toggleDisplay(7, 8);
  }
};

function handleKeyUp(event){
  if (event.key == "ArrowRight") {
    keyboard.RIGHT = false;
    toggleDisplay(6, 5);
  }
  if (event.key == "ArrowLeft") {
    keyboard.LEFT = false;
    toggleDisplay(3, 2);
  }
  if (event.key == "ArrowUp") {
    keyboard.UP = false;
    toggleDisplay(1, 0);
  }
  if (event.key == "ArrowDown") {
    keyboard.DOWN = false;
  }
  if (event.key == " ") {
    keyboard.SPACE = false;
  }
  if (event.key == "d") {
    keyboard.D = false;
    toggleDisplay(8, 7);
  }
};

function toggleSounds(){
  soundManager.toggleMute();
};

// change Icons when clicked (sounds and fullscreen)

function toggleDisplay(img, img_active) {
  imgRef[img].classList.add("d_none");
  imgRef[img_active].classList.remove("d_none");
}

//--------- fullscreen

function toggleFullscreen(){
    const fullscreen = document.getElementById('fullscreen');
      if(!fullscreen_on){
    /*  resizeCanvas(fullscreen, 1.5);  */
      enterFullscreen(fullscreen);
      this.src = 'img/SVG/resize-1.svg'
      fullscreen_on = true;
  } else {
      exitFullscreen(fullscreen);
      this.src = 'img/SVG/resize-2.svg'
      fullscreen_on = false; 
     /*  resizeCanvas(fullscreen, 1); */
  }
};

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // iOS Safari
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}


function resizeCanvas(fullscreen, scaleFactor) {
  canvas.width = fullscreen.clientWidth * scaleFactor;
  canvas.height = fullscreen.clientHeight * scaleFactor;

  const context = world.ctx;
  context.scale(scaleFactor, scaleFactor);
} 


//-----------------------------------------mobile movements


// Funktionen für mobile Steuerung
const mobileControls = {
  startJumping: () => (world.keyboard.jumpButtonPressed = true),
 /*  stopJumping: () => (world.keyboard.jumpButtonPressed = false), */
  startThrowing: () => (world.keyboard.throwButtonPressed = true),
 /*  stopThrowing: () => (world.keyboard.throwButtonPressed = false), */
  startMovingLeft: () => (world.keyboard.leftButtonPressed = true),
  stopMovingLeft: () => (world.keyboard.leftButtonPressed = false),
  startMovingRight: () => (world.keyboard.rightButtonPressed = true),
  stopMovingRight: () => (world.keyboard.rightButtonPressed = false),
};

function addTouchListeners(button) {
  const startAction = button.dataset.start;
  const stopAction = button.dataset.stop;

  button.addEventListener("touchstart", event => handleTouch(event, startAction));
  button.addEventListener("touchend", event => handleTouch(event, stopAction));
}

function handleTouch(event, actionName) {
  event.preventDefault(); 
  if (actionName && typeof mobileControls[actionName] === "function") {
    mobileControls[actionName](); 
  }
}

function toggleButtonContainer() {
  const container = document.getElementById("mobileBtn-container");

  if (!gameStarted) return;
  container.style.display = window.innerWidth < 1000 ? "flex" : "none";
}

function initializeMobileControls() {
  const buttons = document.querySelectorAll("#mobileBtn-container button");
  buttons.forEach(button => addTouchListeners(button)); // Touch-Listener für Buttons hinzufügen

  toggleButtonContainer(); // Initiale Überprüfung beim Laden
  window.addEventListener("resize", toggleButtonContainer); // Überprüfung bei Fensteränderung
}



//------------------------------------------ StartGame------------------------

function showGameScreen(){ //Beginn game
  toggleVisibility("fullscreen", true);
  toggleVisibility("start", false);
}

//------------------------------------------ Check Orientaion------------------------

// controls the visibility of an element
function toggleVisibility(elementId, isVisible) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = isVisible ? "flex" : "none";
  }
}

// shows message and hides Content

function showRotateMessage() {
  toggleVisibility("orientationMessage", true);
  toggleVisibility("canvas-container", false);
}

// hides message and shows content
function showMainContent() {
  toggleVisibility("orientationMessage", false);
  toggleVisibility("canvas-container", true);
}

// checks orientation
function checkOrientation() {
  if (window.innerHeight > window.innerWidth) {
    showRotateMessage();
  } else {
    showMainContent();
  }
}

function addOrientationListeners() {
  checkOrientation(); // Initiale Prüfung der Orientierung
  window.addEventListener("resize", checkOrientation);
  window.addEventListener("orientationchange", checkOrientation);
}
