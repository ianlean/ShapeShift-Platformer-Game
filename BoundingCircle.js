class BoundingCircle {
    constructor(x, y, radius) {
        Object.assign(this, { x, y, radius });
    };

    //for debugging purposes
    draw(ctx) {
        ctx.strokeStyle = "Red";
        ctx.lineWidth = 10;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    update() {

    }

    collide(oth) {
        //compare the distance to combined radii
        if (oth != undefined) {
            var dx = oth.x - this.x;
            var dy = oth.y - this.y;
            var radii = oth.radius + this.radius;
            if ( ( dx * dx )  + ( dy * dy ) < radii * radii ) {
                return true;
            } else {
                return false;
            }
        }
    }
};
