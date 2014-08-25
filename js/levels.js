var LevelOne = new World({
  name: "Zombie1",
  levelNum: 1,
  start: [390, 430],
  goal: {
    type: 'exit',
    x: 260,
    y: 380,
    img: 'assets/magicKey.png',
  },
  gravityCoefficient: 1,
  cantOverlap: []
}, [{
  type: "platform",
  x: 265,
  y: 420,
  length: 75,
  img: 'assets/zombie_tile.png'
},{
  type: "platform",
  x: 360,
  y: 450,
  length: 80,
  img: 'assets/zombie_tile.png'
}]);

var LevelTwo = new World({
  name: "Zombie2",
  levelNum: 2,
  start: [515, 300],
  goal: {
    type: 'exit',
    x: 260,
    y: 380,
    img: 'assets/magicKey.png',
  },
  gravityCoefficient: 1,
  cantOverlap: []
}, [{
  type: "platform",
  x: 515,
  y: 300,
  length: 30,
  img: 'assets/zombie_tile.png'
}]);

var LevelThree = new World({
  name: "Ice1",
  levelNum: 3,
  start: [365, 270],
  goal: {
    type: 'exit',
    x: 775,
    y: 450,
    img: 'assets/magicKey.png',
  },
  gravityCoefficient: 1,
  cantOverlap: []
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
  name: "Nature1",
  levelNum: 4,
  start: [600, 225],
  goal: {
    type: 'exit',
    x: 600,
    y: 555,
    img: 'assets/magicKey.png',
  },
  gravityCoefficient: 1,
  cantOverlap: []
}, [{
  type: "tree",
  x: 625,
  y: 105,
  length: 25,
  height: 495,
  img: 'assets/nature_trunk.png'
},{
  type: "bouncyThinger",
  x: 565,
  y: 250,
  length: 70,
  img: 'assets/nature_branch1.png'
},{
  type: "bouncyThinger",
  x: 490,
  y: 370,
  length: 145,
  img: 'assets/nature_branch2.png'
},{
  type: "bouncyThinger",
  x: 707,
  y: 150,
  length: -70,
  img: 'assets/nature_branch1.png'
},{
  type: "bouncyThinger",
  x: 645,
  y: 565,
  length: 140,
  img: 'assets/nature_branch3.png'
},{
  type: "visuals",
  x: 520,
  y: 370,
  img: 'assets/nature_hive.png'
},{
  type: "movingBeehive",
  x: 550,
  y: 400,
  radius: 20,
  img: 'assets/nature_bee.png',
  maxRadius: 100,
  senseRadius: 200,
  speedOut: 1,
  speedIn: 0.4
}]);

var LevelFive = new World({
  name: "Space1",
  levelNum: 5,
  start: [925, 470],
  goal: {
    type: 'movingExit',
    x: 95,
    y: 70,
    img: 'assets/magicKey.png',
    gravityThreshold: 0.5,
    fallSpeed: 1
  },
  gravityCoefficient: 0.2,
  cantOverlap: []
}, [{
  type: "movingHeavyPlatform",
  x: 45,
  y: 45,
  length: 135,
  img: 'assets/platform.png',
  gravityThreshold: 0.5,
  fallSpeed: 1
},{
  type: "movingHeavyPlatform",
  x: 900,
  y: 495,
  length: 80,
  img: 'assets/platform.png',
  gravityThreshold: 0.5,
  fallSpeed: 1
}]);

/*var BlankFinalLevel = new World({
  name: "PlaceholderCredits",
  levelNum: 15,
  cantOverlap: []
}, [
]);*/
