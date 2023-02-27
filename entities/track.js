class Track{
    static SPRITE_WIDTH = 163;
    static SPRITE_HEIGHT = 222;
    constructor(game, x = 0, y = 0, width = 0, height = 0) {
        Object.assign(this, {game, x, y, width, height});
        
        //Adjus the height
        if (this.height < 0) this.height *= -1;
        if (this.width < 0) this.width *= -1;
        
        this.dx = 0;
        this.dy = 0;

        this.fillStyle = "black";
        this.strokeStyle = "green";

        this.trackSprites = ASSET_MANAGER.getAsset("./img/tracks.png");
        this.deadSprite = ASSET_MANAGER.getAsset("./img/track_death.png");
        
        this.health = 2;

        this.updateBB();
        this.loadAnimations(); 

        this.deathSound = "./audio/track_death.wav";
        this.bumpSound = "./audio/track_bump.wav";
        this.hitSound = "./audio/track_hit.wav";
        this.isDying = false;
    }

    loadAnimations() {
        this.animation = new Animator(this.trackSprites, 0, 0, Track.SPRITE_WIDTH, Track.SPRITE_HEIGHT, 3, 0.2);      
    }

    updateBB(){
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    onDeath(){
        this.health--;
        if (this.health == 1){
            this.animation = new Animator(this.trackSprites, 1, 222, Track.SPRITE_WIDTH, Track.SPRITE_HEIGHT, 2, 0.8);   
            this.dy = 50;   
        }
        if (this.health <= 0){
            if (this.isDying === false) {
                this.isDying = 300;
                this.animation = new Animator(this.deadSprite, 0, 0, 120, 80, 5, 0.1, 5);
                this.game.camera.score += 5;//Bonus the player for destroying the enemy
                ASSET_MANAGER.playAsset(this.deathSound);
                return;
            }
            this.isDying--;
            if (this.isDying <= 0){
                this.removeFromWorld = true;
            }
        }
        else{
            ASSET_MANAGER.playAsset(this.hitSound);
        }
    }

    update(){
        if (this.isDying > 0) {
            this.onDeath();
            return;
        }
        this.x += this.dx * this.game.clockTick ;
        this.y += this.dy * this.game.clockTick; 

        this.updateBB();
    }

    checkCollisionWithPlayer(player, behavior) {
        if (this.isDying > 0){
            return;
        }
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
        //For debug purposes
        // ctx.beginPath();
        // ctx.fillStyle =  this.fillStyle;
        // ctx.strokeStyle = this.strokeStyle;
        // ctx.fillRect(this.x - this.game.camera.x, this.y, this.width, this.height);
        // ctx.fill();
        // ctx.stroke();
        // ctx.closePath();
        if (this.isDying > 0) {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, "custom", this.width, this.height);  
            return;
        }
        
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, "custom", this.width, this.height);  
        //Draw bounding box for debugging
        //this.BB.draw(ctx, this.game);
        
        //Temporary Drawing health for tracks
        // ctx.fillStyle = `hsl(360, 100%, 50%)`;
        // ctx.strokeStyle = `hsl(360, 100%, 50%)`;
        // ctx.font = (this.width / 10) + "px serif";
        // ctx.fillText("Health: " + this.health.toFixed(1), this.x - this.game.camera.x, this.y + this.height / 4);

        ctx.closePath();
        
     }

}