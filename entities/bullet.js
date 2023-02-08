/**
 * Bullet is basically a straight line
 */
class Bullet {
    static BULLET_SPEED = 900;
    static BULLET_LENGTH = 80;

    constructor(game, x1, y1, angle = 5) {
        Object.assign(this, { game, x1, y1, angle });

        let speed = Bullet.BULLET_SPEED + this.game.mainCharacter.dx;//Bullet speed is relative to the moving speed of player
        this.dx = Math.cos(this.angle).toFixed(4) * speed;
        this.dy = Math.sin(this.angle).toFixed(4) * speed;

        this.x2 = Math.cos(this.angle).toFixed(3) * Bullet.BULLET_LENGTH + this.x1;
        this.y2 = Math.sin(this.angle).toFixed(3) * Bullet.BULLET_LENGTH + this.y1;

        this.x = x1;
        this.y = y1;
    }

    updatePos() {
        this.x1 += this.dx * this.game.clockTick;
        this.y1 += this.dy * this.game.clockTick;

        this.x2 += this.dx * this.game.clockTick;
        this.y2 += this.dy * this.game.clockTick;
        this.x = this.x1;
        this.y = this.y1;
    }

    update() {
        this.updatePos();
    }

    drawLine(ctx, xStart, yStart, xEnd, yEnd) {
        ctx.fillStyle = "red";
        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);

        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    draw(ctx) {
        this.drawLine(ctx, this.x1 - this.game.camera.x, this.y1, this.x2 - this.game.camera.x, this.y2);
    }
}