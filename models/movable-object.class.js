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

  xStart = 10;
  xEnd = 2500;

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

  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 190;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  resetLastAction() {
    this.lastActive = Date.now();
    this.isSleeping = false; // Charakter wakes up
    SoundManager.instance.pause("snoring");
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
    this.soundManager.play("jump");
  }

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

  isColliding(mo) {
    return (
      this.hitbox.right > mo.hitbox.left &&
      this.hitbox.left < mo.hitbox.right &&
      this.hitbox.top < mo.hitbox.bottom &&
      this.hitbox.bottom > mo.hitbox.top
    );
  }

  isJumpingOn(mo) {
    return (
      this.hitbox.right - mo.hitbox.left > this.hitbox.bottom - mo.hitbox.top &&
      this.isAboveGround()
    );
  }

  bounceUp() {
    this.speedY = 25;
  }

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

  bounceBack() {
    setStoppableInterval(() => {
      if (this.countForBounce <= 10) {
        this.otherDirection ? this.moveRight() : this.moveLeft();
        this.countForBounce += 1;
      }
    }, 30);
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // diefference in ms
    timePassed = timePassed / 1000; // difference in s
    return timePassed < 1; // animation is shown for 1 sec if character gets hurt
  }

  attacks() {
    let timePassed = new Date().getTime() - this.lastHit; // diefference in ms
    timePassed = timePassed / 1000; // difference in s
    return timePassed > 1 && timePassed <= 2; // animation is shown for 1 sec if endboss gets hurt
  }

  isDead() {
    return this.energy == 0;
  }

  isAsleep() {
    let timePassed = new Date().getTime() - this.lastActive;

    if (timePassed >= this.sleepTime) {
      this.isSleeping = true; // Setze isSleeping auf true, wenn 15 Sekunden vergangen sind
      return true;
    } else {
      return false;
    }
  }

  idle() {
    return !this.isSleeping;
  }

  collectCoin() {
    if (this.wealth < 100) {
      this.wealth += 10;
    }
    SoundManager.instance.play("coin");
  }

  collectBottle() {
    if (this.salsa < 100) {
      this.salsa += 10;
    }
    SoundManager.instance.play("bottle");
  }

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

  // enemies sounds

  playSound() {
    this.sound.loop = true;
    this.sound.currentTime = 0 + Math.random() * 1;
    this.sound.volume = 0.05;
    this.sound.play();
  }

  pauseSound() {
    this.sound.pause();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.playChickenSound();
  }

  nearCharacter() {
    return Math.abs(this.world.character.x - this.x) <= 500;
  }

  playChickenSound() {
    // check if one or more enemies are near character
    if (this.nearCharacter() && !this.isMuted) {
      this.playSound();
    } else {
      this.pauseSound();
    }
  }
}
