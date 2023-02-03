class floor {
    constructor(game, x, y, p1, p2) {
        Object.assign(this, {game, x, y, p1, p2})
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/square.png");
        //this.BoundingBox = new BoundingBox(this.x, this.y, width, height);
        this.line = new Line(this.game);
        this.line.points[0] = this.p1
        this.line.points[1] = this.p2
    };
    update() {
        this.updateCollision();
    };

    draw(ctx) {
        // ctx.drawImage(this.spritesheet, this.x, this.y, this.width, this.height);
        if (this.line != undefined) {
            this.line.draw(ctx);
        }
    };

    updateCollision() {
        // this.BoundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
        this.line = new Line(this.game);
        this.line.points[0] = new Point(this.p1.x + this.x, this.p1.y + this.y);
        this.line.points[1] = new Point(this.p2.x + this.x, this.p2.y + this.y);
    }

}