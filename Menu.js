class Menu {
    constructor(game,cam,levels) {
        this.background = new Background("./assets/menuBackground.png", 0, 0, 3840 / 10, 2160 / 10)
        this.game = game;
        this.levels = levels;
        this.menuItems= []
        this.currentYVal = 35;
        this.MENUXSTART = 45;
        for(let i = 0; i < this.levels.length; i++){
            this.menuItems.push(new MenuItem(levels[i], this.MENUXSTART, this.currentYVal , game, i + 1, cam))
            this.currentYVal += 10;
        }
    };
    update() {
        this.menuItems.forEach(m => {
            m.update();
        })
    };
    draw(ctx) {
            //this.background.draw(ctx)
            ctx.fillStyle = "#A0CEEA"
            ctx.fillRect(0,0,PARAMS.CANVAS_WIDTH,PARAMS.CANVAS_HEIGHT)
            ctx.fillStyle = "blue"
            ctx.font = "20px Russo-Regular"
            ctx.fillText("ShapeShift", this.MENUXSTART, 15)
            ctx.font = "10px Russo-Regular"
            ctx.fillText("Hit The Number of the level you want to play", this.MENUXSTART, this.currentYVal)
            this.menuItems.forEach(m => {
                m.draw(ctx)
            })
    };



}
