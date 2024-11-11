class BackgroundObject extends MovableObject {

    height = 480;
    width = 720;
    

    constructor(path, x){
        super().loadImage(path);
        this.x = x;
        this.y = 480 - this.height;
        

    }
}