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
    }
    if(event.key == 'ArrowLeft'){
        keyboard.LEFT = true;
    }
    if(event.key == 'ArrowUP'){
        keyboard.UP = true;
    }
    if(event.key == 'ArrowDOWN'){
        keyboard.DOWN = true;
    }
    if(event.key == 'Space'){
        keyboard.SPACE = true;
    }
} ) 

window.addEventListener('keyup', (event) => {
    if(event.key == 'ArrowRight'){
        keyboard.RIGHT = false;
    }
    if(event.key == 'ArrowLeft'){
        keyboard.LEFT = false;
    }
    if(event.key == 'ArrowUP'){
        keyboard.UP = false;
    }
    if(event.key == 'ArrowDOWN'){
        keyboard.DOWN = false;
    }
    if(event.key == 'Space'){
        keyboard.SPACE = false;
    }
} ) 

