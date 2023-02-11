class Powerup{
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
     *          0: Invincible & Speed
     *          1: Unlimited Vertical Booster + Health
     *          2: Faster shooting rate 
     */
    constructor(game, x = 0, y = 0, radius = 35, type = 0) {
        Object.assign(this, { game, x, y, radius, type });
        this.updateBC();
        
        this.dx = 0;
        this.dy = 0;
        this.fillStyle = "yellow";
        this.strokeStyle = "black";

        this.powerupSprites = ASSET_MANAGER.getAsset("./img/power_ups.png");

        this.animations = [];
        this.loadAnimations();  
    }

    loadAnimations() {
        this.animations[1] = new Animator(this.powerupSprites, 0, 0, Powerup.SPRITE_WIDTH, Powerup.SPRITE_HEIGHT, 4, 0.2);  
        this.animations[0] = new Animator(this.powerupSprites, 0, 126, Powerup.SPRITE_WIDTH, Powerup.SPRITE_HEIGHT, 4, 0.2);   
        this.animations[2] = new Animator(this.powerupSprites, 0, 252, Powerup.SPRITE_WIDTH, Powerup.SPRITE_HEIGHT, 4, 2); 
    }

    onDeath(){
        this.removeFromWorld = true;
    }

    updateBC(){
        this.BC = new BoundingCircle(this.x, this.y, this.radius);
    }

    checkCollisionWithPlayer(player){
        let collisionRes = player.BB.collideCircle(this.BC);
    
        if (collisionRes.length > 0){
            this.onDeath();
            switch (this.type) {
                //Invincible & Speed
                case 0:
                    invincibleSpeedBuff(player, this, this.game);
                    break;
                //Unlimited Booster + Health
                case 1:
                    unlimitedBooster_Health(player, this, this.game);
                    break;
                //
                case 2:
                    fastShootingRate(player, this, this.game);
                    break;
            }
            
        }
        else{
            this.fillStyle = "yellow";
        }
    }

    update(){       
        this.updateBC();
    }

    draw(ctx) {
        // //Draw circle (for debug)
        // // Begin a new path
        // ctx.beginPath();

        // // Draw the circle
        // ctx.arc(this.x - this.game.camera.x, this.y, this.radius, 0, 2 * Math.PI);

        // // Fill the circle with a color
        // ctx.fillStyle = this.fillStyle;
        // ctx.fill();

        // // Stroke the circle with a color and width
        // ctx.strokeStyle = this.strokeStyle;
        // ctx.lineWidth = 3;
        // ctx.stroke();

        // // End
        // ctx.closePath();

        //Draw animation
        switch (this.type) {
            case 0:
                this.animations[0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - this.radius - Powerup.OFFSET , this.y - this.radius  , 0.65 );
                break;
            case 1:
                this.animations[1].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - this.radius - Powerup.OFFSET , this.y - this.radius  , 0.65 );
                break;
            case 2:
                this.animations[2].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - this.radius - Powerup.OFFSET , this.y - this.radius  , 0.65 );
                break;
        }
    }
}

//Type 0
const invincibleSpeedBuff = (player, powerup, game) => {
    //Only replenish the duration speed buff and not stack the effect
    if (!player.invicibility){
        player.dx *= 3;
    }
    player.booster = 500;
    player.invicibility = true;
    game.camera.score += 25;
}; 

//Type 2
const unlimitedBooster_Health  = (player, powerup, game) => {
    //Only replenish the duration of buff and not stack the effect
   player.unlimitedBoost.status = true;
   player.unlimitedBoost.duration = 400;
   //Restore a quarter of health
   
   player.health += (Ollie.MAX_HEALTH / 4);
   player.health = Math.min(Ollie.MAX_HEALTH, player.health);
   player.health = Math.max(0, player.health);
}

//Type 2
const fastShootingRate  = (player, powerup, game) => {
    //Only replenish the duration of buff and not stack the effect
   player.fasterShootRate.duration = 300;
   Ollie.RELOAD_SPEED /= 5;
}