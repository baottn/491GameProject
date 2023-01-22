class Ollie {
    static RELOAD_SPEED = 75;
    static JUMP_DURATION = 100;

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./img/tank.png");

        // this.height = 100;
        // this.width = 50;

        //Moving Direction
        this.dx = 100;
        this.dy = 9.8;

        // this.head = { x: this.x + this.width / 2, y: this.y };

        this.isDying = false;
        this.reload = 0;
        this.jumping = 0;
        this.angle = Math.PI / 2; //Point upward

        //this.updateBB();

        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 3; i++) {
            this.animations.push([]); // three states - idle, run, & jump
        }

        // idle animation for state = 0
        this.animations[0] = new Animator(this.spritesheet, params.CANVAS_SIZE / 2, params.CANVAS_SIZE / 2, 250, 100, 2, 0.33, 35, false, true);

        // run animation for state = 1
        this.animations[1] = new Animator(this.spritesheet, params.CANVAS_SIZE / 2, params.CANVAS_SIZE / 2, 250, 100, 4, 0.33, 35, false, true);

        // jump animation for state = 2
        // this.animations[2] = new Animator(this.spritesheet, 359, 52, 16, 32, 1, 0.33, 14, true, true);
    };

    shoot() {
        if (this.reload <= 0 && this.game.shooting) {
            this.reload = Ollie.RELOAD_SPEED;
            let bullet = new Bullet(this.game, this.head.x, this.head.y, this.angle);

            this.game.addEntity(bullet);

        }

        this.reload--;
        this.reload = Math.max(this.reload, 0);
    };

    jump() {
        if (this.jumping > 0 || !this.game.spacePressed) {
            this.dy = 10;
        }
        else {
            this.dy = -100;
            this.jumping = this.JUMP_DURATION;
            this.jumping--;
        }

    };

    update() {
        if (this.game.mouse) {
            //Check vertical line
            this.angle = this.game.mouse.x == this.head.x ?
                Math.PI / 2 :
                Math.tanh((this.game.mouse.y - this.y) / (this.game.mouse.x - this.head.x));
        }

        if (this.game.spacePressed) {
            this.jump();
        }


        this.x += this.dx * this.game.clockTick;
        this.y += this.dy * this.game.clockTick;

        // if (this.x + this.width >= params.CANVAS_SIZE) {
        //     this.x = 0;
        // }
        // if (this.x < 0) {
        //     this.x = params.CANVAS_SIZE - this.width;
        // }

        // if (this.y + this.height >= params.CANVAS_SIZE) {
        //     this.y = 0;
        // }
        // if (this.y < 0) {
        //     this.y = params.CANVAS_SIZE - this.height;
        // }
    };

    draw(ctx) {
        //Template code
        ctx.beginPath();

        ctx.fillStyle = "green";
        ctx.strokeStyle = "green";
        ctx.strokeRect(this.x - this.game.camera.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "red";
        ctx.strokeStyle = "red";

        //Temporary drawing this, begin testing zone
        if (this.game.mouse) {
            ctx.moveTo(this.x + this.width / 2 - this.game.camera.x, this.y);
            ctx.lineTo(this.game.mouse.x, this.game.mouse.y);
        }
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "blue";
        ctx.strokeStyle = "blue";
        if (this.game.click) {
            ctx.moveTo(this.x + this.width / 2 - this.game.camera.x, this.y);
            ctx.lineTo(this.game.click.x, this.game.click.y);
        }
        ctx.fill();
        ctx.stroke();
        //End testing zone

        /*

        } else if (this.size == 2 && this.game.B && this.throwFireballTimeElapsed < 0.1) { // throwing fireballs
            if (this.facing == 0) {
                ctx.drawImage(this.spritesheet, 287, 122, 16, 32, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
            } else {
                ctx.drawImage(this.spritesheet, 102, 122, 16, 32, this.x - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH);
            }
        } else if (this.disappear) {
            
        } else {
            this.animations[this.state][this.size][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }

        */

        ctx.closePath();
    };
}