class CollectableBottleAir extends CollectableBottle {
    y = 100 + Math.random() * 100;

    IMAGE = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ];

    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_COLLECTED);
    }
}