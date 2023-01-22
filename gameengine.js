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

        this.camera = null;
        this.mainCharacter = null;

        // Options and the Details
        this.options = options || {
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
        this.camera = new SceneManager(this);
        this.mainCharacter = new Ollie(this, params.CANVAS_SIZE / 4, params.CANVAS_SIZE/2);
        this.addEntity(this.mainCharacter);
        //Start a new game
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
            }
        }

        function keyUpListener(e) {
            that.keyboardActive = false;
            e.preventDefault();
            switch (e.code) {
                case "Space":
                    that.spacePressed = false;
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
        //Draw the background
        this.ctx.drawImage(ASSET_MANAGER.getAsset("./img/background.jpg"), 0, 0, params.CANVAS_SIZE, params.CANVAS_SIZE);

        

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
    };

    update() {
        let entitiesCount = this.entities.length;

        this.camera.update();
        if (!this.mainCharacter.isDying && !this.gameOver)
            this.camera.score += 0.005;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
        

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