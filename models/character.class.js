class Character extends MovableObject {
  height = 240;
  width = 120;
  speed = 10;
  y = 80;
  energy = 100;
  hasPlayedDeadAnimation = false;
  onGroundY = 190;

  offset = {
    // to adjust the image dimensions
    top: 120,
    left: 40,
    right: 40,
    bottom: 20,
  };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_SLEEPING = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_SLEEPING);
    this.loadImages(this.IMAGES_IDLE);
    this.applyGravity();
    this.animate();
  }

  /**
   * animates and moves Character, sets intervals
   */
  animate() {
    setStoppableInterval(() => this.characterMoves(), 1000 / 60);
    setStoppableInterval(() => this.CharacterAnimation(), 90);
  }

  /**
   * animates character
   */
  CharacterAnimation() {
    if (this.isDead()) {
      this.handleDeath();
    } else if (this.isHurt()) {
      this.handleHurt();
    } else if (this.isAboveGround()) {
      this.handleJumping();
    } else if (this.canPlayWalkingAnimation()) {
      this.handleWalking();
    } else if (this.isAsleep()) {
      this.handleSleeping();
    } else if (this.idle()) {
      this.handleIdle();
    }
  }

  /**
   * animates characters death, as well as end of game
   */
  handleDeath() {
    if (!this.hasPlayedDeadAnimation) {
      this.playAnimation(this.IMAGES_DEAD);
      this.hasPlayedDeadAnimation = true;
      stopGame();
      showGameoverScreen();
    }
  }

  /**
   * hurt animation of character
   */
  handleHurt() {
    this.playAnimation(this.IMAGES_HURT);
    this.resetLastAction();
  }

  /**
   * jump animation of character
   */
  handleJumping() {
    this.playAnimation(this.IMAGES_JUMPING);
    this.resetLastAction();
  }

  /**
   * walking animation of character
   */
  handleWalking() {
    this.playAnimation(this.IMAGES_WALKING);
    this.resetLastAction();
  }

  /**
   * sleeping animation of character
   */
  handleSleeping() {
    this.playAnimation(this.IMAGES_SLEEPING);
  }

  /**
   * idle animation of character
   */
  handleIdle() {
    this.playAnimation(this.IMAGES_IDLE);
    SoundManager.instance.play("snoring");
  }

  /**
   * condition for walking animation
   * @returns 
   */
  canPlayWalkingAnimation() {
    return (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.rightButtonPressed ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.leftButtonPressed
    );
  }

  /**
   * condition for moving character right
   * @returns 
   */
  canMoveRight() {
    return (
      (this.world.keyboard.RIGHT || this.world.keyboard.rightButtonPressed) &&
      this.x <= this.world.level.level_end_x
    );
  }

    /**
   * condition for charcter jumping
   * @returns 
   */
  canJump() {
    return (
      (this.world.keyboard.UP || this.world.keyboard.jumpButtonPressed) &&
      !this.isAboveGround()
    );
  }

   /**
   * condition for moving character left
   * @returns 
   */
  canMoveLeft() {
    return (
      (this.world.keyboard.LEFT || this.world.keyboard.leftButtonPressed) &&
      this.x >= 0
    );
  }

  /**
   * handles character movements
   */
  characterMoves() {
    this.hitbox = this.getHitBox();
    if (!this.hasPlayedDeadAnimation) {
      SoundManager.instance.pause("running");
      if (this.canMoveLeft()) {
        this.movesLeft();
      }
      if (this.canMoveRight()) {
        this.movesRight();
      }
      if (this.canJump()) {
        this.jumps();
      }
      this.world.camera_x = -this.x + 200;
      this.thoughtBubbleAnimation();
    }
  }

  /**
   * moves the character right
   */
  movesRight() {
    this.otherDirection = false;
    otherDirectionCharacter = false;
    this.moveRight();
    this.backgroundMovesRight();
    SoundManager.instance.play("running");
  }

   /**
   * moves the character left
   */
  movesLeft() {
    this.otherDirection = true;
    otherDirectionCharacter = true; // for throwing object
    this.moveLeft();
    this.backgroundMovesLeft();
    SoundManager.instance.play("running");
  }

   /**
   * moves background to the right when Character walks
   */
  backgroundMovesRight() {
    this.world.level.backgroundObjects.forEach((bg) => bg.moveLeft());
    this.world.level.clouds.forEach((cloud) => cloud.moveRightWithCamera());
  }

  /**
   * moves background to the left when Character walks
   */
  backgroundMovesLeft() {
    this.world.level.backgroundObjects.forEach((bg) => bg.moveRight());
    this.world.level.clouds.forEach((cloud) => cloud.moveLeftWithCamera());
  }

  /**
   * animation of thoughtBubble if visible
   */
  thoughtBubbleAnimation() {
    if (this.thoughtBubbleVisible()) {
      this.thoughtBubbleMoves();
    }
  }

  /**
   * checks if the thoughtBubble is visible
   * @returns 
   */
  thoughtBubbleVisible() {
    return this.world.thoughtBubble.length != undefined;
  }

  /**
   * moves thought bubble
   */
  thoughtBubbleMoves() {
    this.world.thoughtBubble.forEach((bubble) => {
      bubble.x = this.x - 80;
      bubble.y = this.y;
    });
  }

  /**
   * character jumps
   */
  jumps() {
    this.jump();
    this.world.camera_x = -this.x + 200;
    this.world.keyboard.jumpButtonPressed = false;
  }
}
