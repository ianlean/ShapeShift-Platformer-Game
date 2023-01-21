class floor {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/square.png");
        this.BoundingBox = new BoundingBox(this.x, this.y, 30, 30);
    };
    update() {

    };
    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, 30, 30);
       // this.BoundingBox.draw(ctx);
    };

    updateBox() {
        this.BoundingBox = new BoundingBox(this.x, this.y, 30, 30);
    }

}