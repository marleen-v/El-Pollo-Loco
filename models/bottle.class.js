class Bottle extends MovableObject {


    offset = { // to adjust the image dimensions
        top: 0,
        left: 10,
        right: 10,
        bottom: 0
    }

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]
 
       constructor(index, x){
        super()
        this.loadImage(this.IMAGES[index]);

        this.x = x
        this.y = 365;
        this.width = 40;
        this.height = 60;
        this.hitbox = this.getHitBox();
        /*  this.animate(); */
    }

/*     animate(){
        setInterval(() => {
        this.playAnimation(this.images);
    }, 200);
    }  */
 

}