var width    = 1000;
var height   = 600;

// Manages everything in the game: the player, platforms,
// enemies... etc. Contains the Physics.js world (called physics).
function Game(levels) {
  var that = this;

  var addObjects = changeObjects("add");
  var removeObjects = changeObjects("remove");

  var currentLevel = 0;
  var base  = levels[currentLevel];

  var levelHotkeys = {
    49:  0,  // 1
    50:  1,  // 2
    51:  2,  // 3
    52:  3,  // 4
    113: 4   // Q
  }; 

  var settings = {
    timestep   : 1000 / 160,
    maxIPF     : 16,
    integrator : "verlet"
  };

  var physics = Physics(settings);

  this.physics = physics;
  this.player = null;

  this.setBase = function (newBase) {
    if (this.player) {
      physics.remove(this.player);
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

    if (control) {
      physics.remove(control);
    }

    if (die) {
      physics.remove(die);
    }
   
    physics.add(this.player);

    control = Physics.behavior('control').applyTo([this.player]);
    physics.add(control);

    die = Physics.behavior('die-offscreen').applyTo([this.player]);
    physics.add(die);

    removeObjects(base);
    base = newBase;
    addObjects(base);
  };

  this.setOther = function (newOther) {
    removeObjects(other);
    other = newOther;
    addObjects(other);

    setTimeout(function () { removeObjects(other) }, 50);
    setTimeout(function () { addObjects(other) }, 100);
    setTimeout(function () { removeObjects(other) }, 150);
    setTimeout(function () { addObjects(other) }, 200);
  }

  // The loop which checks which objects are "grounded", ie on top of
  // some other object.
  physics.on('collisions:detected', function (data) {
    for (var i = 0, l = data.collisions.length; i < l; i++) {
      var c = data.collisions[i];
      
      c.bodyA.grounded = false;
      c.bodyB.grounded = false;
      
      c.bodyA.iced = false;
      c.bodyB.iced = false;
    }

    for (var i = 0, l = data.collisions.length; i < l; i++) {
      var c = data.collisions[i];
      var bodyA = c.bodyA;
      var bodyB = c.bodyB;

      // Only counts an object as grounded if it is exactly
      // vertical. We can change this to be some reasonable angle
      // later.
      if (Math.abs(c.norm.y) >= 0.8 && Math.abs(c.norm.x) <= 0.2) {
        if (bodyA.state.pos.y <= bodyB.state.pos.y + 4) {
          bodyA.grounded = true;
        }

        if (bodyB.state.pos.y <= bodyA.state.pos.y + 4) {
          bodyB.grounded = true;
        }
      }

      if (bodyB.ice) {
        console.log("Iced");
        bodyA.iced = true;
      }

      if (bodyA.ice) {
        console.log("Iced");
        bodyB.iced = true;
      }

      // Killer!
      if (bodyA == that.player && bodyB.killer ||
          bodyB == that.player && bodyA.killer) {
        physics.emit("die");
      }

      // Key!
      if (bodyA == that.player && bodyB.goal ||
          bodyB == that.player && bodyA.goal) {
        physics.emit("next-level");
      }
    }
  });

  physics.add(Physics.behavior('body-impulse-response'));
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

  var other = null;

  var gravity = Physics.behavior('constant-acceleration', {
    acc: { x : 0, y: 0.0008 }
  });
  physics.add(gravity);

  this.setBase(base);

  function changeObjects(action) {
    return function(world) {
      if (world) {
        physics[action](world.objects);
      }
    }
  }

  $(document).keypress(function (e) {
    var level = levelHotkeys[e.keyCode];

    if (typeof level == "number" && level < currentLevel) {
      if (other == levels[level]) {
        console.log("Done");
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
  return {
    attrs   : attrs,
    start   : attrs.start,
    objects : objects
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
