class World {
    character = new Character();
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    enemyHealthBar = new EnemyHealthBar();
    throwableObject;
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObject = level1.backgroundObject;
    collectableBottle = level1.collectableBottle;
    coin = level1.coin;
    canvas;
    ctx;
    pause = false;
    soundOn = true;
    gameOver = false;
    enemiesKilled = 0;
    sounds = [
        this.gameOverSound = new Audio('audio/game-over.wav'),
        this.gameOverSound2 = new Audio('audio/grunt.mp3'),
        this.boss_dead = new Audio('audio/boss_death.wav'),
        this.win_sound = new Audio('audio/win.wav'),
    ];

    keyboard;
    camera_x = 0;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.character.world = this;
        this.checkCharacterCollidingWithEnemy();
        this.bottleCollision();
        this.coinCollision();
        this.startEndbossWalking();
        this.enemyHit();
        this.checkIfBossFled();
    };

    /**
* This function checks if a thrown bottle has collided with an enemy
* 
*/
    bottleCollision() {
        setInterval(() => {
            this.level.collectableBottle.forEach((bottle) => {
                if (this.character.isColliding(bottle) && bottle.collected === false) {
                    this.character.ammo += 0.5;
                    bottle.collected = true;
                }
            })
        }, 20);
    };

    /**
* This function checks if the character collided with a collectable coin
* 
*/
    coinCollision() {
        setInterval(() => {
            this.level.coin.forEach((coin) => {
                if (this.character.isColliding(coin) && coin.collected === false) {
                    this.character.coins += 1;
                    coin.collected = true;
                }
            })
        }, 20);
    };

    /**
* This function checks if the character is colliding with an enemy AND if the character jumped on an enemy. If they collide regularly, the character loses energy. If the character jumps on the enmy, the enemy dies and the enemy kill count goes up (making the player lose points). If the boss has been defeated, the chickens can't hurt the character
* 
*/
    checkCharacterCollidingWithEnemy() {
        setInterval(() => {
            if (this.enemies[7].energy > 0) {
                this.level.enemies.forEach((enemy) => {
                    if (this.character.isColliding(enemy) && !enemy.isDead() && this.character.speedY < 0 && enemy.height < 200) {
                        this.killEnemy(enemy);
                        this.character.giveInvincibilityFrames();
                        this.enemiesKilled++;
                    } else if (this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isInvincible) {
                        this.character.hit();
                        this.character.giveInvincibilityFrames();
                        enemy.attacksCharacter = true;
                    }
                })
            }
        }, 20);
    };


    /**
* This function is called when an enemy an enemy is hit with a bottle. If so, the enemy's energy is reduced by 100 (killing a regular enemy). It further calls the function that handles the exploding of the throwable bottle
* 
*/
    enemyHit() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.throwableObject) { // check if it already exists to avoid error
                    if (this.throwableObject.isColliding(enemy)) {
                        enemy.bossIsHurt();
                        this.throwableObject.bottlePop();
                    }
                }
            });
        }, 200);
    };

    /**
* This function checks if the character has gotten close enough to the final boss to have the final boss start walking
* 
*/
    startEndbossWalking() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.x > 2850) {
                    enemy.endbossAlerted = true;
                }
            })
        }, 500);
    };

    /**
* This function is called when the character jumps on a chicken/chick and let's him bounce off the defeated chicken/chick
* 
*/
    killEnemy(enemy) {
        enemy.speed = 0;
        enemy.energy = 0;
        this.bounceAfterKill(enemy);
    };

    /**
* This function handles the bouncing off of a defeated chicken/chick
* 
*/
    bounceAfterKill(enemy) {
        this.character.speedY = 25;
        enemy.playDeathSound();
        this.character.resetSleepTimer();
    };

    /**
* This function let's the user mute/unmute the game
* 
*/
    handleMute() {
        let button = document.getElementById('sound-icon')
        if (this.soundOn) {
            this.muteGame();
            this.soundOn = false;
            button.src = 'img/11_menu/soundon.png';
        } else {
            this.turnOnSound();
            this.soundOn = true;
            button.src = 'img/11_menu/mute.png';
        }
    };

    /**
* This function mutes all sounds
* 
*/
    muteGame() {
        this.character.sounds.forEach((sound) =>
            sound.muted = true);
        this.enemies.forEach((enemy) =>
            enemy.sounds.forEach((sound) =>
                sound.muted = true));
        this.collectableBottle.forEach((bottle) =>
            bottle.sounds.forEach((sound) =>
                sound.muted = true));
        this.coin.forEach((coin) =>
            coin.sounds.forEach((sound) =>
                sound.muted = true));
    };

    /**
* This function unmutes all sounds
* 
*/
    turnOnSound() {
        this.character.sounds.forEach((sound) =>
            sound.muted = false);
        this.enemies.forEach((enemy) =>
            enemy.sounds.forEach((sound) =>
                sound.muted = false));
        this.collectableBottle.forEach((bottle) =>
            bottle.sounds.forEach((sound) =>
                sound.muted = false));
        this.coin.forEach((coin) =>
            coin.sounds.forEach((sound) =>
                sound.muted = false));
    };

    /**
* This function is called when the player loses. It mutes all previously activated sounds and plays two sounds to signal the loss of the game. These sounds are not 
* 
*/
    over() {
        this.muteGame();
        if (this.soundOn == true) {
            this.gameOverSound.play();
            this.gameOverSound2.play();
        }
        setTimeout(() => {
            this.gameOverSound.pause();
        }, 8000);
    };


    /**
* This function checks if the final boss has reached the end of the level. If so, the player loses and the respective function is called
* 
*/
    checkIfBossFled() {
        let stopInterval = false;
        setInterval(() => {
            if (this.enemies[7].x < 0 && !(stopInterval)) {
                this.over();
                stopInterval = true;
            }
        }, 1000);
    };

    /**
* This function handles the drawing on the canvas
* 
*/
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clears canvas

        this.healthBar.x = this.character.x - 90;
        this.healthBar.setPercentage(this.character.energy);
        this.bottleBar.x = this.character.x - 90;
        this.bottleBar.setPercentage(this.character.ammo);
        this.coinBar.x = (this.character.x - 90);
        this.coinBar.setPercentage(this.character.coins);
        this.enemyHealthBar.x = this.character.x + 400;
        this.enemyHealthBar.setPercentage(this.enemies[7].energy);


        // ------ magic carpet ------
        this.ctx.translate(this.camera_x, 0);


        this.addObjectsToMap(this.level.backgroundObject);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        if (this.enemies[7].endbossAlerted) {
            this.addToMap(this.enemyHealthBar)
        }
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectableBottle);
        this.addObjectsToMap(this.level.coin);
        this.addToMap(this.character);

        if (this.throwableObject) {
            this.throwableObject.moveRight();
            this.addToMap(this.throwableObject);
        }

        this.ctx.translate(-this.camera_x, 0);
        // ------ magic carpet ------


        // Draw() is repeatedly called
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

   /**
   * This function adds an array of objects to the canvas
   * @param {Array} objects - The array of objects to add to the map
   */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

   /**
   * This function adds a game object to the map and handles image flipping if necessary
   * @param {object} mo - The game object to add to the map
   */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
* This function flips the image if necessary
* 
*/
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
* This function flips the image back if necessary (needed to turn the character when walking left)
* 
*/
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}