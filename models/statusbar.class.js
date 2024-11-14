class Statusbar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ]

    images = [];
    percentage;

    constructor(images){
        super();
        this.assignImages(images);
        this.loadImages(this.images);
        this.width = 150;
        this.height = 40 ; 
        let percentageStartValue = this.images === this.IMAGES ? 100 : 0;
        this.setPercentage(percentageStartValue); 
    }

    assignImages(images){
        if(images === "health"){
            this.images = this.IMAGES;
            this.x = 40;
            this.y = 0;
        } else if(images === "coin"){
            this.images = this.IMAGES_COIN;
            this.x = 40;
            this.y = 40;
        } else {
            this.images = this.IMAGES_BOTTLE;
            this.x = 40;
            this.y = 80;
        }
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }


    resolveImageIndex(){
        
        if(this.percentage > 80){
            return 5;
        }else if(this.percentage > 60){
            return 4;
        }else if(this.percentage > 40){
            return 3;
        }else if(this.percentage > 20){
            return 2;
        }else if (this.percentage > 0){
            return 1;
        }else{
            return 0;
        }
    }

};