class Bullet {
    static BULLET_SPEED = 500
    static BULLET_LENGTH = 25
    constructor(game) {
        this.game = game;

        this.x = 0;
        this.y = 0;
        this.speed = 25;
    }

    shootUp() {
        this.y += this.speed * this.game.clockTick;
    }

    shootRight() {
        this.x += this.speed * this.game.clockTick;
    }

    checkCollisionWithOllie() {
        let dx = this.x - Ollie.x;
        let dy = this.y - Ollie.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.radius + Ollie.radius) {
            collision = true;
        }
    }

    draw(ctx) {
       // draw line
    }
}