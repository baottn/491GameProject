class Powerup{
    static POWERUP_HEIGHT = 10;
    static POWERUP_RADIUS = 35;
    constructor(game, x = 0, y = 0) {
        this.game = game;

        this.x = x;
        this.y = y;
        this.radius = POWERUP_RADIUS;
        this.collision = false;
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
        //draw circle
    }
}