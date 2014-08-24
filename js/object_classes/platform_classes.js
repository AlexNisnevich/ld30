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

  this.move = function() {
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
};

var MovingHeavyPlatform = function(attrs) {
  Platform.apply(this, [attrs]);
  this.startY = attrs.y;
  this.gravityThreshold = attrs.gravityThreshold;
  this.fallSpeed = attrs.fallSpeed;

  this.move = function() {
    if (game.getWorld().attrs.gravityCoefficient > this.gravityThreshold) {
      this.image.y += this.fallSpeed;
    }
  };

  this.reset = function() {
    this.image.y = this.startY;
  };
};