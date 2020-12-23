class Box extends PhysicsObject {
    constructor(x=0, y=0, visible=true, layer=0) {
        super(x, y, visible, layer, "images/sample.png");

        this.horizontalSpeed = 1;
    }

    keyDown(keyCode) {
        if (keyCode == 32) {
            this.yVel = -7;
        }
    }
}

class Manager extends Game {
    constructor(id, framerate=60) {
        super(id, framerate);

        var box = new Box(10, 10, true, 10);

        this.addObject(box);
    }
}

var game = new Manager("game", 30);

game.run();