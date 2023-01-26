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
        var floors = 1
        var bigRamp = 2
        var smallRamp = 3
        var slope = 4

        console.log(level)

        this.game.addEntity(this.playerCharacter);

        this.background = new Background(level.background, -35, -380, 3616, 1024)

        
        level.data["layers"][floors]["objects"].forEach(f => {
            console.log(f)
            var fl = new floor(this.game, f["x"] + 510, f["y"] - 510, f["width"], f["height"])
            this.game.addEntity(fl)
            console.log(fl)
        });
        
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