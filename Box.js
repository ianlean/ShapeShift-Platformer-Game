class Box {
    constructor(game, x, y, width, height) {
        Object.assign(this, {game, x, y, width, height})
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/square.png");
        this.boundingBox = new BoundingBox(x, y, width, height);
        console.log(this.boundingBox)
    };
    update() {
        this.updateCollision();
    };

    draw(ctx) {
        this.boundingBox.draw(ctx);
    };

    updateCollision() {
        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    }
}
