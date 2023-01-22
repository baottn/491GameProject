class Bullet {
    static BULLET_SPEED = 500
    static BULLET_LENGTH = 25
    constructor(game) {
        this.game = game;

        //Randomize movement
        this.dx = Math.cos(this.angle).toFixed(4) * Bullet.BULLET_SPEED;
        this.dy = Math.sin(this.angle).toFixed(4) * Bullet.BULLET_SPEED;

        this.x2 = Math.cos(this.angle).toFixed(3) * Bullet.BULLET_LENGTH + this.x1;
        this.y2 = Math.sin(this.angle).toFixed(3) * Bullet.BULLET_LENGTH + this.y1;

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