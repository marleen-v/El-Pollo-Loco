class Statusbar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  IMAGES_COIN = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  IMAGES_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  IMAGES_ENDBOSS = [
    "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  images = [];
  percentage;
  speed = 3;
  world;

  constructor(images) {
    super();
    this.assignImages(images);
    this.loadImages(this.images);
    this.width = 150;
    this.height = 40;
    this.setPercentage(this.percentageStartValue());
  }

  /**
   * returns start value of each statusbar
   * @returns 
   */
  percentageStartValue() {
    if (this.images === this.IMAGES || this.images === this.IMAGES_ENDBOSS) {
      return 100;
    } else {
      return 0;
    }
  }

  /**
   * assigns images to percentage
   * @param {Array} images 
   */
  assignImages(images) {
    if (images === "health") {
      this.images = this.IMAGES;
      this.x = 10;
      this.y = 80;
    } else if (images === "coin") {
      this.images = this.IMAGES_COIN;
      this.x = 10;
      this.y = 40;
    } else if (images === "bottle") {
      this.images = this.IMAGES_BOTTLE;
      this.x = 10;
      this.y = 0;
    } else {
      this.images = this.IMAGES_ENDBOSS;
      this.x = 770;
      this.y = 46;
      this.animateEndbossStatusbar();
    }
  }

  /**
   * sets percentage for image ebing shown 
   * @param {*} percentage 
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * returns the index current  image of each statusbar
   * @returns 
   */
  resolveImageIndex() {
    if (this.percentage > 80) {
      return 5;
    } else if (this.percentage > 60) {
      return 4;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * animates the statusbar from endboss
   */
  animateEndbossStatusbar() {
    setStoppableInterval(() => this.moveToPosition(), 1000 / 60);
  }

  /**
   * displays endboss statusbar when character meets endboss
   */
  moveToPosition() {
    if(this.x >= 550){
      if (this.world.level.enemies[0].characterMetEndboss) {
        this.moveLeft();
        if (this.x >= 550) {
          this.moveLeft();
        }
      }
    }
   
  }

  /**
   * statusbar endboss moves left
   */
  moveLeft() {
    this.x -= this.speed;
  }
}
