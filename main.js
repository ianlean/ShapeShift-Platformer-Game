const gameEngine = new GameEngine();
//Austin
const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./assets/Levels/Level1/Level1.png")
ASSET_MANAGER.queueDownload("./assets/Levels/TestLevels/slope/slope.png")
ASSET_MANAGER.queueDownload("./assets/spritesheetCircle.png");
ASSET_MANAGER.queueDownload("./assets/circlePixel.png");
ASSET_MANAGER.queueDownload("./assets/sqaurePixel.png");
ASSET_MANAGER.queueDownload("./assets/trianglePixel.png");
ASSET_MANAGER.queueDownload("./assets/square.png");
ASSET_MANAGER.queueDownload("./assets/spikePixel.png");
ASSET_MANAGER.queueDownload("./assets/Minecraft Damage (Oof) - Sound Effect (HD).mp3")
ASSET_MANAGER.queueDownload("./assets/Sad Violin - Sound Effect (HD).mp3")
ASSET_MANAGER.queueDownload("./assets/Dead.png");
ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	new SceneManager(gameEngine)
	gameEngine.init(ctx);
	
	gameEngine.start();
});
