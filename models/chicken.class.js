class Chicken extends MovableObject {
  y = 340;
  width = 80;
  height = 90;
  energy = 10;

  offset = {
    top: 20,
    left: 15,
    right: 15,
    bottom: 20,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.soundManager = SoundManager.instance;
    this.x = 400 + Math.random() * 4800;
    this.hitbox = this.getHitBox();
    this.speed = 0.15 + Math.random() * 0.3;
    this.animate();
    this.movingDirection();

  }

  /**
   * sets the moving direction of chicken
   */
  movingDirection() {
    if (Math.random() < 0.5) {
      this.otherDirection = true;
    }
  }

  /**
   * sets stoppable intervals for movements, animation and sound of chicken
   */
  animate() {
    setStoppableInterval(() => this.chickenMoves(), 1000 / 60);
    setStoppableInterval(() => this.chickenAnimation(), 80);
   
  }

  /**
   *  moves the chicken left or right
   */
  chickenMoves() {
    this.setDirection();
    if (this.otherDirection) {
      this.moveRight();
      this.hitbox = this.getHitBox();
    } else {
      this.moveLeft();
      this.hitbox = this.getHitBox();
    }
  }

  /**
   * sets direction of the Chicken
   */
  setDirection(){
    if (this.atLevelStart()) {
      this.otherDirection = true;
    } else if (this.atLevelEnd()) {
      this.otherDirection = false;
    }
  }

  /**
   * checks if the chicken is at starting point
   * @returns 
   */
  atLevelStart() {
    return this.x <= this.xStart;
  }

  /**
   * 
   * @returns checks if chicken is at end point
   */
  atLevelEnd() {
    return this.x >= this.xEnd;
  }

  /**
   * handles animation of chicken 
   */
  chickenAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

}
