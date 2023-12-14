class Chick extends MoveableObject {
    height = 60;
    width = 60;
    y = 365;
    acceleration = 0.2;
    gameStarted = false;

    offset = {
        right: 10,
        bottom: 10,
        left: 10,
        top: 10
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);

        this.x = 300 + Math.random() * 4000;
        this.speed = 1 + Math.random() * 0.25;

        this.animate();
    };

    sounds = [this.death_sound = new Audio('audio/little-chicken-death.mp3')];

        /**
 * This function plays a sound when a chick is defeated
 * 
 */
    playDeathSound() {
        this.death_sound.play();
    };

        /**
     * This function handles which animation should be played (i.e. which array of images) and various sounds
     * 
     */
    animate() {
        setInterval(() => {
            if (this.gameStarted) {
                this.moveLeft();
                this.otherDirection = false;
            }
        }, 10);

        setInterval(() => {
            if (this.energy <= 0) {
                this.playAnimation(this.IMAGE_DEAD);
                setTimeout(() => {
                    this.applyGravity();
                }, 500);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
        this.moveLeft();
    };
}