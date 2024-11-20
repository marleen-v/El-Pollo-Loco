const imgRef = document.querySelectorAll(".key");

let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
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
        toggleDisplay(5, 6);
       

    };
    if(event.key == 'ArrowLeft'){
        keyboard.LEFT = false;
        toggleDisplay(2, 3);
        
    };
    if(event.key == 'ArrowUp'){
        keyboard.UP = false;
        toggleDisplay(0, 1);
    };
    if(event.key == 'ArrowDown'){
        keyboard.DOWN = false;
    };
    if(event.key == ' '){
        keyboard.SPACE = false;
    };
    if(event.key == 'd'){
        keyboard.D = false;
        toggleDisplay(7, 8);
    };
} ) 

function toggleDisplay(img, img_active) {
    imgRef[img].classList.toggle("d_none");
    imgRef[img_active].classList.toggle("d_none");
}
  