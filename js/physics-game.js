var levels = [
  // one
  world({
    start : { x : 370, y : 430 }
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
    start : { x : 515, y : 280 }
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
    start : { x : 345, y : 270 }
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
    start : { x : 600, y : 125 }
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
      y      : 373,
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
      y : 415
    }),
    bee({
      x : 538,
      y : 420
    }),
    bee({
      x : 523,
      y : 410
    }),
    bee({
      x : 500,
      y : 415
    }),
    bee({
      x : 510,
      y : 400
    }),
    bee({
      x : 540,
      y : 405
    }),
    exit({
      x : 580,
      y : 555
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
