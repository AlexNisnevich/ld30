function go() {

  var settings = {
    timestep   : 1000 / 160,
    maxIPF     : 16,
    integrator : "verlet"
  }

  Physics(settings, function (world) {
    world.add(Physics.body('circle', {
      x      : 50,
      y      : 30,
      vx     : 0,
      vy     : 0,
      radius : 20
    }));

    world.add(Physics.behavior('edge-collision-detection', {
      aabb        : Physics.aabb(0, 0, 500, 300),
      restitution : 0.99,
      cof         : 0.99
    }));

    world.add( Physics.behavior('body-impulse-response'));
    world.add( Physics.behavior('body-collision-detection'));
    world.add( Physics.behavior('sweep-prune'));

    var renderer = Physics.renderer('canvas', {
      el     : 'viewport',
      width  : 500,
      height : 300,
      meta   : false,
      styles : {
        'circle' : {
          strokeStyle : 'hsla(60, 37%, 57%, 1)',
          lineWidth : 1,
          fillStyle : 'hsla(60, 37%, 57%, 0.8)',
          angleIndicator: 'hsla(60, 37%, 17%, 0.4)'
        }
      }
    });

    world.add(renderer);

    Physics.util.ticker.on(function (time) {
      world.step(time);
      world.render();
    });
    Physics.util.ticker.start();
  });
}
