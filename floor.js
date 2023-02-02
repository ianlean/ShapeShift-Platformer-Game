class floor {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/square.png");
        //this.BoundingBox = new BoundingBox(this.x, this.y, width, height);
        this.line = new Line(this.game);
        this.line.points[0] = new Point(this.x,this.y);
        this.line.points[1] = new Point(this.width + this.x,this.y+50)
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
        // this.BoundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
        this.line = new Line(this.game);
        this.line.points[0] = new Point(this.x,this.y);
        this.line.points[1] = new Point(this.width + this.x,this.y+50);
    }

}