class CoinBar extends DrawableObject {


    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png');
        this.x = -10;
        this.y = 80;
        this.width = 200;
        this.height = 50;
        this.loadImages(this.IMAGES);
    };
}