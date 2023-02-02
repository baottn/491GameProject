class SceneManager {
    constructor(game) {
        this.game = game;
        this.highScore = 0;
        this.newGame();
        // this.powerupsAnimation = new Animeation(ASSET_MANAGER.getAsset("./img/powerups.png"), 0, 160, 8, 8, 4, 0.2, 0, false, true);
    };
    
    newGame(){
        this.score = 0;
        this.difficulty = 1;
        this.difficultyThreshold = 15;
        this.gameOver = false;
        this.x = 0;

        this.game.mainCharacter = new Ollie(this.game, params.CANVAS_SIZE / 9, params.CANVAS_SIZE / 2);
        this.game.addEntity(this.game.mainCharacter);

        let testBox = new Track(this.game, params.CANVAS_SIZE / 2 + 400, params.CANVAS_SIZE / 2 + 50, 300, 50);
        this.game.addEntity(testBox);

        let testPowerUp = new Powerup(this.game, params.CANVAS_SIZE / 2, 300, 50);
        this.game.addEntity(testPowerUp);

    }


    drawGameOver(ctx) {
        this.highScore = Math.max(this.score, this.highScore);
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        let fontSize = 58;
        ctx.font = fontSize + "px serif";
        let displayGameOverText = "You died!";
        ctx.strokeText(displayGameOverText, params.CANVAS_SIZE / 2 - (displayGameOverText.length * fontSize) / 4, params.CANVAS_SIZE / 2 - 100);
        
        let displayScore = "Score: " + this.score.toFixed(1);
        displayScore += " Highscore: " + this.highScore.toFixed(1);
        ctx.strokeText(displayScore, params.CANVAS_SIZE / 2 - (displayScore.length * fontSize) / 4, params.CANVAS_SIZE / 2 + fontSize - 100);

        displayGameOverText = "Press S to start again!";
        ctx.strokeText(displayGameOverText, params.CANVAS_SIZE / 2 - (displayGameOverText.length * fontSize) / 5, params.CANVAS_SIZE / 2 - 100 + fontSize * 2);
    }

    spawnTrack(){
        
    }

    update() {
        let limitPoint = params.CANVAS_SIZE / 9;

        if (this.x < this.game.mainCharacter.x - limitPoint) {
            this.x = this.game.mainCharacter.x - limitPoint;
        }

        //Going over bounds
        if (this.game.mainCharacter.y + this.game.mainCharacter.height < 0 || this.game.mainCharacter.y - this.game.mainCharacter.height > params.CANVAS_SIZE){
           
            this.gameOver = true;
        }
    };

    draw(ctx){
        //Displaying the score
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.font = "28px serif";
        ctx.fillText("Score: " + this.score.toFixed(1), 10, 35);

        //Draw the thruster bar
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.strokeStyle = "green";
        let thrusterBar = {width: params.CANVAS_SIZE / 50, height: params.CANVAS_SIZE / 3};
        let thrusterCurrentVolume = this.game.mainCharacter.thrusterVolume / this.game.mainCharacter.maximumThursterVolume;
        
        ctx.strokeRect( 50, params.CANVAS_SIZE / 2 - 200, thrusterBar.width, thrusterBar.height);
        ctx.fillRect( 50, params.CANVAS_SIZE / 2 - 200  + thrusterBar.height, thrusterBar.width, - thrusterBar.height * thrusterCurrentVolume);
        //this.game.mainCharacter
        
        ctx.stroke();
        ctx.fill();

        ctx.closePath();


    }
};