const imgRef = document.querySelectorAll(".key");
const startScreenRef = document.getElementById("start");
const dialog = document.querySelector("dialog");
const closeBtn = document.getElementById("close-btn");
const btnContainer = document.getElementById("btn-container");
const btnContainerMobile = document.getElementById("mobileBtn-container");
const buttons = document.querySelectorAll("button");

let intervalIds = [];
otherDirectionCharacter = false;

let fullscreen_on = false;
let gameStarted = false;

let canvas;
let world;
let keyboard = new Keyboard();
let soundManager;

// Start the app when the page is fully loaded
document.addEventListener("DOMContentLoaded", initializeApp);

/**
 * Initializing the app when loading the page
 */
function initializeApp() {
  initializeMobileControls();
  initializeKeyboardControls();
  addOrientationListeners();
}

/**
 * sets an interval and combines all intervals in an array
 * @param {Function} fn 
 * @param {Number} time 
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

/**
 * stops the game, resets all intervals and stopps Sounds
 */
function stopGame() {
  gameStarted = false;
  resetIntervals();
  soundManager.pauseAll(); 
}


/**
 * resets all Intervals
 */
function resetIntervals() {
  intervalIds.forEach(clearInterval);
  intervalIds = [];
}

/**
 * restarts game
 */
function restartGame() {
  resetIntervals();
  startGame();
}

/**
 * shows loading spinner before game
 */
function showLoadingSpinner() {
  toggleVisibility("spinner", true);
}

/**
 * hides loading spinner 
 */
function hideLoadingSpinner() {
  toggleVisibility("spinner", false);
}

/**
 * starts the game
 */
async function startGame() {
  initLevel();
  canvas = document.getElementById("canvas");
  soundManager = new SoundManager();
  world = new World(canvas, keyboard);
  showGameScreen();
  gameStarted = true; // for button mobile eventlistener
  toggleButtonContainer()
}

/**
 * opens dialog of button "need help" on the startscreen
 */
function openDialog() {
  dialog.classList.add("bg");
  dialog.showModal();
}

/**
 * closes dialog of button "need help" on the startscreen
 */
function dialogClose() {
  dialog.close();
  dialog.classList.remove("bg");
}

/**
 * mutes or unmutes  all sounds
 */
function toggleSounds() {
  soundManager.toggleMute(); 
  if(!soundManager.isMuted){
    world.playSoundsOfEnemies();
  } 
}

/**
 * changes images of keyboard keys, if clicked
 * @param {String} img - default image src of key
 * @param {String} img_active - image src when key is clicked
 */
function toggleDisplay(img, img_active) {
  imgRef[img].classList.add("d_none");
  imgRef[img_active].classList.remove("d_none");
}

/**
 * toggles the fullscreen
 */
function toggleFullscreen() {
  const fullscreen = document.getElementById("fullscreen");
  if (!fullscreen_on) {
    enterFullscreen(fullscreen);
    this.src = "img/SVG/resize-1.svg";
    fullscreen_on = true;
  } else {
    exitFullscreen(fullscreen);
    this.src = "img/SVG/resize-2.svg";
    fullscreen_on = false;
  }
}

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


/**
 * controls the visibility of an element
 * @param {Number} elementId 
 * @param {Boolean} isVisible 
 */
function toggleVisibility(elementId, isVisible) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = isVisible ? "flex" : "none";
  }
}

/**
 * shows game screen
 */
function showGameScreen() {
  toggleVisibility("fullscreen", true);
  toggleVisibility("start", false);
  toggleVisibility("game-over-screen", false);
  toggleVisibility("win-screen", false);
}

/**
 * shows start screen
 */
function showStartScreen() {
  toggleVisibility("start", true);
  toggleVisibility("fullscreen", false);
  toggleVisibility("game-over-screen", false);
  toggleVisibility("win-screen", false);
}

/**
 * show game-over-screen
 */
function showGameoverScreen() {
  toggleVisibility("game-over-screen", true);
  soundManager.play("gameOver");
}

/**
 * hides game-over-screen
 */
function hideGameOverScreen() {
  toggleVisibility("game-over-screen", false);
}

/**
 * shows winning-screen
 */
function showWinningScreen() {
  toggleVisibility("win-screen", true);
  soundManager.play("win");
}

/**
 * hides winning screen
 */
function hideWinningScreen() {
  toggleVisibility("win-screen", false);
}

//------------------------------------------ Check Orientaion------------------------

/**
 * shows message and hides Content
 */
// 
function showRotateMessage() {
  toggleVisibility("orientationMessage", true);
  toggleVisibility("canvas-container", false);
}


/**
 * hides message and shows content
 */
function showMainContent() {
  toggleVisibility("orientationMessage", false);
  toggleVisibility("canvas-container", true);
}

/**
 * checks orientation of device
 */
function checkOrientation() {
  window.innerHeight > window.innerWidth
    ? showRotateMessage()
    : showMainContent();
}

/**
 * adds Listeners for orientation
 */
function addOrientationListeners() {
  checkOrientation();
  window.addEventListener("resize", checkOrientation);
  window.addEventListener("orientationchange", checkOrientation);
}
