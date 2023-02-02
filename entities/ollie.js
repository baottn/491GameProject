class Ollie {
    static RELOAD_SPEED = 105;
    static GRAVITY = 250;
    static MOVING_SPEED = 100;
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.height = 100;
        this.width = 215;

        this.head = { x: this.x + this.width / 2, y: this.y + 10 };

        this.isDying = false;
        this.reload = 0;
        this.jumping = 0;
        this.angle = 0;
        this.state = 0; // State of Ollie, 1 for walking, 2 for jumping, etc.

        //Moving Direction
        this.dx = Ollie.MOVING_SPEED;
        this.dy = 9.8;
        //Displacement for x axis
        //Displacement for the y axis
        this.forceY = 0;

        //Speed constraints
        this.maxVerticalVelocity = 350;
        this.thrusterPower = -5;
        this.maximumThrusterPower = -800;

        this.maximumThursterVolume = 100;
        this.thrusterVolume = this.maximumThursterVolume;

        this.booster = 0;

        //Collision Check

        this.BB = new BoundingBox(x, y, this.width, this.height);
        this.turnetWidth = this.width / 4 * 3;

        //Animate Olliee
        // Get the spriteshhett
        this.spritesheet = ASSET_MANAGER.getAsset("./img/tank_body_fire.png");
        this.turnetSpritesheet = ASSET_MANAGER.getAsset("./img/tank_turret.png");

        // tank's body animations
        this.animations = [];
        this.loadAnimations();
        this.unlimitedBoost = false;

        this.index = 1;
    }

    loadAnimations() {

        // jumping animation
        this.animations[0] = new Animator(this.spritesheet, 0, 0, 45, 41, 2, 0.2);

        // Idle animation
        this.animations[1] = new Animator(this.spritesheet, 0, 0, 45, 30, 2, 0.2);
    }
    shoot() {
        if (this.reload <= 0 && this.game.shooting) {
            this.reload = Ollie.RELOAD_SPEED;

            let turnetHead = {
                x: this.head.x + this.turnetWidth * Math.cos(this.angle) - this.game.camera.x,
                y: this.head.y + this.turnetWidth * Math.sin(this.angle),
            };

            let bullet = new Bullet(this.game, turnetHead.x, turnetHead.y, this.angle);

            this.game.addEntity(bullet);
            this.game.shooting = false;
        }

        this.reload--;
        this.reload = Math.max(this.reload, 0);
    }

    vectorNormalize(x, y) {
        let mag = Math.sqrt(x ** 2 + y ** 2);
        if (mag == 0)
            return;
        return [x / mag, y / mag];

    }

    updatePos() {
        let newDy = this.dy + this.forceY * this.game.clockTick;
        if (Math.abs(newDy) > this.maxVerticalVelocity) {
            this.dy = this.maxVerticalVelocity * (newDy > 0 ? 1 : -1);
        }
        else {
            this.dy = newDy;
        }

        if (this.dy != 0) {
            this.oldDy = this.dy;
        }

        this.x += this.dx * this.game.clockTick;
        this.y += this.dy * this.game.clockTick;
        this.head = { x: this.x + this.width / 2, y: this.y + 10 };

        //Update mouse location
        if (this.game.mouse) {
            //Check vertical line and update angle
            if (this.game.mouse.x <= this.head.x - this.game.camera.x) {
                this.angle = Math.PI / 3;
                if (this.game.mouse.y < this.head.y) {
                    this.angle *= -1;
                }
            }
            else
                this.angle = Math.tanh((this.game.mouse.y - this.y) / (this.game.mouse.x - this.head.x + this.game.camera.x));
        }

    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    checkCollisionWithEntity() {
        this.game.entities.forEach(entity => {
            if (entity instanceof Track) {
                entity.checkCollisionWithPlayer(this, (player, track) => {
                    track.fillStyle = "blue";
                    let going = 1;
                    if (player.y < track.y) {
                        //Going Up
                        going = -1;

                    }
                    //Going down
                    player.dy = player.maxVerticalVelocity * going;
                });
            }
            else if (entity instanceof Powerup) {
                //Boost speed and Invicibility
                entity.checkCollisionWithPlayer(this, (player, powerup) => {
                    powerup.fillStyle = "grey";
                    player.dx += 30;
                    player.booster = 100;

                });
                //Unlimited boost
                //Point 
            }

        });
    }

    update() {
        if (this.booster > 0) {
            this.booster--;
        }
        else {
            this.booster = 0;
            this.dx = Ollie.MOVING_SPEED;
        }


        if (this.game.spacePressed && this.thrusterVolume >= 0) {//Condition for jumping
            if (!this.unlimitedBoost)
                this.thrusterVolume -= 0.5;

            if (this.forceY != Ollie.GRAVITY) {
                this.forceY += this.thrusterPower;
            }
            else {
                this.forceY = this.thrusterPower;
            }

            if (Math.abs(this.forceY) > Math.abs(this.maximumThrusterPower)) {
                this.forceY = this.maximumThrusterPower;
            }
            this.index = 0;
        }
        else {
            this.forceY = Ollie.GRAVITY;
            this.thrusterVolume += 0.5;
            this.thrusterVolume = Math.min(this.thrusterVolume, this.maximumThursterVolume);
            this.index = 1;
        }

        this.updatePos();
        this.updateBB();

        if (this.game.click) {
            this.shoot();
        }

        this.checkCollisionWithEntity();
    };

    drawTurnet(ctx) {

        // var offScreenCanvas = document.createElement("canvas");
        // offScreenCanvas.width = 100;
        // offScreenCanvas.height = 200;
        // var offScreenCtx = offScreenCanvas.getContext('2d');

        ctx.save();
        ctx.translate(this.head.x - this.game.camera.x, this.head.y);//this.x - this.game.camera.x , this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.head.x + this.game.camera.x, -this.head.y);

        ctx.drawImage(this.turnetSpritesheet, 0, 1, 20, 4, this.head.x - this.game.camera.x, this.head.y, this.turnetWidth, 10);
        ctx.restore();
    }

    draw(ctx) {

        //Template code
        ctx.beginPath();

        if (this.game.spacePressed && this.thrusterVolume >= 0) {
            ctx.fillStyle = "red";
            ctx.strokeStyle = "red";
        }
        else {
            ctx.fillStyle = "green";
            ctx.strokeStyle = "green";
        }

        // ctx.fillRect(this.x - this.game.camera.x, this.y, this.width, this.height);
        // ctx.fill();
        // ctx.stroke();

        ctx.fillStyle = "red";
        ctx.strokeStyle = "red";

        //Temporary drawing this, begin testing zone
        if (this.game.mouse) {
            ctx.moveTo(this.head.x - this.game.camera.x, this.head.y);
            ctx.lineTo(this.game.mouse.x, this.game.mouse.y);
        }
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "blue";
        ctx.strokeStyle = "blue";
        if (this.game.click) {
            ctx.moveTo(this.head.x - this.game.camera.x, this.head.y);
            ctx.lineTo(this.game.click.x, this.game.click.y);
        }
        ctx.fill();
        ctx.stroke();

        ctx.closePath();
        //End testing and debugging zone

        console.log(this, this.animations[this.index], this.index);
        // Draw the animations
        this.animations[this.index].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - 50, 5);

        this.drawTurnet(ctx);
    };
}