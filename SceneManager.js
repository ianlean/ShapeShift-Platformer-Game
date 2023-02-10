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
        this.FLOORS = "floors"
        this.SPIKES = "spikes"
        this.SLOPE = "slope"
        this.LASER = "laser"

    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    loadLevel(level, x, y) {
        var layers = level.data["layers"]
        var levelJSONObjects = this.getLevelJSONObjects(layers)
        console.log(level)
        this.setBackground(level, x, y)
        this.loadPlayer()
        this.loadFloors(levelJSONObjects[this.FLOORS], layers)
        this.loadSpikes(levelJSONObjects[this.SPIKES], layers)
        this.loadLasers(levelJSONObjects[this.LASER], layers)
        this.loadBackground(level)
        this.levelLoaded = true;
    };

    getLevelJSONObjects(layers) {
        var objects = {}
        objects[this.FLOORS] = layers.findIndex(l => l["name"] == "Floor")
        objects[this.SPIKES] = layers.findIndex(l => l["name"] == "Spikes")
        objects[this.SLOPE] = layers.findIndex(l => l["name"] == "Slope")
        objects[this.LASER] = layers.findIndex(l => l["name"] == "Laser")
        return objects
    }
    
    setBackground(level, x, y) {
        this.background = new Background(level.background, x, y, level.width, level.height)
    }

    loadPlayer() {
        this.player = new Player(this.game, 0, 0);
        this.game.addEntity(this.player);
    }


    loadFloors(floors, layers) {
        if(floors < 0) {
            return
        }
        layers[floors]["objects"].forEach(f => {
            var points = f["polyline"]
            var notEnoughPoints = points.length <= 1
            if(notEnoughPoints) {
                return
            }
            for (let i = 0; i < points.length - 1; i++) {
                console.log(points[i]["x"])
                var fl = new floor(this.game, 0, 0, new Point(f["x"] + points[i]["x"], f["y"] + points[i]["y"]), new Point(f["x"] + points[i + 1]["x"], f["y"] + points[i + 1]["y"]))
                this.game.addEntity(fl)
                console.log(fl)
            }
        });
    }

    loadSpikes(spikes, layers) {
        if(spikes < 0) {
            return
        }
        layers[spikes]["objects"].forEach(s => {
            console.log(s)
            var sp = new spike(this.game, s["x"], s["y"], s["width"], s["height"])
            this.game.addEntity(sp)
            console.log(sp)
        })
    }

    loadLasers(lasers, layers) {
        if(lasers < 0)
            return
        layers[lasers]["objects"].forEach(l => {
            console.log(l)
            var laser = new Laser(this.game, l["x"], l["y"])
            console.log(laser)
        })
    }

    loadBackground() {
        this.game.addEntity(this.background)
    }

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