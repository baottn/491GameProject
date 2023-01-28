class PowerUp{
    static POWERUP_HEIGHT = 10;
    static POWERUP_RADIUS = 35;
    constructor(game, x = 0, y = 0, radius = 35) {
        Object.assign(this, { game, x, y, radius });
        this.updateBC();
        
        this.dx = 0;
        this.dy = 0;
        this.fillStyle = "yellow";
        this.strokeStyle = "black";
    }

    checkCollisionWithOllie() {
        let dx = Math.abs(this.x - Ollie.x);
        let dy = Math.abs(this.y - Ollie.y);

        // Check if the distance on the x-axis/y-axis is greater than the sum of half the width/height 
        // of the rectangle and the radius of the circle
        if (dx > (Ollie.width / 2 + this.radius) || dy > (Ollie.height / 2 + this.radius)) { 
            return false; 
        }

        // Check if the distance on the x-axis/y-axis is less than or equal to the sum of half the width/height
        // of the rectangle and the radius of the circle
        if (dx <= (Ollie.width / 2) || dy <= (Ollie.height / 2)) { 
            return true; 
        }

        // Check corner cases
        let cornerX = dx - Ollie.width/2
        let cornerY = dy - Ollie.height/2
        cornerDistance = Math.pow(cornerX, 2) + Math.pow(cornerY, 2);

        return cornerDistance <= Math.pow(this.radius, 2);
    }

    draw(ctx) {
        // Begin a new path
        ctx.beginPath();

        // Draw the circle
        ctx.arc(x, y, radius, 0, 2 * Math.PI);

        // Fill the circle with a color
        ctx.fillStyle = this.fillStyle;
        ctx.fill();

        // Stroke the circle with a color and width
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = 3;
        ctx.stroke();

        // End
        ctx.closePath();
    }

    update() {
    }
}