class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.score = 0;
        this.powerups = 0;
        this.lives = 3;

        // this.powerupsAnimation = new Animeation(ASSET_MANAGER.getAsset("./img/powerups.png"), 0, 160, 8, 8, 4, 0.2, 0, false, true);
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        let midpoint = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2;

        if (this.x < this.Ollie.x - midpoint) this.x = this.Ollie.x - midpoint;
        // this.x = this.Ollie.x - midpoint;

        // if (this.Ollie.dead < this.Ollie.y > PARAMS.BLOCKWIDTH * 16) {
        //     this.clearEntities();
        //     this.loadLevelOne();
        // };
    };
};