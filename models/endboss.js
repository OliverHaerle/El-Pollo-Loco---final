class Endboss extends MoveableObject {
    height = 500;
    width = 300;
    y = -30;
    x = 3300;
    speed = 15;
    energy = 700;
    endbossAlerted = false;
    stopAnimationLoop = false;
    inDamageState = false;
    attacksCharacter = false;

    sounds = [
        this.attack_sound = new Audio('audio/boss-attack.wav'),
        this.boss_music = new Audio('audio/boss-music.wav'),
        this.boss_hit = new Audio('audio/boss_hit.mp3'),
        this.boss_dead = new Audio('audio/boss_death.wav'),
        this.win_sound = new Audio('audio/win.wav'),
    ];


    offset = {
        right: 30,
        bottom: 30,
        left: 30,
        top: 30
    }

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_IDLE = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_ATTACKING = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURT);
        this.animate();
    }

    /**
     * This function handles which animation should be played (i.e. which array of images), and various sounds (e.g. the final boss is hurt, dying, idle, alerted;)
     * 
     */
    animate() {
        setInterval(() => {
            if (!(this.stopAnimationLoop)) {
                if (this.energy <= 0) {
                    this.playDeathAnimation();
                } else if (this.inDamageState) {
                    this.playAnimation(this.IMAGES_HURT);
                } else if (this.attacksCharacter) {
                    this.attackAnimation();
                    setTimeout(() => {
                        this.attacksCharacter = false;
                    }, 1000);
                }
                else if (this.endbossAlerted) {
                    this.boss_music.play();
                    this.bossStartsWalking();
                } else {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
        }, 200);
    }

    /**
 * This function plays the images of the final boss dying and then lets the boss "fall down" and vanish from the screen
 * 
 */
    playDeathAnimation() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
            this.stopAnimationLoop = true;
            this.handleSounds();
            setTimeout(() => {
                this.applyGravity();;
            }, 1000);
        }, 250);
    }

    /**
* This function pauses the boss music and plays the two sounds to indicate the end of the game
* 
*/
    handleSounds() {
        if (!(this.soundsHandled)) {
            this.boss_music.pause();
            this.win_sound.play();
            setTimeout(() => {
                this.boss_dead.play();
            }, 1000);
        };
        this.soundsHandled = true;
    }

    /**
* This function is called when the boss collides with the player. It plays the images of the chicken attacking and plays a corresponding sound
* 
*/
    attackAnimation() {
        this.playAnimation(this.IMAGES_ATTACKING)
        this.attack_sound.play();
        this.moveLeft();
        this.otherDirection = false;
    };

    /**
* This function is called when the boss is either hit with a bottle or the player is close enough. It makes the boss start walking towards the player
* 
*/
    bossStartsWalking() {
        this.moveLeft();
        this.otherDirection = false;
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
* This function decreases the boss's energy, increases its speed and plays a sound to indicate the boss being hurt
* 
*/
    bossIsHurt() {
        this.boss_hit.play();
        this.endbossAlerted = true;
        this.energy -= 100;
        this.inDamageState = true;
        setTimeout(() => {
            this.inDamageState = false;
            this.speed += 10;
        }, 200);
    }
};

