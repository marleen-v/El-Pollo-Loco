class Character extends MovableObject {
    height = 240;
    width = 120;
    speed = 10 ;
    y = 80;
    energy = 100;
    hasPlayedDeadAnimation = false;
   
    offset = { // to adjust the image dimensions
        top: 120,
        left: 40,
        right: 40,
        bottom: 20
    }


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING =[
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
       'img/2_character_pepe/4_hurt/H-41.png', 
       'img/2_character_pepe/4_hurt/H-42.png',
       'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png', 
        'img/2_character_pepe/1_idle/idle/I-2.png', 
        'img/2_character_pepe/1_idle/idle/I-3.png', 
        'img/2_character_pepe/1_idle/idle/I-4.png', 
        'img/2_character_pepe/1_idle/idle/I-5.png', 
        'img/2_character_pepe/1_idle/idle/I-6.png', 
        'img/2_character_pepe/1_idle/idle/I-7.png', 
        'img/2_character_pepe/1_idle/idle/I-8.png', 
        'img/2_character_pepe/1_idle/idle/I-9.png', 
        'img/2_character_pepe/1_idle/idle/I-10.png'
     ];

     IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png', 
        'img/2_character_pepe/1_idle/long_idle/I-12.png', 
        'img/2_character_pepe/1_idle/long_idle/I-13.png', 
        'img/2_character_pepe/1_idle/long_idle/I-14.png', 
        'img/2_character_pepe/1_idle/long_idle/I-15.png', 
        'img/2_character_pepe/1_idle/long_idle/I-16.png', 
        'img/2_character_pepe/1_idle/long_idle/I-17.png', 
        'img/2_character_pepe/1_idle/long_idle/I-18.png', 
        'img/2_character_pepe/1_idle/long_idle/I-19.png', 
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
     ];

    world;
    walking_sound = new Audio('audio/running.mp3');
  
    
   constructor(){
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_SLEEPING);
    this.loadImages(this.IMAGES_IDLE);
    this.applyGravity();
    this.animate();
}


    animate(){

        setInterval(()=> {
            this.hitbox = this.getHitBox();
            if(!this.hasPlayedDeadAnimation){
            this.walking_sound.pause();
            if (this.world.keyboard.LEFT && this.x >= 0){
                this.otherDirection = true;
                this.moveLeft();
                this.walking_sound.play();
                this.world.camera_x = -this.x + 100; 
                /* for (let index = 0; this.world.level.backgroundObjects.length; index++) {
                    const bgImage = this.world.level.backgroundObjects[index];
                    console.log(this.world.level.backgroundObjects[2].moveRight())
                    bgImage[index].moveRight(); 
                } */
                
            }
           
            if (this.world.keyboard.RIGHT && this.x <= this.world.level.level_end_x){
                this.otherDirection = false;
                this.moveRight();
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 100;

            if(this.world.keyboard.SPACE && !this.isAboveGround()){  
                this.jump();
                
            }
            this.world.camera_x = -this.x + 100;
            
           
        }
        }, 1000 / 60);

         
        setInterval(() => {
            if(this.isDead()){
                if(!this.hasPlayedDeadAnimation){
                    this.playAnimation(this.IMAGES_DEAD);
                    this.resetLastAction();
                    this.hasPlayedDeadAnimation = true;
                }
               
            } else if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);
                this.resetLastAction();
            } else if (this.isAboveGround()){
                this.playAnimation(this.IMAGES_JUMPING);
                this.resetLastAction();
            } else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                this.resetLastAction();
            } else if(this.isAsleep()){
                this.playAnimation(this.IMAGES_SLEEPING);
            } else  if(this.idle()){
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 90); 
 
    }

}