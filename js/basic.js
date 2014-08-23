var		HERO_IMAGE = 'assets/hero.png',
		PLATFORM_IMAGE = 'assets/platform.png';

function _game()
{
	window.Game = this;
	var self = this,
		ticks = 0,
		canvas,
		stage,
		world,
		hero,
		w = getWidth(),
		h = getHeight(),
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
		hero = new Hero(assets[HERO_IMAGE]);
		hero.x = w/2
		hero.y = h/2;
		world.addChild(hero);

		// add a platform for the hero to collide with
		self.addPlatform(w/2 - assets[PLATFORM_IMAGE].width/2, h/1.25);

		// Setting the listeners
		if ('ontouchstart' in document.documentElement) {
			canvas.addEventListener('touchstart', function(e) {
				self.handleKeyDown();
			}, false);

			canvas.addEventListener('touchend', function(e) {
				self.handleKeyUp();
			}, false);
		} else {
			document.onkeydown = self.handleKeyDown;
			document.onkeyup = self.handleKeyUp;
			document.onmousedown = self.handleKeyDown;
			document.onmouseup = self.handleKeyUp;
		}

		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener('tick', self.tick);
	}

	this.tick = function(e)
	{
		ticks++;
		hero.tick();
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

	this.handleKeyDown = function(e)
	{
		if ( !keyDown ) {
			keyDown = true;
			hero.jump();
		}
	}

	this.handleKeyUp = function(e)
	{
		keyDown = false;
	}

	self.preloadResources();
};

new _game();
