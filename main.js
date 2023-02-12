const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/background.png");
ASSET_MANAGER.queueDownload("./img/background2.png");
ASSET_MANAGER.queueDownload("./img/tank_body_fire.png");
ASSET_MANAGER.queueDownload("./img/tank_turret.png");
ASSET_MANAGER.queueDownload("./img/tracks.png");
ASSET_MANAGER.queueDownload("./img/fire_border.png");  
ASSET_MANAGER.queueDownload("./img/bullet.png"); 
ASSET_MANAGER.queueDownload("./img/power_ups.png"); 
ASSET_MANAGER.queueDownload("./img/rock.png"); 


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	gameEngine.start();
});
