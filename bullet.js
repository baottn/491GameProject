/**
 * Bullet is basically a straight line
 */
class Bullet {
    static BULLET_SPEED = 500;
    static BULLET_LENGTH = 30;

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

        // if (this.x + this.radius >= params.CANVAS_SIZE) {
        //     this.x = 0;
        // }
        // if (this.x < 0) {
        //     this.x = params.CANVAS_SIZE - this.radius;
        // }

        // if (this.y + this.radius >= params.CANVAS_SIZE) {
        //     this.y = 0;
        // }
        // if (this.y < 0) {
        //     this.y = params.CANVAS_SIZE - this.radius;
        // }

        
    }

    checkCollisionWithAsteroids(){
        let tmp = new Line(this.game);
        tmp.addEndPoints(this.x1, this.y1, this.x2, this.y2);

        this.game.gameManager.entities.forEach(asteroid => {
            if (asteroid instanceof Asteroid){
                
                if (!asteroid.isDying && asteroid.checkCollisionWithLineSegment(tmp)){
                    asteroid.dying();
                    this.game.gameManager.totalAsteroids--;
                    this.removeFromWorld = true;
                }
            }
        });
    }

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