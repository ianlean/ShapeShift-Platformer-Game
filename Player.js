class Player {
    //
    constructor(game, x, y, cam) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/circlePixel.png");
        //this.BoundingBox;
        this.BoundingCircles
        this.CIRCLEXOFFSET = 20.5;
        this.CIRCLEYOFFSET = 20.5;
        this.x = x;
        this.y = y;
        this.RADIUS = 20.5
        this.speed = 1;
        this.MaxSpeed = 20;
        this.Acceleration = .15;
        this.gravity = 0.09;
        this.velocityX = 0;
        this.velocityY = 0;
        this.lastBB = this.BoundingCircle;
        this.shape = "circle";
        this.isJumping = false;
        this.hasJumpedOnce = false;
        this.dashWasNotUsed = true;
        this.isNotStuckOnWall = true;
        // this.isNotStuckLeft = true;
        // this.isNotStuckRight = true;
        // Get the animations
        this.anim = "still";
        this.animations = [];
        this.createAnimations();
        this.updateCollision();
        this.dead = false;
        this.win = false;
        this.SECONDPOINT = 10
        this.yadjust;
        this.xadjust
        this.cam = cam;
        this.gametimer = new GameTimer();
        this.waitTimer = 250;
        this.firstWin = true;
        console.log(this);
    };

    createAnimations() {
        //spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop
        // rolling right animation
        this.animations["d"] = new Animator(ASSET_MANAGER.getAsset("./assets/spritesheet_5.png"), 0, 0, 411, 411, 9, 0.1, 0, false, true);
        //sitting still
        this.animations["still"] = new Animator(ASSET_MANAGER.getAsset("./assets/spritesheet_5.png"), 411 * 9, 0, 411, 411, 5, 0.1, 0, false, true)
        //rolling left animation
        this.animations["a"] = new Animator(ASSET_MANAGER.getAsset("./assets/spritesheet_5.png"), 0, 0, 411, 411, 9, 0.1, 0, true, true);
        //square shift
        this.animations["Square"] = new Animator(ASSET_MANAGER.getAsset("./assets/sqaurePixel.png"), 0, 0, 32, 32, 1, 1, 0, false, true);
        //triangle
        this.animations["triangle"] = new Animator(ASSET_MANAGER.getAsset("./assets/triangle.png"), 0, 0, 411, 411, 1, 1, 0, false, true);
    }

    // Try to keep this function small, extrapilate logic to other functions
    update() {
        console.log(this.shape);
        if(this.win){
            this.winner();
        }
        if (this.isJumping && !this.game.keys[" "]) {
            this.hasJumpedOnce = true;
        }
        this.gravity = 0.09
        this.prevX = this.velocityX;
        this.prevY = this.velocityY;
        this.updateCollision();
        if (this.velocityY + this.gravity >= this.MaxSpeed) {
            this.velocityY = this.MaxSpeed;
        } else {
            this.velocityY += this.gravity;
        }
        this.keyCheck();
        if (this.isNotStuckOnWall) {
            this.x += this.velocityX;
            this.y += this.velocityY;
        }
        this.collisionCheck();
        // this.x += this.velocityX;
        // this.y += this.velocityY;
        this.updateCollision();
        this.restartCheck()
        this.gametimer.update();
        //gravity and other thing effecting movement could go here
    };

    draw(ctx) {
        this.gametimer.draw(ctx)
        if (this.shape == "circle") {
            if (this.anim == 'still') {
                this.animations[this.anim].drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.1);
            } else {
                this.animations[this.anim].drawFrame(this.game.clockTick * (Math.abs(this.velocityX) / 3), ctx, this.x, this.y, .1);
            }
        } else if (this.shape == "triangle") {
            console.log(this.anim);
            this.animations[this.anim].drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.1);
        } else {
            this.animations[this.anim].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5);
        }
        if (this.dead && !this.win) {
            drawDied(ctx);
        }
        if (this.win && !this.dead) {
            drawWin(ctx);
        }
        // if (this.BoundingCircle != undefined) { this.BoundingCircle.draw(ctx)}//this.BoundingCircle.draw(ctx); }
    };





    collisionCheck() {
        this.game.entities.forEach(entity => {

            if (entity instanceof floor) {
                this.collideFloor(entity)
            } else if (entity instanceof BottomlessPit) {
                this.collidePit(entity)
            } else if (entity instanceof Box) {
                this.collideBox(entity);
            } else if (entity instanceof spike) {
                this.collideSpike(entity);
            } else if (entity instanceof Win) {
                this.collideWin(entity);
            } else if (entity instanceof BreakableFloor) {
                entity.collide(this)
            } else if (entity instanceof Spring) {
                // this.touchedGround();
                entity.collide(this)
                this.isJumping = true;
            }
        });
    }
    collideSpike(Spikes) {
        if (this.BoundingCircle.RectCircleColliding(Spikes.BoundingBox)) {
            console.log("ded")
            this.die();
        }
    }
    collideWin(Wins) {
        if (this.BoundingCircle.RectCircleColliding(Wins.boundingBox) && this.firstWin) {
            console.log("Won")
            this.winner();
            this.firstWin = false;
        }
    }
    collideBox(Box) {
        var adjustedTop = Math.abs(this.lastBB.y - Box.boundingBox.top)
        var adjustedBottom = Math.abs(this.lastBB.y - Box.boundingBox.bottom)
        var adjustedLeft = Math.abs(this.lastBB.x - Box.boundingBox.left)
        var adjustedRight = Math.abs(this.lastBB.x - Box.boundingBox.right)
        // if (this.BoundingCircle.RectCircleColliding(Box.boundingBox) && this.isNotStuckOnWall) {
        if (this.BoundingCircle.RectCircleColliding(Box.boundingBox)) {

            // this.touchedGround();

            var isCollidingLeft = adjustedLeft < this.RADIUS;
            var isCollidingRight = adjustedRight < this.RADIUS;
            var isCollidingBottom = adjustedBottom < this.RADIUS;
            var isCollidingTop = adjustedTop < this.RADIUS;
            if (isCollidingTop) {
                this.velocityY = 0;
                this.y = Box.boundingBox.top - (this.RADIUS + this.CIRCLEYOFFSET)
                this.jumpCheck();
                this.touchedGround();
            }
            if (isCollidingBottom && !isCollidingLeft && !isCollidingRight) {
                this.y = Box.boundingBox.bottom
                this.velocityY -= this.velocityY;
            }
            if (isCollidingRight && !isCollidingTop && !isCollidingBottom) {
                // console.log("right")
                if (this.shape == "triangle" && this.isNotStuckOnWall) {
                    // this.stickToWall();
                    this.isNotStuckRight = false;
                }
                if (this.velocityX <= 0) {
                    this.velocityX -= 1.5 * this.velocityX;
                }
                if (adjustedTop < adjustedRight) {
                    this.x = Box.boundingBox.right
                }
            }
            if (isCollidingLeft && !isCollidingTop && !isCollidingBottom) {
                // console.log("left")

                if (this.shape == "triangle" && this.isNotStuckOnWall) {
                    // this.stickToWall();
                    this.isNotStuckLeft = false;
                }
                if (this.velocityX >= 0) {
                    this.velocityX -= 1.5 * this.velocityX
                }
                if (adjustedTop < adjustedLeft) {
                    this.x = Box.boundingBox.left - this.RADIUS - this.CIRCLEXOFFSET;
                }


            }


            if (isCollidingTop && isCollidingRight) {
                // console.log("corner")
                this.touchedGround();
                if (adjustedTop + this.RADIUS >= adjustedRight) {
                    // console.log("top seniority")
                    this.velocityY = 0;
                    this.y = Box.boundingBox.top - (this.RADIUS + this.CIRCLEYOFFSET)
                    this.jumpCheck();
                } else if (adjustedTop < adjustedRight) {
                    this.velocityX -= this.velocityX;
                    this.x = Box.boundingBox.right
                }
            }
            if (isCollidingTop && isCollidingLeft) {
                // console.log("corner")
                this.touchedGround();
                if (adjustedTop + this.RADIUS >= adjustedLeft) {
                    // console.log("top seniority")
                    this.velocityY = 0;
                    this.y = Box.boundingBox.top - (this.RADIUS + this.CIRCLEYOFFSET)
                    this.jumpCheck();
                } else if (adjustedTop < adjustedRight) {
                    this.velocityX -= this.velocityX;
                    this.x = Box.boundingBox.left - this.RADIUS - this.CIRCLEXOFFSET
                }
            }
            if (isCollidingBottom && isCollidingRight) {
                // console.log("right bottom corner")
                if (adjustedBottom >= adjustedRight) {
                    // console.log("Bottom seniority")
                    this.velocityY -= this.velocityY;
                    this.y = Box.boundingBox.bottom

                } else {
                    this.velocityX -= this.velocityX;
                    this.x = Box.boundingBox.right
                }
            }
            if (isCollidingBottom && isCollidingLeft) {
                // console.log("left corner")
                if (adjustedBottom >= adjustedLeft) {
                    // console.log("bottom seniority")
                    this.velocityY -= this.velocityY;
                    this.y = Box.boundingBox.bottom

                } else {
                    this.velocityX -= this.velocityX;
                    this.x = Box.boundingBox.left - this.RADIUS - this.CIRCLEXOFFSET
                }
            }
        }
    }

    collideFloor(floor) {
        var collisionPoints = floor.line.circleCollide(this.BoundingCircle);



        for (var i = 0; i < collisionPoints.length; i++) {
            if (floor.line.onSegment(collisionPoints[i])) {
                var perpLine = this.getPerpLine(floor)
                let perpslope = -1 / floor.line.slope();

                var pointOfIntersect = perpLine.collide(floor.line);
                var sinOfSlope = this.getSinOfSlope(floor.line)
                var cosOfSlope = this.getCosOfSlope(floor.line)
                let normY = 0;
                let normX = 0;
                if (this.y >= pointOfIntersect.y) {
                    this.yadjust = -(this.RADIUS * 2 + getDistance(pointOfIntersect, perpLine.points[0])) * sinOfSlope;
                    //this.xadjust = (this.RADIUS*2 +getDistance(pointOfIntersect,perpLine.points[0]))*cosOfSlope;
                    this.y += this.yadjust;
                    //this.x += this.xadjust;
                    this.cam.updateCollisions('y', 'yadjust');

                } else {
                    this.y -= (this.RADIUS * 2 - getDistance(pointOfIntersect, perpLine.points[0])) * sinOfSlope;
                }
                this.velocityY = 0;
                this.updateCollision();
                this.jumpCheck();
            }
        }
    }

    getPerpLine(floor) {
        var perpSlope = -1 / floor.line.slope();
        var perpLine = new Line(this.game);
        perpLine.points[0] = new Point(this.x, this.y);
        perpLine.points[1] = new Point(this.x + this.SECONDPOINT, (this.y + this.SECONDPOINT) * perpSlope);
        return perpLine
    }

    getSinOfSlope(line) {
        return 1 * (line.points[1].y - line.points[0].y) / getDistance(line.points[0], line.points[1]);
    }

    getCosOfSlope(line) {
        return 1 * (line.points[1].x - line.points[0].x) / getDistance(line.points[0], line.points[1]);
    }

    collidePit(pit) {
        if (this.BoundingCircle.RectCircleColliding(pit.BoundingBox)) {
            this.die();
        }
        // var xPoints = pit.line.circleCollide(this.BoundingCircle);
        // for (var i = 0; i < xPoints.length; i++) {
        //     if (pit.line.onSegment(xPoints[i])) {
        //         console.log("pit")
        //         this.die();
        //     }
        // }
    }



    keyCheck() {
        let aKeyIsPressed = key => key === false;
        if (!this.game.keys.every(aKeyIsPressed) || this.dead || this.win) { //no key is pressed so we idle
            // If the player is not pressing a key
            this.anim = "still";
        } else if (this.isJumping && this.hasJumpedOnce && this.game.keys[" "] && this.dashWasNotUsed) {
            this.dash();
        } else if (this.shape != "triangle" && this.isNotStuckOnWall) {
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
                this.touchedGround();
            }
            //this should probably get pulled into it own function with some kind of way to rotate between all shapes 
        } else if (this.isJumping && !this.dashWasNotUsed && this.hasJumpedOnce) {
            this.shapeshift("triangle");
        } else {
            this.shapeshift("Circle");
        }
    }

    mvLeft() {
        if ((-this.velocityX) < this.MaxSpeed) {
            this.velocityX -= this.Acceleration;
            this.updateCollision();
        }
        // console.log("going left");
        this.anim = "a";
    }

    mvRight() {
        if (this.velocityX < this.MaxSpeed) {
            this.velocityX += this.Acceleration;
            this.updateCollision();
        }
        // console.log("going right");
        this.anim = "d";
    }

    mvDown() {
        if (this.velocityY < this.MaxSpeed) {
            this.velocityY += this.Acceleration * 0.25;
            this.updateCollision();
        }
        // console.log("going down");
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

    dash() {
        this.dashWasNotUsed = false;
        let horizontalMultiplyer = 20;
        let verticalMultiplyer = 30;
        console.log("dashed");
        this.anim = "triangle";
        this.shape = "triangle";
        // this.collisionCheck();

        if (this.game.keys["d"] && this.game.keys["w"] && this.isNotStuckRight) {
            this.velocityX += this.Acceleration * horizontalMultiplyer;
            this.velocityY -= 20 * this.Acceleration;
            this.isNotStuckLeft = true;
        } else if (this.game.keys["d"] && this.isNotStuckRight) {
            this.velocityX += this.Acceleration * horizontalMultiplyer;
            this.isNotStuckLeft = true;
        } else if (this.game.keys["a"] && this.game.keys["w"] && this.isNotStuckLeft) {
            this.velocityX -= this.Acceleration * horizontalMultiplyer;
            this.velocityY -= this.Acceleration * verticalMultiplyer;
            this.isNotStuckRight = true;
        } else if (this.game.keys["a"] && this.isNotStuckLeft) {
            this.velocityX -= this.Acceleration * horizontalMultiplyer;
            this.isNotStuckRight = true;
        } else if (this.isNotStuckOnWall) {
            this.velocityY -= this.Acceleration * verticalMultiplyer;
        }
        // this.isNotStuckOnWall = true;
        this.collisionCheck();
    }

    stickToWall() {
        this.gravity = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.dashWasNotUsed = true;
        this.isNotStuckOnWall = false;
        this.anim = "triangle";
        this.shape = "triangle";
    }

    wallJump() {

    }

    shapeshift(shapeType) {
        if (shapeType == "Square") {
            this.anim = "Square";
            this.shape = "square";
        }
        if (shapeType == "Circle") {
            this.shape = "circle";
        }

        if (shapeType == "Triangle") {
            this.anim = "triangle";
            this.shape = "triangle";
        }

        // console.log("changing shape");
    }

    jumpCheck() {
        if (this.game.keys[" "] == true && !this.dead && !this.win) {
            if ((-this.velocityY) < this.MaxSpeed) {
                this.velocityY -= 20 * this.Acceleration;
                this.isJumping = true;
            }
        }
    }

    touchedGround() {
        this.isJumping = false;
        this.dashWasNotUsed = true;
        this.hasJumpedOnce = false;
        this.isNotStuckLeft = true;
        this.isNotStuckRight = true;
        this.isNotStuckOnWall = true;
        this.gravity = 0.09;
    }

    updateCollision() {
        //this.BoundingBox = new BoundingBox(this.x, this.y, 15, 15);
        // console.log(this.y);
        this.lastBB = this.BoundingCircle;
        this.BoundingCircle = new BoundingCircle(this.x + this.CIRCLEXOFFSET, this.y + this.CIRCLEYOFFSET, this.RADIUS);
    }

    die() {
        // die animation/reset game
        if (!this.win && !this.dead) {
            ASSET_MANAGER.pauseBackgroundMusic()
            ASSET_MANAGER.playAsset("./assets/Minecraft Damage (Oof) - Sound Effect (HD).mp3")
            this.velocityX -= this.velocityX * 0.25
            this.velocityY -= this.velocityY * 0.5
            this.dead = true;
            this.stopTimer()
        }
    }
    winner() {
        if (!this.dead) {
            this.velocityX -= this.velocityX * 0.25
            this.velocityY -= this.velocityY * 0.80
            this.win = true;
            this.stopTimer();
            console.log(this.waitTimer)
            this.waitTimer-=1;
            if(this.waitTimer < 0){
                this.cam.loadNextLevel();
            }
        }
        
        
    }
    restartCheck() {
        if (this.game.keys["r"] == true) {
            location.reload();
        }
    }

    stopTimer() {
        this.gametimer.stop();
    }
};