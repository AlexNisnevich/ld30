var ShatteredWorlds = function() {
  return new Game(1000, 600);
};

var Game = function(w, h) {
  var assetsToLoad = {
    'hero': 'assets/magicStar.png'
  };

  var levelHotkeys = {
    49:  1,  // 1
    50:  2,  // 2
    51:  3,  // 3
    52:  4,  // 4
    113: 5   // Q
  };

  var levels = {
    1: LevelOne,
    2: LevelTwo,
    3: LevelThree,
    4: LevelFour,
    5: LevelFive
  };

  var currentLevelNum = 1;

  var self = this;
  var ticks = 0;
  var canvas;
  var stage;
  var container;
  var player;
  var exit;
  var assets = [];

  var world;
  this.getWorld = function() { return world; };

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
    };
    // each time an asset is loaded
    // check if all assets are complete
    // and initialize the game, if so
    onLoadedAsset = function(e) {
      ++loadedAssets;
      if ( loadedAssets == requestedAssets ) {
        self.initializeGame();
      }
    };

    for (var asset in assetsToLoad) {
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

    world = levels[currentLevelNum];
    this.loadLevel(world);

    // Setting the listeners
    document.onkeydown = function (e) {
      if (levelHotkeys[e.keyCode] && levelHotkeys[e.keyCode] < currentLevelNum) {
        var newWorld = levels[levelHotkeys[e.keyCode]];
        self.overlayWorld(newWorld);
      } else {
        player.handleKeyDown(e.keyCode);
      }
    };

    document.onkeyup = function (e) {
      player.handleKeyUp(e.keyCode);
    };

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', self.tick);
  };

  this.tick = function(e) {
    ticks++;
    if (player) {
      player.tick();
      world.tick({x: player.image.x, y: player.image.y});
    }
    stage.update();
  };

  this.moveToNextLevel = function() {
    container.removeAllChildren();
    player = null;
    collideables = [];

    currentLevelNum++;
    world = levels[currentLevelNum];
    if(world !== null) {
      this.loadLevel(world);
    }
  };

  this.loadLevel = function(world) {
    // place exit
    if (world.goal) {
      this.addObject(world.goal.image);
    }

    // place player
    if (world.start) {
      player = new Player(assets['hero'], world.start[0], world.start[1], self);
      container.addChild(player.image);
    }

    // place objects
    world.objects.forEach(function (obj) {
      obj.draw(self);
    });
  };

  this.updateLevel = function(world) {
    // remove existing objects
    collideables.forEach(function (obj) {
      container.removeChild(obj);
    });
    collideables = [];

    // place exit
    this.addObject(world.goal.image);

    // place objects
    world.objects.forEach(function (obj) {
      obj.draw(self);
    });
  };

  this.resetLevel = function() {
    world = world.reset();
    this.updateLevel(world);
  };

  this.overlayWorld = function(newWorld) {
    if (world.canOverlap(newWorld)) {
      var oldWorld = world;
      world = world.combine(newWorld);
      this.updateLevel(world);
      setTimeout(function () { self.updateLevel(oldWorld); }, 50);
      setTimeout(function () { self.updateLevel(world); }, 100);
      setTimeout(function () { self.updateLevel(oldWorld); }, 150);
      setTimeout(function () { self.updateLevel(world); }, 200);
    } else {
      // Do something
      // Flicker then make noise?
    }
  };

  this.addObject = function(obj) {
    container.addChild(obj);
    if(!obj.visual) {
      collideables.push(obj);
    }
  };

  this.setup = function () {
    self.preloadResources();
  };
};
