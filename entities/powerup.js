class Powerup{
    /**
     * Power up the player if touches
     * @param {*} game 
     * @param {*} x 
     * @param {*} y 
     * @param {*} radius 
     * @param {*} type 
     *          0: Invincible & Speed
     *          1: Unlimited Vertical Booster
     *          2: Faster shooting rate
     */
    constructor(game, x = 0, y = 0, radius = 35, type = 0) {
        Object.assign(this, { game, x, y, radius, type });
        this.updateBC();
        
        this.dx = 0;
        this.dy = 0;
        this.fillStyle = "yellow";
        this.strokeStyle = "black";

     
    }

    updateBC(){
        this.BC = new BoundingCircle(this.x, this.y, this.radius);
    }

    checkCollisionWithPlayer(player){
        let collisionRes = player.BB.collideCircle(this.BC);
    
        if (collisionRes.length > 0){
            this.removeFromWorld = true;
            switch (this.type) {
                //Invincible & Speed
                case 0:
                    invincibleSpeedBuff(player, this, this.game);
                    break;
                //Unlimited Booster + Score
                case 1:
                   
                    break;
                //
                case 2:
                    break;
            }
            
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

//Type 0
const invincibleSpeedBuff = (player, powerup, game) => {
    powerup.fillStyle = "grey";
    //Only replenish the duration speed buff and not stack the effect
    if (!player.invicibility){
        player.dx *= 3;
    }
    player.booster = 500;
    player.invicibility = true;
    game.camera.score += 25;
}; 