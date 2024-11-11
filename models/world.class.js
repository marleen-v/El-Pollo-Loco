class World {
  character = new Character();
  enemies = [
    new Chicken(), 
    new Chicken(), 
    new Chicken()
];
  clouds = [new Cloud("1"), new Cloud("2")];
  backgroundObjects = [
    new BackgroundObject("img/5_background/layers/air.png", -719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719 ),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0 ),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/air.png", 719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 ),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/air.png", 719*2),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png",719*2),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719*2 ),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719*2),
    new BackgroundObject("img/5_background/layers/air.png", 719*3),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719*3),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719*3),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719*3),
];
  
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld(){
    this.character.world = this;
  }

  draw() {
    //Clear before drawing new
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    // Draw 
    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.enemies);
    this.addToMap(this.character);

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
      this.ctx.save(); // saves the current state, including position, style and transformations.
      this.ctx.translate(mO.width, 0);
      this.ctx.scale(-1,1);
      mO.x = mO.x * -1;
    }
    
    this.ctx.drawImage(mO.img, mO.x, mO.y, mO.width, mO.height);

    if(mO.otherDirection) {
      mO.x = mO.x * -1;
      this.ctx.restore(); // resets the canvas state to the last saved state, undoing any changes in between.
    }
  }
}
