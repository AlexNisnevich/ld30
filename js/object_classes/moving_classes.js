// Example params
// attrs = {
//   x: 10,
//   y: 15,
//   radius: 5,
//   img: 'img/platform1.png',
//   maxRadius: 10,
//   senseRadius: 10,
//   speedOut: 1,
//   speedIn: .5
// }
var MovingBeehive = function(attrs) {
  // Until radius stuff is implemented
  attrs.length = attrs.radius;
  DeadlyThinger.apply(this, [attrs]);
  this.centerX = attrs.x;
  this.centerY = attrs.y;

  this.draw = function(game) {
    // For now
    setupRadius();
    game.addObject(this.image);
  };

  this.move = function(playerPos) {
    var distanceFromPlayer = _euclideanDistance({x: this.image.x, y: this.image.y}, playerPos);

    if(distanceFromPlayer < attrs.senseRadius) {
      this.moveOutward();
    } else {
      this.moveInward();
    }
    // For now
    setupRadius();
  };

  this.moveOutward = function() {
    if(attrs.maxRadius > attrs.radius) {
      attrs.radius += attrs.speedOut;
    }
  };

  this.moveInward = function() {
    if(attrs.minRadius < attrs.radius) {
      attrs.radius -= attrs.speedIn;
    }
  };

  // For now
  // Makes the initial radius the center radius
  var setupRadius = function() {
    this.image.scaleX = attrs.radius / this.image.getBounds().width;
    this.image.scaleY = attrs.radius / this.image.getBounds().height;
    this.image.x = this.centerX - attrs.radius / 2;
    this.image.y = this.centerY - attrs.radius / 2;

  };
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
    var distanceFromPlayer = _euclideanDistance({x: this.image.x, y: this.image.y}, playerPos);

    if(distanceFromPlayer < this.distance) {
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
  var tick = 0;
  var visible = false;

  this.move = function() {
    tick++;
    if(tick > attrs.interval && !visible) {
      this.appear();
      visible = true;
    } else if (tick > (attrs.interval+attrs.activeLength)) {
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

var _euclideanDistance = function (pos1, pos2) {
  xDistance = Math.abs(pos1.x - pos2.x);
  yDistance = Math.abs(pos1.y - pos2.y);
  return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2));
};
