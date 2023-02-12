class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding = 0, reverse = false, loop = true) {
        Object.assign(this, { spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop });

        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
    };

    drawFrameCustomAngle(tick, ctx, x, y, scale = 1, angle = null, customWidth, customHeight){
        
        this.elapsedTime += tick;
        if (scale != "custom") {
            customWidth = this.width * scale;
            customHeight = this.height * scale;
        }

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

     

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;
        if (angle){
            ctx.save();
            
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.translate(-x, -y);
            ctx.drawImage(this.spritesheet,
                this.xStart + frame * (this.width + this.framePadding), this.yStart, //source from sheet
                this.width, this.height,
                x, y,
                customWidth,
                customHeight);
    
            if (params.DEBUG) {
                ctx.strokeStyle = 'Green';
                ctx.strokeRect(x, y, this.width * scale, this.height * scale);
            }
            ctx.restore();
        }
        else{
            ctx.drawImage(this.spritesheet,
                this.xStart + frame * (this.width + this.framePadding), this.yStart, //source from sheet
                this.width, this.height,
                x, y,
                customWidth,
                customHeight);
    
            if (params.DEBUG) {
                ctx.strokeStyle = 'Green';
                ctx.strokeRect(x, y, this.width * scale, this.height * scale);
            }
        }
    }

    drawFrame(tick, ctx, x, y, scale = 1, customWidth, customHeight) {
        this.drawFrameCustomAngle(tick, ctx, x, y, scale, null, customWidth, customHeight);
    };

    //Class
    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};