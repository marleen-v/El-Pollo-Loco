class DrawableObject {
  x = 120;
  y = 190;
  height;
  width;
  img;
  imageCache = {};
  currentImage = 0;

  /**
   * loads an image
   * @param {String} path 
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * drwas an object to the canvas
   * @param {String} ctx 
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn("Error loading image", e);
      console.log("Could not load image,", this.img);
    }
  }

  /**
   * draws a Frame
   * @param {String} ctx 
   */
  drawFrame(ctx) {
    if (this instanceof Chicken ||this instanceof Endboss ||this instanceof ChickenSmall) {
      this.drawFrameOfEnemies(ctx);
    } else if (
      this instanceof Coin ||this instanceof Bottle ||this instanceof ThrowableObject) {
        this.drawFrameOfObjects(ctx);
     
    } else if (this instanceof Character) {
      this.drawFrameOfCharacter(ctx);
    }
  }

  /**
   * draws Frame of Enemies
   * @param {String} ctx 
   */
  drawFrameOfEnemies(ctx){
    ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom);
      ctx.stroke();
  }

  /**
   * draws Frame of objects
   * @param {String} ctx 
   */
  drawFrameOfObjects(ctx){
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "yellow";
    ctx.rect(this.x + this.offset.left,
      this.y + this.offset.top,
      this.width - this.offset.left - this.offset.right,
      this.height - this.offset.top - this.offset.bottom);
    ctx.stroke();
  }

  /**
   * draw Frame of Character
   * @param {*} ctx 
   */
  drawFrameOfCharacter(ctx){
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "green";
      ctx.rect(this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom);
      ctx.stroke();
  }


  /**
   * loads more than one images
   * @param {Array} arr 
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
