/**
 * Fireball is basically a straight line
 */
class Fireball {
    static TAIL_LENGTH = 80;

    constructor(game, x, y, angle = Math.PI / 2, radius = 5, moveSpeed = 300, type = 0 ) {
        Object.assign(this, { game, x, y, angle, radius, type, moveSpeed});
        this.dx = moveSpeed * Math.cos(angle);
        this.dy = moveSpeed * Math.sin(angle);

        this.updateBC();

        this.fillStyle = "red";
        this.strokeStyle = "blue";

        //30% chance the fireball mutates to become more dangerous
        if (randomInt(100) < 30 && this.radius >= 35){
            this.type = 1;
            this.fillStyle = "black";
        }

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
            if (!player.invicibility){
                if (this.type == 1){
                    player.health -= 3;
                }
                player.health --;
            }
        }
    }

    //On dead action
    onDeath(){
        this.removeFromWorld = true;
        this.game.camera.score += 5;//Bonus the player for destroying the fireball
   
        //Spawn smaller fireball if destroyed
        if (this.type == 1){
            this.game.camera.score += 5;
            for (let i = 0; i < 360; i += 45){
                let angle = i / 180 * Math.PI;
                let tmp = new Fireball(this.game, this.x, this.y, angle, this.radius / 2, this.moveSpeed / 10, 0);
                this.game.addEntity(tmp);
            }
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