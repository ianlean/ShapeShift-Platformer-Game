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

        this.x += this.velocityX;
        this.y += this.velocityY;
    };

    draw(ctx){
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/circlePixel.png"), this.x, this.y);
    };

}