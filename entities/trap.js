class Trap{
    static SPRITE_WIDTH = 32;
    static SPRITE_HEIGHT = 32;
    static OFFSET = 13;
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

        this.trapSprites = ASSET_MANAGER.getAsset("./img/Suriken.png");
        this.deadSprite = ASSET_MANAGER.getAsset("./img/trap_death.png");
        this.loadAnimations();

        this.deathSound = ["./audio/trap_death.wav"];
        this.activateSound = ["./audio/trap_death.wav"];
        this.isDying = false;
        
    }

    loadAnimations() {
        this.animation = new Animator(this.trapSprites, 0, 0, Trap.SPRITE_WIDTH, Trap.SPRITE_HEIGHT, 8, 0.02);  
    }

    updateBC(){
        this.BC = new BoundingCircle(this.x, this.y, this.radius);
    }

    checkCollisionWithPlayer(player){
        if (this.isDying > 0){
            return;
        }
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
        if (this.isDying === false) {
            this.isDying = 100;//100 tick explosion
            this.animation = new Animator(this.deadSprite, 0, 8, 61, 52, 7, 0.1, 4);
            this.game.camera.score += 5;//Bonus the player for destroying the trap

            ASSET_MANAGER.playAsset(this.deathSound[this.type]);
            return;
        }
        this.isDying--;
        if (this.isDying === 0) {
            this.removeFromWorld = true;
        }
    }

    update(){
        if (this.isDying > 0) {
            this.onDeath();
            return;
        }
        this.updateBC();
    }


    draw(ctx) {
        /* Debug
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
        */

        if (this.isDying > 0) {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - this.radius * 2 , this.y - this.radius * 2, 2);
            return;
        }

        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - this.radius - Trap.OFFSET , this.y - this.radius - Trap.OFFSET, 3);
    }
}

//Type 0
const trappingPlayer = (player, trap, game) => {
    if (player.invincibility){
        ASSET_MANAGER.playAsset(trap.deathSound[trap.type]);
        return;
    }
    player.trapped.duration = 500;//Trap for 500 ticks
    // player.trapped.oriDX = player.dx;
    // player.trapped.oriDX = player.dy;
    player.trapped.activated = true;
    
    ASSET_MANAGER.playAsset(trap.activateSound[trap.type]);

    player.dx = 0;
    player.dy = 0;
    player.health -= 5;
};