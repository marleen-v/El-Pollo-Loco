class Bottle extends MovableObject {

 
       constructor(){
        super()
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');

        this.x = 200 + Math.random() * 1800; // last number is for total width
        this.y = 320 + Math.random() * (-200);
        this.width = 70;
        this.height = 70;
       /*  this.animate(); */
    }

/*     animate(){
        setInterval(() => {
        this.playAnimation(this.images);
    }, 200);
    }  */
 

}