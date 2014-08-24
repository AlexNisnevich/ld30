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
  name: "Ice1",
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

var LevelFour = new World({
  name: "Tree1",
  start: [600, 225],
  goal: [600, 555],
  gravityCoefficient: 1
}, [{
  type: "tree",
  x: 625,
  y: 105,
  length: 25,
  height: 495,
  img: 'assets/tree.png'
},{
  type: "bouncyThinger",
  x: 560,
  y: 250,
  length: 70,
  img: 'assets/branch.png'
},{
  type: "bouncyThinger",
  x: 480,
  y: 370,
  length: 145,
  img: 'assets/branch.png'
}]);

var LevelFive = new World({
  name: "Space1",
  start: [925, 470],
  goal: [95, 70],
  gravityCoefficient: 0.1
}, [{
  type: "platform",
  x: 45,
  y: 45,
  length: 135,
  img: 'assets/platform.png'
},{
  type: "platform",
  x: 900,
  y: 495,
  length: 80,
  img: 'assets/platform.png'
}]);
