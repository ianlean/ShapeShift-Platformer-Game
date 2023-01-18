class Player {

    constructor(game,x,y) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/circlePixel.png"),0 , 0, 120, 120, 6, 0.2 ,1, false ,true);
        this.x = x;
        this.y = y;
        this.speed = 1;
        this.MaxSpeed = 10;
        this.Acceleration = .09;
        this.velocityX = 0;
        this.velocityY = 0;
        this.shape="circle";
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/circlePixel.png");
        this.updateBox();
    };
    
    update() {
        
        this.updateBox();

        //collision check
        this.game.entities.forEach(entity => {
            this.playerBox.collide(entity);
        });

        //key check
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
            this.velocityY += this.Acceleration;
            }
        }
        if(this.game.keys["d"] == false && this.game.keys["a"] == false 
        && this.game.keys["w"] == false && this.game.keys["s"] == false){
            this.velocityX -= this.velocityX;
            this.velocityY -= this.velocityY;
        }
        
        if(this.game.keys["Shift"] == true){ 
        if(this.shape=="circle"){
            this.spritesheet = ASSET_MANAGER.getAsset("./assets/sqaurePixel.png")
            this.shape= "square";
        }else if(this.shape=="square"){
            this.spritesheet = ASSET_MANAGER.getAsset("./assets/trianglePixel.png")
            this.shape= "triangle";
        }else if(this.shape=="triangle"){
            this.spritesheet = ASSET_MANAGER.getAsset("./assets/circlePixel.png")
            this.shape="circle";
        }
            console.log("changing shape");
            //this should probably get pulled into it own function with some kind of way to rotate between all shapes 
        }
        
        this.x += this.velocityX;
        this.y += this.velocityY;
        //gravity and other thing effecting movement could go here
    };

    draw(ctx){
        ctx.drawImage(this.spritesheet, this.x, this.y,30,30);
    };

    updateBox() {
        this.playerBox = new BoundingBox(this.x, this.y, 30, 30);
    }

}