class BottomlessPit {
    //
    constructor(game, x, y, width, height) {
        Object.assign(this, {game, x, y, width, height})

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/square.png");
        this.BoundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
        // this.line = new Line(this.game);
        // this.line.points[0] = new Point(this.x,this.y);
        // this.line.points[1] = new Point(this.x + this.width  ,this.y)
    };
    update() {
        this.updateCollision();
    };

    draw(ctx) {
        //ctx.drawImage(this.spritesheet, this.x, this.y, this.width, this.height);
        if (this.line != undefined) {
            this.line.draw(ctx);
        }
    };

    updateCollision() {
        this.BoundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
        // this.line = new Line(this.game);
        // this.line.points[0] = new Point(this.x,this.y);
        // this.line.points[1] = new Point(this.width + this.x,this.y+50);
    }

}
