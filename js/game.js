var ShatteredWorlds = function() {
	return new Game(800, 600);
};

var Game = function(w, h) {
	var assetsToLoad = {
		'hero': 'assets/hero.png',
		'platform': 'assets/platform.png'
	};

	var self = this,
		ticks = 0,
		canvas,
		stage,
		world,
		player,
		assets = [],
		keyDown = false;

	// holds all collideable objects
	var collideables = [];
	this.getCollideables = function() { return collideables; };

	// starts to load all the assets
	this.preloadResources = function() {
		var requestedAssets = 0,
			loadedAssets = 0;

		// loads the assets and keeps track
		// of how many assets where there to
		// be loaded
		loadImage = function(name, path) {
			var img = new Image();
			img.onload = onLoadedAsset;
			img.src = path;

			assets[name] = img;

			++requestedAssets;
		}
		// each time an asset is loaded
		// check if all assets are complete
		// and initialize the game, if so
		onLoadedAsset = function(e) {
			++loadedAssets;
			if ( loadedAssets == requestedAssets ) {
				self.initializeGame();
			}
		}

		for (asset in assetsToLoad) {
			loadImage(asset, assetsToLoad[asset]);
		}
	};

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
		player = new Player(assets['hero'], w/2, h/2, self);
		world.addChild(player.image);

		// add a platform for the hero to collide with
		self.addPlatform(w/2 - assets['platform'].width/2, h/1.25);

		// Setting the listeners
		document.onkeydown = function (e) {
			player.handleKeyDown(e.keyCode);
		}
		document.onkeyup = function (e) {
			player.handleKeyUp(e.keyCode);
		}

		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener('tick', self.tick);
	};

	this.tick = function(e) {
		ticks++;
		player.tick();
    world.tick();
		stage.update();
	};

	// this method adds a platform at the
	// given x- and y-coordinates and adds
	// it to the collideables-array
	this.addPlatform = function(x,y) {
		x = Math.round(x);
		y = Math.round(y);

		var platform = new createjs.Bitmap(assets['platform']);
		platform.x = x;
		platform.y = y;
		platform.snapToPixel = true;

		world.addChild(platform);
		collideables.push(platform);
	};

	this.setup = function () {
		self.preloadResources();
	};
};
