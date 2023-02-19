var levelOne = {
    label: "1-1",
    finish: 10000,
    homebase: { x: 11000, y: params.CANVAS_SIZE / 2 },//Should be placed after the finish line
    underground: false,
    //Fixed, X, Y, W,H Fixed; Tunnel
    tracks: [
        { x: randomX(1000), y: randomY(), w: randomWidth(), h: randomHeight() },
        { x: randomX(3000), y: randomY(), w: randomWidth(), h: randomHeight() },
        { x: randomX(5000), y: randomY(), w: randomWidth(), h: randomHeight() },
        { x: randomX(7000), y: randomY(), w: randomWidth(), h: randomHeight() },
        { x: randomX(8000), y: randomY(), w: randomWidth(), h: randomHeight() },
        { x: randomX(9000), y: randomY(), w: randomWidth(), h: randomHeight() },
    ],
    //Fixed
    ghosts: [
        { x: randomX(1000), y: randomY() },
        { x: randomX(5000), y: randomY() },
        { x: randomX(9000), y: randomY() },
    ],
    //Fixed
    traps: [
        { x: randomX(2000), y: randomY() },
        { x: randomX(4000), y: randomY() },
        { x: randomX(6000), y: randomY() },
        { x: randomX(8000), y: randomY() },
    ],
    //Fixed: x, y random
    rocks_type0: [
        { x: randomX(1000), y: randomY() },
        { x: randomX(5000), y: randomY() },
        { x: randomX(9000), y: randomY() },
    ],
    //Fixed: x, y random
    rocks_type1: [
        { x: randomX(2000), y: randomY() },
        { x: randomX(6000), y: randomY() },
    ],
    //Fixed: x, y random
    powerup_type0: [
        { x: randomX(1000), y: randomY() },
        { x: randomX(2000), y: randomY() },
        { x: randomX(3000), y: randomY() },
        { x: randomX(4000), y: randomY() },
        { x: randomX(5000), y: randomY() },
        { x: randomX(6000), y: randomY() },
        { x: randomX(7000), y: randomY() },
        { x: randomX(8000), y: randomY() },
        { x: randomX(9000), y: randomY() },
    ],
    //Fixed: x, y random
    powerup_type1: [
        { x: randomX(1000), y: randomY() },
        { x: randomX(2000), y: randomY() },
        { x: randomX(3000), y: randomY() },
        { x: randomX(4000), y: randomY() },
        { x: randomX(5000), y: randomY() },
        { x: randomX(6000), y: randomY() },
        { x: randomX(7000), y: randomY() },
        { x: randomX(8000), y: randomY() },
        { x: randomX(9000), y: randomY() },
    ],
    //Fixed: x, y random
    powerup_type2: [
        { x: randomX(100), y: randomY() },
        { x: randomX(200), y: randomY() },
        { x: randomX(300), y: randomY() },
        { x: randomX(400), y: randomY() },
        { x: randomX(500), y: randomY() },
        { x: randomX(600), y: randomY() },
        { x: randomX(700), y: randomY() },
        { x: randomX(800), y: randomY() },
        { x: randomX(900), y: randomY() },
    ],
};

var levelTwo = {
    label: "1-1",
    finish: 20000,
    homebase: { x: 20100, y: params.CANVAS_SIZE / 2 },//Should be placed after the finish line
    underground: false,
    tracks: [
        { x: randomX(100), y: randomY(), w: randomWidth(), h: randomHeight() },
        { x: randomX(300), y: randomY(), w: randomWidth(), h: randomHeight() },
        { x: randomX(300), y: randomY(), w: randomWidth(), h: randomHeight() },
        { x: randomX(500), y: randomY(), w: randomWidth(), h: randomHeight() },
        { x: randomX(700), y: randomY(), w: randomWidth(), h: randomHeight() },
        { x: randomX(700), y: randomY(), w: randomWidth(), h: randomHeight() },
        { x: randomX(900), y: randomY(), w: randomWidth(), h: randomHeight() },
    ],

    ghosts: [
        { x: randomX(100), y: randomY() },
        { x: randomX(500), y: randomY() },
        { x: randomX(900), y: randomY() },
    ],
    traps: [
        { x: randomX(200), y: randomY() },
        { x: randomX(400), y: randomY() },
        { x: randomX(600), y: randomY() },
        { x: randomX(800), y: randomY() },
    ],
    rocks_type0: [
        { x: randomX(100), y: randomY() },
        { x: randomX(500), y: randomY() },
        { x: randomX(900), y: randomY() },
    ],

    rocks_type1: [
        { x: randomX(200), y: randomY() },
        { x: randomX(600), y: randomY() },
    ],

    powerup_type0: [
        { x: randomX(100), y: randomY() },
        { x: randomX(200), y: randomY() },
        { x: randomX(300), y: randomY() },
        { x: randomX(400), y: randomY() },
        { x: randomX(500), y: randomY() },
        { x: randomX(600), y: randomY() },
        { x: randomX(700), y: randomY() },
        { x: randomX(800), y: randomY() },
        { x: randomX(900), y: randomY() },
    ],

    powerup_type1: [
        { x: randomX(100), y: randomY() },
        { x: randomX(200), y: randomY() },
        { x: randomX(300), y: randomY() },
        { x: randomX(400), y: randomY() },
        { x: randomX(500), y: randomY() },
        { x: randomX(600), y: randomY() },
        { x: randomX(700), y: randomY() },
        { x: randomX(800), y: randomY() },
        { x: randomX(900), y: randomY() },
    ],

    powerup_type2: [
        { x: randomX(100), y: randomY() },
        { x: randomX(200), y: randomY() },
        { x: randomX(300), y: randomY() },
        { x: randomX(400), y: randomY() },
        { x: randomX(500), y: randomY() },
        { x: randomX(600), y: randomY() },
        { x: randomX(700), y: randomY() },
        { x: randomX(800), y: randomY() },
        { x: randomX(900), y: randomY() },
    ],
};

function randomX(startPoint) {
    return startPoint + Math.floor(Math.random() * (params.CANVAS_SIZE - 100));
}

function randomY() {
    return Math.floor(Math.random() * (params.CANVAS_SIZE - 50));
}

function randomWidth() {
    return 100 + Math.floor(Math.random() * 200);
}

function randomHeight() {
    return 100 + Math.floor(Math.random() * 200);
}
