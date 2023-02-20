/**
 * Rock, traversing on a straight line
 */
class Rock {
    static TAIL_LENGTH = 80;

    constructor(game, x, y, angle = Math.PI / 2, radius = 45, moveSpeed = 300, type = 0) {
        Object.assign(this, { game, x, y, angle, radius, type, moveSpeed });
        this.dx = moveSpeed * Math.cos(angle);
        this.dy = moveSpeed * Math.sin(angle);

        this.updateBC();

        this.rockSprites = ASSET_MANAGER.getAsset("./img/rock.png");

        this.fillStyle = "red";
        this.strokeStyle = "blue";

        //50% chance the fireball mutates to become more dangerous
        if (type !== -1) {
            if (randomInt(100) < 50 && this.radius >= 35) {
                this.type = 1;
                this.fillStyle = "black";
            }
        }
        else{
            this.type = 0;
        }

        this.sprite_width = 29;
        this.sprite_height = 25;
        this.animation = new Animator(this.rockSprites, 1, 1, this.sprite_width, this.sprite_height, 9, 0.2, 3);
        if (this.type == 1) {
            this.sprite_width = 35;
            this.sprite_height = 33;
            this.animation = new Animator(this.rockSprites, 1, 30, this.sprite_width, this.sprite_height, 12, 0.1, 3);
        }

       
    }

    updateBC() {
        this.BC = new BoundingCircle(this.x, this.y, this.radius);
    }

    updatePos() {
        this.x += this.dx * this.game.clockTick;
        this.y += this.dy * this.game.clockTick;

        this.xTail = (Rock.TAIL_LENGTH + this.radius) * Math.cos(this.angle);
        this.yTail = (Rock.TAIL_LENGTH + this.radius) * Math.sin(this.angle);
    }

    checkCollisionWithPlayer(player) {
        let collisionRes = player.BB.collideCircle(this.BC);

        if (collisionRes.length > 0) {
            //Remove itself for now
            this.removeFromWorld = true;
            if (!player.invincibility) {
                if (this.type == 1) {
                    player.health -= 3;
                }
                player.health--;
            }
        }
    }

    //On dead action
    onDeath() {
        this.removeFromWorld = true;
        this.game.camera.score += 5;//Bonus the player for destroying the fireball

        //Spawn smaller fireball if destroyed
        if (this.type == 1) {
            this.game.camera.score += 5;
            for (let i = 45; i < 360; i += 90) {
                let angle = i / 180 * Math.PI;
                let tmp = new Rock(this.game, this.x, this.y, angle, this.radius, this.moveSpeed * 3, -1);
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
        //Begin a new path
        // ctx.beginPath();
        // //console.log(this.x - this.game.camera.x, this.y, this.dx, this.dy, this.angle / (2*Math.PI) * 180);
        // // Draw the circle
        // ctx.arc(this.x - this.game.camera.x, this.y, this.radius, 0, 2 * Math.PI);


        // // Fill the circle with a color
        // ctx.fillStyle = this.fillStyle;
        // ctx.fill();

        // // Stroke the circle with a color and width
        // ctx.strokeStyle = this.strokeStyle;
        // ctx.lineWidth = 3;
        // ctx.stroke();

        // // End
        // ctx.closePath();

        //this.animations.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - this.radius, this.y - this.radius * 4, 2 * this.radius / Rock.SPRITE_WIDTH)
        if (this.type == 0) {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - this.radius * 1.2, this.y - this.radius, 2.9);
        } else {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - this.radius * 1.2, this.y - this.radius, 2.9);
        }
        //ctx.drawImage(this.offscreenCanvas, 0, 0, this.radius, this.x - this.game.camera.x - this.radius, this.y - this.radius - this.radius / 2);
    }
}