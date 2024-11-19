class BackgroundObject extends MovableObject {

    IMAGES = [
        "img/5_background/layers/air.png",
        "img/5_background/layers/3_third_layer/full.png",
        "img/5_background/layers/2_second_layer/full.png",
        "img/5_background/layers/1_first_layer/full.png"
    ]

/*     IMAGES = [
        {
        "image":"img/5_background/layers/air.png",
        "nextX": this.nextX
        }, 
        {
        "image":"img/5_background/layers/3_third_layer/1.png",
        "nextX": this.nextX
        },
        {
        "image":"img/5_background/layers/2_second_layer/1.png",
        "nextX": this.nextX
        },
        {
        "image":"img/5_background/layers/1_first_layer/1.png",
        "nextX": this.nextX
        } */

    
    startX = -1439;


    height = 480;
    width = 1440; // 720 for single pictures



    constructor(index){ 
        super();
        let imageCounterX = Math.floor(index / this.IMAGES.length); 
        let i = index  % this.IMAGES.length; 
        this.loadImage(this.IMAGES[i]);

        this.x = this.startX + ((this.width-1)* imageCounterX); 
        this.y = 480 - this.height;
        console.log(this.x)
   
        }
       
}