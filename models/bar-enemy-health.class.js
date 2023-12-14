class EnemyHealthBar extends DrawableObject {


    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png');
        this.y = -10;
        this.width = 200;
        this.height = 50;
        this.loadImages(this.IMAGES);
    };

/**
 * This function handles the display of the boss's healthbar
 * 
 */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    };

/**
 * This function handles the display of the boss's healthbar
 * 
 */
    resolveImageIndex() {
        let amount = this.percentage;
        if (600 < amount && amount <= 700) {
            return 5;
        } else if (400 < amount && amount <= 600) {
            return 4;
        } else if (300 < amount && amount <= 400) {
            return 3;
        } else if (100 < amount && amount <= 300) {
            return 2;
        } else if (0 <  amount && amount <= 100) {
            return 1;
        } else {
            return 0;
        }
    }
}