class DrawableObject{
    x = 120;
    y = 190;
    height;
    width;
    img;
    imageCache = {};
    currentImage = 0;


    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){
        if( this instanceof Chicken || this instanceof Endboss || this instanceof ChickenSmall){
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'blue';
        ctx.rect((this.x + this.offset.left), (this.y + this.offset.top), (this.width - this.offset.left -this.offset.right), (this.height - this.offset.top - this.offset.bottom));
        ctx.stroke();
        } else if(this instanceof Coin || this instanceof Bottle){
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'yellow';
        ctx.rect((this.x + this.offset.left), (this.y + this.offset.top), (this.width - this.offset.left -this.offset.right), (this.height - this.offset.top - this.offset.bottom));
        ctx.stroke();
        } else if(this instanceof Character){
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'green';
        ctx.rect((this.x + this.offset.left), (this.y + this.offset.top), (this.width - this.offset.left -this.offset.right), (this.height - this.offset.top - this.offset.bottom));
    
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


}