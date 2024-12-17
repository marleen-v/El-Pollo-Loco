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


// mobile Touchbuttons

const mobileControls = {
    startJumping: () => (world.keyboard.jumpButtonPressed = true),
    startThrowing: () => (world.keyboard.throwButtonPressed = true),
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
  