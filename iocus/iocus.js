
class GameObject {
    constructor(x=0, y=0, visible=true, layer=0, src=null) {
        this.x = x;
        this.y = y;

        this.width = 10;
        this.height = 10;

        this.xVel = 0;
        this.yVel = 0;

        this.visible = visible;
        this.layer = layer;

        this.image = new Image(10, 10);
        this.image.src = src;

        this.tag = "";

        this.pressedKeys = [];

        window.addEventListener("keydown", this.keyDownEvent);
        window.addEventListener("keyup", this.keyUpEvent);
    }

    // Draw the object to the screen
    draw = (context) => {
        if (this.visible) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    // Update the object every frame
    tick = () => {

    }

    supertick() {
        this.pressedKeys.forEach(x => this.keyHold(x));

        this.x += this.xVel;
        this.y += this.yVel;

        this.tick();
    }

    // Called when key is logged as being pressed
    keyDownEvent = (event) => {
        if (this.pressedKeys.indexOf(event.keyCode) < 0) {
            this.keyDown(event.keyCode);
            this.pressedKeys.push(event.keyCode);
        }
    }

    // Called when key is released
    keyUpEvent = (event) => {
        this.pressedKeys = this.pressedKeys.filter((x) => x != event.keyCode);
        this.keyUp(event.keyCode);
    }

    // Called when key is pressed down
    keyDown(keyCode) {

    }

    // Called while key is held down
    keyHold(keyCode) {

    }

    // Called when key is released
    keyUp(keyCode) {

    }

    // Updates the sprite's width
    setWidth(width) {
        this.width = width;
    }

    // Updates the sprite's height
    setHeight(height) {
        this.height = height;
    }

    collision(otherObject) {

    }

    collisionCheck(otherObject) {
        if (this.x < otherObject.x + otherObject.width &&
            this.x + this.width > otherObject.x &&
            this.y < otherObject.y + otherObject.height &&
            this.y + this.height > otherObject.y &&
            this != otherObject) {
            
                // collision detected!
            this.collision(otherObject);
        }
    }
}

class PhysicsObject extends GameObject {
    constructor(x=0, y=0, visible=true, layer=0, src=null, gravity=0.5) {
        super(x, y, visible, layer, src);

        this.gravity = 0.5;
    }

    supertick = () => {

        super.supertick();

        this.yVel += this.gravity;
    }
}

class Game {
    constructor(id, framerate=60) {
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext("2d");
        this.objects = [];
        this.framerate = framerate;

        this.pressedKeys = [];

        window.addEventListener("keydown", this.keyDownEvent);
        window.addEventListener("keyup", this.keyUpEvent);
    }

    // Called when key is logged as being pressed
    keyDownEvent = (event) => {
        if (this.pressedKeys.indexOf(event.keyCode) < 0) {
            this.keyDown(event.keyCode);
            this.pressedKeys.push(event.keyCode);
        }
    }

    // Called when key is released
    keyUpEvent = (event) => {
        this.pressedKeys = this.pressedKeys.filter((x) => x != event.keyCode);

        this.keyUp(event.keyCode);
    }

    // Called when key is pressed down
    keyDown(keyCode) {

    }

    // Called while key is held down
    keyHold(keyCode) {
    }

    // Called when key is released
    keyUp(keyCode) {
    }

    addObject = (object) => {
        this.objects.push(object);
        this.objects.sort((x, y) => x.layer - y.layer);
    }

    removeObject = (object) => {
        this.objects = this.objects.filter(x => x != object);
    }

    tick = () => {
        
    }

    draw = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objects.forEach((obj) => obj.draw(this.context));
    }

    update = () => {

        this.pressedKeys.forEach(x => this.keyHold(x));
        this.objects.forEach((obj) => obj.supertick());

        // Collisions
        for (var i = 0; i < this.objects.length; i++) {
            for (var j = 0; j < this.objects.length; j++) {
                this.objects[i].collisionCheck(this.objects[j]);
            }
        }
        this.tick();
        this.draw();
    }

    run() {
        setInterval(this.update, 1000.0 / this.framerate);
    }
}