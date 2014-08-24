var LevelOne = new World({
  name: "A",
  start: [390, 440],
  goal: [260, 380],
  gravityCoefficient: 1
}, [{
  type: "platform",
  x: 265,
  y: 420,
  length: 75,
  img: 'assets/platform.png'
},{
  type: "platform",
  x: 360,
  y: 460,
  length: 80,
  img: 'assets/platform.png'
}]);

var LevelTwo = new World({
  name: "B",
  start: [515, 300],
  goal: [260, 380],
  gravityCoefficient: 1
}, [{
  type: "platform",
  x: 515,
  y: 300,
  length: 30,
  img: 'assets/platform.png'
}]);

var LevelThree = new World({
  name: "C",
  start: [365, 270],
  goal: [695, 450],
  gravityCoefficient: 1
}, [{
  type: "ice",
  x: 345,
  y: 300,
  length: 70,
  img: 'assets/ice.png'
},{
  type: "ice",
  x: 515,
  y: 465,
  length: 70,
  img: 'assets/ice.png'
}]);
