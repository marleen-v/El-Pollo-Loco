class Character extends MovableObject {
    height = 240;
    width = 120;
    speed = 20;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    world;
    
   constructor(){
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.animate();

}

animate(){

    setInterval(()=> {
        if (this.world.keyboard.LEFT){
            this.otherDirection = true;
            this.x -= (this.speed);
        }
        if (this.world.keyboard.RIGHT){
            this.x += this.speed;
            this.otherDirection = false;
        }
        this.world.camera_x = -this.x;
    }, 1000 / 60);
    
    setInterval(() => {

        if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){ 
        // walk animation
        let i = this.currentImage % this.IMAGES_WALKING.length;  // i ist immer der Rest (hier 0 bis 5)
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        }
    }, 50); 
}
   
   
    jump(){

    }
}