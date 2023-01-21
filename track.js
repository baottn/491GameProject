class Track{
    constructor(game) {
        this.game = game;

        this.xStart = 0;
        this.yStart = 0;
        this.xEnd = 0;
        this.yEnd = 0;
        this.width = 0;
        this.height = 0
    }
    
    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./Track.png"),0,0);
     }

}