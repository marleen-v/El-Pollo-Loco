class CollectibleItem extends MovableObject{
    
     IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor(){
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);

        this.x = 200 + Math.random() * 1800; // last number is for total width
        this.y = 320 + Math.random() * (-200);
        this.width = 150;
        this.height = 150;
        this.animate();
    }
    
    animate(){
        setInterval(() => {
        this.playAnimation(this.IMAGES_COIN);
    }, 200);
    } 
 
   
}