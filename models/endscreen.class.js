class Endscreen extends DrawableObject {
  IMAGES = [
    "img/9_intro_outro_screens/game_over/game-over-1.png", //game over
    "img/9_intro_outro_screens/win/win-1.png", // you win
  ];

  constructor(index) {
    super();

    this.loadImage(this.IMAGES[index]);
    this.x = 0;
    this.y = 0;
    this.width = 720;
    this.height = 480;
  }
}
