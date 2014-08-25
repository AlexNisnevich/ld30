var width    = 1000;
var height   = 600;

// Manages everything in the game: the player, platforms,
// enemies... etc. Contains the Physics.js world (called physics).
function Game(levels) {
  var that = this;

  var beehavior = null;

  var currentLevel = 7;

  var base = levels[currentLevel];
  var other = null;

  var flickerTimeouts = [];

  var currentBg = '';

  var levelHotkeys = {
    49:  0,  // key: 1
    50:  1,  // key: 2
    51:  2,  // key: 3
    52:  3,  // key: 4
    53:  4   // key: 5
  }; 

  var settings = {
    timestep   : 1000 / 160,
    maxIPF     : 16,
    integrator : "verlet"
  };

  var physics = Physics(settings);
  that.gravity = null;

  this.physics = physics;
  this.player = null;

  this.setBase = function (newBase) {
    if (newBase.attrs.bg && newBase.attrs.bg != currentBg) {
      currentBg = newBase.attrs.bg;
      $('canvas').css('background', 'url(' + newBase.attrs.bg + ')');
    }

    if (this.player) {
      physics.remove(this.player);
    }

    if (beehavior) {
      physics.remove(beehavior);
    }

    // TODO: Make the player not be a circle!
    this.player = Physics.body('circle', {
      x        : newBase.start.x,
      y        : newBase.start.y,
      vx       : 0,
      vy       : 0,
      radius   : 22,
      cof      : 1,
      grounded : false,
      view     : image("assets/magicStar.png")
    });
   
    physics.add(this.player);

    if (control) {
      physics.remove(control);
    }
    control = Physics.behavior('control').applyTo([this.player]);
    physics.add(control);

    if (die) {
      physics.remove(die);
    }
    die = Physics.behavior('die-offscreen').applyTo([this.player]);
    physics.add(die);

    if (that.gravity) {
      physics.remove(that.gravity);
    }
    that.gravity = Physics.behavior('constant-acceleration', {
      acc: { x : 0, y: newBase.attrs.gravityAccel }
    });
    physics.add(that.gravity);

    removeObjects(base);
    base = newBase;
    addObjects(base);

    bees(that.player);
    beehavior = Physics.behavior("bees").applyTo(_.filter(base.currObjects, function (object) {
      return !!object.bee;
    }));
    physics.add(beehavior);

    fallingPlatform(that);
    physics.add(Physics.behavior("falling-platform").applyTo(_.filter(base.currObjects, function (object) {
      return !!object.floating;
    })));

    physics.add(Physics.behavior("moving-platform"));
  };

  this.setOther = function (newOther) {
    function otherable(object) {
      return !object.baseOnly;
    }

    if (flickerTimeouts) {
      _.map(flickerTimeouts, clearTimeout);
    }

    removeObjects(other);
    other = newOther;
    addObjects(other, otherable);

    if (other) {
      flickerTimeouts = [
        setTimeout(function () { setHiddenObjects(other, true) }, 50),
        setTimeout(function () { setHiddenObjects(other, false) }, 100),
        setTimeout(function () { setHiddenObjects(other, true) }, 150),
        setTimeout(function () { setHiddenObjects(other, false) }, 200),
      ];
    }

    // override base gravity

    if (that.gravity) {
      physics.remove(that.gravity);
    }

    that.gravity = Physics.behavior('constant-acceleration', {
      acc: { x : 0, y: (newOther ? newOther : base).attrs.gravityAccel }
    });
    physics.add(that.gravity);
  }

  // The loop which checks which objects are "grounded", ie on top of
  // some other object.
  physics.on('collisions:detected', collisions(that));

  physics.on('collisions:detected', function (data) {
    data.collisions = _.filter(data.collisions, function (c) {
      return !c.bodyA.passable && !c.bodyB.passable;
    });

    physics.emit("collisions:filtered", data);
  });

  physics.add(Physics.behavior('body-impulse-response', { check : "collisions:filtered" }));
  physics.add(Physics.behavior('body-collision-detection'));
  physics.add(Physics.behavior('sweep-prune'));

  physics.on("die", function () {
    that.setOther(null);
    that.setBase(base);
  });

  physics.on("next-level", function () {
    currentLevel++;
    
    that.setOther(null);
    that.setBase(levels[currentLevel]);
  });

  createControl(this);
  var control = null;
  var die = null;

  physics.add(renderer());

  this.setBase(base);

  function addObjects(world, pred) {
    pred = pred || function () { return true };

    if (world) {
      world.currObjects = _.invoke(world.objects, "call");
      physics.add(_.filter(world.currObjects, pred));
    }
  }

  function removeObjects(world, pred) {
    pred = pred || function () { return true };

    if (world && world.currObjects.length > 0) {
      physics.remove(_.filter(world.currObjects, pred));
    }
  }

  function setHiddenObjects(world, hidden) {
    _.each(world.currObjects, function (object) {
      object.hidden = hidden;
    });
  }

  $(document).keyup(function (e) {
    var key = e.keyCode || e.which;
    var level = levelHotkeys[key];

    if (key == 27) {
      that.setOther(null);
    } else if (typeof level == "number" && level < currentLevel) {
      if (other == levels[level]) {
        that.setOther(null);
      } else {
        that.setOther(levels[level]);
      }
    }
  });
}

// A world is a single level which can contain objects as well as a
// starting location and goal.
function world(attrs, objects) {
  var defaults = {
    gravityAccel: 0.0008
  };

  return {
    attrs       : _.extend(defaults, attrs),
    start       : attrs.start,
    objects     : objects,
    currObjects : []
  };
}

function image(url, length) {
  var img = new Image();
  img.src = url;

  if (length) {
    img.width = length;
  }

  return img;
}
