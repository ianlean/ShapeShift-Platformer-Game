class Player {

    constructor(game, x, y) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/circlePixel.png");
        this.BoundingBox;
        this.x = x;
        this.y = y;
        this.speed = 1;
        this.MaxSpeed = 10;
        this.Acceleration = .09;
        this.velocityX = 0;
        this.velocityY = 0;
        this.shape = "circle";
        // Get the animations
        this.anim = "still";
        this.animations = [];
        this.createAnimations();
        this.updateBox();
    };

    createAnimations() {

        // rolling right animation
        this.animations["d"] = new Animator(ASSET_MANAGER.getAsset("./assets/spritesheetCircle.png"), 0, 0, 32, 32, 9, 0.1, 0, false, true);
        //sitting still
        this.animations["still"] = new Animator(ASSET_MANAGER.getAsset("./assets/circlePixel.png"), 0, 0, 32, 32, 1, 1, 0, false, true);
        //rolling left animation
        this.animations["a"] = new Animator(ASSET_MANAGER.getAsset("./assets/spritesheetCircle.png"), 0, 0, 32, 32, 9, 0.1, 0, true, true);
    }

    update() {

        this.updateBox();
        this.velocityY += this.Acceleration;

        //key check
        let aKeyIsPressed = arr => arr.every(v => v === false);
        if (!aKeyIsPressed(this.game.keys)) { //no key is pressed so we idle
            // If the player is not pressing a key
            this.anim = "still";
        } else { // a key is pressed so we move
            if (this.game.keys["d"] == true) {
                if (this.velocityX < this.MaxSpeed) {
                    this.velocityX += this.Acceleration;
                }
                console.log("going right");
                this.anim = "d";
            }

            if (this.game.keys["a"] == true) {
                if ((-this.velocityX) < this.MaxSpeed) {
                    this.velocityX -= this.Acceleration;
                }
                console.log("going left");
                this.anim = "a";
            }
            if (this.game.keys["s"] == true) {
                if (this.velocityY < this.MaxSpeed) {
                    this.velocityY += this.Acceleration;
                }
                console.log("going down");
                if (this.velocityX > 0) {
                    this.anim = "d";
                } else if (this.velocityX < 0) {
                    this.anim = "a";
                } else {
                    this.anim = "still";
                }
            }
            if (this.game.keys["d"] == false && this.game.keys["a"] == false) {
                this.velocityX -= this.velocityX;
                this.anim = "still";
            }
        }

        if (this.game.keys["Shift"] == true) {
            if (this.shape == "circle") {
                this.spritesheet = ASSET_MANAGER.getAsset("./assets/spriteSheetCircle.png")
                this.shape = "square";
            }
            console.log("changing shape");
            //this should probably get pulled into it own function with some kind of way to rotate between all shapes 
        }


        //collision check
        this.collisionCheck();
        this.x += this.velocityX;
        this.y += this.velocityY;
        //gravity and other thing effecting movement could go here
    };

    collisionCheck() {
        this.game.entities.forEach(entity => {

            if (this.BoundingBox.collide(entity.BoundingBox)) {
                if (entity instanceof floor) {
                    //console.log("this is the floor")
                    this.velocityY = 0;
                    if (this.game.keys["w"] == true) {
                        if ((-this.velocityY) < this.MaxSpeed) {
                            this.velocityY -= 30 * this.Acceleration;
                        }
                    }
                }
                if (entity instanceof spike) {
                    console.log("get fucked hippie");
                    //todo this is where a death/loss of heart would be 
                    // this.velocityY = -16;//I think this is really funny as a place holder -Damien
                }
                if (entity instanceof Laser) {
                    console.log("get fucked hippie");
                    //todo this is where a death/loss of heart would be 
                    // this.velocityY = -16;//I think this is really funny as a place holder -Damien
                }
            }
        });
    }

    draw(ctx) {
        this.animations[this.anim].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
        //ctx.drawImage(this.spritesheet, this.x, this.y,30,30);
        this.BoundingBox.draw(ctx);
    };

    updateBox() {
        this.BoundingBox = new BoundingBox(this.x, this.y, 30, 30);
    }

    die() {
        // die animation/reset game

    }

}