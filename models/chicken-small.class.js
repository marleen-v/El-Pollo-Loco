class ChickenSmall extends MovableObject {
  y = 370;
  width = 60;
  height = 60;
  energy = 10;
  i = 0;
  onGroundY = 370;

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

  /**
   * sets the moving direction
   */
  movingDirection() {
    if (Math.random() < 0.5) {
      this.otherDirection = true;
    }
  }

  /**
   * animates the chicken, sets stoppable intervals
   */
  animate() {
    setStoppableInterval(() => this.chickenSmallMoves(), 1000 / 60);
    setStoppableInterval(() => this.chickenAnimation(), 200);
    setStoppableInterval(() => this.playChickenSound(), 200);
  }

  /**
   * animates the chicken
   */
  chickenAnimation() {
    if (this.isDead()) {
      this.pauseSound();
      this.playAnimation(this.IMAGES_DEAD);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * handles all movements of chicken
   */
  chickenSmallMoves() {
    // change directions when it gets to level bounderies
    this.changeDirections();
    this.walkAndJumpAnimation();
  }

  /**
   * movements of chicken, jumping and walking
   */
  walkAndJumpAnimation() {
    //changes from jumping to walking to jumping ...
    if (!this.isAboveGround() && this.i < 2) {
      this.jump();
      this.updateHitbox();
      this.i++;
    } else if (!this.isAboveGround() && this.i >= 2 && this.isMovingLeft()) {
      this.handleMovingLeft();
    } else if (!this.isAboveGround() && this.i >= 2 && this.isMovingRigt()) {
      this.handleMovingRight();
    } else if (this.isMovingLeft()) {       // moves while isAboveGround (while jumping)
      this.leftJump();
    } else {
      this.rightJump();
    }
    this.beginNewCircle();
  }

  /**
   * chicken jumps to the right
   */
  rightJump(){
    this.moveRight();
      this.updateHitbox();
  }

  /**
   * chicken jumps to the left
   */
  leftJump(){
    this.moveLeft();
      this.updateHitbox();
  }

  /**
   * sets a new jumping circle
   */
  beginNewCircle(){
    if (this.i > 80) {
      this.i = 0; // begins jumping again
    }
  }

  /**
   * chicken walks to the right
   */
  handleMovingRight(){
    this.moveRight();
    this.updateHitbox();
    this.i++;
  }

  /**
   * chicken walks to the left
   */
  handleMovingLeft(){
  this.moveLeft();
      this.updateHitbox();
      this.i++;
  }

  /**
   * changes the moving direction of chicken, when it gets to the beginning or end of the level
   */
  changeDirections() {
    if (this.atLevelStartPoint()) {
      this.otherDirection = true;
    } else if (this.atLevelEndPoint()) {
      this.otherDirection = false;
    }
  }

  /**
   * updates the hitbox
   */
  updateHitbox(){
    this.hitbox = this.getHitBox();
  }

  /**
   * checks if chicken is at the starting point 
   * @returns 
   */
  atLevelStartPoint() {
    return this.x <= this.xStart;
  }

  /**
   * checks if chicken is at the end point 
   * @returns 
   */
  atLevelEndPoint() {
    return this.x >= this.xEnd;
  }

  /**
   * checks if chicken can move right
   * @returns 
   */
  isMovingRigt() {
    return this.otherDirection == true;
  }

  /**
   * checks if the chicken can move left
   * @returns 
   */
  isMovingLeft() {
    return this.otherDirection == false;
  }

  /**
   * chicken jumps
   */
  jump() {
    if (!this.isDead()) {
      this.speedY = 20;
    }
  }

}
