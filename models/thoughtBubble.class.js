class ThoughtBubble extends MovableObject {
  height = 120;
  width = 120;

  IMAGES = ["img/thoughtBubble-enemies.png", "img/thoughtBubble-coins.png"];

  constructor(index, x, y) {
    super().loadImage(this.IMAGES[index]);
    this.x = x;
    this.y = y;
  }
}
