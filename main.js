const gameEngine = new GameEngine();
//Austin
const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./assets/circlePixel.png");
ASSET_MANAGER.queueDownload("./assets/sqaurePixel.png");
ASSET_MANAGER.queueDownload("./assets/trianglePixel.png");
ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	gameEngine.addEntity(new Player(gameEngine,0,0));
	
	gameEngine.init(ctx);

	gameEngine.start();
});
