class floor {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/square.png");
        this.BoundingBox = new BoundingBox(this.x, this.y, width, height);
    };
    update() {
        this.updateBox()
    };

    draw(ctx) {
        // ctx.drawImage(this.spritesheet, this.x, this.y, this.width, this.height);
        // this.BoundingBox.draw(ctx);
    };

    updateBox() {
        this.BoundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    }

}