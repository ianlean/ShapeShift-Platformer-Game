class Player {

    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/circlePixel.png"),0 , 0, 120, 120, 6, 0.2 ,1, false ,true);
        this.x = 0;
        this.y = 0;
        this.speed = 1;
        this.MaxSpeed = 10;
        this.Acceleration = 0.09;
        this.velocityX = 0;
        this.velocityY = 0;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/circlePixel.png");
    };
    
    update() {
        var boundingBoxPlayer = new BoundingBox(this.x,this.y,55,55);
        
        if(this.game.keys["d"] == true){
            if(this.velocityX<this.MaxSpeed){
            this.velocityX += this.Acceleration;
            }
        }
        if(this.game.keys["a"] == true){
            if((-this.velocityX)<this.MaxSpeed){
            this.velocityX -= this.Acceleration;
            console.log(this.velocityX);
            }
        }
        if(this.game.keys["w"] == true){
            if((-this.velocityY)<this.MaxSpeed){
            this.velocityY -= this.Acceleration;
            }
        }
        if(this.game.keys["s"] == true){
            if(this.velocityY<this.MaxSpeed){
            this.velocityY += this.Acceleration*2;
            }
        }
        if(this.game.keys["d"] == false && this.game.keys["a"] == false 
        && this.game.keys["w"] == false && this.game.keys["s"] == false){
            this.velocityX = 0;
            this.velocityY = 0;
        }
    
        if(this.game.keys["Shift"]== true){ 
            this.spritesheet = ASSET_MANAGER.getAsset("./assets/sqaurePixel.png")
            console.log("changing shape")
            //this should probably get pulled into it own function with some kind of way to rotate between all shapes 
        }
        
        this.x += this.velocityX;
        this.y += this.velocityY;
        //gravity and other thing effecting movement could go here
    };

    draw(ctx){
        ctx.drawImage(this.spritesheet, this.x, this.y);
    };

    

}