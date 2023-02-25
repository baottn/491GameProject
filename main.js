const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

//Sprite
ASSET_MANAGER.queueDownload("./img/background.png");
ASSET_MANAGER.queueDownload("./img/tank_body_fire.png");
ASSET_MANAGER.queueDownload("./img/tank_turret.png");
ASSET_MANAGER.queueDownload("./img/tracks.png");
ASSET_MANAGER.queueDownload("./img/fire_border.png");
ASSET_MANAGER.queueDownload("./img/bullet.png");
ASSET_MANAGER.queueDownload("./img/power_ups.png");
ASSET_MANAGER.queueDownload("./img/rock.png");
ASSET_MANAGER.queueDownload("./img/ghost.png");
ASSET_MANAGER.queueDownload("./img/Suriken.png"); 
ASSET_MANAGER.queueDownload("./img/tank_explosion.png"); 
ASSET_MANAGER.queueDownload("./img/titleScreen.png"); 
ASSET_MANAGER.queueDownload("./img/homebase.png"); 
ASSET_MANAGER.queueDownload("./img/victoryBackground.png"); 
ASSET_MANAGER.queueDownload("./img/gameOver.png"); 

//Music
ASSET_MANAGER.queueDownload("./music/background_music.mp3");
ASSET_MANAGER.queueDownload("./music/background_music_2.mp3");
ASSET_MANAGER.queueDownload("./music/gameover_music.mp3");
ASSET_MANAGER.queueDownload("./music/victory_music.mp3");
ASSET_MANAGER.queueDownload("./music/title_music.mp3");
ASSET_MANAGER.queueDownload("./music/background_infmode_music.mp3");

//Sound effect (Play once)
ASSET_MANAGER.queueDownload("./audio/ghost_death.wav");
ASSET_MANAGER.queueDownload("./audio/ghost_hit.wav");

ASSET_MANAGER.queueDownload("./audio/rock_death.wav");

ASSET_MANAGER.queueDownload("./audio/powerup_0_death.wav");
ASSET_MANAGER.queueDownload("./audio/powerup_1_death.wav");
ASSET_MANAGER.queueDownload("./audio/powerup_2_death.wav");

ASSET_MANAGER.queueDownload("./audio/trap_death.wav");
ASSET_MANAGER.queueDownload("./audio/trap_activate.wav");

ASSET_MANAGER.queueDownload("./audio/track_death.wav");
ASSET_MANAGER.queueDownload("./audio/track_bump.wav");
ASSET_MANAGER.queueDownload("./audio/track_hit.wav");

ASSET_MANAGER.queueDownload("./audio/player_hit_0.wav");
ASSET_MANAGER.queueDownload("./audio/player_hit_1.wav");
ASSET_MANAGER.queueDownload("./audio/player_hit_2.wav");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	ASSET_MANAGER.autoRepeat("./music/background_music.mp3");
	ASSET_MANAGER.autoRepeat("./music/background_music_2.mp3");
	ASSET_MANAGER.autoRepeat("./music/gameover_music.mp3");
	ASSET_MANAGER.autoRepeat("./music/title_music.mp3");
	ASSET_MANAGER.autoRepeat("./music/victory_music.mp3");
	ASSET_MANAGER.autoRepeat("./music/background_infmode_music.mp3");

	gameEngine.init(ctx);

	gameEngine.start();
});
