var LevelOne = new World({
  name: "A",
  start: [390, 430],
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
  y: 450,
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
  goal: [775, 450],
  gravityCoefficient: 1
}, [{
  type: "ice",
  x: 325,
  y: 300,
  length: 70,
  img: 'assets/ice.png'
},{
  type: "ice",
  x: 515,
  y: 465,
  length: 100,
  img: 'assets/ice.png'
}]);
