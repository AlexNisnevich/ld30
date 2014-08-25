function go() {
  var game = new Game({
    objects : [platform({
      x           : 100,
      y           : 100,
      length      : 100,
      restitution : 0.1
    }),
    platform({
      x           : 300,
      y           : 150,
      length      : 100,
      restitution : 0.1
    })]
  });

  Physics.util.ticker.on(function (time) {
    game.physics.step(time);
    game.physics.render();
  });
  Physics.util.ticker.start();
}
