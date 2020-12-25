class Bird extends PhysicsObject {
    constructor(x=0, y=0, visible=true, layer=0) {
        super(x, y, visible, layer, "images/bird.png");

        this.horizontalSpeed = 1;
        this.gravity = 0.6;

        this.width = 30;
        this.height = 25;
    }

    keyDown(keyCode) {
        if (keyCode == 32) {
            this.yVel = -7;
        }
    }
}

class Pipe extends PhysicsObject {
    constructor() {
        super(700, 150, true, 0, "images/pipe.png");
        this.gravity = 0;

        this.y = Math.random() * 250 + 100

        this.xVel = -5;

        this.width = 52;
        this.height = 320;
    }
}

class DownPipe extends PhysicsObject {
    constructor(partner) {
        super(partner.x, partner.y - 400, true, 0, "images/down_pipe.png");

        this.gravity = partner.gravity;

        this.xVel = partner.xVel;

        this.width = partner.width;
        this.height = partner.height;
    }
}

class Manager extends Game {
    constructor(id, framerate=60) {
        super(id, framerate);

        var box = new Bird(50, 10, true, 10);

        this.addObject(box);

        this.counter = 0;
        this.timeBetweenPipes = 50;
        this.pipes = [];
    }

    tick = () => {
        this.counter++;

        if (this.counter == this.timeBetweenPipes) {
            this.counter = 0;

            // Create new pipe
            var pipe = new Pipe();
            var downPipe = new DownPipe(pipe);

            this.addObject(pipe);
            this.addObject(downPipe);

            this.pipes.push(pipe);
            this.pipes.push(downPipe);

            // Remove pipe if off-screen
            for (var i = this.pipes.length - 1; i >= 0; i--) {
                if (this.pipes[i].x < -100) {
                    this.removeObject(this.pipes[i]);
                    this.pipes = this.pipes.filter(x => x != this.pipes[i]);
                }
            }
        }
    }
}

var game = new Manager("game", 30);

game.run();