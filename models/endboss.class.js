class Endboss extends MovableObject {
  y = 20;
  width = 350;
  height = 450;
  energy = 100;
  gotHurt = false;
  speed = 2;
  characterMetEndboss = false;
  onGroundY = 20;

  i = 0;
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
    this.soundManager = SoundManager.instance;
    this.x = 3500;
    this.applyGravity();
    this.hitbox = this.getHitBox();
    this.animate();
  }

  animate() {
    setStoppableInterval(() => this.endbossAnimation(), 200);
    setStoppableInterval(() => this.endbossMoves(), 1000 / 60);
  }

  endbossAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      this.playBackgroundMusic();
      setTimeout(() => {
        this.world.en
      }, timeout);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.gotHurt = true;
    } else if (this.i < 10) {
      this.playAnimation(this.IMAGES_WALKING);
    } else if (this.characterMetEndboss && !this.gotHurt) {
      this.playAnimation(this.IMAGES_ALERT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
    this.i++;
  }

  endbossMoves() {
    this.hitbox = this.getHitBox();
    if (this.meetsCharacter()) {
      this.i = 0;
      this.speed = 5;
      this.characterMetEndboss = true;
      this.playSuspenseMusic();
    }
    if (this.canIntroMoving()) {
      this.movingLeft();
    } else if (this.canJump()) {
      this.jump();
      this.hitbox = this.getHitBox();
    } else if (this.isHurt()) {
    } else if (this.canMoveLeft()) {
      this.otherDirection = false;
      this.speed = 2;
      this.movingLeft();
    } else if (this.canMoveRight()) {
      this.otherDirection = true;
      this.movingRight();
    }
  }

  playSuspenseMusic() {
    SoundManager.instance.pause("background");
    SoundManager.instance.play("suspense");
  }

  playBackgroundMusic() {
    setTimeout(() => {
      SoundManager.instance.playBackground("background");
      SoundManager.instance.pause("suspense");
    }, 1000);
  }

  movingLeft() {
    this.moveLeft();
    this.hitbox = this.getHitBox();
  }

  movingRight() {
    this.moveRight();
    this.hitbox = this.getHitBox();
  }

  canIntroMoving() {
    return this.i < 10;
  }

  meetsCharacter() {
    return this.world.character.x > 2800 && !this.characterMetEndboss;
  }

  canJump() {
    return !this.isAboveGround() && this.attacks();
  }

  canMoveLeft() {
    return this.gotHurt && this.world.character.x <= this.x;
  }

  canMoveRight() {
    return this.gotHurt && this.world.character.x > this.x;
  }

  jump() {
    this.speedY = 40;
  }


  
}
