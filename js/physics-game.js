function go() {
  var game = new Game({
    objects : [
      zombiePlatform({
        x           : 100,
        y           : 100,
        length      : 100
      }),
      zombiePlatform({
        x           : 300,
        y           : 150,
        length      : 10
      })]
  });

  Physics.util.ticker.on(function (time) {
    game.physics.step(time);
    game.physics.render();
  });
  Physics.util.ticker.start();
}
