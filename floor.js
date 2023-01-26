class floor {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        // this.spritesheet = ASSET_MANAGER.getAsset("./assets/square.png");
        this.BoundingBox = new BoundingBox(this.x, this.y, width, height);
    };
    update() {

    };

    updateBox() {
        this.BoundingBox = new BoundingBox(this.x, this.y, width, height);
    }

}