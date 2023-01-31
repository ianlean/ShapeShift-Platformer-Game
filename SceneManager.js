class SceneManager {

    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.score = 0;
        this.background;

        this.playerCharacter = new Player(this.game, -60, 0);

        this.floor1 = new floor(this.game, 0, 120);
        this.elapsedTime = 0;
        this.spawns = [0.5, 1, 3, 5];

        this.loadLevel(level1, 50, 550);

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

        this.game.addEntity(this.playerCharacter);

        this.background = new Background(level.background, -35, -445, 3552, 1024)

        var i = level.data["layers"].findIndex(l => l["name"] == "Floor")
        
        if(floors > -1) {
            layers[floors]["objects"].forEach(f => {
                console.log(f)
                var fl = new floor(this.game, f["x"] - 35, f["y"] - 443, f["width"], f["height"])
                this.game.addEntity(fl)
                console.log(fl)
            });
        }

        if(spikes > -1) {
            layers[spikes]["objects"].forEach(s => {
                console.log(s)
                var sp = new spike(this.game, s["x"] - 35, s["y"] - 443, s["width"], s["height"])
                this.game.addEntity(sp)
                console.log(sp)
            })
        }

        level.data["layers"][spikes]["objects"].forEach(f => {

        });
        this.game.addEntity(new BoundingLine(this.game, {x: 0, y: 0}, {x: 200, y: 10}))
        
        this.game.addEntity(this.background)
        console.log(level.data["layers"][floors]["objects"])
        

        // if (level.floor) {
        //     for (var i = 0; i < level.floor.length; i++) {
        //         let Floor = level.floor[i];
        //         this.game.addEntity(new floor(this.game, Floor.x, Floor.y));
        //     }
        // }
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


        
    };



    update() {
        let midpoint = 200;
        this.elapsedTime += this.game.clockTick;
        if (this.playerCharacter.y <= 50) {
            this.playerCharacter.y = 50;
            for (let i = 1; i < this.game.entities.length; i++) {
                this.game.entities[i].y -= this.playerCharacter.velocityY;
                this.game.entities[i].updateBox();
            }
        }
        if (this.playerCharacter.y > 100) {
            this.playerCharacter.y = 100;
            for (let i = 1; i < this.game.entities.length; i++) {
                this.game.entities[i].y -= this.playerCharacter.velocityY;
                this.game.entities[i].updateBox();
            }
        }
        if (this.playerCharacter.x < midpoint) {
            if (this.playerCharacter.x <= 50) {
                this.playerCharacter.x = 50;
                for (let i = 1; i < this.game.entities.length; i++) {
                    this.game.entities[i].x -= this.playerCharacter.velocityX;
                    this.game.entities[i].updateBox();
                }

            }
            //this.floor1.x=this.playerCharacter.x;

        } else {
            this.playerCharacter.x = midpoint;

            for (let i = 1; i < this.game.entities.length; i++) {
                this.game.entities[i].x -= this.playerCharacter.velocityX;
                this.game.entities[i].updateBox();
            }
        }

    };

    draw(ctx) {
        this.background.draw(ctx)
    };

};