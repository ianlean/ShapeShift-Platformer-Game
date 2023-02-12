class floor {
    //
    constructor(game, x, y, p1, p2) {
        Object.assign(this, {game, x, y, p1, p2})
        if(isNaN(p2)) {
            console.log(typeof p2)
            console.log(this)
            throw Error("p2 is NaN")
        }
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/square.png");
        this.line = new Line(this.game);
        this.line.points[0] = this.p1
        this.line.points[1] = this.p2
    };
    update() {
        this.updateCollision();
    };

    draw(ctx) {
        if (this.line != undefined) {
            this.line.draw(ctx);
        }
    };

    updateCollision() {
        this.line = new Line(this.game);
        this.line.points[0] = new Point(this.p1.x + this.x, this.p1.y + this.y);
        this.line.points[1] = new Point(this.p2.x + this.x, this.p2.y + this.y);
    }

}
