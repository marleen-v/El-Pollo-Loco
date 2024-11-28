const imgRef = document.querySelectorAll(".key");
const startScreenRef = document.getElementById("start");
const dialog = document.querySelector("dialog");
const closeBtn = document.getElementById("close-btn");

let fullscreen_on = false;

let canvas;
let world;
let keyboard = new Keyboard();
let soundManager;

function startGame() {
  canvas = document.getElementById("canvas");
  toggleVisibility(startScreenRef);
  toggleVisibility(canvas);
  const soundManager = new SoundManager();
  world = new World(canvas, keyboard); 
  /* toggleSounds(); */
}

function toggleSounds(){
  document.getElementById('toggleSounds').onclick = () => {
    world.toggleSound();
};
}


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

