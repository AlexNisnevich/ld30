var width    = 1000;
var height   = 500;

// Manages everything in the game: the player, platforms,
// enemies... etc. Contains the Physics.js world (called physics).
function Game(base) {
  var addObjects = changeObjects("add");
  var removeObjects = changeObjects("remove");

  var settings = {
    timestep   : 1000 / 160,
    maxIPF     : 16,
    integrator : "verlet"
  };

  var physics = Physics(settings);

  // TODO: Make the player not be a circle!
  var player = Physics.body('circle', {
    x        : 100,
    y        : 80,
    vx       : 0,
    vy       : 0,
    radius   : 20,
    fixed    : false,
    grounded : false
  });
  physics.add(player);

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

  createControl(this);
  var control = Physics.behavior('control').applyTo([player]);
  physics.add(control);

  physics.add(renderer());

  var other = null;

  var gravity = Physics.behavior('constant-acceleration', {
    acc: { x : 0, y: 0.0004 }
  });
  physics.add(gravity);

  addObjects(base);

  // Returns a list of all the objects subject to gravity.
  function freeFalling() {
    var otherObjects = other && other.objects ? other.objects : [];
    return _.filter(base.objects.concat(otherObjects, [player]),
                    function (x) { return !x.fixed });
  }
  
  function changeObjects(action) {
    return function(world) {
      if (world) {
        physics[action](world.objects);
      }

      gravity.applyTo(freeFalling());
    }
  }

  this.physics = physics;
  this.player = player;

  this.setBase = function (newBase) {
    removeObjects(base);
    base = newBase;
    addObjects(base);
  };

  this.setOther = function (newOther) {
    removeObjects(other);
    other = newOther;
    addObjects(other);
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
