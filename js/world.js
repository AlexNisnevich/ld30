var width    = 1000;
var height   = 600;

// Manages everything in the game: the player, platforms,
// enemies... etc. Contains the Physics.js world (called physics).
function Game(base) {
  var addObjects = changeObjects("add");
  var removeObjects = changeObjects("remove");

  var that = this;

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
      x        : 260,
      y        : 380,
      vx       : 0,
      vy       : 0,
      radius   : 22,
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
  }

  // The loop which checks which objects are "grounded", ie on top of
  // some other object.
  physics.on('collisions:detected', function (data) {
    for (var i = 0, l = data.collisions.length; i < l; i++) {
      var c = data.collisions[i];
      
      c.bodyA.grounded = false;
      c.bodyB.grounded = false;
    }

    for (var i = 0, l = data.collisions.length; i < l; i++) {
      var c = data.collisions[i];

      // Only counts an object as grounded if it is exactly
      // vertical. We can change this to be some reasonable angle
      // later.
      if (c.norm.y >= 0.8 && c.norm.x <= 0.2) {
        if (c.bodyA.state.pos.y <= c.bodyB.state.pos.y + 4) {
          c.bodyA.grounded = true;
        }

        if (c.bodyB.state.pos.y <= c.bodyA.state.pos.y + 4) {
          c.bodyB.grounded = true;
        }
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
}

// A world is a single level which can contain objects as well as a
// starting location and goal.
function World(attrs, objects) {
  return {
    attrs   : attrs,
    start   : attrs.start,
    goal    : attrs.goal,
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
