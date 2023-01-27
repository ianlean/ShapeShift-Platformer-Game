class SceneManager{
    

    constructor(game){
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.score = 0;

        this.playerCharacter = new Player(this.game,-60, 0);
        
        this.floor1=new floor(this.game,0,120);
        this.elapsedTime = 0;
        //this.level.addEntity
        this.spawns = [0.5,1,3,5];
        //this.randomSpawn = 0;
        
        //this.Spawn();
        this.loadLevel(levelOne, 50,550);

    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };
    loadLevel(level, x, y){
       



        this.game.addEntity(this.playerCharacter);

        if (level.floor) {
            for (var i = 0; i < level.floor.length; i++) {
                let Floor = level.floor[i];
                this.game.addEntity(new floor(this.game, Floor.x, Floor.y));
            }
        }
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
        /*
        this.game.addEntity(this.playerCharacter);
        this.game.addEntity(new Laser(this.game,500, 70));
        this.game.addEntity(new floor(this.game,-30,120));
        this.game.addEntity(new floor(this.game,-60,120));
        this.game.addEntity(new floor(this.game,-90,120));
        this.game.addEntity(this.floor1);
        this.game.addEntity(new floor(this.game,30,120));
        this.game.addEntity(new floor(this.game,60,120));
        this.game.addEntity(new floor(this.game,60,90));
        this.game.addEntity(new spike(this.game,90,120));
        this.game.addEntity(new floor(this.game,120,120));
        this.game.addEntity(new floor(this.game,150,120));
        this.game.addEntity(new floor(this.game,180,120));
        this.game.addEntity(new floor(this.game,210,120));
        this.game.addEntity(new floor(this.game,240,120));
        this.game.addEntity(new floor(this.game,270,120));
*/
        
        //in final version this should be deleted 
        let counter = 1;
        for (let index = 200; index < 100000; index+=30) {
            
            if(counter%30 == 0){
                this.game.addEntity(new spike(this.game,index,120));
            }else{
                this.game.addEntity(new floor(this.game,index,120));
            }
            counter++;
        }
        for (let index = -150; index < 100000; index+=30) {
            this.game.addEntity(new spike(this.game,index,300));
        }


    };



    update() {
        let midpoint = 200;
        this.elapsedTime += this.game.clockTick;
        if(this.playerCharacter.y<=50){
            this.playerCharacter.y=50;
            for(let i=1; i<this.game.entities.length; i++ ){
            this.game.entities[i].y -= this.playerCharacter.velocityY;
            this.game.entities[i].updateBox();
            }
        }
        if(this.playerCharacter.y>100){
            this.playerCharacter.y=100;
            for(let i=1; i<this.game.entities.length; i++ ){
            this.game.entities[i].y -= this.playerCharacter.velocityY;
            this.game.entities[i].updateBox();
            }
        }
        if(this.playerCharacter.x<midpoint){
            if(this.playerCharacter.x<=50){
                this.playerCharacter.x=50;
                for(let i=1; i<this.game.entities.length; i++ ){
                this.game.entities[i].x -= this.playerCharacter.velocityX;
                this.game.entities[i].updateBox();
                }
                
            }
        //this.floor1.x=this.playerCharacter.x;
        
        }else{
            this.playerCharacter.x=midpoint;
            
            for(let i=1; i<this.game.entities.length; i++ ){
                this.game.entities[i].x -= this.playerCharacter.velocityX;
                this.game.entities[i].updateBox();
                }
        }

    };

    draw(ctx){
       
    };

};