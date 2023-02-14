class Trap{
    static SPRITE_WIDTH = 125;
    static SPRITE_HEIGHT = 102;
    static OFFSET = 6.5;
    /**
     * Power up the player if touches
     * @param {*} game 
     * @param {*} x 
     * @param {*} y 
     * @param {*} radius 
     * @param {*} type 
     *          0: trapPlayer
     */
    constructor(game, x = 0, y = 0, radius = 35, type = 0) {
        Object.assign(this, { game, x, y, radius, type });
        this.updateBC();
        
        this.dx = 0;
        this.dy = 0;
        this.fillStyle = "white";
        this.strokeStyle = "red";
    }


    updateBC(){
        this.BC = new BoundingCircle(this.x, this.y, this.radius);
    }

    checkCollisionWithPlayer(player){
        let collisionRes = player.BB.collideCircle(this.BC);
    
        if (collisionRes.length > 0){
            this.removeFromWorld = true;
            switch (this.type) {
                //Trap player
                case 0:
                    trappingPlayer(player, this, this.game);
                    break;
                //Not yet decided
                case 1:
                   
                    break;
                //
                case 2:
                    break;
            }
            
        }
        else{
            this.fillStyle = "white";
        }
    }

    onDeath(){
        this.removeFromWorld = true;
        this.game.camera.score += 5;//Bonus the player for destroying trap  
    }

    update(){
        this.updateBC();
    }


    draw(ctx) {
        //Draw circle (for debug)
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
const trappingPlayer = (player, powerup, game) => {
    if (player.invicibility){
        return;
    }
    player.trapped.duration = 500;//Trap for 500 ticks
    // player.trapped.oriDX = player.dx;
    // player.trapped.oriDX = player.dy;
    player.trapped.activated = true;

    player.dx = 0;
    player.dy = 0;

    player.health -= 5;
}; 