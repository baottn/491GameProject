/**
 * Ghost, follow player
 */
class Ghost {
    constructor(game, x, y, angle = Math.PI / 2, radius = 35, moveSpeed = 300,) {
        Object.assign(this, { game, x, y, angle, radius, moveSpeed });
        this.dx = moveSpeed * Math.cos(angle);
        this.dy = moveSpeed * Math.sin(angle);

        this.updateBC();

        this.ghostSprites = ASSET_MANAGER.getAsset("./img/ghost.png");
        this.deadSprite = ASSET_MANAGER.getAsset("./img/ghost_death.png");

        this.fillStyle = "grey";
        this.strokeStyle = "red";
        this.health = 2;
        this.loadAnimation();

        this.deathSound = "./audio/ghost_death.wav";
        this.hitSound = "./audio/ghost_hit.wav";
        this.isDying = false;
    }

    loadAnimation() {
        switch (this.health) {
            case 0:
                break;
            case 1:
                this.sprite_width = 28;
                this.sprite_height = 26;
                this.animation = new Animator(this.ghostSprites, 9, 39, this.sprite_width, this.sprite_height, 4, 0.2, 12);
                break;
            case 2:
                this.sprite_width = 28;
                this.sprite_height = 31;
                this.animation = new Animator(this.ghostSprites, 9, 3, this.sprite_width, this.sprite_height, 7, 0.1, 16);
                break;
        }
    }

    updateBC() {
        this.BC = new BoundingCircle(this.x, this.y, this.radius);
    }

    updatePos() {
        let dy = -this.y + this.game.mainCharacter.y;
        //this.y > params.CANVAS_SIZE / 5 && 
        if ((Math.abs(dy) > 50)) {


            this.dy = this.moveSpeed;
            if (dy < 0) {
                this.dy *= -1;
            }
        }

        this.y += this.dy * this.game.clockTick;
    }

    checkCollisionWithPlayer(player) {
        if (this.isDying > 0){
            return;
        }
        let collisionRes = player.BB.collideCircle(this.BC);

        if (collisionRes.length > 0) {
            //Remove itself for now
            this.removeFromWorld = true;

            if (!player.invincibility) {
                player.health -= 5;
                let randomHit = randomInt(player.hitSound.length);
                ASSET_MANAGER.playAsset(player.hitSound[randomHit]);
            }
            else{
                ASSET_MANAGER.playAsset(this.deathSound);
            }
        }
    }

    //On dead action
    onDeath() {
        this.health--;
        this.loadAnimation();
        //Spawn smaller rock if destroyed
        if (this.health <= 0) {
            if (this.isDying === false) {
                this.isDying = 200;
                this.animation = new Animator(this.deadSprite, 1, 8, 121, 123, 8, 0.1, 4);
                this.game.camera.score += 15;//Bonus the player for destroying the enemy
                ASSET_MANAGER.playAsset(this.deathSound);
                for (let i = 90; i < 360; i += 180) {
                    let angle = i / 180 * Math.PI;
                    let tmp = new Rock(this.game, this.x, this.y, angle, this.radius * 1.4, this.moveSpeed / 3, 1);
                    this.game.addEntity(tmp);
                }
                return;
            }
            this.isDying--;
            if (this.isDying <= 0){
                this.removeFromWorld = true;
            }
        }
        else {
            ASSET_MANAGER.playAsset(this.hitSound);
        }
    }

    update() {
        if (this.isDying > 0) {
            this.onDeath();
            return;
        }
        this.updatePos();
        this.updateBC();

        // if (!this.removeFromWorld){
        //     this.checkCollisionWithPlayer(this.game.mainCharacter);
        // }
    }

    draw(ctx) {
        // // //Begin a new path
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
        //ctx.closePath();
        if (this.isDying > 0) {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - this.radius * 1.2, this.y - this.radius * 2, 1);
            return;
        }
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - this.radius * 1.2, this.y - this.radius, 3);
    }
}