class Bullet {
    static BULLET_SPEED = 500
    static BULLET_LENGTH = 25
    constructor(game, x1, y1, angle = 5) {
        Object.assign(this, { game, x1, y1, angle });

        //Randomize movement
        this.dx = Math.cos(this.angle).toFixed(4) * Bullet.BULLET_SPEED;
        this.dy = Math.sin(this.angle).toFixed(4) * Bullet.BULLET_SPEED;

        this.x2 = Math.cos(this.angle).toFixed(3) * Bullet.BULLET_LENGTH + this.x1;
        this.y2 = Math.sin(this.angle).toFixed(3) * Bullet.BULLET_LENGTH + this.y1;

   
    }

    updatePos() {
        this.x1 += this.dx * this.game.clockTick;
        this.y1 += this.dy * this.game.clockTick;

        this.x2 += this.dx * this.game.clockTick;
        this.y2 += this.dy * this.game.clockTick;
    }
/*
    checkCollisionWithOllie() {
        let dx = this.x - Ollie.x;
        let dy = this.y - Ollie.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.radius + Ollie.radius) {
            collision = true;
        }
    }
    */

    update() {
        this.updatePos();
        this.checkCollisionWithAsteroids();
    }

    drawLine(ctx, xStart, yStart, xEnd, yEnd) {
        ctx.fillStyle = "green";
        ctx.strokeStyle = "green";

        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);

        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    draw(ctx) {
        this.drawLine(ctx, this.x1, this.y1, this.x2, this.y2);
    }
}