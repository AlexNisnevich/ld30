var levels = [
  // one
  world({
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
    start : { x : 600, y : 125 },
    bg : 'assets/nature_bg.png'
  }, [
    tree({
      x : 625,
      y : 328
    }),
    branch(1, {
      x      : 582,
      y      : 200,
      length : 70
    }),
    branch(2, {
      x      : 547,
      y      : 323,
      length : 145
    }),
    branch(3, {
      x      : 712,
      y      : 570,
      length : 140
    }),
    branch(4, {
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
      x : 110,
      y : 100
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
