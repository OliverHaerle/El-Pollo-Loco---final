class CollectableCoin extends CollectableObject {
    y = 100 + Math.random() * 100;
    width = 170;
    height = 170;
    sounds = [this.collect_sound = new Audio('audio/coin-collect.wav')];

    offset = {
        right: 40,
        bottom: 70,
        left: 50,
        top: 40,
    };

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.animate();
    };

    /**
* This function handles the collection of coins (a sound is played)
* 
*/
    animate() {
        setInterval(() => {
            if (this.collected) {
                setTimeout(() => {
                    if (!(this.y === -200)) {
                        this.collect_sound.play();
                    };
                    this.y = -200;
                }, 200);
            };
        }, 70);
    };
};