// An object represents a discrete part of the world, which may or may
// not be able to move. It wraps a Physics.js body.
function entity(shape, options) {
  var shapeName    = shape.name || shape;

  b = Physics.body(shapeName, _.extend({
    x           : 0,
    y           : 0,
    vx          : 0,
    vy          : 0,
    restitution : 0.1
  }, shape, options));

  console.log(b);
  return b;
}

function platform(options) {
  var defaults = {
    treatment : "static"
  };

  return entity(rectangle(options.length, options.height), _.extend(defaults, options));
}

function zombiePlatform(options) {
  var defaults = {
    height      : 1,
    view        : image("assets/zombie_tile.png", options.length + 15)
  };

  return platform(_.extend(defaults, options));
}

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

function tree(options) {
  var defaults = {
    length : 20,
    height : 495,
    view   : image("assets/nature_trunk.png", options.length)
  };

  return platform(_.extend(defaults, options));
}

function branch(type, options) {
  var defaults = {
    view        : image("assets/nature_branch" + type + ".png", options.length),
    restitution : 0.8
  };

  return platform(_.extend(defaults, options));
}

function beehive(options) {
  var defaults = {
    height   : 64,
    length   : 40,
    view     : image("assets/nature_hive.png", 40)
  };

  return platform(_.extend(defaults, options)); 
}

function bee(options) {
  var defaults = {
    view      : image("assets/nature_bee.png"),
    passable  : true,
    killer    : true,
    bee       : true,
    beeAngle  : Math.random() * 360,
    treatment : "static"
  };

  return entity(circle(10), _.extend(defaults, options));
}

function exit(options) {
  var defaults = {
    goal      : true,
    treatment : "static",
    view      : image("assets/magicKey.png", options.length),
    baseOnly  : true
  };

  return entity(rectangle(13, 23), _.extend(defaults, options));
}

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
