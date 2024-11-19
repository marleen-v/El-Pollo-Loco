class Cloud extends MovableObject {
    y = 20;
    height = 300; 
    width = 500;
  


    constructor(path){
        super().loadImage('img/5_background/layers/4_clouds/' + path + '.png');
        this.x = Math.random() * 5000;
        this.speed = Math.random() * 0.17
        this.animate();
    }

 animate(){
    setInterval(() => {
           this.moveLeft();
        
    }, 1000 / 60);

 }


}