class Player {
    //
    constructor(game, x, y,cam) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/circlePixel.png");
        //this.BoundingBox;
        this.BoundingCircle
        this.CIRCLEXOFFSET = 7;
        this.CIRCLEYOFFSET = 7;
        this.x = x;
        this.y = y;
        this.RADIUS = 6
        this.speed = 1;
        this.MaxSpeed = 10;
        this.Acceleration = .09;
        this.gravity = .09;
        this.velocityX = 0;
        this.velocityY = 0;
        this.shape = "circle";
        // Get the animations
        this.anim = "still";
        this.animations = [];
        this.createAnimations();
        this.updateCollision();
        this.dead = false;
        this.prevX = x;
        this.prevY = y;
        this.SECONDPOINT = 10
        this.yadjust;
        this.xadjust
        this.cam = cam;
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
        this.gravity = 0.09
        this.prevX =  this.velocityX;
        this.prevY = this.velocityY;
        this.updateCollision(); 
        this.velocityY += this.gravity;
        this.keyCheck();
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.collisionCheck();
       // this.x += this.velocityX;
       // this.y += this.velocityY;
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
                this.collideFloor(entity)
            } else if (entity instanceof BottomlessPit) {
                this.collidePit(entity)
            } else if(entity instanceof Box){
                this.collideBox(entity);
            }
        });
    }

    collideBox(Box){
        if(this.BoundingCircle.RectCircleColliding(Box.boundingBox)){
            if(Box.boundingBox.top<this.y+this.RADIUS+this.CIRCLEYOFFSET&&!(Box.boundingBox.top+(this.RADIUS+this.CIRCLEYOFFSET)*1.5<this.y)){
                this.velocityY=0;
                this.y = Box.boundingBox.top-(this.RADIUS+this.CIRCLEYOFFSET)
                this.jumpCheck();
            }
            if(Box.boundingBox.bottom>this.y&&!(Box.boundingBox.bottom-((this.RADIUS+this.CIRCLEYOFFSET)*2)>this.y)){
                this.y = Box.boundingBox.bottom
            }
            if(Box.boundingBox.right<this.x+this.RADIUS+this.CIRCLEXOFFSET&&!(Box.boundingBox.right+(this.RADIUS+this.CIRCLEXOFFSET)*2<this.x)&&Box.boundingBox.top<this.y+this.RADIUS+this.CIRCLEYOFFSET){
                this.x = Box.boundingBox.right
                this.velocityX-=1.5*this.velocityX;     
            }
            if(Box.boundingBox.left>this.x-this.RADIUS+this.CIRCLEXOFFSET&&!(Box.boundingBox.left-((this.RADIUS+this.CIRCLEYOFFSET)*2)>this.x)&&Box.boundingBox.top<this.y+this.RADIUS+this.CIRCLEYOFFSET){
                this.x = Box.boundingBox.left-this.RADIUS-this.CIRCLEXOFFSET;
                this.velocityX-=1.5*this.velocityX
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
                if(this.y >=pointOfIntersect.y) {
                    this.yadjust = -(this.RADIUS*2 +getDistance(pointOfIntersect,perpLine.points[0]))*sinOfSlope;
                    //this.xadjust = (this.RADIUS*2 +getDistance(pointOfIntersect,perpLine.points[0]))*cosOfSlope;
                    this.y += this.yadjust;
                    //this.x += this.xadjust;
                    this.cam.updateCollisions('y','yadjust');
                    
                }else{
                    this.y -= (this.RADIUS*2-getDistance(pointOfIntersect,perpLine.points[0]))*sinOfSlope;
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
        var xPoints = pit.line.circleCollide(this.BoundingCircle);
        for (var i = 0; i < xPoints.length; i++) {
            if (pit.line.onSegment(xPoints[i])) {
                console.log("pit")
                this.die();
            }
        }
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
       // console.log(this.y);
        this.BoundingCircle = new BoundingCircle(this.x + this.CIRCLEXOFFSET, this.y + this.CIRCLEYOFFSET, this.RADIUS);
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