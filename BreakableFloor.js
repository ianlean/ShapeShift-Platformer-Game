class BreakableFloor {
    constructor(game, x, y, width, height) {
        Object.assign(this, { game, x, y, width, height });
        this.BoundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
        this.originalX = this.x;
        this.velocity = 4;
        this.isBroken = false;
    };

    update() {
        this.updateCollision();
    }

    updateCollision() {
        if(!this.isBroken) {
            this.BoundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
        }
    }

    break() {
        this.isBroken = true;
        this.removeFromWorld = true;
    }

    draw(ctx) {
        ctx.strokeStyle = "Red";
        ctx.lineWidth = 3;
        ctx.fillStyle = "Red"
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
}