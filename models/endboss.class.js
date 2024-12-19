class Endboss extends MovableObject {
  y = 20;
  width = 350;
  height = 450;
  energy = 100;
  gotHurt = false;
  speed = 2;
  characterMetEndboss = false;
  onGroundY = 20;
  musicAlreadyPlayed = false;

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

  /**
   * sets intervals of animatiom and movements
   */
  animate() {
    setStoppableInterval(() => this.endbossAnimation(), 200);
    setStoppableInterval(() => this.endbossMoves(), 1000 / 60);
  }

  /**
   * sets first encounter of true and plays suspense music
   */
  meetsCharacterMovement() {
    this.i = 0;
    this.speed = 5;
    this.characterMetEndboss = true;
    this.playSuspenseMusic();
  }

  /**
   * plays Suspense music while enboss alive 
   */
  playSuspenseMusic() {
    SoundManager.instance.pause("background");
    SoundManager.instance.play("suspense");
  }

  /**
   * plays normal Background music again
   */
  playBackgroundMusic() {
    if (!this.musicAlreadyPlayed) {
      setTimeout(() => {
        SoundManager.instance.playBackground("background");
        SoundManager.instance.pause("suspense");
        this.musicAlreadyPlayed = true;
      }, 1000);
    }
  }

  /**
   * endboss moves left
   */
  movingLeft() {
    this.moveLeft();
    this.hitbox = this.getHitBox();
  }

  /**
   * endboss moves right
   */
  movingRight() {
    this.moveRight();
    this.hitbox = this.getHitBox();
  }

  /**
   * checks if endboss shall move left for first encounter with character
   * @returns 
   */
  canIntroMoving() {
    return this.i < 10;
  }

  /**
   * 
   * @returns checks if character met endboss
   */
  meetsCharacter() {
    return this.world.character.x > 2800 && !this.characterMetEndboss;
  }

  /**
   * 
   * @returns checks if endboss can jump
   */
  canJump() {
    return !this.isAboveGround() && this.attacks();
  }

  /**
   * 
   * @returns checks if endboss can move left
   */
  canMoveLeft() {
    return this.gotHurt && this.world.character.x <= this.x;
  }

  /**
   * checks if endboss can move right
   * @returns 
   */
  canMoveRight() {
    return this.gotHurt && this.world.character.x > this.x;
  }

  /**
   * enboss jumps
   */
  jump() {
    this.speedY = 40;
  }

  /**
   * animation of enboss
   */
  endbossAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      this.playBackgroundMusic();
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

  /**
   * all movements of enboss
   */
  endbossMoves() {
    if (this.meetsCharacter()) {
      this.meetsCharacterMovement();
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
}
