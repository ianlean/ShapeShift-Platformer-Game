class SceneManager{
    

    constructor(game){
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.score = 0;

        this.playerCharacter = new Player(this.game,0, 0);
        
        this.floor1=new floor(this.game,0,120)
        this.elapsedTime = 0;

        this.spawns = [0.5,1,3,5];
        //this.randomSpawn = 0;
        
        //this.Spawn();
        this.loadLevel(50,550);

    };


    loadLevel(x,y){
       
        this.game.addEntity(this.playerCharacter);
        this.game.addEntity(new Laser(this.game,1280, 70));
        this.game.addEntity(this.floor1);
        this.game.addEntity(new floor(this.game,30,120));
        this.game.addEntity(new floor(this.game,60,120));
        this.game.addEntity(new spike(this.game,90,120));
        this.game.addEntity(new floor(this.game,120,120));
        this.game.addEntity(new floor(this.game,150,120));
        this.game.addEntity(new floor(this.game,180,120));




       //this.player = (new CharacterController(gameEngine),50,550)

       
       //this.game.addEntity(new Tombstone(this.game,1920,700))
       
       




    };
    
    // Spawn(){
    //     //this.prevSpawn = this.randomSpawn;
        
    //     // while(this.prevSpawn === this.randomSpawn){
    //     //     this.randomSpawn = Math.floor(Math.random() * this.spawns.length);
    //     // }



        

    // };

    update() {
        let midpoint = 200;
        this.elapsedTime += this.game.clockTick;
        if(this.playerCharacter.x<midpoint){
            if(this.playerCharacter.x<=0){
                this.playerCharacter.x=0;
                this.floor1.x-=this.playerCharacter.velocityX;
            }
        //this.floor1.x=this.playerCharacter.x;
        
        }else{
            this.playerCharacter.x=midpoint;
            this.floor1.x-=this.playerCharacter.velocityX;
            // this.game.entites.forEach(entity => {
            //     this.entity.x-=this.playerCharacter.velocityX;
            // });
        }
        


        //this.game.addEntity(new Tombstone(this.game,1920,700))
        // if(this.elapsedTime > this.spawns[this.randomSpawn]){
        //     this.elapsedTime=0;
        //     //this.Spawn();
        //     //console.log("make another")
        //     //this.game.addEntity(new Tombstone(this.game,1920,700))

        // }

        //if (this.x < this.player.x - midpoint) this.x = this.player.x  - midpoint;



    };

    draw(ctx){
       
    };

};