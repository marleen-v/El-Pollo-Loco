class Cloud extends MovableObject {
  y = 20;
  height = 300;
  width = 500;
  cameraSpeed = 9;

  constructor(path) {
    super().loadImage("img/5_background/layers/4_clouds/" + path + ".png");
    this.x = Math.random() * 2000;
    this.speed = Math.random() * 0.17;
    this.animate();
  }

  /**
   * sets stoppable interval
   */
  animate() {
    setStoppableInterval(() => this.moveLeft(), 1000 / 60);
  }

  /**
   * moves left when camera moves left
   */
  moveLeftWithCamera() {
    this.x -= this.cameraSpeed;
  }

  /**
   * moves right when camera moves right
   */
  moveRightWithCamera() {
    this.x += this.cameraSpeed;
  }
}
