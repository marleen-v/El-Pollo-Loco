class MovableObject extends DrawableObject{
   
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    lastActive = Date.now();
    sleepTime = 8000; // 
    isSleeping = false;



    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            
        }, 1000 / 25);
    }

    isAboveGround(){
        if ((this instanceof ThrowableObject)){ // Throwable Objects should always fall
            return true;
        } else {
        return this.y < 190; 
        }
    }

    playAnimation(images){
        let i = this.currentImage % images.length;  // i ist immer der Rest (hier 0 bis 5)
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    resetLastAction() {
        this.lastActive = Date.now();
        this.isSleeping = false; // Charakter wird aufgeweckt
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
        this.energy -= 5;
        if(this.energy < 0){
        this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit; // diefference in ms
        timePassed = timePassed / 1000; // difference in s
        return timePassed < 1;
    }

    isDead(){
        return this.energy == 0;
        } 

    isAsleep(){
        let timePassed = new Date().getTime() - this.lastActive;

        if (timePassed >= this.sleepTime) {
            this.isSleeping = true; // Setze isSleeping auf true, wenn 15 Sekunden vergangen sind
            return true;
        } else {
            return false;
        }
    }

    idle(){
        return !this.isSleeping
    }
}
