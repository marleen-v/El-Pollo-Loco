class ChickenSmall extends MovableObject {
  y = 380;
  width = 50;
  height = 50;
  energy = 10;

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

    this.x = 200 + Math.random() * 500;
    this.hitbox = this.getHitBox();
    this.speed = 0.15 + Math.random() * 0.25;
    this.applyGravity();
    this.animate();
  }

  animate() {

    setStoppableInterval(() =>  this.chickenSmallMoves() , 1000 / 60);
    setStoppableInterval(() =>  this.chickenAnimation() , 200);

  }

  chickenAnimation(){
    if (!this.isDead()) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.playAnimation(this.IMAGES_DEAD);
    }
  } 

chickenSmallMoves(){
  /* if (this.isDead() && !this.isAboveGround()) {
        this.speedY = 0
        this.hitbox = this.getHitBox();
      } else */ if (!this.isAboveGround()) {
        this.jump();
        this.hitbox = this.getHitBox();
      }
}

  jump() {
    this.speedY = 20;
  }

  isAboveGround() {
    return this.y < 380;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }
}
