var grounded = false;
var width    = 1000;
var height   = 500;

function go() {

  var settings = {
    timestep   : 1000 / 160,
    maxIPF     : 16,
    integrator : "verlet"
  }

  Physics(settings, function (world) {
    var ball = Physics.body('circle', {
      x      : 50,
      y      : height - 50,
      vx     : 0,
      vy     : 0,
      radius : 20
    });
    world.add(ball);

    world.add(Physics.behavior('edge-collision-detection', {
      aabb        : Physics.aabb(0, 0, width, height),
      restitution : 0.1,
      cof         : 0.99
    }));

    world.add(Physics.behavior('body-impulse-response'));
    world.add(Physics.behavior('body-collision-detection'));
    world.add(Physics.behavior('sweep-prune'));

    var gravity = Physics.behavior('constant-acceleration', {
      acc: { x : 0, y: 0.0004 } // this is the default
    });
    world.add(gravity);

    var control = Physics.behavior('control').applyTo([ball]);
    world.add(control);


    world.on('collisions:detected', function (data) {
      for (var i = 0, l = data.collisions.length; i < l; i++) {
        var c = data.collisions[i];

        if ((c.bodyA == ball || c.bodyB == ball) && c.norm.y == 1 && c.norm.x == 0) {
          grounded = true;
        }
      }
    });

    var renderer = Physics.renderer('canvas', {
      el     : 'viewport',
      width  : width,
      height : height,
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

Physics.behavior('control', function (parent) {
  return {
    init : function (options) {
      parent.init.call(this);

      var that = this;

      that.vx   = 0;
      that.jump = false;

      document.addEventListener('keydown', function (e) {
        switch (e.keyCode) {
        case 37: // ←
          that.vx = -0.15;
          break;
        case 39: // →
          that.vx = 0.15;
          break;
          
        case 38:
          that.jump = true;
          break;
        }
      });

      document.addEventListener('keyup', function (e) {
        switch (e.keyCode) {
        case 37:
        case 39:
          that.vx = 0;
          break;
        }
      });
    },

    behave : function (data) {
      var bodies  = this.getTargets();
      var scratch = Physics.scratchpad();

      for (var i = 0, l = bodies.length; i < l; i++) {
        if (grounded) {
          bodies[i].state.vel.set(this.vx, bodies[i].state.vel.y);
        }

        var jumpSize = -0.05;

        if (this.jump && grounded) {
          bodies[i].accelerate(scratch.vector().set(0, jumpSize));
          this.jump = false;
        }
      }

      scratch.done();
      grounded = false;
    }
  };
});
