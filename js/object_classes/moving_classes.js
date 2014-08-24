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
  this.minRadius = attrs.radius;
  this.radius = attrs.radius;
  this.maxRadius = attrs.maxRadius;
  var that = this;

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
    if(this.maxRadius > this.radius) {
      this.radius += attrs.speedOut;
    }
  };

  this.moveInward = function() {
    if(this.minRadius < this.radius) {
      this.radius -= attrs.speedIn;
    }
  };

  this.reset = function () {
    this.radius = this.minRadius;
    setupRadius();
  };

  // For now
  // Makes the initial radius the center radius
  var setupRadius = function() {
    that.image.scaleX = that.radius / that.image.getBounds().width;
    that.image.scaleY = that.radius / that.image.getBounds().height;
    that.image.x = that.centerX - that.radius / 2;
    that.image.y = that.centerY - that.radius / 2;
  };
};

// Example params
// attrs = {
//   x: 10,
//   y: 15,
//   length: 20,
//   height: 20,
//   img: 'img/platform1.png',
//   distance: 15,
//   speed: 2
// }
var MovingZombie = function(attrs) {
  DeadlyTallThinger.apply(this, [attrs]);

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
//   height: 20,
//   img: 'img/platform1.png',
//   interval: 30,
//   activeLength: 15
// }
var MovingPolarBear = function(attrs) {
  DeadlyTallThinger.apply(this, [attrs]);
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

// Example params
// attrs = {
//   x: 10,
//   y: 15,
//   length: 20,
//   img: 'img/platform1.png',
//   goalX: 20,
//   goalY: 20,
//   speed: 2
// }
var MovingLazer = function(attrs) {
  DeadlyThinger.apply(this, [attrs]);
  this.startX = attrs.x;
  this.startY = attrs.y;

  var _moveRatio = {
    horizontal: Math.abs(attrs.x - attrs.goalX),
    vertical: Math.abs(attrs.y - attrs.goalY)
  };

  var _moves = {
    horizontal: 0,
    vertical: 0
  };

  this.move = function() {
    if(!_reachedGoal()) {
      this.moveTowardGoal();
    }
  };

  this.moveTowardGoal = function() {
    if(_shouldMoveHorizontally()) {
      if(this.image.x > attrs.goalX) {
        this.image.x -= attrs.speed;
      } else {
        this.image.x += attrs.speed;
      }
      _moves.horizontal += 1;
    } else {
      if(this.image.y > attrs.goalY) {
        this.image.y -= attrs.speed;
      } else {
        this.image.y += attrs.speed;
      }
      _moves.vertical += 1;
    }
    _resetMoves();
  };

  this.reset = function() {
    this.image.x = this.startX;
    this.image.y = this.startY;
  };

  var _reachedGoal = function() {
    return this.image.x === attrs.goalX && this.image.y === attrs.goalY;
  };

  var _shouldMoveHorizontally = function() {
    return _moves.horizontal < _moveRatio.horizontal && this.image.x !== this.goalX;
  };

  var _resetMoves = function() {
    if(_needToResetMoves()) {
      _moves = {
        horizontal: 0,
        vertical: 0
      };
    }
  };

  var _needToResetMoves = function() {
    return _moves.horizontal === _moveRatio.horizontal && _moves.vertical === _moveRatio.vertical;
  };
};

var _euclideanDistance = function (pos1, pos2) {
  xDistance = Math.abs(pos1.x - pos2.x);
  yDistance = Math.abs(pos1.y - pos2.y);
  return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2));
};
