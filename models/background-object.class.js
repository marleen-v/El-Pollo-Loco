class BackgroundObject extends MovableObject {

    IMAGES = [
        "img/5_background/layers/air.png",
        "img/5_background/layers/3_third_layer/full.png",
        "img/5_background/layers/2_second_layer/full.png",
        "img/5_background/layers/1_first_layer/full.png"
    ]


    speeds = [
        0, 9, 7, 0 // speed for single layers when character moves 
    ]


    
    startX = -1439;

    speed;
    i; //Rest

    height = 480;
    width = 1440; // 720 for single pictures

    constructor(index, x){ 
        super();
        this.x = x;
        this.loadImage(this.IMAGES[index])
        this.y = 480 - this.height;
        this.speed = this.speeds[index];
   
        } 

        moveLeft(){
            this.x += this.speed;
          }

          moveRight(){
             this.x -= this.speed;
          }
   
    

 /*    constructor(index){ 
        super();
        let imageCounterX = Math.floor(index / this.IMAGES.length); 
        this.i = index  % this.IMAGES.length; 
        this.loadImage(this.IMAGES[this.i]);

        this.x = this.startX + ((this.width-1)* imageCounterX); 
        this.y = 480 - this.height;
        this.speed = this.speeds[this.i];
 
   
        } */


           
       
}