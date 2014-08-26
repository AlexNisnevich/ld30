var width    = 1000;
var height   = 600;

// Manages everything in the game: the player, platforms,
// enemies... etc. Contains the Physics.js world (called physics).
function Game(levels) {
  var that = this;

  var beehavior = null;
  var zombiehavior = null;

  var base = this.base = levels[currentLevel];
  var other = null;

  var flickerTimeouts = [];

  var currentBg = '';

  var levelHotkeys = {
    49:  0,  // key: 1
    50:  1,  // key: 2
    51:  2,  // key: 3
    52:  3,  // key: 4
    53:  4,  // key: 5
    54:  5,  // key: 6
    55:  6,  // key: 7
    56:  7,  // key: 8
    57:  8,  // key: 9
    48:  9,  // key: 0
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

  physics.add(Physics.behavior('animateExit'));

  this.setBase = function (newBase) {
    _.each(base.behaviors, function (b) { physics.remove(b) });
    removeObjects(base);

    if (newBase.attrs.bg && newBase.attrs.bg != currentBg) {
      currentBg = newBase.attrs.bg;
      $('canvas').css('background', 'url(' + newBase.attrs.bg + ')');
    }

    base = newBase;
    that.base = newBase;
    addObjects(base);

    if (this.player) {
      physics.remove(this.player);
    }

    // TODO: Make the player not be a circle!
    this.player = Physics.body('circle', {
      x        : newBase.start.x,
      y        : newBase.start.y,
      vx       : 0,
      vy       : 0,
      radius   : 28,
      cof      : 1,
      grounded : false,
      view     : image("assets/char_face1.png")
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

    _.each(base.behaviors, function (b) { physics.add(b) });

    if (beehavior) {
      physics.remove(beehavior);
    }
    bees(that.player);
    beehavior = Physics.behavior("bees").applyTo(_.filter(base.currObjects, function (object) {
      return !!object.bee;
    }));
    physics.add(beehavior);

    if (zombiehavior) {
      physics.remove(zombiehavior);
    }
    zombies(that.player);
    zombiehavior = Physics.behavior("zombies").applyTo(_.filter(base.currObjects, function (object) {
      return !!object.zombie;
    }));
    physics.add(zombiehavior);

    fallingPlatform(that);
    physics.add(Physics.behavior("falling-platform").applyTo(_.filter(base.currObjects, function (object) {
      return !!object.floating;
    })));

    physics.add(Physics.behavior("moving-platform"));

    this.updateLevelSidebar();
  };

  this.setOther = function (newOther) {
    function otherable(object) {
      return !object.baseOnly;
    }

    if (flickerTimeouts) {
      _.map(flickerTimeouts, clearTimeout);
    }

    if (other) {
      _.each(other.behaviors, function (b) { physics.remove(b) });
    }

    removeObjects(other);
    other = newOther;
    addObjects(other, otherable);

    if (other) {
      _.each(other.behaviors, function (b) { physics.add(b) });

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

    this.updateLevelSidebar();
  }

  this.updateLevelSidebar = function() {
    var baseNum = base.attrs.levelNum;
    var overlayNum = other ? other.attrs.levelNum : null;

    showStory();

    var $items = $('.levelindicator');
    $items.hide();
    for (var i = 1; i <= baseNum; i++) {
        var $item = $items.filter('.' + i);
        $item.show();
        if (i === baseNum) {
            $item.addClass('levelindicator-current');
        } else {
            $item.removeClass('levelindicator-current');
        }

        if (overlayNum && overlayNum === i) {
            $item.addClass('levelindicator-overlay');
        } else {
            $item.removeClass('levelindicator-overlay');
        }

        if (i < baseNum) {
          $('.levelindicator.' + i + ' .hotkey').show();
        }
    }
  }

  this.resetObjects = function () {
    _.each(physics.activeLasers, function (laser) {
      physics.removeBody(laser);
    })

    physics.emit("reset-objects");
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
    that.resetObjects();
  });

  physics.on("next-level", function () {
    sound_getKey.play();
    currentLevel++;

    if (currentLevel > 10) {
      physics.emit('the-end');
      return;
    }

    that.setOther(null);
    that.setBase(levels[currentLevel]);
    that.resetObjects();
  });

  physics.on("the-end", function () {
    showMessage(["The End", "Thanks for playing!"]);
    $('canvas').remove();
    physics = null;
  })

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
    } else if (key == 82) {
      that.setOther(null);
      that.setBase(base);
    } else if (typeof level == "number" && level < currentLevel) {
      sound_levelOverlay.play();
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
function world(attrs, objects, behaviors) {
  var defaults = {
    gravityAccel: 0.0008
  };

  behaviors = behaviors || [];

  return {
    attrs       : _.extend(defaults, attrs),
    start       : attrs.start,
    objects     : objects,
    behaviors   : behaviors,
    currObjects : []
  };
}

function image(url, length, height) {
  var img = new Image();
  img.src = url;

  if (length) {
    img.width = length;
  }

  if (height) {
    img.height = height;
  }

  return img;
}
