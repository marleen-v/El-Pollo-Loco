class World {
  character = new Character();
  level = level1;

 
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  buttons = [];

  statusbar_health = new Statusbar("health");
  statusbar_coin = new Statusbar("coin");
  statusbar_bottle = new Statusbar("bottle");
  statusbar_endboss = new Statusbar("endboss");
  throwableObject = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.createButtons();
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
    this.buttons.push(new Button("volume", () => {
      this.buttons[0].toggleImage();
      }
    ));
    this.buttons.push(new Button("resize", () => {
      this.buttons[1].toggleImage();
      }
    ));
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
          this.throwableObject.push(new ThrowableObject(
          this.character.x + 10,
          this.character.y + 100
        ));
        /* this.throwableObject.push(bottle); */
        this.character.salsa -= 10;
        this.statusbar_bottle.setPercentage(this.character.salsa);
      }
    }
  }

/*   checkThrowObjectsCollision() {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        this.throwableObject.forEach((object, objectIndex) => {
          if (object.isColliding(enemy)) {
            enemy.takeDamage();
            if (enemy.isDead()) {
              
              this.level.enemies.splice(enemyIndex, 1);
            }
          }
        });
      });
    } */

      checkThrowObjectsCollision() {
        for (let objectIndex = this.throwableObject.length - 1; objectIndex >= 0; objectIndex--) {
          const bottle = this.throwableObject[objectIndex];
          let bottleRemoved = false;
      
          // Collision with enemy
          for (let enemyIndex = this.level.enemies.length - 1; enemyIndex >= 0; enemyIndex--) {
            const enemy = this.level.enemies[enemyIndex];
            if (bottle.isColliding(enemy) && !bottle.hitEnemy) {
              bottle.hitEnemy = true;
              enemy.takeDamage();
              this.statusbar_endboss.setPercentage(this.level.enemies[0].energy);
              if (enemy.isDead()) {
                setTimeout(() => {
                  this.level.enemies.splice(enemyIndex, 1)
                }, 600);
              }
              setTimeout(() => {
                this.throwableObject.splice(objectIndex, 1);
                bottleRemoved = true; 
              }, 300);
              break; 
            }
          }
          // remove Object if its not seen anymore
          if (!bottleRemoved && bottle.y >= 400) {
            this.throwableObject.splice(objectIndex, 1);
          } 
        }
      }

  checkCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.isJumpingOn(enemy)) {
          enemy.takeDamage();
          if (enemy.isDead()) {
            this.level.enemies.splice(index, 1);
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
