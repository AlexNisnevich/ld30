// An object represents a discrete part of the world, which may or may
// not be able to move. It wraps a Physics.js body.

// Base classes

function entity(shape, options) {
  return function () {
    var shapeName    = shape.name || shape;
    options = _.extend({
      x           : 0,
      y           : 0,
      vx          : 0,
      vy          : 0,
      restitution : 0.1
    }, shape, options);

    return Physics.body(shapeName, options);
  }
}

function platform(options) {
  var defaults = {
    treatment : "static"
  };

  return entity(rectangle(options.length, options.height), _.extend(defaults, options));
}

// All worlds

function exit(options) {
  var defaults = {
    goal      : true,
    treatment : "static",
    view      : image("assets/magicKey.png", options.length),
    baseOnly  : true
  };

  return entity(rectangle(13, 23), _.extend(defaults, options));
}

// Zombie world

function zombiePlatform(options) {
  var defaults = {
    height      : 1,
    view        : image("assets/zombie_tile.png", options.length + 15)
  };

  return platform(_.extend(defaults, options));
}

function crate(options) {
  var defaults = {
    length : 28,
    height : 31,
    view   : image("assets/zombie_crate0.png", 28 + 10),
    treatment : "dynamic",
    mass : 1000
  }

  return platform(_.extend(defaults, options));
}

function barbedWire(options) {
  var defaults = {
    length : 51,
    height : 30,
    view   : image("assets/zombie_bwire.png", 51 + 15),
    killer : true,
    //treatment : "dynamic",
    mass : 1
  }

  return platform(_.extend(defaults, options));
}

function zombie(options) {
  var defaults = {
    length : 30,
    height : 54,
    view   : image("assets/zombie_zombie.png", 30 + 15),
    images : {
      forward : image("assets/zombie_zombie_reversed.png", 30 + 15),
      backward : image("assets/zombie_zombie.png", 30 + 15)
    },
    killer : true,
    killable : 1,
    zombie : true,
    treatment : "dynamic",
    mass : 1
  };

  return platform(_.extend(defaults, options));
}

// Polar world

function icePlatform(options) {
  var defaults = {
    cof         : 1,
    height      : 20,
    view        : image("assets/polar_ice1.png", options.length + 15),
    ice         : true,
    breakable   : true
  };

  return platform(_.extend(defaults, options));
}

// Nature world

function tree(options) {
  var defaults = {
    length : 20,
    height : 495,
    view   : image("assets/nature_trunk2.png", options.length)
  };

  return platform(_.extend(defaults, options));
}

function branch(type, options) {
  var defaults = {
    view        : image("assets/nature_branch" + type + ".png", options.length),
    restitution : 0.4
  };

  return platform(_.extend(defaults, options));
}

function beehive(options) {
  var defaults = {
    height   : 64,
    length   : 40,
    view     : image("assets/nature_hive2.png", 40)
  };

  return platform(_.extend(defaults, options)); 
}

function bee(options) {
  var defaults = {
    view      : image("assets/nature_bee2.png"),
    passable  : true,
    killer    : true,
    bee       : true,
    beeAngle  : Math.random() * 360,
    treatment : "static"
  };

  return entity(circle(10), _.extend(defaults, options));
}

function laser(type, options) {
  var defaults = {
    height    : 10,
    length    : 60,
    killer    : true,
    npcKiller : 1,
    moving    : { x : 0.5, y : 0 },
    treatment : "dynamic",
    view      : image("assets/space_laser" + type + ".png"),
    stoppable : true
  };

  return platform(_.extend(defaults, options));
}

function spaceship(type, options) {
  var defaults = {
    length   : 50,
    height   : 31,
    killable : 2,
    view     : image("assets/space_ship" + type + ".png"),
    spaceship : true
  };

  return platform(_.extend(defaults, options));
}

function asteroid(options) {
  var radius = options.length || 88;

  var defaults = {
    height      : 88,
    view        : image("assets/space_rock1.png", radius - 20, radius - 20),
    floating    : true,
    treatment   : "static",
    radius      : radius
  };

  return entity(circle(radius), _.extend(defaults, options));
}

// Geometry

// A circle shape, with the given radius.
function circle(radius) {
  return {
    name   : "circle",
    radius : radius
  }
}

// A rectangle shape.
function rectangle(width, height) {
  return {
    name   : "rectangle",
    width  : width,
    height : height
  }
}
