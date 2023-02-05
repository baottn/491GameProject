class SceneManager {
    constructor(game) {
        this.game = game;
        this.highScore = 0;
        this.infMode = null;

        this.newGame_InfMode();
        // this.powerupsAnimation = new Animeation(ASSET_MANAGER.getAsset("./img/powerups.png"), 0, 160, 8, 8, 4, 0.2, 0, false, true);
    };
    //Used in infinite mode, spawning track randomly
    infMode_SpawnTrack(){
        //Return if track spawning is still on cool down
        if (this.infMode.trackSpawnCooldown > 0){
            this.infMode.trackSpawnCooldown = Math.max( this.infMode.trackSpawnCooldown - 1, 0);
            return;
        }
    
        this.infMode.trackSpawnCooldown = 300 + randomInt(100);//Won't spawn again in at least 300 ticks
        
        //Spawn two set of track, one upper, one lower
        let randomX = this.x + randomInt(params.CANVAS_SIZE) + params.CANVAS_SIZE;// Spawn in the middle or more
        let randomY = randomInt(params.CANVAS_SIZE / 2);
        let randomW = 200 + randomInt(params.CANVAS_SIZE / 2);
        let randomH = 30 + randomInt(100);

        let tmp = new Track(this.game, randomX, randomY, randomW, randomH);
        this.game.addEntity(tmp);

        randomX = this.x + randomInt(params.CANVAS_SIZE) + params.CANVAS_SIZE;// Spawn in the middle or more
        randomY = randomInt(params.CANVAS_SIZE / 2) + params.CANVAS_SIZE / 2;
        randomW = 200 + randomInt(params.CANVAS_SIZE / 2);
        randomH = 30 + randomInt(100);

        tmp = new Track(this.game, randomX, randomY, randomW, randomH);
        this.game.addEntity(tmp);
    }

    //Used in infinite mode, spawning Power Up randomly
    infMode_SpawnPowerUp(){
        //Return if power up spawning is still on cool down
        if (this.infMode.powerUpSpawnCooldown > 0){
            this.infMode.powerUpSpawnCooldown = Math.max( this.infMode.powerUpSpawnCooldown - 1, 0);
            return;
        }
    
        this.infMode.powerUpSpawnCooldown = 800 + randomInt(100);//Won't spawn again in at least 800 ticks
        
        //Spawn two set of track, one upper, one lower
        let randomX = this.x + randomInt(params.CANVAS_SIZE) + params.CANVAS_SIZE;// Spawn in the middle or more
        let randomY = randomInt(params.CANVAS_SIZE / 2);
        let radius = 35;
        let randomType = 0;
        let tmp = new Powerup(this.game, randomX, randomY, radius, randomType);
        this.game.addEntity(tmp);
    }
    //Launch a new game
    newGame_InfMode(){
        this.score = 0;
        this.difficulty = 1;
        this.difficultyThreshold = 15;
        this.gameOver = false;
        this.x = 0;

        this.game.mainCharacter = new Ollie(this.game, params.CANVAS_SIZE / 9, params.CANVAS_SIZE / 2);
        this.game.addEntity(this.game.mainCharacter);

       

        this.infMode = {
            trackSpawnCooldown: 0,
            powerUpSpawnCooldown: 0,
        };
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

    update() {
        let limitPoint = params.CANVAS_SIZE / 9;

        if (this.x < this.game.mainCharacter.x - limitPoint) {
            this.x = this.game.mainCharacter.x - limitPoint;
        }

        //Going over bounds
        if (this.game.mainCharacter.y + this.game.mainCharacter.height < 0 || this.game.mainCharacter.y - this.game.mainCharacter.height > params.CANVAS_SIZE){
           
            this.gameOver = true;
        }

        //Spawn track if in inf mode
        if (this.infMode && !this.gameOver){
            this.infMode_SpawnTrack();
            this.infMode_SpawnPowerUp();
        }
    };

    draw(ctx){
        //Displaying the score
        ctx.fillStyle = "red";
        ctx.strokeStyle = "red";
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