// Example params
// attrs = {
//   x: 10,
//   y: 15,
//   length: 20,
//   img: 'img/platform1.png'
// }
var Platform = function(attrs) {
  this.x = attrs.x;
  this.y = attrs.y;
  this.length = attrs.length;
  this.img = attrs.img;
};

// Example params
// attrs = {
//   x: 10,
//   y: 15,
//   length: 20,
//   img: 'img/platform1.png',
//   direction: 'left',
//   speed: 2
// }
var MovingPlatform = function(attrs) {
  Platform.apply(this, [attrs]);
  this.direction = attrs.direction;
  this.speed = attrs.speed;
};
