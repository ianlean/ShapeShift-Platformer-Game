class SceneManager{
    

    constructor(game){
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.score = 0;

        this.player = new CharacterController(this.game,50,550);

        this.elapsedTime =0;

        this.spawns = [0.5,1,3,5];
        this.randomSpawn = 0;
        
        this.Spawn();
        this.loadLevel(50,550);

    };


    loadLevel(x,y){
        this.game.entities = [];
        this.x =0;
        this.player.x = x;
        this.player.y = y;
        this.player.velocity = { x: 0, y: 0 };
   




       //this.player = (new CharacterController(gameEngine),50,550)

       this.game.addEntity(this.player);
       //this.game.addEntity(new Tombstone(this.game,1920,700))
       
       




    };
    
    Spawn(){
        this.prevSpawn = this.randomSpawn;
        
        while(this.prevSpawn === this.randomSpawn){
            this.randomSpawn = Math.floor(Math.random() * this.spawns.length);
        }



        

    };

    update() {
        let midpoint = params.canvasWidth/2;
        this.elapsedTime += this.game.clockTick;

        


        //this.game.addEntity(new Tombstone(this.game,1920,700))
        if(this.elapsedTime > this.spawns[this.randomSpawn]){
            this.elapsedTime=0;
            this.Spawn();
            console.log("make another")
            this.game.addEntity(new Tombstone(this.game,1920,700))

        }

        //if (this.x < this.player.x - midpoint) this.x = this.player.x  - midpoint;



    };

    draw(ctx){
       
    };

};