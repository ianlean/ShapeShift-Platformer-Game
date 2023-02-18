
class Spring {
    constructor(game, x, y, width, height) {
        Object.assign(this, {game, x, y, width, height})
        this.SPRING_VELOCITY = 0.5
        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height)
    }

    update() {
        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    draw(ctx) {

    }

    updateCollision() {
        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    collide(player) {
        if(player.BoundingCircle.RectCircleColliding(this.boundingBox)) {
            player.velocityY -= this.SPRING_VELOCITY
        }
    }
}