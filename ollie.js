class Ollie {
    static RELOAD_SPEED = 75;
    static GRAVITY = 350;
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.height = 100;
        this.width = 50;

        //Moving Direction
        this.dx = 100;
        this.dy = 9.8;

        this.head = { x: this.x + this.width / 2, y: this.y };

        this.isDying = false;
        this.reload = 0;
        this.jumping = 0;
        this.angle = Math.PI / 2; //Point upward
        this.state = 0; // State of Ollie, 1 for walking, 2 for jumping, etc.

        //Displacement for x axis
        this.dx = 0;
        //Displacement for the y axis
        this.dy = 0;
        this.forceY = 0;

        //Speed constraints
        this.fallingVelocity = 250;
        this.thrusterPower = -1;
        this.maximumThrusterPower = -20;

        this.maximumThursterVolume = 100;
        this.thrusterVolume = this.maximumThursterVolume;
        
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

        // if (Math.abs(newDy) > this.fallingVelocity) {
        //     [newDx, newDy] = this.vectorNormalize(newDx, newDy);
        //     this.dx = newDx * this.maximumSpeed;
        //     this.dy =;
        // }
        // else {
        //     this.dx = newDx;
        //     this.dy = newDy;
        // }
        this.dy = newDy;

        this.x += this.dx * this.game.clockTick;
        this.y += this.dy * this.game.clockTick;
    }

    update() {
        const TICK = this.game.clockTick;
        // I used this page to approximate my constants
        // https://web.archive.org/web/20130807122227/http://i276.photobucket.com/albums/kk21/jdaster64/smb_playerphysics.png
        // I converted these values from hex and into units of pixels and seconds.



        //Update mouse location
        if (this.game.mouse) {
            //Check vertical line and update angle
            this.angle = this.game.mouse.x == this.head.x ?
                Math.PI / 2 :
                Math.tanh((this.game.mouse.y - this.y) / (this.game.mouse.x - this.head.x));
        }

        console.log(this.thrusterVolume);
        if (this.game.spacePressed && this.thrusterVolume >= 0) {
            console.log("Jumping" + this.forceY);
            this.thrusterVolume -= 0.1;

            if (this.forceY != Ollie.GRAVITY){
                this.forceY += this.thrusterPower;
            }
            else{
                this.forceY = this.thrusterPower;
            }

            if (this.forceY > this.maximumThrusterPower) {
                this.forceY = this.maximumThrusterPower;
            }
        } 
        else {
            this.forceY = Ollie.GRAVITY;
            this.thrusterVolume += 0.01;
            this.thrusterVolume = Math.min(this.thrusterVolume, this.maximumThursterVolume);

        }

        
        this.updatePos();
    };

    draw(ctx) {
        //Template code
        ctx.beginPath();

        ctx.fillStyle = "green";
        ctx.strokeStyle = "green";
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
    };
}