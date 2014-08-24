var ShatteredWorlds = function() {
  return new Game(1000, 600);
};

var lvl;
var Game = function(w, h) {
  var assetsToLoad = {
    'hero': 'assets/hero.png',
    'platform': 'assets/platform.png',
    'portal': 'assets/portal.jpg'
  };

  var levelHotkeys = {
  	49: 1,  // 1
  	50: 2,  // 2
  	51: 3   // 3
  };

  var levels = {
    1: LevelOne,
    2: LevelTwo,
    3: LevelThree
  };

  var currentLevelNum = 1;
  this.getCurrentLevelNum = function () { return currentLevelNum; };

  var self = this;
  var ticks = 0;
  var canvas;
  var stage;
  var container;
  var player;
  var exit;
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

    lvl = levels[1];
    this.loadLevel(lvl);

    // Setting the listeners
    document.onkeydown = function (e) {
      if (levelHotkeys[e.keyCode] && levelHotkeys[e.keyCode] < currentLevelNum) {
        var newWorld = levels[levelHotkeys[e.keyCode]];
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
    lvl.tick();
    stage.update();
  };

  this.moveToNextLevel = function(lvl) {
    container.removeAllChildren();
    player = null;
    collideables = [];

    currentLevelNum++;
    lvl = levels[currentLevelNum];
    this.loadLevel(lvl);
  }

  this.loadLevel = function(lvl) {
    // place exit
    exit = new createjs.Bitmap(assets['portal']);
    exit.x = lvl.goal[0];
    exit.y = lvl.goal[1];
    exit.name = "exit";
    this.addObject(exit);

    // place player
    player = new Player(assets['hero'], lvl.start[0], lvl.start[1], self);
    container.addChild(player.image);

    this.updateLevel(lvl);
  };

  this.updateLevel = function(lvl) {
    // remove existing objects
    collideables.forEach(function (obj) {
      container.removeChild(obj);
    });
    collideables = [];

    // place exit
    this.addObject(exit);

  	// place objects
    lvl.objects.forEach(function (obj) {
      obj.draw(self);
    });

    console.log(lvl.attrs)
  };

  this.overlayWorld = function(newWorld) {
    console.log(lvl.attrs);
  	lvl = lvl.combine(newWorld, self);
  	this.updateLevel(lvl);
  };

  this.addObject = function(obj) {
    container.addChild(obj);
    collideables.push(obj);
  };

  this.setup = function () {
    self.preloadResources();
  };
};
