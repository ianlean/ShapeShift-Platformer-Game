class BoundingCircle {
    constructor(x, y, radius) {
        Object.assign(this, { x, y, radius });
    };

    //for debugging purposes
    draw(ctx) {
        
        ctx.strokeStyle = "Red";
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        //ctx.fill();
        ctx.stroke();
    }

    update() {

    }

    collide(oth) {
        //compare the distance to combined radii
        if (oth != undefined && other instanceof BoundingCircle) {
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

    RectCircleColliding(rect) {
        if (rect != undefined) {
            var distX = Math.abs(this.x - rect.x-rect.width/2);
            var distY = Math.abs(this.y - rect.y-rect.height/2);
        
            if (distX > (rect.width/2 + this.radius)) { return false; }
            if (distY > (rect.height/2 + this.radius)) { return false; }
        
            if (distX <= (rect.width/2)) { return true; } 
            if (distY <= (rect.height/2)) { return true; }
        
            var dx=distX-rect.width/2;
            var dy=distY-rect.height/2;
            return (dx*dx+dy*dy<=(this.radius*this.radius));
            }
    }
};
