class SceneManager {
    constructor(game) {
        this.game = game;
        this.score = 0;

        this.totalAsteroids = 0;

        this.difficulty = 1;
        this.difficultyThreshold = 15;
        this.gameOver = false;
        this.x = 0;
        this.playerLives = 3; 
        // this.powerupsAnimation = new Animeation(ASSET_MANAGER.getAsset("./img/powerups.png"), 0, 160, 8, 8, 4, 0.2, 0, false, true);
    };

    drawGameOver(ctx) {
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.font = "58px serif";
        ctx.strokeText("Game Over!", params.CANVAS_SIZE / 2 - 450, params.CANVAS_SIZE / 2);
    }

    update() {
        let limitPoint = params.CANVAS_SIZE / 4;

        if (this.x < this.game.mainCharacter.x - limitPoint) {
            this.x = this.game.mainCharacter.x - limitPoint;
        }
    };
};