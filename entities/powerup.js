class Powerup{
    static POWERUP_HEIGHT = 10;
    static POWERUP_RADIUS = 35;
    constructor(game, x = 0, y = 0, radius = 35) {
        Object.assign(this, { game, x, y, radius });
        this.updateBC();
        
        this.dx = 0;
        this.dy = 0;
        this.fillStyle = "yellow";
        this.strokeStyle = "black";

        this.type = 0; 
    }

    updateBC(){
        this.BC = new BoundingCircle(this.x, this.y, this.radius);
    }

    checkCollisionWithPlayer(player, behavior){
        let collisionRes = player.BB.collideCircle(this.BC);
    
        if (collisionRes.length > 0){
            behavior(player, this);
        }
        else{
            this.fillStyle = "yellow";
        }
    }

    update(){
        this.x += this.dx * this.game.clockTick;
        this.y += this.dy * this.game.clockTick; 
        
        this.updateBC();
    }

    draw(ctx) {
        // Begin a new path
        ctx.beginPath();

        // Draw the circle
        ctx.arc(this.x - this.game.camera.x, this.y, this.radius, 0, 2 * Math.PI);

        // Fill the circle with a color
        ctx.fillStyle = this.fillStyle;
        ctx.fill();

        // Stroke the circle with a color and width
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = 3;
        ctx.stroke();

        // End
        ctx.closePath();
    }
}