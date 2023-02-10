class Player {
//
    constructor(game, x, y) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/circlePixel.png");
        //this.BoundingBox;
        this.BoundingCircle
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
        this.updateCollision();
        this.dead = false;
        this.prevX=x;
        this.prevY=y;
    };

    createAnimations() {
        // rolling right animation
        this.animations["d"] = new Animator(ASSET_MANAGER.getAsset("./assets/spritesheetCircle.png"), 0, 0, 32, 32, 9, 0.1, 0, false, true);
        //sitting still
        this.animations["still"] = new Animator(ASSET_MANAGER.getAsset("./assets/circlePixel.png"), 0, 0, 32, 32, 1, 1, 0, false, true);
        //rolling left animation
        this.animations["a"] = new Animator(ASSET_MANAGER.getAsset("./assets/spritesheetCircle.png"), 0, 0, 32, 32, 9, 0.1, 0, true, true);
        //square shift
        this.animations["Square"] = new Animator(ASSET_MANAGER.getAsset("./assets/sqaurePixel.png"), 0, 0, 32, 32, 1, 1, 0, false, true);
    }

    // Try to keep this function small, extrapilate logic to other functions
    update() {
        this.prevX=this.x;
        this.prevY= this.y;
        this.updateCollision();
        this.velocityY += this.Acceleration;

        this.keyCheck();
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.collisionCheck();
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.updateCollision();
        this.restartCheck()
        
        //gravity and other thing effecting movement could go here
    };

    draw(ctx) {
        if (this.shape == "circle") {
            this.animations[this.anim].drawFrame(this.game.clockTick * (Math.abs(this.velocityX) / 3), ctx, this.x, this.y, .5);
        } else {
            this.animations[this.anim].drawFrame(this.game.clockTick, ctx, this.x, this.y, .5);
        }
        if (this.dead) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Dead.png"), 10, 20, 278, 48);
        }
        if (this.BoundingCircle != undefined) { this.BoundingCircle.draw(ctx); }
    };

    collisionCheck() {
        this.game.entities.forEach(entity => {

            if (entity instanceof floor) {
                //console.log("FLOOOOOOOR");
                var xPoints = entity.line.circleCollide(this.BoundingCircle);
                for (var i = 0; i < xPoints.length; i++) {
                    if (entity.line.onSegment(xPoints[i])) {
                        var perpSlope = -1 / entity.line.slope();
                        var perpLine = new Line(this.game);
                        perpLine.points[0] = new Point(this.x, this.y);
                        perpLine.points[1] = new Point(this.x + 5, (this.y + 5) * -perpSlope);
                        var pointOfIntersect = perpLine.collide(entity.line);
                       
                        if(entity.line.slope() > 0) {
                            console.log("down");
                            
                            var sinOfSlope = 1*(entity.line.points[1].y-entity.line.points[0].y)/getDistance(entity.line.points[0],entity.line.points[1]);
                            var cosOfSlope = 1*(entity.line.points[1].x-entity.line.points[0].x)/getDistance(entity.line.points[0],entity.line.points[1]);
                            console.log(pointOfIntersect.x + ""+ perpLine.points[0].x +"" + pointOfIntersect.y + ""+ perpLine.points[0].y);
                            this.y -= (getDistance(pointOfIntersect,perpLine.points[0]))*sinOfSlope;
                            
                            console.log(getDistance(pointOfIntersect,perpLine.points[0]));
                            // console.log(this.x);
                            this.velocityY = 0;
                        } else if (entity.line.slope() < 0) {
                            //console.log("up");
                            var sinOfSlope = 1*(entity.line.points[1].y-entity.line.points[0].y)/getDistance(entity.line.points[0],entity.line.points[1]);
                        
                            this.y += (getDistance(pointOfIntersect,perpLine.points[0]))*sinOfSlope;
                            this.velocityY = 0;
                        } else {
                            this.y -= 0.5;
                            this.velocityY = 0;
                        }

                         this.velocityY = 0;
                        // if (getDistance(pointOfIntersect, perpLine.points[0]) < 0.1) {
                        //     this.velocityY = 0;
                        // } else {
                        //     this.y -= 11 - getDistance(pointOfIntersect, perpLine.points[0]);
                        //     this.velocityY = 0;
                        // }
                        this.updateCollision();
                        this.jumpCheck();
                    }
                }
            }

            if (entity instanceof BottomlessPit) {


                var xPoints = entity.line.circleCollide(this.BoundingCircle);
                for (var i = 0; i < xPoints.length; i++) {
                    if (entity.line.onSegment(xPoints[i])) {
                        console.log("pit")
                        this.die();
                    }
                }
            }

            // if (!(entity instanceof Background) && !(entity instanceof BoundingLine) && this.BoundingCircle.RectCircleColliding(entity.BoundingBox)) {
            //     if (entity instanceof floor) {
            //         console.log("this is the floor")
            //         // if (this.BoundingBox.bottom >= entity.BoundingBox.top) {
            //         //     this.velocityY = 0;
            //         //     if(this.BoundingBox.bottom > entity.BoundingBox.top){
            //         //         this.y+=entity.BoundingBox.top-this.BoundingBox.bottom
            //         //         this.updateBox();
            //         //     }
            //             this.velocityY = 0;
            //             this.updateBox();
            //             this.jumpCheck();

            //     if (entity instanceof spike) {
            //         //todo this is where a death/loss of heart would be 
            //         console.log("hit a spike");
            //         this.velocityY = -5;//I think this is really funny as a place holder -Damien
            //         this.die()
            //     }
            //     if (entity instanceof Laser) {
            //         //todo this is where a death/loss of heart would be 
            //         console.log("hit a laser");
            //         this.velocityY = -5;//I think this is really funny as a place holder -Damien
            //         this.die()
            //     }

            //     }
            // }
        });
    }
    keyCheck() {
        let aKeyIsPressed = arr => arr.every(v => v === false);
        if (!aKeyIsPressed(this.game.keys) || this.dead) { //no key is pressed so we idle
            // If the player is not pressing a key
            this.anim = "still";
        } else { // a key is pressed so we move
            if (this.game.keys["d"] == true) {
                this.mvRight();
            }

            if (this.game.keys["a"] == true) {
                this.mvLeft();
            }
            if (this.game.keys["s"] == true) {
                this.mvDown();
            }
            if (this.game.keys["d"] == false && this.game.keys["a"] == false) {
                this.velocityX -= this.velocityX * .5;
                if (this.shape == "circle") {
                    this.anim = "still";
                }
            }
            // console.log("x: " + this.x)
            // console.log("y: " + this.y)
        }

        if (this.game.keys["Shift"] == true) {
            this.game.keys["d"] = false;
            this.game.keys["a"] = false;
            this.shapeshift("Square");

            if (this.shape == "square") {
                this.velocityY += this.Acceleration * 5;
                this.anim = "Square";

            }
            //this should probably get pulled into it own function with some kind of way to rotate between all shapes 
        } else {
            this.shapeshift("Circle");
        }
    }

    mvLeft() {
        if ((-this.velocityX) < this.MaxSpeed) {
            this.velocityX -= this.Acceleration;
            this.updateCollision();
        }
        console.log("going left");
        this.anim = "a";
    }

    mvRight() {
        if (this.velocityX < this.MaxSpeed) {
            this.velocityX += this.Acceleration;
            this.updateCollision();
        }
        console.log("going right");
        this.anim = "d";
    }

    mvDown() {
        if (this.velocityY < this.MaxSpeed) {
            this.velocityY += this.Acceleration * 0.25;
            this.updateCollision();
        }
        console.log("going down");
        if (this.velocityX > 0) {
            this.anim = "d";
        } else if (this.velocityX < 0) {
            this.anim = "a";
        } else {
            if (this.shape == "square") {
                this.anim = "Square";

            } else {
                this.anim = "still"
            }

        }
    }

    shapeshift(shapeType) {
        if (shapeType == "Square") {
            this.anim = "Square";
            this.shape = "square";
        }
        if (shapeType == "Circle") {
            this.shape = "circle";
        }
        // console.log("changing shape");
    }

    jumpCheck() {
        if (this.game.keys[" "] == true) {
            if ((-this.velocityY) < this.MaxSpeed) {
                this.velocityY -= 30 * this.Acceleration;
            }
        }
    }

    updateCollision() {
        //this.BoundingBox = new BoundingBox(this.x, this.y, 15, 15);
        this.BoundingCircle = new BoundingCircle(this.x + 7, this.y + 7, 6);
    }

    die() {
        // die animation/reset game
        ASSET_MANAGER.playAsset("./assets/Minecraft Damage (Oof) - Sound Effect (HD).mp3")
        this.dead = true;

    }
    restartCheck() {
        if (this.game.keys["r"] == true) {
            location.reload();
        }
    }

};