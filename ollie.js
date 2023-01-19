class Ollie {
    static RELOAD_SPEED = 75;
    static JUMP_DURATION = 100;

    constructor(manager, game, x, y) {
        Object.assign(this, { manager, game, x, y });

        this.height = 100;
        this.width = 50;

        //Moving Direction
        this.dx = 100;
        this.dy = 9.8;

        this.head = {x : this.x + this.width / 2, y: this.y};

        this.isDying = false;
        this.reload = 0;
        this.jumping = 0;
        this.angle = Math.PI / 2; //Point upward
    }

    shoot() {
        if (this.reload <= 0 && this.game.shooting) {
            this.reload = Starship.RELOAD_SPEED;
            let bullet = new Bullet(this.game, this.head.x, this.head.y, this.angle);

            this.game.manager.addEntity(bullet);


        }

        this.reload--;
        this.reload = Math.max(this.reload, 0);
    }

    jump(){
        if (this.jumping > 0 || !this.game.spacePressed){
            this.dy = 10;
        }
        else{
            this.dy = -100;
            this.jumping = this.JUMP_DURATION;
            this.jumping--;
        }
        
    }

    update() {
        if (this.game.mouse){
            //Check vertical line
            this.angle = this.game.mouse.x == this.head.x ? 
                Math.PI / 2 :
                Math.tanh((this.game.mouse.y - this.y) / (this.game.mouse.x - this.head.x));
        }

        if (this.game.spacePressed){
            this.jump();
        }


        this.x += this.dx * this.game.clockTick;
        this.y += this.dy * this.game.clockTick;

        if (this.x + this.width >= params.CANVAS_SIZE) {
            this.x = 0;
        }
        if (this.x < 0) {
            this.x = params.CANVAS_SIZE - this.width;
        }

        if (this.y + this.height >= params.CANVAS_SIZE) {
            this.y = 0;
        }
        if (this.y < 0) {
            this.y = params.CANVAS_SIZE - this.height;
        }
    }

    draw(ctx) {
        //Template code
        ctx.beginPath();

        ctx.fillStyle = "green";
        ctx.strokeStyle = "green";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "red";
        ctx.strokeStyle = "red";

        //Temporary drawing this, begin testing zone
        if (this.game.mouse){
            ctx.moveTo(this.x + this.width / 2, this.y);
            ctx.lineTo(this.game.mouse.x, this.game.mouse.y);
        }
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "blue";
        ctx.strokeStyle = "blue";
        ctx.moveTo(this.x + this.width / 2, this.y);
        if (this.game.click) {
            ctx.lineTo(this.game.click.x, this.game.click.y);
        }
        ctx.fill();
        ctx.stroke();
        //End testing zone

        ctx.closePath();
    }
}