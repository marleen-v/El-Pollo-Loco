class CollectibleItem extends MovableObject {
  images = [];

  IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  IMAGES_BOTTLE = ["img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"];

  constructor(type) {
    super();
    if (type === "coin") {
      this.images = this.IMAGES_COIN;
    } else if (type === "bottle") {
      this.images = this.IMAGES_BOTTLE;
    }
    this.loadImage(this.images[0]);
    this.loadImages(this.images);
    this.x = 200 + Math.random() * 1800; // last number is for total width
    this.y = 320 + Math.random() * -200;
    this.width = 70;
    this.height = 70;
    this.animate();
  }

  /**
   * set Stoppable interval for animation
   */
  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.images);
    }, 200);
  }
}
