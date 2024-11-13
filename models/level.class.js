class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectibleItems;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, collectibleItems){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectibleItems = collectibleItems;
    }
}