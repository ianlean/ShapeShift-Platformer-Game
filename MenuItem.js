class MenuItem {
    constructor(level, x, y,game, num,cam) {
        Object.assign(this, {level, x, y,game,num,cam})
      //  this.BoundingBox = new BoundingBox(this.x,this.y - 10 ,35, 10);
    }

    update() {
        if (this.game.keys[this.num] == true){
            console.log(this.level);
            this.cam.loadLevel(this.level, 0, 0)
        }
    }

    draw(ctx) {
      //  this.BoundingBox.draw(ctx)
        ctx.fillStyle = "blue"
        ctx.fillText(this.num +') '+ this.level['name'],this.x,this.y)
        }
}