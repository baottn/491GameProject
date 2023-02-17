class Homebase{
    constructor(game, x = 0, y = 0, radius = 100) {
        Object.assign(this, {game, x, y, radius});

        this.homeSprite = ASSET_MANAGER.getAsset("./img/homebase.png");
        
        this.animation = new Animator(this.homeSprite, 0, 0, 100, 100, 25, 0.09);   
    }

    loadAnimations() {
           
    }

    update(){
   
    }

        
    draw(ctx) {
        ctx.beginPath();
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, "custom", this.radius, this.radius);  
        ctx.closePath();
        
     }

}