const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./assets/Levels/Level1/Level1.png")
ASSET_MANAGER.queueDownload("./assets/Levels/TestLevels/halfpipe/halfpipe.png")
ASSET_MANAGER.queueDownload("./assets/Levels/TestLevels/slope/slope.png")
ASSET_MANAGER.queueDownload("./assets/Levels/TestLevels/breakablefloor/BreakableFloor.png")
ASSET_MANAGER.queueDownload("./assets/Levels/TestLevels/Flatplane/FlatPlane.png")
ASSET_MANAGER.queueDownload("./assets/spritesheetCircle.png");
ASSET_MANAGER.queueDownload("./assets/circlePixel.png");
ASSET_MANAGER.queueDownload("./assets/sqaurePixel.png");
ASSET_MANAGER.queueDownload("./assets/trianglePixel.png");
ASSET_MANAGER.queueDownload("./assets/square.png");
ASSET_MANAGER.queueDownload("./assets/spikePixel.png");
ASSET_MANAGER.queueDownload("./assets/Minecraft Damage (Oof) - Sound Effect (HD).mp3")
ASSET_MANAGER.queueDownload("./assets/Sad Violin - Sound Effect (HD).mp3")
ASSET_MANAGER.queueDownload("./assets/Dead.png");
ASSET_MANAGER.queueDownload("./assets/menuBackground.png")
ASSET_MANAGER.queueDownload("./assets/Levels/levelDC/LevelDC.png")
ASSET_MANAGER.queueDownload("./assets/Levels/castle/CastleLevel.png")
ASSET_MANAGER.queueDownload("./assets/Levels/castle/Castle2.png")
ASSET_MANAGER.queueDownload("./assets/Subway Surfers Drill.mp3")
ASSET_MANAGER.queueDownload("./assets/spritesheet_5.png")
ASSET_MANAGER.queueDownload("./assets/smileyboiSheet.png")


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	new SceneManager(gameEngine)
	gameEngine.init(ctx);
	
	gameEngine.start();
});
//
