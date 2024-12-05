const imgRef = document.querySelectorAll(".key");
const startScreenRef = document.getElementById("start");
const dialog = document.querySelector("dialog");
const closeBtn = document.getElementById("close-btn");
const btnContainer = document.getElementById('btn-container')
const btnContainerMobile = document.getElementById('mobileBtn-container')
const buttons = document.querySelectorAll('button');

let intervalIds = [];
otherDirectionCharacter = false;

let characterMetEndboss = false;
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

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

function stopGame() {
  gameStarted = false;
  resetIntervals();
  soundManager.pauseAll();
}

function resetIntervals(){
  intervalIds.forEach(clearInterval);
  intervalIds = [];
}

function restartGame(){
  resetIntervals();
  startGame();
  
}

function showLoadingSpinner() {
  toggleVisibility("spinner", true);
}

function hideLoadingSpinner() {
  toggleVisibility("spinner", false);
}



async function startGame() {
 
  showLoadingSpinner(); 

  initLevel(); 
  
  hideLoadingSpinner();
  canvas = document.getElementById("canvas");

  soundManager = new SoundManager();
  world = new World(canvas, keyboard);

  showGameScreen();
  gameStarted = true; // for button mobile eventlistener
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
function toggleSounds(){
  soundManager.toggleMute();
};


/**
 * changes images of keyboard keys, if clicked
 * @param {String} img - default image src of key
 * @param {String} img_active - image src when key is clicked
 */
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

function resizeCanvasS() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}




//------------------------------------------ StartGame------------------------

function showGameScreen(){ 
  toggleVisibility("fullscreen", true);
  toggleVisibility("start", false);
  toggleVisibility("game-over-screen", false);
  toggleVisibility("win-screen", false);
}

function showStartScreen(){
  toggleVisibility("start", true);
  toggleVisibility("fullscreen", false);
  toggleVisibility("game-over-screen", false);
  toggleVisibility("win-screen", false);
}

function showGameoverScreen(){ 
  toggleVisibility("game-over-screen", true);
  soundManager.play("gameOver");
}

function hideGameOverScreen(){
  toggleVisibility("game-over-screen", false);
}

function showWinningScreen(){ 
  toggleVisibility("win-screen", true);
  soundManager.play("win");
}
function hideWinningScreen(){ 
  toggleVisibility("win-screen", false);
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
  window.innerHeight > window.innerWidth ? showRotateMessage() : showMainContent();
}

function addOrientationListeners() {
  checkOrientation(); 
  window.addEventListener("resize", checkOrientation);
  window.addEventListener("orientationchange", checkOrientation);
}

