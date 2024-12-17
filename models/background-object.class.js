class BackgroundObject extends MovableObject {
  IMAGES = [
    "img/5_background/layers/air.png",
    "img/5_background/layers/3_third_layer/full.png",
    "img/5_background/layers/2_second_layer/full.png",
    "img/5_background/layers/1_first_layer/full.png",
  ];

  // speed for single layers when character moves
  speeds = [
    0,
    9,
    7,
    0, 
  ];

  speed;
  i; //Rest

  height = 480;
  width = 1440;

  constructor(index, x) {
    super();
    this.x = x;
    this.loadImage(this.IMAGES[index]);
    this.y = 480 - this.height;
    this.speed = this.speeds[index];
  }

  moveLeft() {
    this.x += this.speed;
  }

  moveRight() {
    this.x -= this.speed;
  }
}
