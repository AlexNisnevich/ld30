var levels = [
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
