class TransitioningScreen{
    constructor(game, title, isTitle = true, options = ["Play", "Inf Mode", "Exit",], backgroundSprite = ASSET_MANAGER.getAsset("./img/titleScreen.png")) {
        Object.assign(this, {game, title, isTitle, options});
        if (isTitle)
            this.titleSprite = backgroundSprite;
        this.animation = new Animator(this.homeSprite, 0, 0, 100, 100, 25, 0.09);

        this.selected = 0;
    }

    loadAnimations() {
           
    }

    update(){
        if (this.game.up){
            this.selected --;
            this.game.up = false;
        }
        if (this.game.down){
            this.selected++;    
            this.game.down = false;
        }

        this.selected %= this.options.length;
        if (this.selected < 0){
            this.selected =  this.options.length - 1;
        }
        if (this.game.spacePressed){
            this.game.spacePressed = false;
            return this.selected;
        }
        return -1;
    }

        
    draw(ctx) {
        ctx.beginPath();
        ctx.drawImage(this.titleSprite, 450, 100, params.CANVAS_SIZE, params.CANVAS_SIZE, 0, 0, params.CANVAS_SIZE, params.CANVAS_SIZE);
        
        //Draw title screen out
        ctx.font = "120px sans-serif";
        ctx.textAlign = "center";
        ctx.lineWidth = 2;
        
        let startY = params.CANVAS_SIZE / 4;

        if ((parseInt(this.game.timer.gameTime * 2)) % 2 === 0){
            ctx.strokeStyle = "black";
            ctx.strokeText(this.title, params.CANVAS_SIZE / 2, startY);
        }
        else{
            ctx.fillStyle = "black";
            ctx.fillText(this.title, params.CANVAS_SIZE / 2, startY);
        }

        startY += 150;
        ctx.font = "80px sans-serif";
        for (let i = 0 ; i < this.options.length; i++){
            if (i == this.selected){
                if ((parseInt(this.game.timer.gameTime * 10)) % 2 === 0) {
                    ctx.strokeStyle = "red";
                    ctx.strokeText(this.options[i], params.CANVAS_SIZE / 2, startY);
                }
                else {
                    ctx.fillStyle = "black";
                    ctx.fillText(this.options[i], params.CANVAS_SIZE / 2, startY);
                }
            }
            else{
                ctx.strokeStyle = "black";
                ctx.strokeText(this.options[i], params.CANVAS_SIZE / 2, startY);
            }

            startY += 150;
        }
        ctx.textAlign = "left";
        ctx.closePath();
     }

}