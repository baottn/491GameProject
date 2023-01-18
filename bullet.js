class Bullet {
    constructor(game) {
        this.game = game;

        this.x = 0
        this.y = 0
        this.speed = 25
    }

    shootUp() {
        this.y += this.speed * this.game.clockTick;
    }

    shootRight() {
        this.x += this.speed * this.game.clockTick;
    }
}