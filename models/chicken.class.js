class Chicken extends MovableObject {
    y = 350;
    width = 80;
    height = 90;
    energy = 1  ;
    
    offset = { 
        top: 20,
        left: 15,
        right: 15,
        bottom: 20
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]
    
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 500;
        this.hitbox = this.getHitBox()
        this.speed = 0.15 + Math.random() * 0.25;
        /* this.animate(); */
    }
    
   /* animate(){
         setInterval(() => {
            this.hitbox = this.getHitBox();
            if(this.isDead()){
               this.playAnimation(this.IMAGES_DEAD);
            } else {
               this.moveLeft();
            
            }
        }, 1000 / 60);
    
       setInterval(() => {
        this.hitbox = this.getHitBox();
        if(!this.isDead()){
        this.playAnimation(this.IMAGES_WALKING);
    }
    }, 200); 
    } */
}
