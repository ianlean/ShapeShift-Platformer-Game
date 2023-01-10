class Player {

    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/circlePixel.png"),0 , 0, 120, 120, 6, 0.2 ,1, false , true);
        this.x = 0;
        this.y = 0;
        this.speed = 1;
        const MaxSpeed = 500;
        const Acceleration = 1;
        this.velocityX = 0;
        this.velocityY = 0;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/circlePixel.png")
    };
    
    update() {
        if(this.game.keys["d"] == true){
            this.velocityX = 1
        }
        if(this.game.keys["a"] == true){
            this.velocityX = -1
        }
        if(this.game.keys["w"] == true){
            this.velocityY = -1
        }
        if(this.game.keys["s"] == true){
            this.velocityY = 1
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