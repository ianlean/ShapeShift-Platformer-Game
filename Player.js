class Player {

    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/circlePixel.png"),0 , 0, 120, 120, 6, 0.2 ,1, false , true);
        this.x = 0;
        this.y = 0;
        this.speed = 500;
        const MaxSpeed = 500;
        const Acceleration = 50;
        var velocityX;
        var velocityY;
    };

    update() {
        
        this.x += 1;
        this.y += 1;
    };

    draw(ctx){
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/circlePixel.png"), this.x, this.y);
    };

}