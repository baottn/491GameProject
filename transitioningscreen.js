class TransitioningScreen {
    constructor(game, title, isTitle = true, options = ["Play", "Inf Mode", "Exit",],
        backgroundSprite = ASSET_MANAGER.getAsset("./img/titleScreen.png"),
        music = "",
    ) {
        Object.assign(this, { game, title, isTitle, options });
        this.backgroundSprite = backgroundSprite;
        this.animation = new Animator(this.homeSprite, 0, 0, 100, 100, 25, 0.09);
        console.log(this.backgroundSprite);
        this.selected = 0;
    }

    loadAnimations() {

    }

    update() {
        if (this.game.up) {
            ASSET_MANAGER.playAsset("./audio/select.mp3");
            this.selected--;
            this.game.up = false;
        }
        if (this.game.down) {
            ASSET_MANAGER.playAsset("./audio/select.mp3");
            this.selected++;
            this.game.down = false;
        }

        this.selected %= this.options.length;
        if (this.selected < 0) {
            this.selected = this.options.length - 1;
        }
        if (this.game.enter) {
            ASSET_MANAGER.playAsset("./audio/enter.mp3");
            this.game.enter = false;
            return this.selected;
        }
        return -1;
    }


    draw(ctx) {
        ctx.beginPath();

        if (this.isTitle) {
            ctx.drawImage(this.backgroundSprite, 450, 100, params.CANVAS_SIZE, params.CANVAS_SIZE, 0, 0, params.CANVAS_SIZE, params.CANVAS_SIZE);
        }
        else {
            ctx.drawImage(this.backgroundSprite, 600, 0, params.CANVAS_SIZE, params.CANVAS_SIZE, 0, 0, params.CANVAS_SIZE, params.CANVAS_SIZE);
        }

        //Draw title screen out
        ctx.font = "120px sans-serif";
        ctx.textAlign = "center";
        ctx.lineWidth = 2;

        let startY = params.CANVAS_SIZE / 4;

        if ((parseInt(this.game.timer.gameTime * 2)) % 2 === 0) {
            ctx.strokeStyle = "black";
            ctx.strokeText(this.title, params.CANVAS_SIZE / 2, startY);
        }
        else {
            ctx.fillStyle = "black";
            ctx.fillText(this.title, params.CANVAS_SIZE / 2, startY);
        }

        startY += 150;
        ctx.font = "80px sans-serif";
        for (let i = 0; i < this.options.length; i++) {
            if (i == this.selected) {
                if ((parseInt(this.game.timer.gameTime * 10)) % 2 === 0) {
                    ctx.strokeStyle = "red";
                    ctx.strokeText(this.options[i], params.CANVAS_SIZE / 2, startY);
                }
                else {
                    ctx.fillStyle = "black";
                    ctx.fillText(this.options[i], params.CANVAS_SIZE / 2, startY);
                }
            }
            else {
                ctx.strokeStyle = "black";
                ctx.strokeText(this.options[i], params.CANVAS_SIZE / 2, startY);
            }

            startY += 150;
        }
        ctx.textAlign = "left";
        ctx.closePath();
    }

}