class Character extends MoveableObject {
    height = 250;
    width = 175;
    y = 180;
    x = 0;
    speed = 4.3;
    ground = 180;
    sleepyTimer = 7000;
    ammoReloaded = true;
    longIdleTimer = false;
    isSleeping = false;
    ammo = 0;
    coins = 0;
    energy = 5;
    stopLoop = true;

    offset = {
        right: 30,
        bottom: 10,
        left: 30,
        top: 85,
    }

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_GONE = [
        'img/2_character_pepe/5_dead/D-57.png'
    ]

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
    ];

    world;

    sounds = [
        this.walking_sound = new Audio('audio/running_cut.mp3'),
        this.jumping_sound = new Audio('audio/jump.mp3'),
        this.reload_sound = new Audio('audio/reload.wav'),
        this.throwing_sound = new Audio('audio/throw-bottle.mp3'),
        this.hurt_sound = new Audio('audio/joder.mp3'),
        this.background_music = new Audio('audio/background.wav')
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_GONE);
        this.applyGravity();
        this.animate();
        this.playBackgroundMusic();
    };

    /**
     * This function handles which animation should be played (i.e. which array of images), the keyboard-presses and various sounds (e.g. the player presses "Spacebar" -> the character jumps and a sound is played)
     * 
     */
    animate() {

        setInterval(() => {
            if (!(this.isDead()) && this.world.enemies[7].energy > 0) {
                this.walking_sound.pause();
                if (this.rightArrowKeyPress()) {
                    this.moveRight();
                    this.resetSleepTimer();
                    if (!this.isAboveGround()) {
                        this.walking_sound.play();
                    }
                };

                if (this.leftArrowKeyPress()) {
                    this.moveLeft();
                    this.resetSleepTimer();
                    if (!this.isAboveGround()) {
                        this.walking_sound.play();
                    }
                };

                if (this.spaceBarPress()) {
                    this.handleJump();
                };

                if (this.dKeyPressAndAmmo()) {
                    this.handleThrow();
                };
            } else if (this.stopLoop && this.isDead()) {
                this.world.over();
                this.stopLoop = false;
            };

            this.moveCamera();
        }, 1000 / 60);

        let i = 0;
        setInterval(() => {
            if (this.isDead()) {
                if (i < 7) {
                    this.playAnimation(this.IMAGES_DEAD);
                } else {
                    this.playAnimation(this.IMAGES_GONE);
                };
                i++;
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.playHurtSound();
                this.resetSleepTimer();
            } else if (this.arrowKeyPressAndAboveGround() && this.world.enemies[7].energy >= 0) {
                this.playAnimation(this.IMAGES_WALKING);
                this.resetSleepTimer();
            };
        }, 60);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.resetSleepTimer();
            } else if (this.isIdle() && !(this.isDead())) {
                this.playAnimation(this.IMAGES_IDLE);
                if (this.isSleeping && !(this.isDead())) {
                    this.playAnimation(this.IMAGES_SLEEPING)
                }
                else if (!this.longIdleTimer) {
                    this.idleStart();
                }
            }
        }, 185);
    };

    /**
     * This function handles the keypress "arrow-right"
     * 
     */
    rightArrowKeyPress() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }


    /**
     * This function handles the keypress "arrow-left"
     * 
     */
    leftArrowKeyPress() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * This function handles the keypress "spacebar"
     * 
     */
    spaceBarPress() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * This function handles the jump
     * 
     */
    handleJump() {
        this.currentImage = 0;
        this.jump();
        this.jumping_sound.play();
        this.resetSleepTimer();
    }

    /**
 * This function returns the condition to see if the player has ammo (bottles) and has already reloaded
 * 
 */
    dKeyPressAndAmmo() {
        return this.world.keyboard.D && this.ammo > 0 && (this.ammoReloaded) && !(this.otherDirection);
    }

    /**
     * This function adds a timeout for the reloading of bottles
     * 
     */
    reload() {
        this.ammoReloaded = false;
        setTimeout(() => {
            this.ammoReloaded = true;
            this.reload_sound.play();
        }, 1200);
    }

    /**
     * This function creates a new bottle, handles its trajectory, plays a sound and calls the realod,
     * 
     */
    handleThrow() {
        this.world.throwableObject = new ThrowableObject();
        this.throwing_sound.play();
        this.world.throwableObject.x = this.x + 40;
        this.world.throwableObject.y = this.y + 70;
        this.ammo -= 0.5;
        this.resetSleepTimer();
        this.reload();
    };

    /**
     * This function moves the camer as the character runs
     * 
     */
    moveCamera() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * This function returns the condition to check if the character is moving on the ground
     * 
     */
    arrowKeyPressAndAboveGround() {
        return (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround()
    }

    /**
     * This function starts the character's idle state and starts the countdown for him to fall asleep
     * 
     */
    idleStart() {
        this.longIdleTimer = true;
        this.isSleeping = false;
        setTimeout(() => {
            this.isSleeping = true;
        }, this.sleepyTimer);
    };

    /**
 * This function returns the condition to check if the character is idle 
 * 
 */
    isIdle() {
        return !(this.isAboveGround() || this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
    };

    /**
 * This function resets the countdown for the character to fall asleep
 * 
 */
    resetSleepTimer() {
        this.longIdleTimer = false;
        this.isSleeping = false;
    };

    /**
* This function plays the sound for when the character is hurt
* 
*/
    playHurtSound() {
        this.hurt_sound.play();
    };

    /**
* This function starts playing the background music and lets it fade out when the final boss is close (the final boss has its own music)
* 
*/
    playBackgroundMusic() {
        this.background_music.play();
        let volume = 1.0; // Initial volume level (1.0 for full volume)
        setInterval(() => {
            if (this.world.enemies[7].endbossAlerted == true && volume > 0) {
                volume -= 0.1; // Decrease volume gradually
                if (volume <= 0) {
                    volume = 0; // Ensure volume doesn't go below 0
                    this.background_music.pause(); // Pause the music when volume reaches 0
                }
            }
        }, 100);
    }
}