class Powerup{
    constructor(game) {
        this.game = game;

        this.x = Track.getXStart() + 10;
        this.y = Track.getYStart() + 10;
    }

    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./Powerup.png"),0,0);
     }
}