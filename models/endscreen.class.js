class Endscreen extends DrawableObject  {

    IMAGES = [
        'img/9_intro_outro_screens/game_over/game-over-1.png'
    ]

    constructor (){
        super().loadImage('img/9_intro_outro_screens/game_over/game-over-1.png');
  /*       this.loadImages(this.IMAGES_ALERT); */
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }
}