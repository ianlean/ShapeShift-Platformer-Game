class Background {
    constructor(imagepath, x, y, width, height) {
        Object.assign(this, {imagepath, x, y, width, height})
    }

    update() {
        
    }

    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset(this.imagepath), this.x, this.y, this.width, this.height)
    }

    updateCollision() {
        
    }
}