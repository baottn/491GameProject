class Track{
    constructor(game) {
        this.game = game;

        this.xStart = 0;
        this.yStart = 0;
        this.xEnd = 0;
        this.yEnd = 0;
        this.length = 0;
    }

    setXStart(xStart) {
        this.xStart = xStart;
    }

    setYStart(yStart) {
        this.yStart = yStart;
    }

    setXEnd(xEnd) {
        this.xStart = xStart;
    }

    setYEnd(yEnd) {
        this.yStart = yStart;
    }

    setLength() {
        this.length = length;
    }

    getXStart() {
        return this.xStart;
    }

    getYStart() {
        return this.yStart;
    }

    getXEnd() {
        return this.xEnd;
    }

    getYEnd() {
        return this.yEnd;
    }

    calculateXEnd() {
        this.xEnd = this.xStart + this.length;
    }

    calculateYEnd() {
        this.yEnd = this.yStart + this.length;
    }

    getLength() {
        return this.length;
    }
    
    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./Track.png"),0,0);
     }

}