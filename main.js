const gameEngine = new GameEngine();
//Austin
const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./assets/spritesheetCircle.png");
ASSET_MANAGER.queueDownload("./assets/circlePixel.png");
ASSET_MANAGER.queueDownload("./assets/sqaurePixel.png");
ASSET_MANAGER.queueDownload("./assets/trianglePixel.png");
ASSET_MANAGER.queueDownload("./assets/square.png");
ASSET_MANAGER.queueDownload("./assets/spikePixel.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	new SceneManager(gameEngine)
	// gameEngine.addEntity(new Player(gameEngine,0,0));
	// gameEngine.addEntity(new Laser(gameEngine,1280, 70));
	// gameEngine.addEntity(new floor(gameEngine,0,120));
	// gameEngine.addEntity(new floor(gameEngine,30,120));
	// gameEngine.addEntity(new floor(gameEngine,60,120));
	// gameEngine.addEntity(new spike(gameEngine,90,120));
	// gameEngine.addEntity(new floor(gameEngine,120,120));
	// gameEngine.addEntity(new floor(gameEngine,150,120));
	// gameEngine.addEntity(new floor(gameEngine,180,120));
	
	gameEngine.init(ctx);
	
	gameEngine.start();
});
