class World {
  character = new Character();
  level = level1;
  
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusbar_health = new Statusbar('health');
  statusbar_coin =  new Statusbar('coin');
  statusbar_bottle = new Statusbar('bottle');
  throwableObject = [];

  /* coins = [];
  bottles = []; */
    
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld(){
    this.character.world = this;
  }

  run(){
    setInterval(() => {
    this.checkCollisions(); 
    this.checkThrowObjects();
    this.checkCollectItem();
      }, 200);
  }

  checkThrowObjects(){
    if(this.keyboard.D){
      let bottle = new ThrowableObject((this.character.x + 10), (this.character.y + 100))
      this.throwableObject.push(bottle);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if(this.character.isColliding(enemy)){
        this.character.hit();
        this.statusbar_health.setPercentage(this.character.energy);
        console.log('Collision with   character', this.statusbar_health.percentage); 
      };
    });
  }

  checkCollectItem(){
    this.level.collectibleItems.forEach((item, index) => {
      if(this.character.isColliding(item)){
        this.character.collectItem();
        this.level.collectibleItems.splice(index, 1);
        console.log(this.level.collectibleItems); 
        this.statusbar_coin.setPercentage(this.character.wealth);
        console.log('collected', this.statusbar_coin.percentage); 
      };
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
    this.addToMap(this.statusbar_health);  
    this.addToMap(this.statusbar_coin); 
    this.addToMap(this.statusbar_bottle); 
    this.ctx.translate(this.camera_x, 0); 

    this.addObjectsToMap(this.level.enemies);
   
    this.addObjectsToMap(this.level.collectibleItems);
  
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
    objects.forEach(o => {
        this.addToMap(o);
    })
  }

  addToMap(mO) {
    if(mO.otherDirection){
      this.flipImage(mO);

    }
    
    mO.draw(this.ctx);
    mO.drawFrame(this.ctx);
   

    if(mO.otherDirection) {
      this.flipImageBack(mO);
    }
  }

  flipImage(mO){
    this.ctx.save(); // saves the current state, including position, style and transformations.
    this.ctx.translate(mO.width, 0);
    this.ctx.scale(-1,1);
    mO.x = mO.x * -1;
  }

  flipImageBack(mO){
    mO.x = mO.x * -1;
    this.ctx.restore(); // resets the canvas state to the last saved state, undoing any changes in between.
  }
}
