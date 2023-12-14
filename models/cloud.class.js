class Cloud extends MoveableObject {
    y = 50;
    width = 400;
    height = 300;
    speed = 0.15;
    

    constructor(imgPath) {
        super().loadImage(imgPath);

        this.x = 200 + Math.random() * 500;  // number 200-700
    }
}