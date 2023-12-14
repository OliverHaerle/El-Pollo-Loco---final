class CollectableObject extends MoveableObject {

    x = 400 + Math.random() * 2500;
    collected = false;

    constructor() {
        super();
    }
}
