class BoundingLine {
    constructor(game, p1, p2) {
        Object.assign(this, { game, p1, p2 });
        if ((this.p2.x - this.p1.x) != 0) {
            this.slope = ((this.p2.y - this.p1.y) / (this.p2.x - this.p2.y))
        } else {
            this.slope = 0
        }
    };

    collide(oth) {
        if (this.slope === oth.slope()) return false;

        var intersect = {}
        intersect.x = (oth.yInt() - this.yInt()) / (this.slope - oth.slope)
        intersect.y = this.slope * intersect.x + this.yInt()

        return intersect
    }

    circleCollide(circle) {

    }

    updateBox() {

    }

    update() {

    }

    //for debugging purposes
    draw(ctx) {
        ctx.strokeStyle = "Red";
        ctx.lineWidth = 3;
        ctx.beginPath()
        ctx.moveTo(this.p1.x, this.p1.y)
        ctx.lineTo(this.p2.x, this.p2.y)
        ctx.stroke()
        ctx.closePath()
    }

    yInt() {
        if (this.p1.x === this.p2.x) return this.p1.x === 0 ? 0 : false
        if (this.p1.y === this.p2.y) return this.p1.y
        return this.p1.y - this.slope * this.p1.x
    }

    xInt() {
        if (this.p1.y === this.p2.y) return this.p1.y === 0 ? 0 : false
        if (this.p1.x === this.p2.x) return this.p1.x
        return (-1 * this.yInt() / this.slope)
    }

    onSegment(x) {
        return (this.p1.x <= x && x<= this.p2.x)
    }
}