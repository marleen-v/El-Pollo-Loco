class ThrowableObject extends MovableObject {
  IMAGES_THROWING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  offset = {
    // to adjust the image dimensions
    top: 0,
    left: 30,
    right: 30,
    bottom: 0,
  };

  hitEnemy = false;
  world;
  
  
  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGES_THROWING);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.throw();
    this.animate();
    this.applyGravity(); 
    this.direction = otherDirectionCharacter ? -1 : 1; 
  }

  throw() {
    this.speedY = 25;
    this.hitbox = this.getHitBox();
   
    setStoppableInterval(() => {
      if (this.hitEnemy == false ) {
        this.x += 7 *this.direction;
        this.hitbox = this.getHitBox();
      } else {
        this.speedY = 0;
        
      }
    }, 1000 / 60);
  }

  animate() {
    let i = 0;
    setStoppableInterval(() => {
      if (this.hitEnemy == false && i == 0) {
        this.playAnimation(this.IMAGES_THROWING);
      } else if (this.hitEnemy == true && i < 1) {
        this.playAnimation(this.IMAGES_SPLASH);
        i += 0.17;
      }
    }, 80);
  }

  isAboveGround() {
    return true;
  }
}
