class Coin extends MovableObject {

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

       constructor(){
        super()
        this.loadImage(this.IMAGES_COIN [0]);
        this.loadImages(this.IMAGES_COIN);
        this.x = 200 + Math.random() * 1800; // last number is for total width
        this.y = 320 + Math.random() * (-200);
        this.width = 70;
        this.height = 70;
        this.animate();
    }

    animate(){
        setInterval(() => {
        this.playAnimation(this.IMAGES_COIN);
    }, 200);
    } 
 

}