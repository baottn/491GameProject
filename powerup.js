class Powerup{
    static POWERUP_HEIGHT = 10;
    static POWERUP_RADIUS = 35;
    constructor(game) {
        
        this.game = game;

        this.x = Track.XStart() + POWERUP_HEIGHT;
        this.y = Track.YStart() + POWERUP_HEIGHT;
        this.radius = POWERUP_RADIUS;
        this.collision = false;
    }

    checkCollisionWithOllie() {
        let dx = this.x - Ollie.x;
        let dy = this.y - Ollie.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.radius + Ollie.radius) {
            collision = true;
        }
    }


    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./Powerup.png"),0,0);
    }
}