// Example params
// attrs = {
//   x: 10,
//   y: 15,
//   length: 20,
//   img: 'img/platform1.png'
// }
var Platform = function(attrs) {
	this.length = attrs.length;

	this.image = new createjs.Bitmap(attrs.img);
	this.image.x = attrs.x;
	this.image.y = attrs.y;

	this.draw = function (game) {
		this.image.scaleX = attrs.length / this.image.getBounds().width;
		game.addObject(this.image);
	}
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
