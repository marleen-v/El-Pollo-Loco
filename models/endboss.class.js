class Endboss extends MovableObject {
  y = 20;
  width = 350;
  height = 450;
  energy = 50;

  hadFirstContact = false;

  world;

  offset = {
    top: 120,
    left: 70,
    right: 50,
    bottom: 90,
  };

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 2500;
    this.hitbox = this.getHitBox();
    this.speed = 4;
    this.animate();
  }

  animate() {
    let i = 0;
   /*  setInterval(() => {
      if (i < 10) {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
      }  else {
                this.playAnimation(this.IMAGES_WALKING);
            }; 
      i++;

      if (this.world.character.x > 2200 && !this.hadFirstContact) {
        i = 0;
        this.hadFirstContact = true;
      }
    }, 200); */

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      

      } else if (i < 10) {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
        this.hitbox = this.getHitBox();
        
      } else {
        this.playAnimation(this.IMAGES_ALERT);
      }
      i++;

/*       if (this.world.character.x > 2200 && !this.hadFirstContact) {
        i = 0;
        this.hadFirstContact = true;
            this.moveLeft();
   
      } */
    }, 200);
    

    
/*     setInterval(() => {
      if (!this.isDead() && ) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200); */
  }

  


}
