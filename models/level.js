class Level {
    enemies;
    clouds;
    backgroundObject;
    collectableBottle;
    coin;
    level_end_x = 2900;

    constructor(enemies, clouds, backgroundObject, collectableBottle, coin) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
        this.collectableBottle = collectableBottle;
        this.coin = coin;
    }
}