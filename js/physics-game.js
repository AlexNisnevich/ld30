var levels = [
  // one
  world({
    levelNum : 1,
    start : { x : 370, y : 430 },
    bg : 'assets/zombie_bg.png'
  }, [
    zombiePlatform({
      x           : 265,
      y           : 420,
      length      : 55
    }),
    zombiePlatform({
      x           : 360,
      y           : 450,
      length      : 60
    }),
    exit({
      x : 260,
      y : 380
    })
  ]),

  // two
  world({
    levelNum : 2,
    start : { x : 515, y : 280 },
    bg : 'assets/zombie_bg.png'
  }, [
    zombiePlatform({
      x           : 515,
      y           : 300,
      length      : 30
    }),
    exit({
      x : 260,
      y : 380
    })
  ]),

  // three
  world({
    levelNum : 3,
    start : { x : 345, y : 270 },
    bg : 'assets/polar_bg.png'
  }, [
    icePlatform({
      x      : 325,
      y      : 300,
      length : 70
    }),
      icePlatform({
      x      : 515,
      y      : 465,
      length : 100
    }),
    exit({
      x : 775,
      y : 450
    })
  ]),

  // four
  world({
    levelNum : 4,
    start : { x : 600, y : 125 },
    bg : 'assets/nature_bg.png'
  }, [
    tree({
      x : 625,
      y : 328
    }),
    branch('Small', {
      x      : 582,
      y      : 200,
      length : 70
    }),
    branch('Big', {
      x      : 547,
      y      : 323,
      length : 145
    }),
    branch('Big2', {
      x      : 712,
      y      : 570,
      length : 140
    }),
    branch('Small2', {
      x      : 664,
      y      : 100,
      length : 70
    }),
    beehive({
      x : 542,
      y : 365
    }),
    bee({
      x : 542,
      y : 365
    }),
    bee({
      x : 542,
      y : 365
    }),
    bee({
      x : 542,
      y : 365
    }),
    bee({
      x : 542,
      y : 365
    }),
    bee({
      x : 542,
      y : 365
    }),
    exit({
      x : 580,
      y : 555
    })
  ]),

  // five
  world({
    levelNum : 5,
    start : { x : 940, y : 480 },
    bg : 'assets/space_bg.png',
    gravityAccel: 0.0001
  }, [
    asteroid({
      x      : 940,
      y      : 507,
      length : 80,
      height : 77,
      view   : image("assets/space_rock2.png", 80 + 15)
    }),
    asteroid({
      x      : 110,
      y      : 55,
      length : 130,
    }),
    exit({
      x        : 110,
      y        : 100,
      floating : true
    })
  ]),


  // six
  world({
    levelNum : 6,
    start : { x : 150, y : 500 },
    bg : 'assets/space_bg.png',
    gravityAccel: 0.0001
  }, [
    asteroid({
      x         : 150,
      y         : 550,
      length    : 80,
      height    : 77,
      view      : image("assets/space_rock2.png", 80 + 15),
      treatment : "kinematic",
      moving    : { x : 0.08, y : 0 },
      cof       : 1,
      floating  : false
    }),
    asteroid({
      x      : 940,
      y      : 457,
      length : 80,
      height : 77,
      view   : image("assets/space_rock2.png", 80 + 15)
    }),
    spaceship(1, {
      x : 60,
      y : 370
    }),
    spaceship(2, {
      x : 900,
      y : 400
    }),
    exit({
      x        : 900,
      y        : 430
    })
  ], [
    Physics.behavior("laser", { options : { x : 116, y : 370 } }),
    Physics.behavior("laser", {
      laserType : 2,
      options : {
        x : 842,
        y : 400
        ,
        moving : { x : -0.5, y : 0 }
      }
    })
  ]),

  // seven
  world({
    levelNum : 7,
    start : { x : 25, y : 100 },
    bg : 'assets/polar_bg.png'
  }, [
    icePlatform({
      x      : 50,
      y      : 130,
      length : 100
    }),
    exit({
      x : 20,
      y : 160
    })
  ]),

  // eight
  world({
    start        : { x : 200, y : 10 },
    bg           : 'assets/space_bg.png',
    gravityAccel : 0.0001
  }, [
    asteroid({
      x      : 200,
      y      : 60,
      radius : 20
    }),
    spaceship(1, {
      x : 50,
      y : 300
    }),
    spaceship(2, {
      x : 950,
      y : 280
    }),
    exit({
      x        : 500,
      y        : 300,
      passable : true
    })
  ], [
    Physics.behavior("laser", { options : { x : 116, y : 300 } }),
    Physics.behavior("laser", {
      laserType : 2,
      options : {
        x : 892,
        y : 280
        ,
        moving : { x : -0.5, y : 0 }
      }
    })
  ]),

  // twelve
  world({
    levelNum : 8,
    start : { x : 200, y : 420 },
    bg : 'assets/zombie_bg.png'
  }, [
    zombiePlatform({
      x : 200,
      y : 450,
      length: 400,
      view: image("assets/zombie_tile2.png", 500 + 15)
    }),
    exit({
      x : 380,
      y : 420,
      passable : true
    }),
    crate({
      x : 140,
      y : 430
    }),
    crate({
      x : 140,
      y : 400
    }),
    barbedWire({
      x : 130,
      y : 377
    }),
    crate({
      x : 260,
      y : 430
    }),
    crate({
      x : 260,
      y : 400
    }),
    barbedWire({
      x : 270,
      y : 377
    }),
    zombie({
      x : 20,
      y : 420
    }),
    zombie({
      x : 40,
      y : 420
    }),
    zombie({
      x : 60,
      y : 420
    }),
    zombie({
      x : 80,
      y : 420
    }),
    zombie({
      x : 330,
      y : 420
    }),
    zombie({
      x : 350,
      y : 420
    }),
    zombie({
      x : 370,
      y : 420
    }),
    zombie({
      x : 390,
      y : 420
    })
  ])
]

function go() {
  var game = new Game(levels);

  Physics.util.ticker.on(function (time) {
    game.physics.step(time);
    game.physics.render();
  });
  Physics.util.ticker.start();
}
