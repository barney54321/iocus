
class Box extends GameObject {
    constructor(x=0, y=0, visible=true, layer=0) {
        super(x, y, visible, layer, "images/sample.png");

        this.horizontalSpeed = 1;
    }

    tick = () => {
        
    }

    keyHold(keyCode) {
        if (keyCode === 39) {
            this.xVel = this.horizontalSpeed;
        }

        if (keyCode === 37) {
            this.xVel = -this.horizontalSpeed;
        }
    }

    keyUp(keyCode) {
        if (keyCode === 39) {
            this.xVel = 0;
        }

        if (keyCode === 37) {
            this.xVel = 0;
        }
    }
}

class Manager extends Game {
    constructor(id, framerate=60) {
        super(id, framerate);
    }
}

var game = new Manager("game", 30);

var box = new Box(10, 10, true, 10);

game.addObject(box);

game.run();