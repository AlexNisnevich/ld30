// Example params
// attrs = {
//   x: 10,
//   y: 15,
//   img: 'img/thinger1.png'
// }
var Visuals = function(attrs) {
  this = new createjs.Bitmap(attrs.img);
  this.x = attrs.x;
  this.y = attrs.y;
  this.visual = true;

  this.draw = function(game) {
    game.addObject(this);
  };
};

// Example params
// attrs = {
//   x: 10,
//   y: 15,
//   length: 20,
//   img: 'img/thinger1.png'
// }
var Thinger = function(attrs) {
  this.length = attrs.length;

  this = new createjs.Bitmap(attrs.img);
  this.obj = this;
  this.x = attrs.x;
  this.y = attrs.y;

  this.draw = function (game) {
    this.scaleX = attrs.length / this.getBounds().width;
    game.addObject(this);
  };
};

// Example params
// attrs = {
//   x: 10,
//   y: 15,
//   length: 2,
//   height: 20,
//   img: 'img/tall_thinger1.png'
// }
var TallThinger = function(attrs) {
  Thinger.apply(this, [attrs]);
  this.height = attrs.height;
  var _draw = this.draw.bind(this);

  this.draw = function(game) {
    this.scaleY = attrs.height / this.getBounds().height;
    _draw(game);
  };
};

// Example params
// attrs = {
//   x: 10,
//   y: 15,
//   length: 20,
//   img: 'img/platform1.png',
//   fallSpeed: 6,
//   gravityThreshold: 10
// }
var MovingHeavyThinger = function(attrs) {
  Thinger.apply(this, [attrs]);
  this.startY = attrs.y;
  this.gravityThreshold = attrs.gravityThreshold;
  this.fallSpeed = attrs.fallSpeed;

  this.move = function(playerPos, world) {
    if (world.attrs.gravityCoefficient > this.gravityThreshold) {
      this.y += this.fallSpeed;
    }
  };

  this.reset = function() {
    this.y = this.startY;
  };
};

// Makes player die
var DeadlyThinger = function(attrs) {
  Thinger.apply(this, [attrs]);
  this.effectOnPlayer = "kill";
};

// Makes player die
var DeadlyTallThinger = function(attrs) {
  TallThinger.apply(this, [attrs]);
  this.effectOnPlayer = "kill";
};

// Player bounces off of object
var BouncyThinger = function(attrs) {
  Thinger.apply(this, [attrs]);
  this.effectOnPlayer = "bounce";
};

// Makes player stop moving
var StickyThinger = function(attrs) {
  TallThinger.apply(this, [attrs]);
  this.effectOnPlayer = "stop";
};

var Exit = function(attrs) {
  Thinger.apply(this, [attrs]);
  this.effectOnPlayer = "exit";
};

var MovingExit = function(attrs) {
  MovingHeavyThinger.apply(this, [attrs]);
  this.effectOnPlayer = "exit";
};

// Makes player move faster
var Ice = function(attrs) {
  Thinger.apply(this, [attrs]);
  this.effectOnPlayer = "speedUp";
  this.shatterVelocity = 15;

  this.shatter = function () {
    this.scaleX = 0;
  };

  this.reset = function () {
    this.scaleX = attrs.length / this.getBounds().width;
  };
};
