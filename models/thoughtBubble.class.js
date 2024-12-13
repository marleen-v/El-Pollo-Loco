class ThoughtBubble extends MovableObject{
    height = 100;
    width = 100;


    IMAGES = [
        "img/thoughtBubble-enemies.png",
        "img/thoughtBubble-coins.png",
    ]

     constructor(index, x, y) {
        super().loadImage(this.IMAGES[index]);
        this.x = x;
        this.y = y;
        
    
} 


}