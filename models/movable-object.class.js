class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy;
  wealth = 0;
  salsa = 0;
  lastHit = 0;
  lastActive = Date.now();
  sleepTime = 15000;
  isSleeping = false;
  countForBounce = 0;
  onGroundY;

  xStart = 10;
  xEnd = 4000;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  hitbox = {};

  constructor() {
    super();
    this.soundManager = SoundManager.instance;
    this.hitbox = this.getHitBox();
  }

  /**
   * applies gravity
   */
  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.y = Math.min(this.y, this.onGroundY);
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * 
   * @returns checks if jumping
   */
  isAboveGround() {
    return this.y < this.onGroundY;
  }

  /**
   * for playing animation 
   * @param {Array} images 
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * 
   */
  resetLastAction() {
    this.lastActive = Date.now();
    this.isSleeping = false; // Charakter wakes up
    SoundManager.instance.pause("snoring");
  }

  /**
   * mo moves right
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * mo moves left
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * mo jumps
   */
  jump() {
    this.speedY = 30;
    this.soundManager.play("jump");
  }

  /**
   * gets the hitbox from images and offsets
   * @returns 
   */
  getHitBox() {
    return {
      x: this.x + this.offset.left,
      y: this.y + this.offset.top,
      width: this.width - this.offset.left - this.offset.right,
      height: this.height - this.offset.bottom - this.offset.top,
      left: this.x + this.offset.left,
      top: this.y + this.offset.top,
      right: this.x + this.width - this.offset.right,
      bottom: this.height - this.offset.bottom + this.y,
    };
  }

  /**
   * checks if mo is colliding with st.
   * @param {String} mo 
   * @returns 
   */
  isColliding(mo) {
    return (
      this.hitbox.right > mo.hitbox.left &&
      this.hitbox.left < mo.hitbox.right &&
      this.hitbox.top < mo.hitbox.bottom &&
      this.hitbox.bottom > mo.hitbox.top
    );
  }

  /**
   * checks if character jumps on enemy
   * @param {String} mo 
   * @returns 
   */
  isJumpingOn(mo) {
    return (
      this.hitbox.right - mo.hitbox.left > this.hitbox.bottom - mo.hitbox.top &&
      this.isAboveGround()
    );
  }

  /**
   * character bounces up when jumping on enemy
   */
  bounceUp() {
    this.speedY = 25;
  }

  /**
   * mo gets hit
   */
  hit() {
    this.soundManager.play("hit");
    this.energy -= 10;
    this.bounceBack();
    this.countForBounce = 0;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * character bounces back if hit from enemy
   */
  bounceBack() {
    setStoppableInterval(() => {
      if (this.countForBounce <= 10) {
        this.otherDirection ? this.moveRight() : this.moveLeft();
        this.countForBounce += 1;
      }
    }, 30);
  }

  /**
   * checks time of mo being hurt
   * @returns 
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // diefference in ms
    timePassed = timePassed / 1000; // difference in s
    return timePassed < 1; // animation is shown for 1 sec if character gets hurt
  }

  /**
   * mo attacks
   * @returns 
   */
  attacks() {
    let timePassed = new Date().getTime() - this.lastHit; // diefference in ms
    timePassed = timePassed / 1000; // difference in s
    return timePassed > 1 && timePassed <= 2; // animation is shown for 1 sec if endboss gets hurt
  }

  /**
   * checks if mo is dead
   * @returns 
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * character is asleep
   * @returns 
   */
  isAsleep() {
    let timePassed = new Date().getTime() - this.lastActive;
    if (timePassed >= this.sleepTime) {
      this.isSleeping = true; // Set isSleeping to true when 15 seconds have passed
      return true;
    } else {
      return false;
    }
  }

  /**
   * checks if character is sleeping
   * @returns 
   */
  idle() {
    return !this.isSleeping;
  }

  /**
   * character collects coin item
   */
  collectCoin() {
    if (this.wealth < 100) {
      this.wealth += 10;
    }
    SoundManager.instance.play("coin");
  }

  /**
   * character collects bottle item
   */
  collectBottle() {
    if (this.salsa < 100) {
      this.salsa += 10;
    }
    SoundManager.instance.play("bottle");
  }

  /**
   * enemy takes damage
   */
  takeDamage() {
    if (!this.isDead()) {
      this.energy -= 10;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    }
  }

}
