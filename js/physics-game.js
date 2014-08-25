var baseWorld = {
  objects : [
    zombiePlatform({
      x           : 265,
      y           : 420,
      length      : 75
    }),
    zombiePlatform({
      x           : 360,
      y           : 450,
      length      : 80
    })
  ]
}

function go() {
  var game = new Game(baseWorld);

  Physics.util.ticker.on(function (time) {
    game.physics.step(time);
    game.physics.render();
  });
  Physics.util.ticker.start();
}
