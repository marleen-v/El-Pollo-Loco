class Cloud extends MovableObject {
    y = 20;
    height = 300; 
    width = 500;
   

    constructor(pathNr){
        super().loadImage('img/5_background/layers/4_clouds/' + pathNr +'.png');
        this.x = Math.random() * 500;
        this.animate();
    }

 animate(){
    this.moveLeft();
    
 }


}