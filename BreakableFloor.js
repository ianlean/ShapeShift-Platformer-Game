class BreakableFloor {
    constructor(game, x, y, width, height) {
        Object.assign(this, { game, x, y, width, height });
        this.box = new Box(this.game, this.x, this.y, this.width, this.height)
        this.originalX = this.x;
        this.BREAKING_VELOCITY = 1;
        this.isBroken = false;
    };

    update() {
        this.updateCollision();
    }

    updateCollision() {
        if(!this.isBroken) {
            this.box = new Box(this.game, this.x, this.y, this.width, this.height)
        }
    }

    collide(player) {
        if(player.shape == 'square' && player.velocityY > this.BREAKING_VELOCITY && player.BoundingCircle.RectCircleColliding(this.box)) {
            this.break()
        } else if(!this.isBroken) {
            player.collideBox(this.box)
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