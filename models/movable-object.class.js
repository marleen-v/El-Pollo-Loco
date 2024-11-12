class MovableObject {
    x = 120;
    y = 190;
    img;
    height;
    width;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;

    constructor(){
        
    }

    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            
        }, 1000 / 25);
    }

    isAboveGround(){
        return this.y < 190;
    }

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss){
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        }
    
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length;  // i ist immer der Rest (hier 0 bis 5)
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight(){
        this.x += this.speed;
    }

    moveLeft(){
        this.x -= this.speed;
    }

        
    jump(){
        this.speedY = 30;
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
/*     }

    isColliding (obj) {
        return  (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
                (this.y + this.offsetY + this.height) >= obj.y &&
                (this.y + this.offsetY) <= (obj.y + obj.height) && 
                obj.onCollisionCourse; */ // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

    }

 

    hit(){
        if(this.energy > 0){
        this.energy -= 5;
        }
    }

    isDead(mo){
        return this.energy == 0;
        } 
}