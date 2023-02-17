class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.score = 0;
        this.background = new Background("./assets/menuBackground.png", 0, 0, 3840 / 10, 2160 / 10)
        this.player;
        this.playerSpawnX = 0;
        this.playerSpawnY = 0;
        this.levelLoaded = false;
        this.elapsedTime = 0;
        this.levels = [level1, slope, breakablefloor, FlatPlane]
        this.menu = new Menu(game,this,this.levels)
        this.FLOORS = "floors"
        this.BOXES = "Box"
        this.BREAKABLEFLOORS = "Breakable Floor"
        this.SPIKES = "Spikes"
        this.PIT = "Pit"
        this.SPRING = "Spring"
        this.WIN = "Win"
        this.SLOPE = "Slope"
        this.LASER = "Laser"
        this.SPAWN = "Player Spawn"
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    clearEntity(entity) {
        entity.removeFromWorld = true;
    }

    loadLevel(level, x, y) {
        var layers = level.data["layers"]
        var levelJSONObjects = this.getLevelJSONObjects(layers)
        console.log(level)
        this.setBackground(level, x, y)
        this.loadPlayer(levelJSONObjects[this.SPAWN], layers)
        this.loadFloors(levelJSONObjects[this.FLOORS], layers)
        this.loadBoxes(levelJSONObjects[this.BOXES], layers)
        this.loadWin(levelJSONObjects[this.WIN], layers)
        this.loadBreakableFloors(levelJSONObjects[this.BREAKABLEFLOORS], layers)
        this.loadSpikes(levelJSONObjects[this.SPIKES], layers)
        this.loadPits(levelJSONObjects[this.PIT], layers)
        this.loadSprings(levelJSONObjects[this.SPRING], layers)
        this.loadLasers(levelJSONObjects[this.LASER], layers)
        this.loadBackground(level)
        this.levelLoaded = true
    };

    getLevelJSONObjects(layers) {
        var objects = {}
        objects[this.FLOORS] = layers.findIndex(l => l["name"] == this.FLOORS)
        objects[this.BOXES] = layers.findIndex(l => l["name"] == this.BOXES)
        objects[this.WIN] = layers.findIndex(l => l["name"] == this.WIN)
        objects[this.BREAKABLEFLOORS] = layers.findIndex(l => l["name"] == this.BREAKABLEFLOORS)
        objects[this.SPIKES] = layers.findIndex(l => l["name"] == this.SPIKES)
        objects[this.SLOPE] = layers.findIndex(l => l["name"] == this.SLOPE)
        objects[this.LASER] = layers.findIndex(l => l["name"] == this.LASER)
        objects[this.PIT] = layers.findIndex(l => l["name"] == this.PIT)
        objects[this.SPRING] = layers.findIndex(l => l["name"] == this.SPRING)
        objects[this.SPAWN] = layers.findIndex(l => l["name"] == this.SPAWN)
        return objects
    }
    
    setBackground(level, x, y) {
        this.background = new Background(level.background, x, y, level.width, level.height)
    }

    loadPlayer(spawn, layers) {
        console.log(layers[spawn]["objects"][0])
        this.player = new Player(this.game, layers[spawn]["objects"][0]["x"], layers[spawn]["objects"][0]["y"],this)
        console.log(this.player)
        this.game.addEntity(this.player)
    }

    loadWin(wins, layers){
        if(wins < 0)
        return
    layers[wins]["objects"].forEach(b => {
        var win = new Win(this.game, b["x"], b["y"], b["width"], b["height"])
        this.game.addEntity(win)
    })
    }
    loadBoxes(boxes, layers) {
        if(boxes < 0)
            return
        layers[boxes]["objects"].forEach(b => {
            var box = new Box(this.game, b["x"], b["y"], b["width"], b["height"])
            this.game.addEntity(box)
        })
    }

    loadBreakableFloors(breakableFloors, layers) {
        if(breakableFloors < 0)
            return
        layers[breakableFloors]["objects"].forEach(bf => {
            console.log(bf)
            var breakable = new BreakableFloor(this.game, bf["x"], bf["y"], bf["width"], bf["height"])
            this.game.addEntity(breakable)
        })
    }

    loadFloors(floors, layers) {
        if(floors < 0) {
            return
        }
        layers[floors]["objects"].forEach(f => {
            var points = f["polyline"]
            console.log(points)
            var notEnoughPoints = points.length <= 1
            if(notEnoughPoints) {
                return
            }
            for (let i = 0; i < points.length - 1; i++) {
                var fl = new floor(this.game, 0, 0, new Point(f["x"] + points[i]["x"], f["y"] + points[i]["y"]), new Point(f["x"] + points[i + 1]["x"], f["y"] + points[i + 1]["y"]))
                this.game.addEntity(fl)
                // console.log(fl)
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

    loadPits(pits, layers) {
        if(pits < 0) {
            return
        }
        layers[pits]["objects"].forEach(p => {
            console.log(p)
            var pit = new BottomlessPit(this.game, p["x"], p["y"], p["width"], p["height"])
            this.game.addEntity(pit)
            console.log(pit)    
        })
    }

    loadSprings(springs, layers) {
        if(springs < 0) {
            return
        }
        layers[springs]["objects"].forEach(s => {
            console.log(s)
            var spring = new Spring(this.game, s["x"], s["y"], s["width"], s["height"])
            this.game.addEntity(spring)
            console.log(spring)
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
            this.menu.update();
        }
    };


    handleCamMovement() {
        this.updatePlayerCoordinates()
    }

    updatePlayerCoordinates(ctx) {
        if (this.player.y <= 50) {
            this.player.y = 50
            this.updateCollisions("y", "velocityY")
        }
        if (this.player.y > 100) {
            this.player.y = 100
            this.updateCollisions("y", "velocityY")
        }
        var midpoint = 200
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
            this.game.entities[i][coordinate] -= this.player[velocity]
            this.game.entities[i].updateCollision()
        }
    }

    draw(ctx) {

        this.background.draw(ctx)
        if (!this.levelLoaded) {
            this.menu.draw(ctx);
        }
    };

};