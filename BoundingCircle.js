class BoundingCircle {
    constructor(x, y, radius) {
        Object.assign(this, { x, y, radius });
    };

    collide(oth) {//logic still needs to be written
        return false;
    };
    //for debugging purposes
    draw(ctx){
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    }
}
