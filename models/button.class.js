class Button extends DrawableObject {

    IMAGES_VOLUME =[
        'img/SVG/volume-on.svg',
        'img/SVG/volume-off.svg'
    ]

    IMAGES_RESIZE=[
        'img/SVG/resize-1.svg',
        'img/SVG/resize-2.svg'
    ]

    images = [];

    index = 0;

    

    constructor(icon, onClick){
        super();
        this.setImages(icon);
        this.toggleImage();  
        this.width = 40;
        this.height = 40 ; 
        this.onClick = onClick;
    }

    toggleImage() {
        this.index = this.index == 0 ? 1 : 0;
        this.loadImage(this.images[this.index]); // Aktualisiert das Bild
    }



    setImages(icon) {
        if(icon === "volume"){
            this.images = this.IMAGES_VOLUME;
            this.x = 650;
            this.y = 10;
        } else {
            this.images = this. IMAGES_RESIZE;
            this.x = 600;
            this.y = 10;
        } 
    }

    togglePlayState() {
        this.isPlaying = !this.isPlaying; // Umschalten des Zustands
    }



/*     assignImages(icon){
        if(icon === "volume"){
            this.images = this.IMAGES_VOLUME;
            this.x = 650;
            this.y = 10;
        } else {
            this.images = this. IMAGES_RESIZE;
            this.x = 550;
            this.y = 10;
        } 
    } */

    isClicked(mouseX, mouseY) {
        return (
            mouseX >= this.x &&
            mouseX <= this.x + this.width &&
            mouseY >= this.y &&
            mouseY <= this.y + this.height
        );
    }

    

}

