// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};
        this.spacePressed = false;
        this.shooting = false;

        this.camera = null;
        this.mainCharacter = null;
        this.down = false;
        this.up = false;
        this.enter = false;

        // Options and the Details
        this.options = options || {
            debugging: false,
        };
    };

    cleanUpOffScreenEntity() {
        //Clean anything that goes out of bound except player
        this.entities.filter(entity => !(entity instanceof Ollie)).forEach(entity => {

            if (entity.y > params.CANVAS_SIZE || entity.y < 0) {
                entity.removeFromWorld = true;
            }

            if (entity.x < this.camera.x - params.CANVAS_SIZE) {
                entity.removeFromWorld = true;
            }

        });
    }

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
        this.camera = new SceneManager(this);

    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        const that = this;
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });

        function mouseListener(e) {
            that.mouse = getXandY(e);
        }

        function mouseClickListener(e) {
            that.click = getXandY(e);
            that.shooting = true;
            if (params.DEBUG) console.log(that.click);
        }

        function wheelListener(e) {
            e.preventDefault(); // Prevent Scrolling
            that.wheel = e.deltaY;
        }

        function keydownListener(e) {
            that.keyboardActive = true;
            e.preventDefault();
            
            switch (e.code) {
                case "Space":
                    that.spacePressed = true;
                    break;
                case "KeyS":
                    that.down = true;
                    break;
                case "KeyW":
                    that.up = true;
                    break;
                case "ShiftLeft":
                case "Enter":
                    that.enter = true;
                    break;
            }
        }

        function keyUpListener(e) {
            that.keyboardActive = false;
            e.preventDefault();

            switch (e.code) {
                case "Space":
                    that.spacePressed = false;
                    break;
                case "KeyS":
                    that.down = false;
                    break;
                case "KeyW":
                    that.up = false;
                    break;
                case "ShiftLeft":
                case "Enter":
                    that.enter = false;
                    break;
            }
        }

        that.mousemove = mouseListener;
        that.leftclick = mouseClickListener;
        that.wheelscroll = wheelListener;
        that.keydown = keydownListener;
        that.keyup = keyUpListener;

        this.ctx.canvas.addEventListener("mousemove", that.mousemove, false);

        this.ctx.canvas.addEventListener("click", that.leftclick, false);

        this.ctx.canvas.addEventListener("wheel", that.wheelscroll, false);

        this.ctx.canvas.addEventListener("keydown", that.keydown, false);

        this.ctx.canvas.addEventListener("keyup", that.keyup, false);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        if (this.camera.gameOver) {
            this.camera.drawGameOver(this.ctx);
            return;
        }
        this.camera.drawBackGround(this.ctx);
        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx);
        }
        //Draw the HUD
        this.camera.draw(this.ctx);

    };

    reset() {
        for (let i = this.entities.length - 1; i >= 0; --i) {
            this.entities[i].removeFromWorld = true;
            //this.entities.splice(i, 1);
        }
        this.entities = [];
    }

    update() {
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
        this.camera.update();

        //Won't update If game is over.
        if (this.camera.gameOver) {
            this.reset();
            //Resetting
            if (this.down) {
                if (this.camera.infMode) {
                    this.camera.newGame_InfMode();
                }
                else if (this.camera.level) {
                    this.camera.loadLevel(this.camera.levelList[this.camera.currentLevel]);
                }
            } else if (this.up) {
                this.reset();
                this.camera.gameOver = false;
                this.camera.isInTitle = true;
                //Reset the music to title
                ASSET_MANAGER.pauseBackgroundMusic();
                ASSET_MANAGER.playAsset("./music/title_music.mp3");
            }
            return;
        }

        this.cleanUpOffScreenEntity();

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};

// KV Le was here :)