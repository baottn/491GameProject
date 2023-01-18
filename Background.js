class Background {
    constructor(game) {

    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./img/background.jpg"), 0, 0, 1600, 900);
    }
}