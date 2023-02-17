class Menu {
    constructor(game,cam,levels) {
        this.game = game;
        this.levels = levels;
        this.menuItems= []
        this.currentYVal = 35;
        this.MENUXSTART = 45;
        for(let i = 1; i <= this.levels.length; i++){
            this.menuItems.push(new MenuItem(level1, this.MENUXSTART, this.currentYVal , game, i, cam))
            this.currentYVal += 10;
        }
    };
    update() {
        this.menuItems.forEach(m => {
            m.update();
        })
    };
    draw(ctx) {
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
