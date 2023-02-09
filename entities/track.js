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
        
        this.health = 2;

        this.updateBB();
        this.loadAnimations(); 
    }

    loadAnimations() {
        this.animation = new Animator(this.trackSprites, 0, 0, Track.SPRITE_WIDTH, Track.SPRITE_HEIGHT, 3, 0.2);      
    }

    updateBB(){
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    onDeath(){
        this.removeFromWorld = true;
        console.log("Hit a track");
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
        //For debug purposes
        // ctx.beginPath();
        // ctx.fillStyle =  this.fillStyle;
        // ctx.strokeStyle = this.strokeStyle;
        // ctx.fillRect(this.x - this.game.camera.x, this.y, this.width, this.height);
        // ctx.fill();
        // ctx.stroke();
        // ctx.closePath();
        
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, "custom", this.width, this.height);  
        //this.BB.draw(ctx, this.game);
     }

}