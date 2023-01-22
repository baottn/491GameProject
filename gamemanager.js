/**
 * The class for managing game function
 * @author Toan Nguyen 
 */
class GameManager {

    /**
     * Creates a new game session
     * 
     * @param {*} game the game engine
     */
    constructor(game, ctx) {
        Object.assign(this, { game, ctx});
        
        
        //Add main character
      
        
        this.asteroids = [];
        this.powerups = [];
        this.bullets = [];
        this.game.camera = new SceneManager(game);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    // spawningAsteroid(){
    //     let spawningCoordinate = [
    //         {x: randomInt(params.CANVAS_SIZE), y: 0},
    //         {x: 0, y: randomInt(params.CANVAS_SIZE)},
    //         {x:  params.CANVAS_SIZE, y: randomInt(params.CANVAS_SIZE)},
    //         {x:  randomInt(params.CANVAS_SIZE), y: 0},
    //     ];

    //     if (this.totalAsteroids < this.difficultyThreshold){
    //         let sPoint = randomInt(4);
    //         let asteroid = new Asteroid(this.game, spawningCoordinate[sPoint].x, spawningCoordinate[sPoint].y, randomInt(10) + 5);
    //         this.addEntity(asteroid);
    //         this.totalAsteroids++;
    //     }
       

    // }

    // cleanUpBullet(){
    //     this.entities.forEach(bullet => {
    //         if (bullet instanceof Bullet && !bullet.isDying){
    //             if (bullet.x1 - Bullet.BULLET_LENGTH * 3 >= params.CANVAS_SIZE || bullet.x1 + Bullet.BULLET_LENGTH * 3 <= 0 ||
    //                 bullet.y1 - Bullet.BULLET_LENGTH * 3 >= params.CANVAS_SIZE || bullet.y1 + Bullet.BULLET_LENGTH * 3 <= 0 ||
    //                 bullet.x2 - Bullet.BULLET_LENGTH * 3 >= params.CANVAS_SIZE || bullet.x2 + Bullet.BULLET_LENGTH * 3 <= 0 ||
    //                 bullet.y2 - Bullet.BULLET_LENGTH * 3 >= params.CANVAS_SIZE || bullet.y2 + Bullet.BULLET_LENGTH * 3 <= 0
    //                 ){
                    
    //                 bullet.removeFromWorld = true;
    //             }
               
    //         }
    //     });
    // }

    // cleanUpAsteroid(){
    //     this.entities.forEach(asteroid => {
    //         if (asteroid instanceof Asteroid && !asteroid.isDying){
    //             if (asteroid.x - asteroid.radius * 3 >= params.CANVAS_SIZE || asteroid.x + asteroid.radius * 3 <= 0 ||
    //                 asteroid.y - asteroid.radius * 3 >= params.CANVAS_SIZE || asteroid.y + asteroid.radius * 3 <= 0
    //                 ){
                    
    //                 asteroid.removeFromWorld = true;
    //                 this.totalAsteroids--;
    //             }
                
    //             if (GameManager.CHEAT != "TOAN")
    //                 asteroid.checkCollisionPlayer();
    //         }
            
    //     });
    // }

    // increaseDifficulty(){
    //     this.difficulty ++;
    //     this.difficultyThreshold += 2;
    // }

    update() {
        
    };

   

    draw(ctx){
         //Displaying the score
         ctx.fillStyle = "black";
         ctx.strokeStyle = "black";
         ctx.font = "28px serif";
         ctx.fillText("Score: " + this.score.toFixed(0), 10, 35);

        if (this.gameOver) {
            this.drawGameOver(this.ctx);
            return;
        }

        // for (let i = this.entities.length - 1; i >= 0; i--) {
        //     this.entities[i].draw(this.ctx, this);
        // }
        this.mainCharacter.draw(ctx);

        this.bullets.forEach(bullet => {
            bullet.draw(ctx);
        })

        this.asteroids.forEach(asteroid => {
            asteroid.draw(ctx);
        });

        this.powerups.forEach(powerup => {
            powerup.draw(ctx);
        });

        
       
    };
};

