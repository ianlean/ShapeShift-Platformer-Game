class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, { x, y, width, height });

        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    };

    collide(oth) {
        if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) {
           // console.log(this + " collided with " + oth);
            return true;
        }
        return false;
    };
    //for debugging purposes
    draw(ctx){
        ctx.strokeStyle = "Red";
        ctx.lineWidth = 3;
        ctx.strokeRect(this.left,this.top,this.width,this.height);
    }
    

};
