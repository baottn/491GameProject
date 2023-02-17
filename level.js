var levelOne = {
    music: "./music/overworld.mp3",
    hurry_music: "./music/overworld-hurry.mp3",
    label: "1-1",
    underground: false,
    track: [{x: 0, y: 0, w: 0, h:0},
        {x: 0, y: 0, w: 0, h:0}],
    
    
};

var bonusLevelOne = {
    music: "./music/underworld.mp3",
    hurry_music: "./music/underworld-hurry.mp3",
    label: "1-1",
    underground: false,
    bricks: [{ x: 0, y: 0, type: 1, prize: "None" },
    { x: 0, y: 1, type: 1, prize: "None" },
    { x: 0, y: 2, type: 1, prize: "None" },
    { x: 0, y: 3, type: 1, prize: "None" },
    { x: 0, y: 4, type: 1, prize: "None" },
    { x: 0, y: 5, type: 1, prize: "None" },
    { x: 0, y: 6, type: 1, prize: "None" },
    { x: 0, y: 7, type: 1, prize: "None" },
    { x: 0, y: 8, type: 1, prize: "None" },
    { x: 0, y: 9, type: 1, prize: "None" },
    { x: 0, y: 10, type: 1, prize: "None" },
    { x: 0, y: 11, type: 1, prize: "None" },
    { x: 0, y: 12, type: 1, prize: "None" },
    { x: 0, y: 13, type: 1, prize: "None" },
    { x: 4, y: 0, type: 1, prize: "None" },
    { x: 5, y: 0, type: 1, prize: "None" },
    { x: 6, y: 0, type: 1, prize: "None" },
    { x: 7, y: 0, type: 1, prize: "None" },
    { x: 8, y: 0, type: 1, prize: "None" },
    { x: 9, y: 0, type: 1, prize: "None" },
    { x: 10, y: 0, type: 1, prize: "None" },
    { x: 4, y: 11, type: 1, prize: "None" },
    { x: 5, y: 11, type: 1, prize: "None" },
    { x: 6, y: 11, type: 1, prize: "None" },
    { x: 7, y: 11, type: 1, prize: "None" },
    { x: 8, y: 11, type: 1, prize: "None" },
    { x: 9, y: 11, type: 1, prize: "None" },
    { x: 10, y: 11, type: 1, prize: "None" },
    { x: 4, y: 12, type: 1, prize: "None" },
    { x: 5, y: 12, type: 1, prize: "None" },
    { x: 6, y: 12, type: 1, prize: "None" },
    { x: 7, y: 12, type: 1, prize: "None" },
    { x: 8, y: 12, type: 1, prize: "None" },
    { x: 9, y: 12, type: 1, prize: "None" },
    { x: 10, y: 12, type: 1, prize: "None" },
    { x: 4, y: 13, type: 1, prize: "None" },
    { x: 5, y: 13, type: 1, prize: "None" },
    { x: 6, y: 13, type: 1, prize: "None" },
    { x: 7, y: 13, type: 1, prize: "None" },
    { x: 8, y: 13, type: 1, prize: "None" },
    { x: 9, y: 13, type: 1, prize: "None" },
    { x: 10, y: 13, type: 1, prize: "None" }],
    tubes: [{ x: 13, y: 12, size: 1, destination: true, side: true },
        { x: 15, y: -1, size: 14, destination: false }],
    coins: [{ x: 4, y: 10 },
        { x: 5, y: 10 },
        { x: 6, y: 10 },
        { x: 7, y: 10 },
        { x: 8, y: 10 },
        { x: 9, y: 10 },
        { x: 10, y: 10 },
        { x: 4, y: 9 },
        { x: 5, y: 9 },
        { x: 6, y: 9 },
        { x: 7, y: 9 },
        { x: 8, y: 9 },
        { x: 9, y: 9 },
        { x: 10, y: 9 },
        { x: 5, y: 8 },
        { x: 6, y: 8 },
        { x: 7, y: 8 },
        { x: 8, y: 8 },
        { x: 9, y: 8 }],
    ground: [{ x: 0, y: 14, size: 34 }]

};

    var levelTwo = {
    underground: true, // NOTE: PLEASE ADD THIS BOOLEAN PROPERTY WHEN TESTING LEVEL 1-2
    music: "./music/underworld.mp3",
    // hurry_music: "./music/underworld-hurry.mp3",
    label: "1-2",
    ground: [{ x: 0, y: 13, size: 80 }, { x:83, y: 13, size: 37}, {x: 122, y: 13, size: 2},
        {x: 126, y: 13, size: 12}, {x: 145, y: 13, size: 7}, {x: 159, y: 13, size: 32}],
    bricks: [],
    blocks: [{ x: 17, y: 12, size: 1 },
        { x: 19, y: 12, size: 1 }, { x: 19, y: 11, size: 1 },
        { x: 21, y: 12, size: 1 }, { x: 21, y: 11, size: 1 }, { x: 21, y: 10, size: 1 },
        { x: 23, y: 12, size: 1 }, { x: 23, y: 11, size: 1 }, { x: 23, y: 10, size: 1 }, { x: 23, y: 9, size: 1 },
        { x: 25, y: 12, size: 1 }, { x: 25, y: 11, size: 1 }, { x: 25, y: 10, size: 1 }, { x: 25, y: 9, size: 1 },
        { x: 27, y: 12, size: 1 }, { x: 27, y: 11, size: 1 }, { x: 27, y: 10, size: 1 },
        { x: 31, y: 12, size: 1 }, { x: 31, y: 11, size: 1 }, { x: 31, y: 10, size: 1 },
        { x: 33, y: 12, size: 1 }, { x: 33, y: 11, size: 1 },
        { x: 133, y: 12, size: 5 },
        { x: 134, y: 11, size: 4 },
        { x: 135, y: 10, size: 3 },
        { x: 136, y: 9, size: 2 }],
    coins: [{ x: 40, y: 8 }, { x: 45, y: 8 }, { x: 41, y: 5 }, { x: 42, y: 5 }, { x: 43, y: 5 }, { x: 44, y: 5 },
        { x: 58, y: 8 }, { x: 59, y: 8 }, { x: 60, y: 8 }, { x: 61, y: 8 },
        { x: 68, y: 8 },
        { x: 84, y: 5 }, { x: 85, y: 5 }, { x: 86, y: 5 }, { x: 87, y: 5 }, { x: 88, y: 5 }, { x: 89, y: 5 }],
    goombas: [{ x: 16, y:12 }, { x: 17, y:11 },
        { x: 29, y:12 },
        { x: 62, y:12 }, { x: 64, y:12 },
        { x: 73, y:4 }, { x: 76, y:8 }, { x: 77.5, y:8 },
        { x: 99, y:12 }, { x: 100.5, y:12 }, { x: 102, y:12 },
        { x: 113, y:12 },
        { x: 135, y:9 }, { x: 136.5, y:8 }],
    koopas: [{ x: 44, y:11.5, facing: 1}, { x: 45, y:11.5, facing: 1 },
        { x: 59, y:11.5, facing: 1 },
        { x: 146, y:11.5, facing: 1 }],
    tubes: [{ x: 103, y: 10, size: 2, destination: true },
        { x: 109, y: 9, size: 3, destination: false },
        { x: 115, y: 11, size: 1, destination: false },
        { x: 166, y: 8, size: 1, destination: false, side: true},
        { x: 168, y: 2, size: 7, destination: false },
        { x: 178, y: 10, size: 2, destination: false },
        { x: 182, y: 10, size: 2, destination: false },
        { x: 186, y: 10, size: 2, destination: false }],
    lifts: [{ x: 140, y: 7, goingDown: true }, {x: 155, y: 9, goingDown: false }]
};

var bonusLevelTwo = {
    label: "1-2",
    ground: [{ x: 0, y: 11, size: 17 }],
    coins: [{ x: 4, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 6 }, { x: 7, y: 6 }, { x: 8, y: 6 }, { x: 9, y: 6 }, { x: 10, y: 6 }, { x: 11, y: 6 },
        { x: 3, y: 10 }, { x: 4, y: 10 }, { x: 5, y: 10 }, { x: 6, y: 10 }, { x: 7, y: 10 }, { x: 8, y: 10 }, { x: 9, y: 10 }, { x: 10, y: 10 }, { x: 11, y: 10 }],
    tubes: [{ x: 13, y: 9, size: 1, destination: true, side: true },
        { x: 15, y: -1, size: 11, destination: false }],
    bricks: [{ x: 0, y: 0, type: 1, prize: "None" },
        { x: 0, y: 1, type: 1, prize: "None" },
        { x: 0, y: 2, type: 1, prize: "None" },
        { x: 0, y: 3, type: 1, prize: "None" },
        { x: 0, y: 4, type: 1, prize: "None" },
        { x: 0, y: 5, type: 1, prize: "None" },
        { x: 0, y: 6, type: 1, prize: "None" },
        { x: 0, y: 7, type: 1, prize: "None" },
        { x: 0, y: 8, type: 1, prize: "None" },
        { x: 0, y: 9, type: 1, prize: "None" },
        { x: 0, y: 10, type: 1, prize: "None" },
        { x: 3, y: 0, type: 1, prize: "None" },
        { x: 4, y: 0, type: 1, prize: "None" },
        { x: 5, y: 0, type: 1, prize: "None" },
        { x: 6, y: 0, type: 1, prize: "None" },
        { x: 7, y: 0, type: 1, prize: "None" },
        { x: 8, y: 0, type: 1, prize: "None" },
        { x: 9, y: 0, type: 1, prize: "None" },
        { x: 10, y: 0, type: 1, prize: "None" },
        { x: 11, y: 0, type: 1, prize: "None" },
        { x: 12, y: 0, type: 1, prize: "None" },
        { x: 13, y: 0, type: 1, prize: "None" },
        { x: 14, y: 0, type: 1, prize: "None" },
        { x: 3, y: 1, type: 1, prize: "None" },
        { x: 4, y: 1, type: 1, prize: "None" },
        { x: 5, y: 1, type: 1, prize: "None" },
        { x: 6, y: 1, type: 1, prize: "None" },
        { x: 7, y: 1, type: 1, prize: "None" },
        { x: 8, y: 1, type: 1, prize: "None" },
        { x: 9, y: 1, type: 1, prize: "None" },
        { x: 10, y: 1, type: 1, prize: "None" },
        { x: 11, y: 1, type: 1, prize: "None" },
        { x: 12, y: 1, type: 1, prize: "None" },
        { x: 13, y: 1, type: 1, prize: "None" },
        { x: 14, y: 1, type: 1, prize: "None" },
        { x: 3, y: 2, type: 1, prize: "None" },
        { x: 4, y: 2, type: 1, prize: "None" },
        { x: 5, y: 2, type: 1, prize: "None" },
        { x: 6, y: 2, type: 1, prize: "None" },
        { x: 7, y: 2, type: 1, prize: "None" },
        { x: 8, y: 2, type: 1, prize: "None" },
        { x: 9, y: 2, type: 1, prize: "None" },
        { x: 10, y: 2, type: 1, prize: "None" },
        { x: 11, y: 2, type: 1, prize: "None" },
        { x: 12, y: 2, type: 1, prize: "None" },
        { x: 13, y: 2, type: 1, prize: "None" },
        { x: 14, y: 2, type: 1, prize: "None" },
        { x: 3, y: 3, type: 1, prize: "None" },
        { x: 4, y: 3, type: 1, prize: "None" },
        { x: 5, y: 3, type: 1, prize: "None" },
        { x: 6, y: 3, type: 1, prize: "None" },
        { x: 7, y: 3, type: 1, prize: "None" },
        { x: 8, y: 3, type: 1, prize: "None" },
        { x: 9, y: 3, type: 1, prize: "None" },
        { x: 10, y: 3, type: 1, prize: "None" },
        { x: 11, y: 3, type: 1, prize: "None" },
        { x: 12, y: 3, type: 1, prize: "None" },
        { x: 13, y: 3, type: 1, prize: "None" },
        { x: 14, y: 3, type: 1, prize: "None" },
        { x: 3, y: 7, type: 1, prize: "None" },
        { x: 4, y: 7, type: 1, prize: "None" },
        { x: 5, y: 7, type: 1, prize: "None" },
        { x: 6, y: 7, type: 1, prize: "None" },
        { x: 7, y: 7, type: 1, prize: "None" },
        { x: 8, y: 7, type: 1, prize: "None" },
        { x: 9, y: 7, type: 1, prize: "None" },
        { x: 10, y: 7, type: 1, prize: "None" },
        { x: 11, y: 7, type: 1, prize: "None" },
        { x: 12, y: 7, type: 1, prize: "Coins" },
        { x: 13, y: 7, type: 1, prize: "None" },
        { x: 14, y: 7, type: 1, prize: "None" },
        { x: 13, y: 4, type: 1, prize: "None" },
        { x: 14, y: 4, type: 1, prize: "None" },
        { x: 13, y: 5, type: 1, prize: "None" },
        { x: 14, y: 5, type: 1, prize: "None" },
        { x: 13, y: 6, type: 1, prize: "None" },
        { x: 14, y: 6, type: 1, prize: "None" },
        { x: 13, y: 8, type: 1, prize: "None" },
        { x: 14, y: 8, type: 1, prize: "None" }]
}

function loadLevel2Bricks(e) {
    for (var i = 0; i < 11; i++) {
        e.push({ x: 0, y: i+2, type: 1, prize: "None"});
    }

    for (var i = 0; i < 83; i++) {
        e.push({ x: i + 6, y: 2, type: 1, prize: "None"});
    }

    e.push({ x: 89, y: 2, type: 1, prize: "1up"});

    for (var i = 0; i < 48; i++) {
        e.push({ x: i + 90, y: 2, type: 1, prize: "None"});
    }

    for (var i = 0; i < 2; i++) {
        e.push({ x: 54, y : i + 3, type: 1, prize: "None"});
        e.push({ x: 55, y : i + 3, type: 1, prize: "None"});

        e.push({ x: 58, y : i + 3, type: 1, prize: "None"});
        e.push({ x: 59, y : i + 3, type: 1, prize: "None"});
        e.push({ x: 60, y : i + 3, type: 1, prize: "None"});
        e.push({ x: 61, y : i + 3, type: 1, prize: "None"});
        e.push({ x: 62, y : i + 3, type: 1, prize: "None"});
        e.push({ x: 63, y : i + 3, type: 1, prize: "None"});

        e.push({ x: 66, y : i + 3, type: 1, prize: "None"});
        e.push({ x: 67, y : i + 3, type: 1, prize: "None"});
        e.push({ x: 68, y : i + 3, type: 1, prize: "None"});
        e.push({ x: 69, y : i + 3, type: 1, prize: "None"});

        e.push({ x: 76, y : i + 3, type: 1, prize: "None"});
        e.push({ x: 77, y : i + 3, type: 1, prize: "None"});
        e.push({ x: 78, y : i + 3, type: 1, prize: "None"});
        e.push({ x: 79, y : i + 3, type: 1, prize: "None"});
    }

    for (var i = 0; i < 5; i++) {
        e.push({ x: 52, y : i + 5, type: 1, prize: "None"});
        e.push({ x: 53, y : i + 5, type: 1, prize: "None"});

        e.push({ x: 62, y : i + 5, type: 1, prize: "None"});
        e.push({ x: 63, y : i + 5, type: 1, prize: "None"});

        e.push({ x: 67, y : i + 5, type: 1, prize: "None"});

        e.push({ x: 72, y : i + 5, type: 1, prize: "None"});
        if(i === 3)
            e.push({ x: 73, y : i + 5, type: 1, prize: "Coins"});
        else
            e.push({ x: 73, y : i + 5, type: 1, prize: "None"});
    }

    e.push({ x: 54, y : 9, type: 1, prize: "None"});
    e.push({ x: 55, y : 9, type: 1, prize: "None"});

    e.push({ x: 58, y : 9, type: 1, prize: "None"});
    e.push({ x: 59, y : 9, type: 1, prize: "None"});
    e.push({ x: 60, y : 9, type: 1, prize: "None"});
    e.push({ x: 61, y : 9, type: 1, prize: "None"});

    e.push({ x: 68, y : 9, type: 1, prize: "None"});
    e.push({ x: 69, y : 9, type: 1, prize: "None"});

    e.push({ x: 76, y : 9, type: 1, prize: "None"});
    e.push({ x: 77, y : 9, type: 1, prize: "None"});
    e.push({ x: 78, y : 9, type: 1, prize: "None"});
    e.push({ x: 79, y : 9, type: 1, prize: "None"});

    e.push({ x: 54, y : 10, type: 1, prize: "None"});
    e.push({ x: 55, y : 10, type: 1, prize: "None"});
    e.push({ x: 54, y : 11, type: 1, prize: "None"});
    e.push({ x: 55, y : 11, type: 1, prize: "None"});

    e.push({ x: 69, y : 8, type: 1, prize: "Growth"});

    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 6; j++) {
            e.push({ x: 84 + j, y: 7 + i, type: 1, prize: "None"});
        }
    }

    for (var i = 0; i < 3; i++) {
        e.push({ x: 39, y : 7 + i, type: 1, prize: "None"});

        e.push({ x: 41, y : 7 + i, type: 1, prize: "None"});

        e.push({ x: 44, y : 7 + i, type: 1, prize: "None"});

        if (i === 0)
            e.push({ x: 46, y : 7 + i, type: 1, prize: "Growth"});
        else
            e.push({ x: 46, y : 7 + i, type: 1, prize: "None"});
    }

    e.push({ x: 42, y : 7, type: 1, prize: "None"});
    e.push({ x: 43, y : 7, type: 1, prize: "None"});

    e.push({ x: 40, y : 9, type: 1, prize: "None"});
    e.push({ x: 45, y : 9, type: 1, prize: "None"});

    e.push({ x: 29, y : 8, type: 1, prize: "Coins"});

    e.push({ x: 10, y : 9, type: 2, prize: "Growth"});
    e.push({ x: 11, y : 9, type: 2, prize: "Coin"});
    e.push({ x: 12, y : 9, type: 2, prize: "Coin"});
    e.push({ x: 13, y : 9, type: 2, prize: "Coin"});
    e.push({ x: 14, y : 9, type: 2, prize: "Coin"});

    e.push({ x: 122, y : 10, type: 1, prize: "None"});
    e.push({ x: 123, y : 10, type: 1, prize: "None"});
    e.push({ x: 122, y : 11, type: 1, prize: "None"});
    e.push({ x: 123, y : 11, type: 1, prize: "None"});
    e.push({ x: 122, y : 12, type: 1, prize: "None"});
    e.push({ x: 123, y : 12, type: 1, prize: "None"});

    e.push({ x: 145, y : 8, type: 1, prize: "None"});
    e.push({ x: 146, y : 8, type: 1, prize: "None"});
    e.push({ x: 147, y : 8, type: 1, prize: "None"});
    e.push({ x: 148, y : 8, type: 1, prize: "None"});
    e.push({ x: 149, y : 8, type: 1, prize: "Growth"});

    // after platform
    for (var i = 0; i < 7; i++) {
        e.push({ x: 160 + i, y : 2, type: 1, prize: "None"});
    }

    for (var i = 0; i < 17; i++) {
        e.push({ x: 169 + i, y : 2, type: 1, prize: "None"});
    }

    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            e.push({ x: 169 + i, y : 3 + j, type: 1, prize: "None"});
        }
    }

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 17; j++) {
            e.push({ x: 159 + j, y : 10 + i, type: 1, prize: "None"});
        }
    }

    for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 2; j++) {
            e.push({ x: 189 + j, y : 2 + i, type: 1, prize: "None"});
        }
    }
}
