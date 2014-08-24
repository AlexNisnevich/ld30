var LevelOne = new World({
	start: [240, 500],
  	goal: [20, 370],
  	gravityCoefficient: 1
}, [{
	type: "platform",
	x: 30,
	y: 490,
	length: 90,
	img: 'assets/platform.png'
},{
	type: "platform",
	x: 150,
	y: 560,
	length: 140,
	img: 'assets/platform.png'
}]);

var LevelTwo = new World({
	start: [430, 265],
  	goal: [65, 435],
  	gravityCoefficient: 1
}, [{
	type: "platform",
	x: 435,
	y: 315,
	length: 35,
	img: 'assets/platform.png'
}]);

LevelTwo.combine(LevelOne);

var levels = {
	1: LevelOne,
	2: LevelTwo
};
