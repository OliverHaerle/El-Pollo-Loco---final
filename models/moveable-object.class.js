class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    lastHit = 0;
    speedY = 0;
    acceleration = 2.5;
    ground = 480;
    isInvincible = false;

    /**
 * This function takes an enemy/collectable and subtracts a predetermined offset to calculate its hitbox
 * @param {mo} class an enemy (chicken, chick, endboss) or collectable (bottle, cloin)
 */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
* This function handles the character's energy loss
* 
*/
    hit() {
        this.energy -= 1;
        if (this.energy < 0) {
            this.energy = 0
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
* This function r
* 
*/
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in seconds
        return timepassed < 1;
    }

    /**
* This function is used to check if the character's energy is 0
* 
*/
    isDead() {
        return this.energy == 0;
    }

    /**
* This function makes the character move right by increasing manipulating the value of its x-axis
* 
*/
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
* This function makes the character move right by increasing manipulating the value of its x-axis and inverting the image
* 
*/
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    };

    /**
* This function makes the character jump by increasing its speed on the y-axis
* 
*/
    jump() {
        this.speedY = 30;
    }

    /**
* This function increases the character's/bottle's speed on the y-axis if they are above the ground
* 
*/
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.speedY < 0 && !(this.isAboveGround())) {
                    this.speedY = 0
                }
            }
        }, 1000 / 25);
    };

    /**
* This function is used to check if the respective object is above the ground by comparing the ground's y-axis with the object's y-axis
* 
*/
    isAboveGround() {
        return this.y < this.ground;
    };

    /**
* This function gives the character 1.5 seconds of invincibility after being hit
* 
*/
    giveInvincibilityFrames() {
        this.isInvincible = true;
        setTimeout(() => {
            this.isInvincible = false;
        }, 1500);
    }
}