class Track{
    constructor(game, xStart = 0, yStart= 0, xEnd = 0, yEnd = 0) {
        Object.assign(this, {xStart, yStart, xEnd, yEnd});
        this.width = xEnd - xStart;
        this.length = yEnd - yStart;
    }
    
    draw(ctx) {
        // draw rectangle
     }

}