class Ollie {
    static RELOAD_SPEED = 75;
    static GRAVITY = 250;
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.height = 100;
        this.width = 50;

        this.head = { x: this.x + this.width / 2, y: this.y };

        this.isDying = false;
        this.reload = 0;
        this.jumping = 0;
        this.angle = Math.PI / 2; //Point upward
        this.state = 0; // State of Ollie, 1 for walking, 2 for jumping, etc.

        //Moving Direction
        this.dx = 50;
        this.dy = 9.8;
        //Displacement for x axis
        //Displacement for the y axis
        this.forceY = 0;

        //Speed constraints
        this.maxVerticalVelocity = 350;
        this.thrusterPower = -5;
        this.maximumThrusterPower = -30;

        this.maximumThursterVolume = 100;
        this.thrusterVolume = this.maximumThursterVolume;

        //Old Speed
        this.oldDX = this.dx;
        this.oldDY = this.dy;

        //Collision Check
        this.collidingVertically = false;
        this.collidingHorizontally = false;

        //this.BB = new BoundingBox(x, y, this.width, this.height);

        //Animate Olliee
        // Get the spriteshhett
        this.spritesheet = ASSET_MANAGER.getAsset("../img/tank_body_spritesheet.png");

        // tank's body animations
        this.animations = [];
        this.loadAnimations();
    }

    loadAnimations() {

        // Walking right animation
        this.animations[0] = new Animator(this.spritesheet, 0, 0, 97, 12, 2, 0.2);

        // Walking left animation
        this.animations[1] = new Animator(this.spritesheet, 50, 0, 97, 12, 2, 0.2, 0, true, true);

        // Idle animation
        this.animations[2] = new Animator(this.spritesheet, 0, 0, 49, 12, 1, 100000);
    }
    shoot() {
        if (this.reload <= 0 && this.game.shooting) {
            this.reload = Ollie.RELOAD_SPEED;
            let bullet = new Bullet(this.game, this.head.x, this.head.y, this.angle);

            this.game.addEntity(bullet);
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

        if (this.collidingHorizontally) {

            this.dy = 0;
        }
        else {
            //this.dy = this.oldDY;
        }

        if (this.collidingVertically) {
            if (this.dx != 0) {
                this.oldDX = this.dx;
            }
            this.dx = 0;
        }
        else {
            this.dx = this.oldDX;
        }




        this.x += this.dx * this.game.clockTick;
        this.y += this.dy * this.game.clockTick;
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    updateAnimations() {
        // Update based on player movement.
        if (this.game.keys["d"] || this.game.keys["D"]) {
            this.x += this.speed * this.game.clockTick;
            this.index = 0;
        } else if (this.game.keys["a"] || this.game.keys["A"]) {
            this.x -= this.speed * this.game.clockTick;
            this.index = 1;
        } else {
            // If the player is not pressing a key
            this.index = 2
        }
    }

    checkCollisionWithTrack(entity) {
        let topLine = entity.BB.collideLine(this.BB.lines[0]);//Check whether the top part is touching
        let botLine = entity.BB.collideLine(this.BB.lines[2]);
        let left = entity.BB.collideLine(this.BB.lines[3]);
        let right = entity.BB.collideLine(this.BB.lines[1]);

        //console.log(topLine, botLine);
        // if (right.length > 0 && (right.includes(1))){
        //     console.log("Hit the vertical: ", left);
        //     this.collidingVertically = true;
        // }
        // else{
        //     this.collidingVertically = false;
        // }

        // if (topLine.length > 0 && (topLine.includes(1))){
        //     console.log("Hit the vertical: ", topLine);
        //     this.collidingHorizontally = true;
        // }
        // else{
        //     this.collidingHorizontally = false;
        // }


        if (entity.BB.collideBox(this.BB)) {
            //console.log("Hit a box");
            //entity.removeFromWorld = true;
            entity.fillStyle = "blue";

            //Collide horizontally

            // if (this.BB.y + this.BB.height >= entity.BB.y && this.BB.y <= entity.BB.y + entity.BB.height) {
            //     this.collidingHorizontally = true;
            // }
            // else {
            //     this.collidingHorizontally = false;
            // }

            // //Collide vertically
            // if (!this.collidingHorizontally && this.BB.x + this.BB.width >= entity.BB.x && this.BB.x + this.BB.width <= entity.BB.x + entity.BB.width) {
            //     this.collidingVertically = true;
            // }
            // else {
            //     this.collidingVertically = false;
            // }


        }
        else {
            entity.fillStyle = "black";
            this.collidingVertically = false;
            this.collidingHorizontally = false;
        }
    }

    checkCollisionWithPowerup(entity){
        let collisionRes = this.BB.collideCircle(entity.BC);
    
        if (collisionRes.length > 0){
            entity.fillStyle = "grey";
        }
        else{
            entity.fillStyle = "yellow";
        }
    }

    checkCollisionWithEntity() {
        this.game.entities.forEach(entity => {
            if (entity instanceof Track) {
                this.checkCollisionWithTrack(entity);
            }
            else if (entity instanceof Powerup) {
                this.checkCollisionWithPowerup(entity);
            }

        });
    }

    update() {
        //Update mouse location
        if (this.game.mouse) {
            //Check vertical line and update angle
            this.angle = this.game.mouse.x == this.head.x ?
                Math.PI / 2 :
                Math.tanh((this.game.mouse.y - this.y) / (this.game.mouse.x - this.head.x));
        }

        if (this.game.spacePressed && this.thrusterVolume >= 0) {//Condition for jumping
            this.thrusterVolume -= 0.5;

            if (this.forceY != Ollie.GRAVITY) {
                this.forceY += this.thrusterPower;
            }
            else {
                this.forceY = this.thrusterPower;
            }

            if (this.forceY > this.maximumThrusterPower) {
                this.forceY = this.maximumThrusterPower;
            }
        }
        else {
            this.forceY = Ollie.GRAVITY;
            this.thrusterVolume += 0.5;
            this.thrusterVolume = Math.min(this.thrusterVolume, this.maximumThursterVolume);

        }

        this.updateAnimations();
        this.updatePos();
        this.updateBB();

        this.checkCollisionWithEntity();
    };

    draw(ctx) {
        /*
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

        ctx.fillRect(this.x - this.game.camera.x, this.y, this.width, this.height);
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

        ctx.closePath();
        */

        // Draw the animations
        this.animations[this.index].drawFrame(this.game.clockTick, ctx, this.x, this.y, 5);
    };
}