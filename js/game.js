const imgRef = document.querySelectorAll(".key");
const startScreenRef = document.getElementById("start");
const dialog = document.querySelector("dialog");
const closeBtn = document.getElementById("close-btn");

let canvas;
let world;
let keyboard = new Keyboard();


function startGame() {

    canvas = document.getElementById("canvas");
    toggleVisibility(startScreenRef);
    toggleVisibility(canvas);
    world = new World(canvas, keyboard);
}

function toggleVisibility(element){
    element.classList.toggle("d_none");
}

function openDialog(){
    dialog.classList.add("bg");
    dialog.open();
}

function dialogClose(){
    dialog.close();
    dialog.classList.remove("bg");
}

window.addEventListener('keydown', (event) => {
    if(event.key == 'ArrowRight'){
        keyboard.RIGHT = true;
        toggleDisplay(5, 6);

    };
    if(event.key == 'ArrowLeft'){
        keyboard.LEFT = true;
        toggleDisplay(2, 3);
    };
    if(event.key == 'ArrowUp'){
        keyboard.UP = true;
        toggleDisplay(0, 1);
    };
    if(event.key == 'ArrowDown'){
        keyboard.DOWN = true;
    };
    if(event.key == ' '){
        keyboard.SPACE = true;
    };
    if(event.key == 'd'){
        keyboard.D = true;
          toggleDisplay(7, 8);
    };
} ) 

window.addEventListener('keyup', (event) => {
    if(event.key == 'ArrowRight'){
        keyboard.RIGHT = false;
        toggleDisplay(6, 5);
       

    };
    if(event.key == 'ArrowLeft'){
        keyboard.LEFT = false;
        toggleDisplay(3, 2);
        
    };
    if(event.key == 'ArrowUp'){
        keyboard.UP = false;
        toggleDisplay(1, 0);
    };
    if(event.key == 'ArrowDown'){
        keyboard.DOWN = false;
    };
    if(event.key == ' '){
        keyboard.SPACE = false;
    };
    if(event.key == 'd'){
        keyboard.D = false;
        toggleDisplay(8, 7);
    };
} ) 

function toggleDisplay(img, img_active) {
    imgRef[img].classList.add("d_none");
    imgRef[img_active].classList.remove("d_none");
}
  