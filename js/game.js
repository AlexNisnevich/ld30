var ShatteredWorlds = function() {
  return new Game(1000, 600);
};

var Game = function(w, h) {
  var assetsToLoad = {
    'hero': 'assets/hero.png',
    'platform': 'assets/platform.png',
    'portal': 'assets/portal.jpg'
  };

  var worldHotkeys = {
  	49: LevelOne,	// 1
  	50: LevelTwo,	// 2
  	51: LevelThree	// 3
  }

  var self = this;
  var ticks = 0;
  var canvas;
  var stage;
  var container;
  var player;
  var exit;
  var world;
  var assets = [];

  // holds all collideable objects
  var collideables = [];
  this.getCollideables = function() { return collideables; };

  // starts to load all the assets
  this.preloadResources = function() {
    var requestedAssets = 0;
    var loadedAssets = 0;

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
    container = new createjs.Container();
    stage.addChild(container);

    world = levels[1];
    this.loadLevel(world);

    // Setting the listeners
    document.onkeydown = function (e) {
      if (worldHotkeys[e.keyCode]) {
        var newWorld = worldHotkeys[e.keyCode];
        self.overlayWorld(newWorld);
      } else {
        player.handleKeyDown(e.keyCode);
      }
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

  this.loadLevel = function(world) {
    // place exit
    exit = new createjs.Bitmap(assets['portal']);
    exit.x = world.goal[0];
    exit.y = world.goal[1];
    exit.name = "exit";
    this.addObject(exit);

    // place player
    player = new Player(assets['hero'], world.start[0], world.start[1], self);
    container.addChild(player.image);

    this.updateLevel(world);
  };

  this.updateLevel = function(world) {
    // remove existing objects
    collideables.forEach(function (obj) {
      container.removeChild(obj);
    });
    collideables = [];

    // place exit
    this.addObject(exit);

  	// place objects
    world.objects.forEach(function (obj) {
      obj.draw(self);
    });
  };

  this.overlayWorld = function(newWorld) {
  	world = world.combine(newWorld);
  	this.updateLevel(world);
  };

  this.addObject = function(obj) {
    container.addChild(obj);
    collideables.push(obj);
  };

  this.setup = function () {
    self.preloadResources();
  };
};
