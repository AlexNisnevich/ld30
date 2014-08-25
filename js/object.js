var PLATFORM_HEIGHT = 10;

// An object represents a discrete part of the world, which may or may
// not be able to move. It wraps a Physics.js body.
function entity(shape, options) {
  var shapeName    = shape.name || shape;

  return Physics.body(shapeName, _.extend({
    x     : options.x  || 0,
    y     : options.y  || 0,
    vx    : options.vx || 0,
    vy    : options.vy || 0
  }, shape, options));
}

function platform(options) {
  options.treatment = 'static';
  return entity(rectangle(options.length, PLATFORM_HEIGHT), options);
}

function zombiePlatform(options) {
  var defaults = {
    restitution : 0.1,
    view        : image("assets/zombie_tile.png", options.length + 15)
  };

  return platform(_.extend(defaults, options));
}

function exit(options) {
  var defaults = {
    goal      : true,
    treatment : "static",
    view      : image("assets/magicKey.png", options.length)
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
