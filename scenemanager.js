class SceneManager {
    static BORDER_WIDTH = 24;
    static BORDER_HEIGHT = 32;
    static BORDER_SCALE = 3;
    constructor(game) {
        this.game = game;
        this.highScore = 0;
        this.infMode = null;

        this.newGame_InfMode();
        // this.powerupsAnimation = new Animeation(ASSET_MANAGER.getAsset("./img/powerups.png"), 0, 160, 8, 8, 4, 0.2, 0, false, true);
        this.border = ASSET_MANAGER.getAsset("./img/fire_border.png");
        this.animations = []
        this.loadAnimations(); 
        this.backgroundX = 0;
        this.backgroundStep = 1;
        this.backgroundSprite = ASSET_MANAGER.getAsset("./img/background.png");
        this.connectingBackgroundSprite = ASSET_MANAGER.getAsset("./img/background2.png");
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
    
        this.infMode.trackSpawnCooldown = 400 + randomInt(200);//Won't spawn again in at least 400 ticks
        
        //Spawn two set of track, one upper, one lower
        let randomX = this.x + randomInt(params.CANVAS_SIZE) + params.CANVAS_SIZE;// Spawn in the middle or more
        let randomY = randomInt(params.CANVAS_SIZE / 2);
        let randomW = 120 + randomInt(params.CANVAS_SIZE / 5);
        let randomH = randomW / (randomInt(2) + 2); //30 + randomInt(100);

        let tmp = new Track(this.game, randomX, randomY, randomW, randomH);
        this.game.addEntity(tmp);

        randomX = this.x + randomInt(params.CANVAS_SIZE) + params.CANVAS_SIZE;// Spawn in the middle or more
        randomY = randomInt(params.CANVAS_SIZE / 2) + params.CANVAS_SIZE / 2;
        randomW = 120 + randomInt(params.CANVAS_SIZE / 5);
        randomH = randomW / (randomInt(2) + 2);//30 + randomInt(100);

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
    
        this.infMode.powerUpSpawnCooldown = 200 + randomInt(200);//Won't spawn again in at least 200 ticks
        
        let randomX = this.x + randomInt(params.CANVAS_SIZE) + params.CANVAS_SIZE;// Spawn in the middle or more
        let randomY = randomInt(params.CANVAS_SIZE / 2);
        let radius = 35;
        let randomType = randomInt(100);
        if (randomType < 30){
            randomType = 0;
        }
        else if (randomType <= 70){
            randomType = 1;
        }
        else randomType = 2;


        let tmp = new Powerup(this.game, randomX, randomY, radius, randomType);
        this.game.addEntity(tmp);
    }

    //Used in infinite mode, spawning Power Up randomly
    infMode_SpawnTrap(){
        //Return if power up spawning is still on cool down
        if (this.infMode.trapSpawnCooldown > 0){
            this.infMode.trapSpawnCooldown = Math.max( this.infMode.trapSpawnCooldown - 1, 0);
            return;
        }
    
        this.infMode.trapSpawnCooldown = 500 + randomInt(100);//Won't spawn again in at least 500 ticks
        this.infMode.trapSpawnCooldown /= this.infMode.difficulty;

        let randomX = this.x + randomInt(params.CANVAS_SIZE) + params.CANVAS_SIZE;// Spawn in the middle or more
        let randomY = randomInt(params.CANVAS_SIZE / 2);
        let radius = 35;
        let randomType = 0;
        let tmp = new Trap(this.game, randomX, randomY, radius, randomType);
        this.game.addEntity(tmp);
    }

    //Used in infinite mode, spawning Fireball randomly
    infMode_SpawnRock(){
        //Return if power up spawning is still on cool down
        if (this.infMode.rockCooldown > 0){
            this.infMode.rockCooldown = Math.max( this.infMode.rockCooldown - 1, 0);
            return;
        }
    
        this.infMode.rockCooldown = 400 + randomInt(200);//Won't spawn again in at least 400 ticks
        this.infMode.rockCooldown /= this.infMode.difficulty;

        let randomX = this.x + randomInt(params.CANVAS_SIZE) + params.CANVAS_SIZE;// Spawn in the middle or more
        let y = 0;
        let radius = randomInt(10) + 30;
        let randomAngle = (randomInt(45) + 90) / 180 * Math.PI;// 90 / 180 * Math.PI;
        let randomSpeed = 100 + randomInt(200);
        let tmp = new Rock(this.game, randomX, y, randomAngle, radius, randomSpeed);
        
        //console.log("Spawn a fire ball at ", randomX, y, randomAngle, radius);
        this.game.addEntity(tmp);
    }

     //Used in infinite mode, spawning a ghost randomly
     infMode_SpawnGhost(){
        //Return if power up spawning is still on cool down
        if (this.infMode.ghostCooldown > 0){
            this.infMode.ghostCooldown = Math.max( this.infMode.ghostCooldown - 1, 0);
            return;
        }
    
        this.infMode.ghostCooldown = 2000 + randomInt(200);//Won't spawn again in at least 2000 ticks
        this.infMode.ghostCooldown /= this.infMode.difficulty;

        let randomX = this.x + randomInt(params.CANVAS_SIZE) + params.CANVAS_SIZE;// Spawn in the middle or more
        let y = 0;
        let radius = randomInt(10) + 30;
        let randomAngle = (randomInt(45) + 90) / 180 * Math.PI;// 90 / 180 * Math.PI;
        let randomSpeed = 200 + randomInt(100);
        let tmp = new Ghost(this.game, randomX, y, randomAngle, radius, randomSpeed);
        
      
        this.game.addEntity(tmp);
    }

    infMode_updateDifficulty(){
        if (this.score > this.infMode.difficulty_threshold){
            this.infMode.difficulty++;
            this.infMode.difficulty_threshold += 200;
        }
    }

    //Launch a new game
    newGame_InfMode(){
        this.score = 0;
        this.difficulty = 1;
        this.difficultyThreshold = 15;
        this.gameOver = false;
        this.x = 0;

        this.backgroundX = 0;
        this.backgroundStep = 1;

        this.game.mainCharacter = new Ollie(this.game, params.CANVAS_SIZE / 9, params.CANVAS_SIZE / 2);
        this.game.addEntity(this.game.mainCharacter);

    
        this.infMode = {
            trackSpawnCooldown: 0,
            powerUpSpawnCooldown: 0,
            rockCooldown: 0,
            trapSpawnCooldown: 0,
            ghostCooldown: 2000,
            difficulty: 1,
            difficulty_threshold: 200,
        };

        //Just for testing
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
            this.infMode_updateDifficulty();
            this.infMode_SpawnTrack();
            this.infMode_SpawnPowerUp();
            this.infMode_SpawnTrap();
            this.infMode_SpawnRock();
            this.infMode_SpawnGhost();
        }
    };

    displayInfo(ctx){
        //Displaying the score
        ctx.fillStyle = `hsl(360, 100%, 50%)`;
        ctx.strokeStyle = `hsl(360, 100%, 50%)`;
        ctx.font = "40px serif";
        ctx.fillText("Score: " + this.score.toFixed(1), 10, 35);
        //ctx.fillText("Health: " + this.game.mainCharacter.health, 10, 70);
    }

    displayPlayerStat(ctx){
        //Draw the thruster bar
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.strokeStyle = "green";
        let thrusterText = "Thruster";
        let player = this.game.mainCharacter;

        if (player.unlimitedBoost.status){
            ctx.fillStyle = "yellow";
            ctx.strokeStyle = "yellow"; 
            thrusterText += " unlimited"; 
        }
        let thrusterBar = {width: params.CANVAS_SIZE / 50, height: params.CANVAS_SIZE / 3};
        let thrusterCurrentVolume = player.thrusterVolume / player.maximumThursterVolume;
        
        ctx.font = "25px serif";
        let lowerY =  params.CANVAS_SIZE / 2 - 170 + thrusterBar.height;
        ctx.fillText(thrusterText, 10, lowerY);

        ctx.strokeRect( 50, params.CANVAS_SIZE / 2 - 200, thrusterBar.width, thrusterBar.height);
        ctx.fillRect( 50, params.CANVAS_SIZE / 2 - 200  + thrusterBar.height, thrusterBar.width, - thrusterBar.height * thrusterCurrentVolume);

        ctx.stroke();
        ctx.fill();
        

        //Draw health Bars
        let healthBar = {width: params.CANVAS_SIZE / 50, height: params.CANVAS_SIZE / 3};

        let healthBarVolume = player.health / Ollie.MAX_HEALTH;

        ctx.fillStyle = "red";
        ctx.strokeStyle = "red";
        ctx.font = "25px serif";
        ctx.fillText("Health", 10, params.CANVAS_SIZE / 2 - 210);

        ctx.strokeRect( 20, params.CANVAS_SIZE / 2 - 200, healthBar.width, healthBar.height);
        ctx.fillRect( 20, params.CANVAS_SIZE / 2 - 200  + healthBar.height, healthBar.width, - healthBar.height * healthBarVolume);

        //Displaying invicible 
        if (player.invincibility){
            lowerY += 20;    
            ctx.fillStyle = "yellow";
            ctx.strokeStyle = "yellow"; 
            ctx.fillText("Invincible", 10, lowerY);
        }

        if (player.fasterShootRate.duration > 0){
            lowerY += 20;    
            ctx.fillStyle = "yellow";
            ctx.strokeStyle = "yellow"; 
            ctx.fillText("Fast Shooting", 10, lowerY);
        }

        if (player.trapped.activated){
            lowerY += 20;    
            ctx.fillStyle = "red";
            ctx.strokeStyle = "red"; 
            ctx.fillText("Trapped", 10, lowerY);
        }
    

        ctx.closePath();
    }

    displayBorder(ctx){
        for (let i = 0; i < params.CANVAS_SIZE; i += SceneManager.BORDER_WIDTH * 2.60) {
            this.animations[0].drawFrame(this.game.clockTick, ctx, params.CANVAS_SIZE - (SceneManager.BORDER_SCALE * SceneManager.BORDER_WIDTH) + 25 - i, params.CANVAS_SIZE - (SceneManager.BORDER_SCALE * SceneManager.BORDER_HEIGHT), SceneManager.BORDER_SCALE);   
        }

        for (let i = 0; i < params.CANVAS_SIZE; i += SceneManager.BORDER_WIDTH * 2.60) {
            this.animations[1].drawFrame(this.game.clockTick, ctx, params.CANVAS_SIZE - (SceneManager.BORDER_SCALE * SceneManager.BORDER_WIDTH) + 25 - i, 0, SceneManager.BORDER_SCALE);   
        }
    }

    drawBackGround(ctx){
         //Draw the background
        let connectionX = 3000 - this.backgroundX;
        if (!this.game.mainCharacter.trapped.activated){
            this.backgroundX += this.backgroundStep;//(this.x) % (2560 - params.CANVAS_SIZE);
            
        }

        if (this.backgroundX <= 0){
            this.backgroundX = 0;
            this.backgroundStep = 1;
        }
        // if (this.backgroundX >= 3000){
        //     this.backgroundX = 0;
        // }

        if (this.backgroundX >= 2000){
            this.backgroundX = 2000;
            this.backgroundStep = -1;
            
            //ctx.drawImage(this.connectingBackgroundSprite,params.CANVAS_SIZE - connectionX , 1600 - params.CANVAS_SIZE, params.CANVAS_SIZE, params.CANVAS_SIZE, 0, 0, params.CANVAS_SIZE, params.CANVAS_SIZE);
        }
        ctx.drawImage(this.backgroundSprite, this.backgroundX, 1600 - params.CANVAS_SIZE, params.CANVAS_SIZE, params.CANVAS_SIZE, 0, 0, params.CANVAS_SIZE, params.CANVAS_SIZE);
        
    }

    draw(ctx){
        this.drawBackGround(ctx);
        this.displayBorder(ctx);
        this.displayPlayerStat(ctx);
        this.displayInfo(ctx);
    }
};