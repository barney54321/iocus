# iocus

A simple JS Game Library. Utilises Object-Oriented features to streamline creation of simple canvas-based games.

## Example Code

The following example shows how to move a ball (stored in "/images/ball.png") around using keyboard input.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Sample Game</title>
        <script src="../iocus/iocus.js"></script>
    </head>
    <body>
        <canvas id="game" width="700" height="500" style="border:1px solid #000000;">
        </canvas>

        <script src="main.js"></script>
    </body>
</html>
```

```javascript
class Ball extends GameObject {
    constructor(x=0, y=0, visible=true, layer=0) {
        super(x, y, visible, layer, "images/ball.png");
    }

    keyDown(keyCode) {
        if (keyCode == 37) {
            this.xVel = -1;
        } else if (keyCode == 38) {
            this.yVel = -1;
        } else if (keyCode == 39) {
            this.xVel = 1;
        } else if (keyCode == 40) {
            this.yVel = 1;
        }
    }
}

class Manager extends Game {
    constructor(id, framerate=60) {
        super(id, framerate);

        var ball = new Ball(10, 10, true, 10);

        this.addObject(ball);
    }
}

var game = new Manager("game", 30);

game.run();
```