
var game = new Game("game", 30);

var box = new GameObject(10, 10, true, 10);

box.setBehaviour(() => {
    box.x += 0.5;
});

game.addObject(box);

game.addKeyDown(40, () => {
    box.y += 10;
})

game.addKeyDown(38, () => {
    box.y -= 10;
})

game.run();