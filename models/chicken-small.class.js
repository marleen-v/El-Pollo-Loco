class ChickenSmall extends MovableObject {
  y = 370;
  width = 60;
  height = 60;
  energy = 10;
  i = 0;

  world;

  isMuted = false;

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

    this.x = 400 + Math.random() * 5100;
    this.hitbox = this.getHitBox();
    this.speed = 0.15 + Math.random() * 0.4;
    this.applyGravity();
    this.animate();
    this.i = 1 + Math.random() * 10;
    this.sound = new Audio("audio/chickenSmall.mp3");
    this.movingDirection();
  }

  movingDirection() {
    if (Math.random() < 0.5) {
      this.otherDirection = true;
    }
  }

  animate() {
    setStoppableInterval(() => this.chickenSmallMoves(), 1000 / 60);
    setStoppableInterval(() => this.chickenAnimation(), 200);
    setStoppableInterval(() => this.playChickenSound(), 200);
  }

  chickenAnimation() {
    if (this.isDead()) {
      this.pauseSound();
      this.playAnimation(this.IMAGES_DEAD);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  chickenSmallMoves() {
    // change directions when it gets to level bounderies
    this.changeDirections();
    this.walkAndJumpAnimation();
  }

  walkAndJumpAnimation() {
    //changes from jumping to walking to jumping ...
    if (!this.isAboveGround() && this.i < 2) {
      this.jump();
      this.hitbox = this.getHitBox();
      this.i++;
    } else if (!this.isAboveGround() && this.i >= 2 && this.isMovingLeft()) {
      this.moveLeft();
      this.hitbox = this.getHitBox();
      this.i++;
    } else if (!this.isAboveGround() && this.i >= 2 && this.isMovingRigt()) {
      this.moveRight();
      this.hitbox = this.getHitBox();
      this.i++;
    } else if (this.isMovingLeft()) {
      // moves while isAboveGround (while jumping)
      this.moveLeft();
      this.hitbox = this.getHitBox();
    } else {
      this.moveRight();
      this.hitbox = this.getHitBox();
    }

    if (this.i > 80) {
      this.i = 0; // begins jumping again
    }
  }

  changeDirections() {
    if (this.atLevelStartPoint()) {
      this.otherDirection = true;
    } else if (this.atLevelEndPoint()) {
      this.otherDirection = false;
    }
  }

  atLevelStartPoint() {
    return this.x <= this.xStart;
  }
  atLevelEndPoint() {
    return this.x >= this.xEnd;
  }

  isMovingRigt() {
    return this.otherDirection == true;
  }

  isMovingLeft() {
    return this.otherDirection == false;
  }

  jump() {
    if (!this.isDead()) {
      this.speedY = 20;
    }
  }

  isAboveGround() {
    return this.y < 370;
  }
}
