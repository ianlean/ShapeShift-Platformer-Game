class Laser {

    constructor(game, x, y) {
        Object.assign(this, {game,x,y,length});
        this.BoundingBox = new BoundingBox(this.x,this.y,10,3);
        this.originalX = this.x;
        this.velocity = 4;
    };

    update() {
        if (this.x <= 0) {
            this.x = this.originalX;
        } else {this.x-=this.velocity;}
        this.updateBox();
    }

    updateBox() {
        this.BoundingBox = new BoundingBox(this.x, this.y, 10, 3);
    }

    draw(ctx) {
        ctx.strokeStyle = "Red";
        ctx.lineWidth = 3;
        ctx.strokeRect(this.x,this.y,10,3);
        
    };
};