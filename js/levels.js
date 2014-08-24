var LevelOne = new World({
	playerStart: [500, 460],
  	gravityCoefficient: 1,
  	goal: [175, 340]
}, [{
	type: "platform",
	x: 165,
	y: 400,
	length: 155,
	img: 'assets/platform.png'
},{
	type: "platform",
	x: 370,
	y: 500,
	length: 330,
	img: 'assets/platform.png'
}]);

var levels = {
	1: LevelOne
};
