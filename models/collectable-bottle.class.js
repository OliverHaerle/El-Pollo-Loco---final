class CollectableBottle extends CollectableObject {
    height = 100;
    width = 100;
    y = 330;

    sounds = [this.collect_sound = new Audio('audio/gulp.wav')]

    offset = {
        right: 30,
        bottom: 30,
        left: 30,
        top: 30
    }

    IMAGES_WORLD = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    IMAGES_COLLECTED = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WORLD[this.OneOrTwo()]);
        this.loadImages(this.IMAGES_WORLD);
        this.loadImages(this.IMAGES_COLLECTED);
        this.animate();
    };

    /**
* This function returns the value 1 or 2 (different images of bottles on the ground are displayed)
* 
*/
    OneOrTwo() {
        return Math.floor(Math.random() * 2);
    };


    /**
* This function handles the collection of bottles (a sound is played and the bottle pops when its collected)
* 
*/
    animate() {
        setInterval(() => {
            if (this.collected) {
                this.playAnimation(this.IMAGES_COLLECTED);
                setTimeout(() => {
                    this.y = -100;
                    this.currentImage = 0;
                }, 100);
                if (!(this.y === -100)) {
                    this.collect_sound.play();
                }
            }
        }, 70);
    };

}