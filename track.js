class Track{
    constructor(game, xStart = 0, yStart= 0, xEnd = 0, yEnd = 0) {
        Object.assign(this, {xStart, yStart, xEnd, yEnd});
        this.width = xEnd - xStart;
        this.length = yEnd - yStart;
    }

    checkCollisionWithOllie() {
        OllieLeft = Ollie.x;
        OllieRight = Ollie.x + Ollie.width;
        OllieTop = Ollie.y;
        OllieBottom = Ollie.y + Ollie.height;
        if (this.xEnd <= OllieLeft || this.xStart >= OllieRight || this.yStart > OllieBottom || this.yEnd <= OllieTop) return false;
        return true;
    }

    
    draw(ctx) {
        ctx.fillStyle = "green";
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.xStart, this.yStart, this.width, this.length);
     }

}