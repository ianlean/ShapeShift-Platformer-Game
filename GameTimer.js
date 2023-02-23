class GameTimer {

    constructor() {
        this.start = performance.now()
        this.currentTime;
        this.stopped = false;
    }

    update() {
        if (!this.stopped) {
            this.currentTime = (performance.now() - this.start)/1000;
        }
    }

    draw(ctx) {
        ctx.strokeStyle = 'RED';
        ctx.font = "70px Russo-Regular"
        ctx.fillText(this.currentTime, PARAMS.CANVAS_WIDTH-200,50)
    }

    stop() {
        this.stopped = true;
    }
}