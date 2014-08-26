// Defines and registers the "control" behavior which hooks the player
// up to the keyboard.
function createControl(game) {
  Physics.behavior('control', function (parent) {
    return {
      init : function (options) {
        parent.init.call(this);

        var that = this;

        that.dir  = 0;
        that.jump = false;

        $(document).keydown(function (e) {
          switch (e.keyCode || e.which) {
          case 37: // ←
            that.dir = -1;
            break;
          case 39: // →
            that.dir = 1;
            break;

          case 38:
            that.jump = true;
            break;
          }


          if (dialog && dialog.remove) {
            dialog.remove();
          }
          if (overlay && overlay.remove) {
            overlay.remove();
          }
        });

        $(document).keyup(function (e) {
          switch (e.keyCode || e.which) {
          case 37:
            if (that.dir == -1) {
              that.dir = 0;
            }
            break;
          case 39:
            if (that.dir == 1) {
              that.dir = 0;
            }
            break;
          case 38:
            that.jump = false;
            break;
          }
        });
      },

      behave : function (data) {
        var bodies  = this.getTargets();
        var scratch = Physics.scratchpad();
        var speed   = 0.15;

        for (var i = 0, l = bodies.length; i < l; i++) {
          var vx = bodies[i].state.vel.x;
          var vy = bodies[i].state.vel.y;

          // ICE
          if (bodies[i].iced && Math.abs(vx) < speed * 2) {
            bodies[i].accelerate(scratch.vector().set(this.dir * 0.001, 0));
          } else {
            bodies[i].state.vel.set(this.dir * speed, vy);
          }

          var jumpSize = -0.05;

          if (this.jump && game.player.grounded) {
            sound_jump.play();
            bodies[i].accelerate(scratch.vector().set(0, jumpSize));
            this.jump = false;
          }
        }

        scratch.done();
        game.player.grounded = false;
      }
    };
  });
}
