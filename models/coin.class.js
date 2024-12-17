class Coin extends MovableObject {
  offset = {
    // to adjust the image dimensions
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
  };

  IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES_COIN[0]);
    this.loadImages(this.IMAGES_COIN);
    this.x = x; 
    this.y = y; 
    this.width = 55;
    this.height = 55;
    this.animate();
  }

  animate() {
    setStoppableInterval(() => {
      this.hitbox = this.getHitBox();
      this.playAnimation(this.IMAGES_COIN);
    }, 200);
  }
}
