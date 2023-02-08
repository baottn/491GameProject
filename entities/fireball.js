/**
 * Fireball is basically a straight line
 */
class Fireball {
    static MOVE_SPEED = 300;
    static TAIL_LENGTH = 80;

    constructor(game, x, y, angle = Math.PI / 2, radius = 5) {
        Object.assign(this, { game, x, y, angle, radius });
        this.dx = Fireball.MOVE_SPEED * Math.cos(angle);
        this.dy = Fireball.MOVE_SPEED * Math.sin(angle);

        this.updateBC();

        this.fillStyle = "red";
        this.strokeStyle = "blue";

        // this.offscreenCanvas =  document.createElement("canvas");
        // offScreenCanvas.width = 100;
        // offScreenCanvas.height = 200;
        // var offScreenCtx = offScreenCanvas.getContext('2d');
    }

    updateBC(){
        this.BC = new BoundingCircle(this.x, this.y, this.radius);
    }

    updatePos() {
        this.x += this.dx * this.game.clockTick;
        this.y += this.dy * this.game.clockTick;

        this.xTail = (Fireball.TAIL_LENGTH + this.radius) * Math.cos(this.angle);
        this.yTail = (Fireball.TAIL_LENGTH + this.radius) * Math.sin(this.angle);
    }

    checkCollisionWithPlayer(player){
        let collisionRes = player.BB.collideCircle(this.BC);
    
        if (collisionRes.length > 0){
            //Remove itself for now
            this.removeFromWorld = true;
            if (!player.invicibility)
                player.health--;
        }


    }

    update() {
        this.updatePos();
        this.updateBC();
        // if (!this.removeFromWorld){
        //     this.checkCollisionWithPlayer(this.game.mainCharacter);
        // }
    }

    draw(ctx) {
        // Begin a new path
        ctx.beginPath();
        //console.log(this.x - this.game.camera.x, this.y, this.dx, this.dy, this.angle / (2*Math.PI) * 180);
        // Draw the circle
        ctx.arc(this.x - this.game.camera.x, this.y, this.radius, 0, 2 * Math.PI);

        // Fill the circle with a color
        ctx.fillStyle = this.fillStyle;
        ctx.fill();

        // Stroke the circle with a color and width
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = 3;
        ctx.stroke();

        // End
        ctx.closePath();
    }
}