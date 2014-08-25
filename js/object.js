var PLATFORM_HEIGHT = 10;

// An object represents a discrete part of the world, which may or may
// not be able to move. It wraps a Physics.js body.
function entity(image, shape, options) {
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
  return entity("assets/platform.png", rectangle(options.length, PLATFORM_HEIGHT), options);
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

