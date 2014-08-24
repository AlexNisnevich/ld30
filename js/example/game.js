var		HERO_IMAGE = 'assets/hero.png',
		PLATFORM_IMAGE = 'assets/platform.png';

function _game() {
	window.Game = this;
	var self = this,
		ticks = 0,
		canvas,
		stage,
		world,
		player,
		w = 800,
		h = 600,
		assets = [],
		keyDown = false;

	// holds all collideable objects
	var collideables = [];
	this.getCollideables = function() { return collideables; };

	// starts to load all the assets
	this.preloadResources = function() {
		self.loadImage(HERO_IMAGE);
		self.loadImage(PLATFORM_IMAGE);
	}

	var requestedAssets = 0,
		loadedAssets = 0;
	// loads the assets and keeps track
	// of how many assets where there to
	// be loaded
	this.loadImage = function(e) {
		var img = new Image();
		img.onload = self.onLoadedAsset;
		img.src = e;

		assets[e] = img;

		++requestedAssets;
	}
	// each time an asset is loaded
	// check if all assets are complete
	// and initialize the game, if so
	this.onLoadedAsset = function(e) {
		++loadedAssets;
		if ( loadedAssets == requestedAssets ) {
			self.initializeGame();
		}
	}

	this.initializeGame = function() {
		// creating the canvas-element
		canvas = document.createElement('canvas');
		canvas.width = w;
		canvas.height = h;
		document.body.appendChild(canvas);

		// initializing the stage
		stage = new createjs.Stage(canvas);
		world = new createjs.Container();
		stage.addChild(world);

		// creating the Hero, and assign an image
		// also position the hero in the middle of the screen
		player = new Player(assets[HERO_IMAGE], w/2, h/2);
		world.addChild(player.image);

		// add a platform for the hero to collide with
		self.addPlatform(w/2 - assets[PLATFORM_IMAGE].width/2, h/1.25);

		// Setting the listeners
		document.onkeydown = function (e) {
			player.handleKeyDown(e.keyCode);
		}
		document.onkeyup = function (e) {
			player.handleKeyUp(e.keyCode);
		}

		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener('tick', self.tick);
	}

	this.tick = function(e)
	{
		ticks++;
		player.tick();
		stage.update();
	}

	// this method adds a platform at the
	// given x- and y-coordinates and adds
	// it to the collideables-array
	this.addPlatform = function(x,y) {
		x = Math.round(x);
		y = Math.round(y);

		var platform = new createjs.Bitmap(assets[PLATFORM_IMAGE]);
		platform.x = x;
		platform.y = y;
		platform.snapToPixel = true;

		world.addChild(platform);
		collideables.push(platform);
	}

	self.preloadResources();
};

new _game();
