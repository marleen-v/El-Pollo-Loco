class World {
  character = new Character();
  level = level1;

  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  buttons = [];
  /*  soundManager; */
  /* background_music; */

  statusbar_health = new Statusbar("health");
  statusbar_coin = new Statusbar("coin");
  statusbar_bottle = new Statusbar("bottle");
  statusbar_endboss = new Statusbar("endboss");
  throwableObject = [];

  endscreen = new Endscreen(); 

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    /*     //------------------
    this.soundManager = new SoundManager();
    // Hintergrundmusik hinzufügen
    const backgroundMusic = new Audio("audio/2021-10-11_-_Country_Fireside_-_www.FesliyanStudios.com.mp3");
    backgroundMusic.loop = true; // Schleife aktivieren
    this.soundManager.addSound(backgroundMusic);

    // Charakter-Sound hinzufügen
    const walking_sound = new Audio("audio/running.mp3");
    const runningSound = new Audio('path/to/running.mp3');
    this.soundManager.addSound(runningSound);

    //----------------- */
    this.createButtons();
    this.background_music = new Audio(
      "audio/2021-10-11_-_Country_Fireside_-_www.FesliyanStudios.com.mp3"
    );
    this.background_music.loop = true;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies[0].world = this; //endboss
    this.throwableObject.world = this;
  }

  createButtons() {
    this.buttons.push(
      new Button("volume", () => {
        const button = this.buttons[0];
        button.toggleImage();
        /* this.soundManager.toggleMute(); */
        this.toggleMusic(button);
      })
    );
    this.buttons.push(
      new Button("resize", () => {
        this.buttons[1].toggleImage();
        toggleFullscreen();
      })
    );
  }

  toggleMusic(button) {
    if (button.isPlaying) {
      this.background_music.pause();
    } else {
      this.background_music.play();
    }
    button.togglePlayState();
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCollectCoin();
      this.checkCollectBottle();
      this.checkThrowObjectsCollision();
    }, 1000 / 60);

    setInterval(() => {
      this.checkThrowObjects();
    }, 80);
  }

  isMouseOverButton(mouseX, mouseY) {
    // Prüfen, ob die Maus über einem der Buttons ist
    return this.buttons.some((button) => button.isClicked(mouseX, mouseY));
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      if (this.character.salsa != 0) {
        this.throwableObject.push(
          new ThrowableObject(this.character.x + 10, this.character.y + 100)
        );
        /* this.throwableObject.push(bottle); */
        this.character.salsa -= 10;
        this.statusbar_bottle.setPercentage(this.character.salsa);
      }
    }
  }

  checkThrowObjectsCollision() {
    const throwableObjectsSnapshot = [...this.throwableObject]; // copy of throwableObject
    const enemiesSnapshot = [...this.level.enemies]; // Copy of enemeies
  
    throwableObjectsSnapshot.forEach((bottle) => {
      let bottleRemoved = false;
      // check collision with enemy
      enemiesSnapshot.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !bottle.hitEnemy) {
          bottle.hitEnemy = true;
          enemy.takeDamage();
          this.updateEndbossHealth(enemy);
          if (enemy.isDead()) {
          this.removeEnemy(enemy);
          }
          this.removeBottle(bottle, bottleRemoved);
        }
      });
      // remove bottle, if it did not collide with enemy
      if (!bottleRemoved && bottle.y >= 400) {
        this.removeBottle(bottle, bottleRemoved);
      }
    });
  }

  removeBottle(bottle, bottleRemoved){
    setTimeout(() => {
      const bottleIndex = this.throwableObject.indexOf(bottle);
      if (bottleIndex !== -1) {
        this.throwableObject.splice(bottleIndex, 1); // Flasche aus Originalarray entfernen
        bottleRemoved = true;
      }
    }, 300);
  }    

  removeEnemy(enemy) {
    setTimeout(() => {
      const originalIndex = this.level.enemies.indexOf(enemy);
      if (originalIndex !== -1) {
        this.level.enemies.splice(originalIndex, 1); // remove from original array
      }
    }, 500); 
  }

  updateEndbossHealth(enemy) {
    if(enemy === this.level.enemies[0]){
      this.statusbar_endboss.setPercentage(this.level.enemies[0].energy);
    }
  }
  
  checkCollisions() {
    const enemiesSnapshot = [...this.level.enemies]; // copy of enemies
  
    enemiesSnapshot.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.isJumpingOn(enemy)) {
          enemy.takeDamage();
          this.updateEndbossHealth(enemy);
          if (enemy.isDead()) {
             this.removeEnemy(enemy); 
          }
          this.character.bounceUp();
        } else {
          this.character.hit();
          this.statusbar_health.setPercentage(this.character.energy);
        }
      }
    });
  }

  checkCollectCoin() {
    this.level.coins.forEach((item, index) => {
      if (this.character.isColliding(item)) {
        this.character.collectCoin();
        this.level.coins.splice(index, 1);
        this.statusbar_coin.setPercentage(this.character.wealth);
      }
    });
  }

  checkCollectBottle() {
    this.level.bottles.forEach((item, index) => {
      if (this.character.isColliding(item)) {
        this.character.collectBottle();
        this.level.bottles.splice(index, 1);
        this.statusbar_bottle.setPercentage(this.character.salsa);
      }
    });
  }

  draw() {
    //Clear before drawing new
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    // Draw
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);
    // ---------- Space for fixed objects
    this.addObjectsToMap(this.buttons);
    this.addToMap(this.statusbar_health);
    this.addToMap(this.statusbar_coin);
    this.addToMap(this.statusbar_bottle);
    this.addToMap(this.statusbar_endboss);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.enemies);

    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);

    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObject);

    this.ctx.translate(-this.camera_x, 0);


    // ---------- game-over
    if(this.character.isDead()){
      this.addToMap(this.endscreen);
    }
   
 

    //Draw() is called again and again
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mO) {
    if (mO.otherDirection) {
      this.flipImage(mO);
    }

    mO.draw(this.ctx);
    mO.drawFrame(this.ctx);

    if (mO.otherDirection) {
      this.flipImageBack(mO);
    }
  }

  flipImage(mO) {
    this.ctx.save(); // saves the current state, including position, style and transformations.
    this.ctx.translate(mO.width, 0);
    this.ctx.scale(-1, 1);
    mO.x = mO.x * -1;
  }

  flipImageBack(mO) {
    mO.x = mO.x * -1;
    this.ctx.restore(); // resets the canvas state to the last saved state, undoing any changes in between.
  }

  handleClick(mouseX, mouseY) {
    this.buttons.forEach((button) => {
      if (button.isClicked(mouseX, mouseY)) {
        button.onClick(); // Führe Button-Aktion aus
      }
    });
  }
}
