class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x;
    y = 275;
    height = 150;
    width = 100;

    /**
    * This function takes an image-cache (found in character.class.js, chicken.class.etc etc.) and loops the images inside of them
    * @param {array} images array of images
    */
    playAnimation(images) {
        let i = this.currentImage % images.length; // modulo-operation
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
* This function loads the images from loadImages
* @param {array} path path to the source of the image
*/
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
* This function loads an array and saves them to be called by "loadImage"
* @param {array} arr array of images
*/
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
* This function handles the drawing on the canvas
* @param {ctx}
*/
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        } catch (e) {
            console.warn('Error loading image', e);
            console.log('Could not load image: ', this.img)
        }
    }

/**
 * This function handles the display of the different bars (except final boss's healthbar)
 * @param {percentage} number character's health or the collected coins/bottles
 */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    };

    /**
* This function combined with the function above returns the index-number of the respective image
* 
*/
    resolveImageIndex() {
        let amount = this.percentage;
        if (4 < amount && amount <= 5) {
            return 5;
        } else if (3 < amount && amount <= 4) {
            return 4;
        } else if (2 < amount && amount <= 3) {
            return 3;
        } else if (1 < amount && amount <= 2) {
            return 2;
        } else if (0 < amount && amount <= 1) {
            return 1;
        } else {
            return 0;
        }
    }
}