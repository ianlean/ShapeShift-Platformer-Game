class SceneManager {
    //
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.score = 0;
        this.background = new Background("./assets/menuBackground.png", 0, 0, 3840 / 10, 2160 / 10)
        this.player;
        this.levelLoaded = false;
        this.elapsedTime = 0;
        this.menuItems = [new MenuItem(level1, 45, 35, game, 1, this), new MenuItem(slope, 45, 55, game, 2, this)]
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };



    loadLevel(level, x, y) {
        var layers = level.data["layers"]
        var spikes = layers.findIndex(l => l["name"] == "Spikes")
        var floors = layers.findIndex(l => l["name"] == "Floor")
        var bigRamp = layers.findIndex(l => l["name"] == "Big Ramp")
        var smallRamp = layers.findIndex(l => l["name"] == "Small Ramp")
        var slope = layers.findIndex(l => l["name"] == "Slope")

        console.log(level)
        this.player = new Player(this.game, 0, 0);
        this.game.addEntity(this.player);

        this.background = new Background(level.background, x, y, level.width, level.height)

        var i = level.data["layers"].findIndex(l => l["name"] == "Floor")

        if (floors > -1) {
            layers[floors]["objects"].forEach(f => {
                var points = f["polyline"]
                if (points.length > 1) {
                    for (let i = 0; i < points.length - 1; i++) {
                        console.log(points[i]["x"])
                        var fl = new floor(this.game, 0, 0, new Point(f["x"] + points[i]["x"], f["y"] + points[i]["y"]), new Point(f["x"] + points[i + 1]["x"], f["y"] + points[i + 1]["y"]))
                        this.game.addEntity(fl)
                        console.log(fl)
                    }
                }
            });
        }

        if (spikes > -1) {
            layers[spikes]["objects"].forEach(s => {
                console.log(s)
                var sp = new spike(this.game, s["x"], s["y"], s["width"], s["height"])
                this.game.addEntity(sp)
                console.log(sp)
            })
        }
        this.game.addEntity(this.background)
        console.log(level.data["layers"][floors]["objects"])

        if (level.spike) {
            for (var i = 0; i < level.spike.length; i++) {
                let Spike = level.spike[i];
                this.game.addEntity(new spike(this.game, Spike.x, Spike.y));
            }
        }
        if (level.laser) {
            for (var i = 0; i < level.laser.length; i++) {
                let laser = level.laser[i];
                this.game.addEntity(new Laser(this.game, laser.x, laser.y));
            }
        }
        this.levelLoaded = true;
    };

    update() {
        if (this.levelLoaded) {
            this.handleCamMovement();
            this.elapsedTime += this.game.clockTick;
        } else {
            this.menuItems.forEach(m => {
                m.update();
            })
        }
    };


    handleCamMovement() {
        this.updatePlayerCoordinates()
    }

    updatePlayerCoordinates() {
        if (this.player.y <= 50) {
            this.player.y = 50
            this.updateCollisions("y", "velocityY")
        }
        if (this.player.y > 100) {
            this.player.y = 100
            this.updateCollisions("y", "velocityY")
        }
        var midpoint = 200;
        if (this.player.x < midpoint && this.player.x <= 50) {
            this.player.x = 50
            this.updateCollisions("x", "velocityX")
        } else if(this.player.x >= midpoint) {
            this.player.x = midpoint
            this.updateCollisions("x", "velocityX")
        }
    }

    updateCollisions(coordinate, velocity) {
        for (let i = 1; i < this.game.entities.length; i++) {
            this.game.entities[i][coordinate] -= this.player[velocity];
            this.game.entities[i].updateCollision();
        }
    }

    draw(ctx) {
        this.background.draw(ctx)
        if (!this.levelLoaded) {
            ctx.fillStyle = "blue"
            ctx.font = "20px Russo-Regular";
            ctx.fillText("ShapeShift", 45, 15)
            ctx.font = "10px Russo-Regular";
            ctx.fillText("Hit The Number of the level you want to play", 45, 75)

            this.menuItems.forEach(m => {
                m.draw(ctx);
            })
        }
    };

};