class spike {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.BoundingBox = new BoundingBox(this.x, this.y, 33, 33);
    };
    update() {

    };
    draw(ctx) {
        this.BoundingBox.draw(ctx);
    };
    updateBox() {
        this.BoundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    }



}