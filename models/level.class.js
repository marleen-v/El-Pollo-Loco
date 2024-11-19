class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 22000;

    constructor(enemies, clouds, backgroundObjects, coins, bottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        console.log(backgroundObjects)
        this.coins = coins;
        this.bottles = bottles;
      
    }
}

