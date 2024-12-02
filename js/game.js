const imgRef = document.querySelectorAll(".key");
const startScreenRef = document.getElementById("start");
const dialog = document.querySelector("dialog");
const closeBtn = document.getElementById("close-btn");
const btnContainer = document.getElementById('btn-container')
const btnContainerMobile = document.getElementById('mobileBtn-container')
const buttons = document.querySelectorAll('button');

const actions = {
  sayHello: () => console.log("Hallo, Welt!"),
  sayGoodbye: () => console.log("Tschüss, bis bald!"),
  showDate: () => console.log(`Das aktuelle Datum ist: ${new Date().toLocaleDateString()}`),
  showAlert: () => alert("Achtung! Das ist eine Warnung."),
};

let fullscreen_on = false;
let gameStarted = false;

let canvas;
let world;
let keyboard = new Keyboard();
let soundManager;

function startGame() {
  
  canvas = document.getElementById("canvas");
  toggleVisibility(startScreenRef);
  toggleVisibility(canvas);
  soundManager = new SoundManager();
  world = new World(canvas, keyboard);

  
  btnContainer.classList.remove("d_none"); // button for sounds and fullscreen
  gameStarted = true; // for button mobile eventlistener
 /*  checkWindowSize();  */

} 

/*  button.addEventListener('touchstart', (e) => {
  e.preventDefault(); // Prevents double triggering
  console.log('Button touched!');
}); */ 

/* window.addEventListener('resize', checkWindowSize); */



/* function checkWindowSize() {
  if (!gameStarted) return;

  mobileBtn-container.style.display

  if (window.innerWidth <= 400) {
    btnContainerMobile.classList.remove('d_none');
  } else {
    btnContainerMobile.classList.add('d_none');
  }
} */

// onclick fuctions for buttons

function toggleSounds(){
    soundManager.toggleMute();
};


//mobile Buttons
function startJumping() {
  world.keyboard.jumpButtonPressed = true;
}
function stopJumping() {
  world.keyboard.jumpButtonPressed = false;
}
function stopThrowing() {
  world.keyboard.throwButtonPressed = false;
}
function startThrowing() {
  world.keyboard.throwButtonPressed = true;
}

function startMovingLeft() {
  world.keyboard.leftButtonPressed = true;
}

function stopMovingLeft() {
  world.keyboard.leftButtonPressed = false;
}

function startMovingRight() {
  world.keyboard.rightButtonPressed = true;
}

function stopMovingRight() {
  world.keyboard.rightButtonPressed = false;
}


// Funktion zum Hinzufügen von Touch-EventListenern
function addTouchListeners(button) {
  const startAction = button.dataset.start; // `data-start` auslesen
  const stopAction = button.dataset.stop; // `data-stop` auslesen

  // `touchstart` Event
  button.addEventListener("touchstart", event => {
    event.preventDefault(); // Verhindert Scrollen oder Zoomen
    if (startAction && typeof window[startAction] === "function") {
      window[startAction](); // Start-Funktion ausführen
    }
  });

  // `touchend` Event
  button.addEventListener("touchend", event => {
    event.preventDefault();
    if (stopAction && typeof window[stopAction] === "function") {
      window[stopAction](); // Stop-Funktion ausführen
    }
  });
}

// Show/Hide Container for movements
function toggleButtonContainer() {
  const container = document.getElementById("mobileBtn-container");

  if (!gameStarted) return;
  
  container.style.display = window.innerWidth < 600 ? "flex" : "none";
}

// touch-Listener for mobile-Container
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("#mobileBtn-container button");
  buttons.forEach(button => addTouchListeners(button));

  toggleButtonContainer(); // checks while loading
  window.addEventListener("resize", toggleButtonContainer); // checks when resized
});






function toggleVisibility(element) {
  element.classList.toggle("d_none");
}

function openDialog() {
  dialog.classList.add("bg");
  dialog.showModal();
}

function dialogClose() {
  dialog.close();
  dialog.classList.remove("bg");
}

window.addEventListener("keydown", (event) => {
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
});

window.addEventListener("keyup", (event) => {
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
});

// change Icons when clicked (sounds and fullscreen)

function toggleDisplay(img, img_active) {
  imgRef[img].classList.add("d_none");
  imgRef[img_active].classList.remove("d_none");
}

// for buttons on canvas
/* function eventListeners() {
  canvas.addEventListener("click", (event) => {
    
  });
} */

 

//fullscreen

function toggleFullscreen(){
    const button = document.getElementById('resize-btn')
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


