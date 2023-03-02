this.k = randomY()
var test_forRecording = {
    music: "./music/background_music.mp3",
    label: "Test",
    finish: 10000,
    homebase: { x: 11000, y: params.CANVAS_SIZE / 2 },//Should be placed after the finish line
    underground: false,
    speed: 200,
    //Fixed, X, W,H Fixed; Y random
    tracks: [
        //{ x: 400, y: this.k, w: 200, h: 10 },
        
    ],
    //Fixed
    // ghost.angle, ghost.radius, ghost.moveSpeed
    ghosts: [
        //{ x: 1800, y: 800, radius: 30 + randomInt(5), moveSpeed: 75, angle: Math.PI / 2  },
        
    ],
    //Fixed
    traps: [
        { x: 1000, y: 500 },
        { x: 2000, y: 500 },
        { x: 3000, y: 500 },
    ],
    //Fixed: x, y random
    rocks_type0: [
       // { x: 800, y: randomY(), radius: 40 + randomInt(5), moveSpeed: 75, angle: Math.PI  },
    ],
    //Fixed: x, y random
    rocks_type1: [
        //{ x:1000, y: randomY(), radius: 55 + randomInt(5), moveSpeed: 75, angle: Math.PI },
        //{ x:2000, y: randomY(), radius: 55 + randomInt(5), moveSpeed: 75, angle: Math.PI },
        
    ],
    //Fixed: x, y random
    // powerup_type0: [
    //     { x: 1000, y: 500 },
    // ],
    // //Fixed: x, y random
    // powerup_type1: [
    //     { x: 2000, y: 500 },
    // ],
    // //Fixed: x, y random
    // powerup_type2: [
    //     { x: 3000, y: 500  },
    // ],
};
var levelOne = {
    music: "./music/background_music.mp3",
    label: "1-1",
    finish: 10000,
    homebase: { x: 11000, y: params.CANVAS_SIZE / 2 },//Should be placed after the finish line
    underground: false,
    speed: 200,
    //Fixed, X, W,H Fixed; Y random
    tracks: [
        { x: 400, y: this.k, w: 200, h: 100 },
        { x: 500, y: this.k + 350, w: 200, h: 100 },
        { x: 1100, y: this.k, w: 200, h: 100 },
        { x: 1200, y: this.k + 350, w: 200, h: 100 },
        { x: 2100, y: this.k, w: 200, h: 100 },
        { x: 2200, y: this.k + 350, w: 200, h: 100 },
        { x: 3100, y: this.k, w: 200, h: 100 },
        { x: 3200, y: this.k + 350, w: 200, h: 100 },
        { x: 4100, y: this.k, w: 200, h: 100 },
        { x: 4200, y: this.k + 350, w: 200, h: 100 },
        { x: 5100, y: this.k, w: 200, h: 100 },
        { x: 5200, y: this.k + 350, w: 200, h: 100 },
        { x: 6100, y: this.k, w: 200, h: 100 },
        { x: 6200, y: this.k + 350, w: 200, h: 100 },
        { x: 7100, y: this.k, w: 200, h: 100 },
        { x: 7200, y: this.k + 350, w: 200, h: 100 },
        { x: 8100, y: this.k, w: 200, h: 100 },
        { x: 8200, y: this.k + 350, w: 200, h: 100 },
        { x: 9100, y: this.k, w: 200, h: 100 },
        { x: 9200, y: this.k + 350, w: 200, h: 100 },
    ],
    //Fixed
    // ghost.angle, ghost.radius, ghost.moveSpeed
    ghosts: [
        { x: 800, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 1300, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 1900, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 2500, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 3100, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 3700, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 4300, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 4900, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 5500, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 6100, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 6700, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 7300, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 7900, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 8500, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 9100, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 9700, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 9600, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
    ],
    //Fixed
    traps: [
        { x: 900, y: randomY() },
        { x: 1000, y: randomY() },
        { x: 1900, y: randomY() },
        { x: 2800, y: randomY() },
        { x: 3700, y: randomY() },
        { x: 4600, y: randomY() },
        { x: 5500, y: randomY() },
        { x: 6400, y: randomY() },
        { x: 7300, y: randomY() },
        { x: 8200, y: randomY() },
        { x: 9100, y: randomY() },
    ],
    //Fixed: x, y random
    rocks_type0: [
        { x: 800, y: randomY(), radius: 40 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 1200, y: randomY(), radius: 40 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 1500, y: randomY(), radius: 40 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
    ],
    //Fixed: x, y random
    rocks_type1: [
        { x: 3150, y: randomY(), radius: 55 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 3750, y: randomY(), radius: 55 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 4350, y: randomY(), radius: 55 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 4950, y: randomY(), radius: 55 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 5550, y: randomY(), radius: 55 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 6150, y: randomY(), radius: 55 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 6750, y: randomY(), radius: 55 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 7350, y: randomY(), radius: 55 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 7950, y: randomY(), radius: 55 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 8550, y: randomY(), radius: 55 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 9150, y: randomY(), radius: 55 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 9750, y: randomY(), radius: 55 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
    ],
    //Fixed: x, y random
    powerup_type0: [
        { x: 1000, y: randomY() },
        { x: 1500, y: randomY() },
        { x: 2500, y: randomY() },
        { x: 3500, y: randomY() },
        { x: 4500, y: randomY() },
        { x: 5500, y: randomY() },
        { x: 6500, y: randomY() },
        { x: 7600, y: randomY() },
        { x: 8000, y: randomY() },
        { x: 9000, y: randomY() },
        { x: 9500, y: randomY() },
    ],
    //Fixed: x, y random
    powerup_type1: [
        { x: 500, y: randomY() },
        { x: 1000, y: randomY() },
        { x: 2200, y: randomY() },
        { x: 2500, y: randomY() },
        { x: 2900, y: randomY() },
        { x: 3600, y: randomY() },
        { x: 4300, y: randomY() },
        { x: 5000, y: randomY() },
        { x: 5700, y: randomY() },
        { x: 6400, y: randomY() },
        { x: 7100, y: randomY() },
        { x: 7800, y: randomY() },
        { x: 8500, y: randomY() },
        { x: 9200, y: randomY() },
        { x: 9900, y: randomY() },
    ],
    //Fixed: x, y random
    powerup_type2: [
        //{ x: params.CANVAS_SIZE / 9, y: params.CANVAS_SIZE / 2},
        { x: 1000, y: randomY() },
        { x: 3000, y: randomY() },
        { x: 1700, y: randomY() },
        { x: 2500, y: randomY() },
        { x: 3300, y: randomY() },
        { x: 4100, y: randomY() },
        { x: 4900, y: randomY() },
        { x: 5700, y: randomY() },
        { x: 6500, y: randomY() },
        { x: 7300, y: randomY() },
        { x: 8100, y: randomY() },
        { x: 8900, y: randomY() },
        { x: 9700, y: randomY() },
    ],
};

this.k = randomY()
var levelTwo = {
    music: "./music/background_music_2.mp3",
    label: "1-2",
    finish: 10000,
    homebase: { x: 10000, y: params.CANVAS_SIZE / 2 },//Should be placed after the finish line
    underground: false,
    speed: 300,
    //Fixed, X, W,H Fixed; Y random
    tracks: [
        { x: 100, y: this.k, w: 200, h: 100 },
        { x: 200, y: this.k + 350, w: 200, h: 100 },
        { x: 1100, y: this.k, w: 200, h: 100 },
        { x: 1200, y: this.k + 350, w: 200, h: 100 },
        { x: 2100, y: this.k, w: 200, h: 100 },
        { x: 2200, y: this.k + 350, w: 200, h: 100 },
        { x: 3100, y: this.k, w: 200, h: 100 },
        { x: 3200, y: this.k + 350, w: 200, h: 100 },
        { x: 4100, y: this.k, w: 200, h: 100 },
        { x: 4200, y: this.k + 350, w: 200, h: 100 },
        { x: 5100, y: this.k, w: 200, h: 100 },
        { x: 5200, y: this.k + 350, w: 200, h: 100 },
        { x: 6100, y: this.k, w: 200, h: 100 },
        { x: 6200, y: this.k + 350, w: 200, h: 100 },
        { x: 7100, y: this.k, w: 200, h: 100 },
        { x: 7200, y: this.k + 350, w: 200, h: 100 },
        { x: 8100, y: this.k, w: 200, h: 100 },
        { x: 8200, y: this.k + 350, w: 200, h: 100 },
        { x: 9100, y: this.k, w: 200, h: 100 },
        { x: 9200, y: this.k + 350, w: 200, h: 100 },
    ],
    //Fixed
    ghosts: [
        { x: 100, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 700, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 1300, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 1900, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 2500, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 3100, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 3700, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 4300, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 4900, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 5500, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 6100, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 6700, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 7300, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 7900, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 8500, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 9100, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 9700, y: randomY(), radius: 30 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
    ],
    //Fixed
    traps: [
        { x: 100, y: randomY() },
        { x: 1000, y: randomY() },
        { x: 1900, y: randomY() },
        { x: 2800, y: randomY() },
        { x: 3700, y: randomY() },
        { x: 4600, y: randomY() },
        { x: 5500, y: randomY() },
        { x: 6400, y: randomY() },
        { x: 7300, y: randomY() },
        { x: 8200, y: randomY() },
        { x: 9100, y: randomY() },
    ],
    //Fixed: x, y random
    rocks_type0: [
        { x: 1000, y: randomY(), radius: 40 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 5000, y: randomY(), radius: 40 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 9000, y: randomY(), radius: 40 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
    ],
    //Fixed: x, y random
    rocks_type1: [
        { x: 3150, y: randomY(), radius: 50 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 3750, y: randomY(), radius: 50 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 4350, y: randomY(), radius: 50 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 4950, y: randomY(), radius: 50 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 5550, y: randomY(), radius: 50 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 6150, y: randomY(), radius: 50 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 6750, y: randomY(), radius: 50 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 7350, y: randomY(), radius: 50 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 7950, y: randomY(), radius: 50 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 8550, y: randomY(), radius: 50 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 9150, y: randomY(), radius: 50 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
        { x: 9750, y: randomY(), radius: 50 + randomInt(5), moveSpeed: 150 + randomInt(50), angle: Math.PI / 2 + randomInt(10) / 10 },
    ],
    //Fixed: x, y random
    powerup_type0: [
        { x: 100, y: randomY() },
        { x: 600, y: randomY() },
        { x: 1100, y: randomY() },
        { x: 1600, y: randomY() },
        { x: 2100, y: randomY() },
        { x: 2600, y: randomY() },
        { x: 3100, y: randomY() },
        { x: 3600, y: randomY() },
    ],
    //Fixed: x, y random
    powerup_type1: [
        { x: 100, y: randomY() },
        { x: 800, y: randomY() },
        { x: 1500, y: randomY() },
        { x: 2200, y: randomY() },
        { x: 2900, y: randomY() },
        { x: 3600, y: randomY() },
        { x: 4300, y: randomY() },
        { x: 5000, y: randomY() },
        { x: 5700, y: randomY() },
        { x: 6400, y: randomY() },
        { x: 7100, y: randomY() },
        { x: 7800, y: randomY() },
        { x: 8500, y: randomY() },
        { x: 9200, y: randomY() },
        { x: 9900, y: randomY() },
    ],
    //Fixed: x, y random
    powerup_type2: [
        { x: 100, y: randomY() },
        { x: 900, y: randomY() },
        { x: 1700, y: randomY() },
        { x: 2500, y: randomY() },
        { x: 3300, y: randomY() },
        { x: 4100, y: randomY() },
        { x: 4900, y: randomY() },
        { x: 5700, y: randomY() },
        { x: 6500, y: randomY() },
        { x: 7300, y: randomY() },
        { x: 8100, y: randomY() },
        { x: 8900, y: randomY() },
        { x: 9700, y: randomY() },
    ],
};

function randomY() {
    return randomInt(params.CANVAS_SIZE);
    //return Math.floor(Math.random() * ((params.CANVAS_SIZE / 2) - 350) + 350);;
} 
