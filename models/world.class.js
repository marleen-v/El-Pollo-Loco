class World {
  character = new Character();
  level = level1;
  coinAmount = 10;

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
   thoughtBubble = []; 
   thoughtBubbleActive = false;

  endscreen = new Endscreen(0); 
  endscreen_win = new Endscreen(1);

  constructor(canvas, keyboard) {
    this.intervalIds = [];
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.soundManager = SoundManager.instance;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.throwableObject.world = this;
    this.soundManager.world = this;
    this.statusbar_endboss.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  run() {
    setStoppableInterval(() => {
      this.checkCollisions();
      this.checkCollectCoin();
      this.checkCollectBottle();
      this.checkThrowObjectsCollision();
    }, 1000 / 60);

    setStoppableInterval(() => {
      this.checkThrowObjects();
    }, 150);
  }

  checkIfYouWon(){
    
    if(this.level.enemies.length == 0 && this.level.coins.length == 0) {
      stopGame();
      showWinningScreen();
    } else if(this.level.enemies.length == 0 && this.level.coins.length != 0 && !this.thoughtBubbleActive){
      this.thoughtBubble.push(new ThoughtBubble(1, this.character.x + 10, this.character.y + 100));
      this.deleteThoughtBubble();
      this.thoughtBubbleActive = true;
    } else if(this.level.enemies.length != 0 && this.level.coins.length == 0 && !this.thoughtBubbleActive){
      this.thoughtBubble.push(new ThoughtBubble(0, this.character.x + 10, this.character.y + 100));
      this.deleteThoughtBubble();
      this.thoughtBubbleActive = true;
    }
  }


  deleteThoughtBubble(){
    setTimeout(() => {
      this.thoughtBubble.splice(0, 1);
    }, 3000);
  }

  checkThrowObjects() {
    
    if (this.keyboard.D || this.keyboard.throwButtonPressed) {
      if (this.character.salsa != 0) {
        this.throwableObject.push(
          new ThrowableObject(this.character.x + 10, this.character.y + 100)
        );
        this.soundManager.play('throw');
        this.character.salsa -= 10;
        this.statusbar_bottle.setPercentage(this.character.salsa);
      }
      this.keyboard.throwButtonPressed = false;
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
          this.soundManager.play('bottle_break');
          bottle.hitEnemy = true;
          enemy.takeDamage();
          this.updateEndbossHealth(enemy);
          
          if (enemy.isDead()) {
          this.removeEnemy(enemy, bottle);
          } else{
            SoundManager.instance.play('endboss_hit'); 
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
        this.throwableObject.splice(bottleIndex, 1); // remove bottle from original array
        bottleRemoved = true;
      }
    }, 300);
  }    

  removeEnemy(enemy, bottle) {
    this.soundManager.play('damage');
    setTimeout(() => {
      const originalIndex = this.level.enemies.indexOf(enemy);
      if (originalIndex !== -1) {
        this.level.enemies.splice(originalIndex, 1); // remove from original array
        this.checkIfYouWon();
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
        this.checkIfYouWon();
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
    this.addObjectsToMap(this.thoughtBubble); 


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

}
