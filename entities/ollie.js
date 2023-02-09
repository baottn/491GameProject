class Ollie {
    static RELOAD_SPEED = 55;
    static GRAVITY = 350;
    static MOVING_SPEED = 300;
    static MAX_HEALTH = 25;

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
        this.dy = 20;
        //Displacement for x axis
        //Displacement for the y axis
        this.forceY = 0;

        //Speed constraints
        this.maxVerticalVelocity = 500;
        this.thrusterPower = -15;
        this.maximumThrusterPower = -800;

        this.maximumThursterVolume = 100;
        this.thrusterVolume = this.maximumThursterVolume;

        this.booster = 0;

        //Collision Check

        this.BB = new BoundingBox(x, y, this.width, this.height);
        this.turnetWidth = this.width / 5 * 3;

        //Animate Olliee
        // Get the spriteshhett
        this.spritesheet = ASSET_MANAGER.getAsset("./img/tank_body_fire.png");
        this.turnetSpritesheet = ASSET_MANAGER.getAsset("./img/tank_turret.png");

        // tank's body animations
        this.index = 1;
        this.animations = [];
        this.loadAnimations();

        //Statuses
        this.invicibility = false;

        this.unlimitedBoost = {
            duration: 0,
            status: false,
        };

        this.fasterShootRate = {
            duration: 0,
            oriReloadSpeed: Ollie.RELOAD_SPEED,
        };

        this.trapped = {
            duration: 0,
            oriDX: this.dx,
            oriDY: this.dy,
            activated: false,
        };

        this.health = Ollie.MAX_HEALTH;

    }

    loadAnimations() {
        // jumping animation
        this.animations[0] = new Animator(this.spritesheet, 0, 0, 45, 41, 2, 0.2);

        // Idle animation
        this.animations[1] = new Animator(this.spritesheet, 0, 0, 45, 30, 2, 0.2);
    }
    shoot() {
        //See if we are ready to shoot (reload = 0)
        if (this.reload <= 0 && this.game.shooting) {
            if (this.fasterShootRate.duration <= 0) {
                Ollie.RELOAD_SPEED == this.fasterShootRate.oriReloadSpeed;//return to normal
            }
            // powerup here
            this.reload = Ollie.RELOAD_SPEED;
            let turnetHead = {
                x: this.head.x + this.turnetWidth * Math.cos(this.angle),
                y: this.head.y + this.turnetWidth * Math.sin(this.angle),
            };

            let bullet = new Bullet(this.game, turnetHead.x, turnetHead.y, this.angle);

            this.game.addEntity(bullet);
            this.game.shooting = false;
        }

        this.reload--;
        this.fasterShootRate.duration--;
        this.reload = Math.max(this.reload, 0);
        this.fasterShootRate.duration = Math.max(this.fasterShootRate.duration, 0);
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

        if (!this.trapped.activated) {
            this.x += this.dx * this.game.clockTick;
            this.y += this.dy * this.game.clockTick;
        }

        //Cannot go over bound if invicibility is on
        if (this.invicibility) {
            this.y = Math.max(this.y, 0);
            this.y = Math.min(params.CANVAS_SIZE, this.y);
        }

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
                    if (player.invicibility)
                        return;
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
            else if (entity instanceof Powerup || entity instanceof Trap) {
                //Boost speed and Invicibility
                entity.checkCollisionWithPlayer(this);
                //Unlimited boost
                //Point 
            } else if (entity instanceof Fireball) {
                entity.checkCollisionWithPlayer(this);

            }

        });
    }

    updateStatus() {
        //Check Horizontal Booster granted by power up
        if (this.booster > 0) {
            this.booster--;
        }
        else {
            this.booster = 0;
            this.dx = Ollie.MOVING_SPEED;
            this.invicibility = false;
        }

        //Update boosting
        if (this.game.spacePressed && this.thrusterVolume >= 0) {
            if (!this.unlimitedBoost.status)
                this.thrusterVolume -= 0.5;
            else {
                this.thrusterVolume += 0.8;
                this.thrusterVolume = Math.min(this.thrusterVolume, this.maximumThursterVolume);
            }

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
            this.thrusterVolume += 0.8;
            this.thrusterVolume = Math.min(this.thrusterVolume, this.maximumThursterVolume);
            this.index = 1;
        }

        if (this.unlimitedBoost.duration > 0)
            this.unlimitedBoost.duration--;
        else
            this.unlimitedBoost.duration = 0;

        if (this.trapped.duration > 0) {
            this.trapped.duration--;
        }
        else if (this.trapped.activated) {
            this.dx = this.trapped.oriDX;
            this.dy = this.trapped.oriDY;
            this.trapped.activated = false;
        }
    }

    update() {
        this.updateStatus();
        this.updatePos();
        this.updateBB();
        this.shoot();
        if (this.game.click) {

        }

        this.checkCollisionWithEntity();
    };

    drawTurnet(ctx) {
        // var offScreenCanvas = document.createElement("canvas");
        // offScreenCanvas.width = 100;
        // offScreenCanvas.height = 200;
        // var offScreenCtx = offScreenCanvas.getContext('2d');
        ctx.save();
        ctx.translate(this.head.x - this.game.camera.x, this.head.y);
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
        // if (this.game.mouse) {
        //     ctx.moveTo(this.head.x - this.game.camera.x, this.head.y);
        //     ctx.lineTo(this.game.mouse.x, this.game.mouse.y);
        // }
        // ctx.fill();
        // ctx.stroke();

        // ctx.fillStyle = "blue";
        // ctx.strokeStyle = "blue";
        // if (this.game.click) {
        //     ctx.moveTo(this.head.x - this.game.camera.x, this.head.y);
        //     ctx.lineTo(this.game.click.x, this.game.click.y);
        // }
        // ctx.fill();
        // ctx.stroke();

       
        //End testing and debugging zone

        if (this.invicibility) {//Not drawing to show invincibility
            if (parseInt(this.game.timer.gameTime * 10) % 2 == 0) {
                return;
            }
        }

        // Draw the animations
        this.animations[this.index].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - 50, 5);

        this.drawTurnet(ctx);

        ctx.closePath();
    };
}