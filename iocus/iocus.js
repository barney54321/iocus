
class GameObject {
    constructor(x=0, y=0, visible=true, layer=0) {
        this.x = x;
        this.y = y;
        this.visible = visible;
        this.layer = layer;
        this.behaviour = () => {};

        this.image = new Image(40, 40);
        this.image.src = "images/sample.png";
    }

    // Draw the object to the screen
    draw(context) {
        if (this.visible) {
            context.drawImage(this.image, this.x, this.y);
        }
    }

    // Update the object every frame
    tick() {
        this.behaviour();
    }

    setBehaviour(behaviour) {
        this.behaviour = behaviour;
    }
}

class Game {
    constructor(id, framerate=60) {
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext("2d");
        this.objects = [];
        this.framerate = framerate;

        this.keydownEvents = {};

        this.keydown = (event) => {
            console.log(event.keyCode);
            this.keydownEvents[event.keyCode]();
        };

        window.addEventListener("keydown", this.keydown);
    }

    addObject = (object) => {
        this.objects.push(object);
        this.objects.sort((x, y) => x.layer - y.layer);
    }

    removeObject = (object) => {
        this.objects = this.objects.filter(x => x != object);
    }

    addKeyDown = (keyCode, fun) => {
        this.keydownEvents[keyCode] = fun;
    }

    tick = () => {
        this.objects.forEach((obj) => obj.tick());
    }

    draw = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objects.forEach((obj) => obj.draw(this.context));
    }

    update = () => {
        this.tick();
        this.draw();
    }

    run() {
        setInterval(this.update, 1000.0 / this.framerate);
    }
}