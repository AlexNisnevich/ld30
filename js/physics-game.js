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
    start : { x : 515, y : 180 },
    bg : 'assets/zombie_bg.png'
  }, [
    zombiePlatform({
      x           : 515,
      y           : 200,
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
      x : 635,
      y : 328
    }),
    branch('Small', {
      x      : 592,
      y      : 200,
      length : 70
    }),
    branch('Big', {
      x      : 557,
      y      : 318,
      length : 145
    }),
    branch('Big2', {
      x      : 722,
      y      : 570,
      length : 140
    }),
    branch('Small2', {
      x      : 674,
      y      : 100,
      length : 70
    }),
    beehive({
      x : 552,
      y : 360
    }),
    bee({
      x : 552,
      y : 365
    }),
    bee({
      x : 552,
      y : 360
    }),
    bee({
      x : 552,
      y : 360
    }),
    bee({
      x : 552,
      y : 360
    }),
    bee({
      x : 552,
      y : 360
    }),
    exit({
      x : 590,
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
      x            : 940,
      y            : 507,
      length       : 80,
      height       : 77,
      rectangular  : true,
      asteroidType : 2
    }),
    asteroid({
      x      : 110,
      y      : 55,
      length : 130,
      rectangular  : true
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
    start : { x : 180, y : 530 },
    bg : 'assets/space_bg.png',
    gravityAccel: 0.0001
  }, [
    asteroid({
      x           : 150,
      y           : 575,
      length      : 80,
      height      : 40,
      rectangular : true,
      treatment   : "kinematic",
      moving      : { x : 0.08, y : 0 },
      cof         : 1,
      floating    : false
    }),
    asteroid({
      x      : 940,
      y      : 442,
      length : 80,
      height : 77,
      view   : image("assets/space_rock2.png", 80 + 15)
    }),
    spaceship(1, {
      x : 60,
      y : 415
    }),
    spaceship(2, {
      x : 830,
      y : 435
    }),
    exit({
      x : 940,
      y : 395
    })
  ], [
    Physics.behavior("laser", { options : { x : 116, y : 415 } }),
    Physics.behavior("laser", {
      laserType : 2,
      options : {
        x : 772,
        y : 430,
        moving : { x : -0.5, y : 0 }
      }
    })
  ]),

  // seven
  world({
    levelNum : 7,
    start : { x : 25, y : 200 },
    bg : 'assets/polar_bg.png'
  }, [
    icePlatform({
      x      : 50,
      y      : 230,
      length : 100
    }),
    exit({
      x : 20,
      y : 260
    })
  ]),

  // eight
  world({
    start        : { x : 200, y : 25 },
    levelNum : 8,
    bg           : 'assets/space_bg.png',
    gravityAccel : 0.0001
  }, [
    asteroid({
      x           : 200,
      y           : 80,
      length      : 100,
      height      : 40,
      rectangular : true
    }),
    asteroid({
      x           : 700,
      y           : 290,
      length      : 100,
      height      : 40,
      rectangular : true,
      floating    : false
    }),
    spaceship(1, {
      x : 50,
      y : 300,
      kill : false
    }),
    spaceship(2, {
      x : 950,
      y : 280
    }),
    asteroid({
      x           : 50,
      y           : 475,
      length      : 80,
      height      : 40,
      rectangular : true
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

  // nine
  world({
    levelNum : 9,
    start    : { x : 150, y : 50 },
    bg       : "assets/nature_bg.png"
  }, [
    tree({
      x : 100,
      y : 320
    }),
    branch('Small2', {
      x      : 140,
      y      : 100,
      length : 70
    }),
    branch('Big', {
      x      : 30,
      y      : 300,
      length : 140
    }),
    branch('Small', {
      x      : 55,
      y      : 500,
      length : 70
    }),
    butterfly({
      x : 350,
      y : 500
    }),
    exit({
      x : 600,
      y : 100
    })
  ], [
    Physics.behavior("butterfly")
  ]),

  // ten
  world({
    levelNum : 10,
    start : { x : 730, y : 200 },
    bg : 'assets/polar_bg.png'
  }, [
    icePlatform({
      x      : 650,
      y      : 240,
      length : 180
    }),
    icePlatform({
      x      : 350,
      y      : 240,
      length : 180
    }),
    bearCave({
      x : 650,
      y : 188
    }),
    bear({
      x : 655,
      y : 200
    }),
    exit({
      x : 20,
      y : 160
    })
  ], [
    Physics.behavior("bear")
  ]),

  // twelve
  world({
    start : { x : 200, y : 380 },
    levelNum : 11,
    bg : 'assets/zombie_bg.png'
  }, [
    zombiePlatform({
      x : 200,
      y : 410,
      length: 400,
      view: image("assets/zombie_tile2.png", 500 + 15)
    }),
    exit({
      x : 80,
      y : 380,
      passable : true
    }),
    crate({
      x : 140,
      y : 390
    }),
    crate({
      x : 140,
      y : 360
    }),
    barbedWire({
      x : 130,
      y : 337
    }),
    crate({
      x : 260,
      y : 390
    }),
    crate({
      x : 260,
      y : 360
    }),
    barbedWire({
      x : 270,
      y : 337
    }),
    zombie({
      x : 20,
      y : 380
    }),
    zombie({
      x : 40,
      y : 380
    }),
    zombie({
      x : 60,
      y : 380
    }),
    zombie({
      x : 80,
      y : 380
    }),
    zombie({
      x : 330,
      y : 380
    }),
    zombie({
      x : 350,
      y : 380
    }),
    zombie({
      x : 370,
      y : 380
    }),
    zombie({
      x : 390,
      y : 380
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
