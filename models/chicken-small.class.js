class ChickenSmall extends MovableObject {
    y = 380;
    width = 50;
    height = 50;
    energy = 10;
    
    offset = { 
        top: 0,
        left: 5,
        right: 5,
        bottom: 10
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]
    
    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
       
        this.x = 200 + Math.random() * 500;
        this.hitbox = this.getHitBox();
        this.speed = 0.15 + Math.random() * 0.25;
       this.animate(); 
    }
    
    animate(){
        setInterval(() => {
            this.hitbox = this.getHitBox();
            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
            } else if(!this.isAboveGround()){
              // this.moveLeft();
              this.jump();
            }
        }, 1000 / 60);

       setInterval(() => {
        if(!this.isDead()){
        this.playAnimation(this.IMAGES_WALKING);
    }
    }, 200); 
    }
}

