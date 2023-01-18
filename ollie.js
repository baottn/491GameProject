class Ollie {
    constructor(manager, game, x, y) {
        Object.assign(this, { manager, game, x, y });

        this.height = 100;
        this.width = 50;

        //Moving Direction
        this.dx = 100;
        this.dy = 9.8;

        this.isDying = false;
    }

    update() {

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
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.fill();
        ctx.stroke();

        //console.log(this.game.mouse) ;
        //Temporary drawing this, begin testing zone
        if (this.game.mouse) {
            ctx.lineTo(this.game.mouse.x, this.game.mouse.y);
        }

        ctx.closePath();
        ctx.beginPath();

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