class Fire {
    //
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.BoundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/campfire.png"), 0, 0, 16, 16, 4, .1, 0, false, true);
        //spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop
    };
    update() {

    };
    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y,2);
    };
    updateCollision() {
        this.BoundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    }



}
