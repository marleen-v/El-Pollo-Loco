class ChickenSmall extends MovableObject {
  y = 380;
  width = 50;
  height = 50;
  energy = 10;
  i = 0;

  offset = {
    top: 0,
    left: 5,
    right: 5,
    bottom: 10,
  };



  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 250 + Math.random() * 500;
    this.hitbox = this.getHitBox();
    this.speed = 0.15 + Math.random() * 0.25;
    this.applyGravity();
    this.animate();
    this.i = 1 + Math.random() * 10
  }

  animate() {
  
    setStoppableInterval(() =>  this.chickenSmallMoves() , 1000 / 60);
    setStoppableInterval(() =>  this.chickenAnimation() , 200);

  }

  chickenAnimation(){
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  } 

chickenSmallMoves(){
  // change directions when it gets to level bounderies
  if (this.x <= this.xStart) {
    this.otherDirection = true; 
  } else if (this.x >= this.xEnd) {
    this.otherDirection = false; 
  }

  //changes from jumping to walking to jumping ...
       if (!this.isAboveGround() && this.i < 2) {
        this.jump();
        this.hitbox = this.getHitBox();
        this.i++;
      }  else if (!this.isAboveGround() && this.i >= 2 && !this.otherDirection){
        this.moveLeft();
        this.hitbox = this.getHitBox();
        this.i++;
      }  else if (!this.isAboveGround() && this.i >= 2 && this.otherDirection){
        this.moveRight();
        this.hitbox = this.getHitBox();
        this.i++;
      }
      if(this.i > 80){  
        this.i = 0; // begins jumping again
      } 
       
}

  jump() {
    this.speedY = 20;
  }

  isAboveGround() {
    return this.y < 380;
  }




}
