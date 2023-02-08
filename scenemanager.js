class SceneManager {
    static BORDER_WIDTH = 24;
    static BORDER_HEIGHT = 32;
    static BORDER_SCALE = 5;
    constructor(game) {
        this.game = game;
        this.highScore = 0;
        this.infMode = null;

        this.newGame_InfMode();
        // this.powerupsAnimation = new Animeation(ASSET_MANAGER.getAsset("./img/powerups.png"), 0, 160, 8, 8, 4, 0.2, 0, false, true);
        this.border = ASSET_MANAGER.getAsset("./img/fire_border.png");
        this.animations = []
        this.loadAnimations(); 
    };

    loadAnimations() {
        this.animations[0] = new Animator(this.border, 0, 0, SceneManager.BORDER_WIDTH, SceneManager.BORDER_HEIGHT, 8, 1);
        this.animations[1] = new Animator(this.border, 0, SceneManager.BORDER_HEIGHT + 1, SceneManager.BORDER_WIDTH, SceneManager.BORDER_HEIGHT, 8, 1);
    }

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

    //Used in infinite mode, spawning Fireball randomly
    infMode_SpawnFireball(){
        //Return if power up spawning is still on cool down
        if (this.infMode.fireBallCooldown > 0){
            this.infMode.fireBallCooldown = Math.max( this.infMode.fireBallCooldown - 1, 0);
            return;
        }
    
        this.infMode.fireBallCooldown = 100 + randomInt(100);//Won't spawn again in at least 400 ticks
        
        //Spawn two set of track, one upper, one lower
        let randomX = this.x + randomInt(params.CANVAS_SIZE) + params.CANVAS_SIZE;// Spawn in the middle or more
        let y = 0;
        let radius = randomInt(25) + 15;
        let randomAngle = (randomInt(45) + 90) / 180 * Math.PI;// 90 / 180 * Math.PI;
        let tmp = new Fireball(this.game, randomX, y, randomAngle, radius);
        console.log("Spawn a fire ball at ", randomX, y, randomAngle, radius);
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
            fireBallCooldown: 0,
        };

        //Just for testing
        //this.infMode_SpawnFireball();
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
        if (this.game.mainCharacter.y + this.game.mainCharacter.height < 0 || this.game.mainCharacter.y - this.game.mainCharacter.height > params.CANVAS_SIZE ||
            this.game.mainCharacter.health <= 0//Health is <= 0
            ){
            this.gameOver = true;
        }

        //Spawn track if in inf mode
        if (this.infMode && !this.gameOver){
            this.infMode_SpawnTrack();
            this.infMode_SpawnPowerUp();
            this.infMode_SpawnFireball();
        }
    };

    displayInfo(ctx){
        //Displaying the score
        ctx.fillStyle = `hsl(360, 100%, 50%)`;
        ctx.strokeStyle = "blue";
        ctx.font = "40px serif";
        ctx.strokeText("Score: " + this.score.toFixed(1), 10, 35);
        ctx.fillText("Health: " + this.game.mainCharacter.health, 10, 70);
    }

    displayThruster(ctx){
        //Draw the thruster bar
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.strokeStyle = "green";
        let thrusterBar = {width: params.CANVAS_SIZE / 50, height: params.CANVAS_SIZE / 3};
        let thrusterCurrentVolume = this.game.mainCharacter.thrusterVolume / this.game.mainCharacter.maximumThursterVolume;
        
        ctx.strokeRect( 50, params.CANVAS_SIZE / 2 - 200, thrusterBar.width, thrusterBar.height);
        ctx.fillRect( 50, params.CANVAS_SIZE / 2 - 200  + thrusterBar.height, thrusterBar.width, - thrusterBar.height * thrusterCurrentVolume);

        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    displayBorder(ctx){
        for (let i = 0; i < params.CANVAS_SIZE; i += SceneManager.BORDER_WIDTH * 2.60) {
            this.animations[0].drawFrame(this.game.clockTick, ctx, params.CANVAS_SIZE - (SceneManager.BORDER_SCALE * SceneManager.BORDER_WIDTH) + 25 - i, params.CANVAS_SIZE - (SceneManager.BORDER_SCALE * SceneManager.BORDER_HEIGHT), SceneManager.BORDER_SCALE);   
        }

        for (let i = 0; i < params.CANVAS_SIZE; i += SceneManager.BORDER_WIDTH * 2.60) {
            this.animations[1].drawFrame(this.game.clockTick, ctx, params.CANVAS_SIZE - (SceneManager.BORDER_SCALE * SceneManager.BORDER_WIDTH) + 25 - i,0, SceneManager.BORDER_SCALE);   
        }
    }

    draw(ctx){
        this.displayBorder(ctx);
        this.displayThruster(ctx);
        this.displayInfo(ctx);
    }
};