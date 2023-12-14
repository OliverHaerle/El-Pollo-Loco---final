class ThrowableObject extends MoveableObject {
    height = 100;
    width = 100;
    y = 260;
    x = 100;
    speedY = 30;
    speed = 10;
    bottleExplode = false;

    offset = {
        right: 30,
        bottom: 0,
        left: 0,
        top: 0
    }

    IMAGES_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    ];

    IMAGES_EXPLODING = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor() {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_EXPLODING);
        this.animate();
    };

    /**
* This function checks if the bottle has hit an enemy. If so, the bottle will pop and play the images from the assigned array and lets it disappear after 800 ms
* 
*/
    animate() {
        this.applyGravity();
        setInterval(() => {
            if (this.bottleExplode) {
                setTimeout(() => {
                    this.y = 800;
                }, 100);
                this.playAnimation(this.IMAGES_EXPLODING)
            } else {
                this.playAnimation(this.IMAGES_THROWING);
            }
        }, 75);
    }

    /**
* This function stops the bottle on its x-axis and sets its state to exploded (bottleExplode = true);
* 
*/
    bottlePop() {
        this.speed = 0;
        this.x = this.x + 50
        this.bottleExplode = true;
    };
}

