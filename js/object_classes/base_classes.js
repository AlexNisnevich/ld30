// Example params
// attrs = {
//   x: 10,
//   y: 15,
//   img: 'img/thinger1.png'
// }
var Visuals = function(attrs) {
  this.image = new createjs.Bitmap(attrs.img);
  this.image.x = attrs.x;
  this.image.y = attrs.y;
  this.visual = true;

  this.draw = function(game) {
    game.addObject(this.image);
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

  this.image = new createjs.Bitmap(attrs.img);
  this.image.obj = this;
  this.image.x = attrs.x;
  this.image.y = attrs.y;

  this.draw = function (game) {
    this.image.scaleX = attrs.length / this.image.getBounds().width;
    game.addObject(this.image);
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
    this.image.scaleY = attrs.height / this.image.getBounds().height;
    _draw(game);
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
var Tree = function(attrs) {
  TallThinger.apply(this, [attrs]);
  this.effectOnPlayer = "stop";
};

// Makes player move faster
var Ice = function(attrs) {
  Thinger.apply(this, [attrs]);
  this.effectOnPlayer = "speedUp";
  this.shatterVelocity = 15;

  this.shatter = function () {
    this.image.scaleX = 0;
  };

  this.reset = function () {
    this.image.scaleX = attrs.length / this.image.getBounds().width;
  };
};
