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

var Platform = function(attrs) {
  Thinger.apply(this, [attrs]);
};

// Example params
// attrs = {
//   x: 10,
//   y: 15,
//   length: 20,
//   img: 'img/platform1.png',
//   direction: 'left',
//   speed: 2,
//   leftBound: 6,
//   rightBound: 10
// }
var MovingPlatform = function(attrs) {
  Platform.apply(this, [attrs]);
  this.direction = attrs.direction;
  this.speed = attrs.speed;
  this.leftBound = attrs.leftBound;
  this.rightBound = attrs.rightBound;
  this.upBound = attrs.upBound;
  this.downBound = attrs.downBound;
};

// Example params
// attrs = {
//   x: 10,
//   y: 15,
//   length: 2,
//   height: 20,
//   img: 'img/wall1.png'
// }
var Wall = function(attrs) {
  Thinger.apply(this, [attrs]);
  this.height = attrs.height;
  var _draw = this.draw.bind(this);

  this.draw = function() {
    this.image.scaleX = attrs.height / this.image.getBounds().height;
    _draw();
  };
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

// Example params
// attrs = {
//   x: 10,
//   y: 15,
//   length: 20,
//   img: 'img/platform1.png',
//   interval: 30,
//   activeLength: 15
// }
var MovingPolarBear = function(attrs) {
  DeadlyThinger.apply(this, [attrs]);
  this.interval = attrs.interval;
  this.activeLength = attrs.activeLength;
  var tick = 0;
  var visible = false;

  this.move = function() {
    tick++;
    if(tick > this.interval && !visible) {
      this.appear();
      visible = true;
    } else if (tick > (this.interval+this.activeLength)) {
      this.disappear();
      visible = false;
      tick = 0;
    }
  };

  this.appear = function() {
    this.image.scaleX = attrs.length / this.image.getBounds().width;
  };

  this.disappear = function() {
    this.image.scaleX = 0;
  };
};

// Makes player die
var DeadlyThinger = function(attrs) {
  Thinger.apply(this, [attrs]);
  this.effectOnPlayer = "kill";
};

// Player bounces off of object
var BounceThinger = function(attrs) {
  Thinger.apply(this, [attrs]);
  this.effectOnPlayer = "bounce";
};

// Makes player stop moving
var ImmobilizeThinger = function(attrs) {
  Thinger.apply(this, [attrs]);
  this.effectOnPlayer = "stop";
};

// Example params
// attrs = {
//   x: 10,
//   y: 15,
//   length: 20,
//   img: 'img/platform1.png',
//   distance: 15,
//   speed: 2
// }
var MovingZombie = function(attrs) {
  DeadlyThinger.apply(this, [attrs]);

  this.move = function(playerPos) {
    function distanceFromPlayer(playerPos) {
      xDistance = Math.abs(playerPos.x - this.image.x);
      yDistance = Math.abs(playerPos.y - this.image.y);
      return xDistance + yDistance;
    }

    if(distanceFromPlayer(playerPos) < this.distance) {
      this.moveTowardPlayer(playerPos);
    }
  };

  this.moveTowardPlayer = function(playerPos) {
    if(playerPos.x < this.image.x) {
      this.image.x -= this.speed;
    } else {
      this.image.y -= this.speed;
    }
  };
};

MovingPlatform.prototype.move = function() {
  switch(this.direction) {
    case 'left':
      this.image.x -= this.speed;
      if(this.leftBound === this.image.x) { this.direction = 'right'; }
      break;
    case 'right':
      this.image.x += this.speed;
      if(this.rightBound === this.image.x) { this.direction = 'left'; }
      break;
    case 'up':
      this.image.y -= this.speed;
      if(this.upBound === this.image.y) { this.direction = 'down'; }
      break;
    case 'down':
      this.image.y += this.speed;
      if(this.downBound === this.image.y) { this.direction = 'up'; }
      break;
  }
};
