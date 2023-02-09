class spike {
    //
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.BoundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    };
    update() {

    };
    draw(ctx) {
        this.BoundingBox.draw(ctx);
    };
    updateCollision() {
        this.BoundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    }



}