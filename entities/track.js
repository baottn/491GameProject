class Track{
    constructor(game, x = 0, y = 0, width = 0, height = 0) {
        Object.assign(this, {game, x, y, width, height});
        
        //Adjus the height
        if (this.height < 0) this.height *= -1;
        if (this.width < 0) this.width *= -1;
        
        this.dx = 0;
        this.dy = 0;

        this.fillStyle = "black";
        this.strokeStyle = "green";

        this.updateBB();
    }
    updateBB(){
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }
    update(){
        this.x += this.dx * this.game.clockTick ;
        this.y += this.dy * this.game.clockTick; 

        this.updateBB();
    }

    checkCollisionWithPlayer(player, behavior) {
        if (player.BB.collideBox(this.BB)) {
            behavior(player, this);
        }
        else {
            this.fillStyle = "black";
            player.collidingVertically = false;
            player.collidingHorizontally = false;
        }
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle =  this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillRect(this.x - this.game.camera.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        //this.BB.draw(ctx);
     }

}