class Chicken extends MovableObject {
  y = 350;
  width = 80;
  height = 90;
  energy = 10;

  isMuted = false;

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
    this.x = 700 + Math.random() * 4800;
    this.hitbox = this.getHitBox();
    this.speed = 0.15 + Math.random() * 0.3;
    this.animate();
    this.sound = new Audio("audio/chicken.mp3");
    this.movingDirection();
  }

  movingDirection() {
    if (Math.random() < 0.5) {
      this.otherDirection = true;
    }
  }


  animate() {
    setStoppableInterval(() => {
      if (this.x <= this.xStart) {
        this.otherDirection = true;
      } else if (this.x >= this.xEnd) {
        this.otherDirection = false;
      }

      if (this.otherDirection) {
        this.moveRight();
        this.hitbox = this.getHitBox();
      } else {
        this.moveLeft();
        this.hitbox = this.getHitBox();
      }
    }, 1000 / 60);

    setStoppableInterval(() => {
      if (this.isDead()) {
        this.pauseSound();
        this.playAnimation(this.IMAGES_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 80);

    setStoppableInterval(() => this.playChickenSound(), 200);
  }
}
