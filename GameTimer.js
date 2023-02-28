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
        var result = Math.round(this.currentTime*100)/100;
        var resultMin = Math.floor(result/60);
        ctx.fillText(resultMin+":"+Math.round((result-(60*resultMin))*100)/100, PARAMS.CANVAS_WIDTH-230,50)
    }

    stop() {
        this.stopped = true;
    }
}