// Defines and registers the "control" behavior which hooks the player
// up to the keyboard.
function createControl(game) {
  Physics.behavior('control', function (parent) {
    return {
      init : function (options) {
        parent.init.call(this);

        var that = this;

        that.vx   = 0;
        that.jump = false;

        $(document).keydown(function (e) {
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

        $(document).keyup(function (e) {
          switch (e.keyCode) {
          case 37:
            if (that.vx == -0.15) {
              that.vx = 0;
            }
            break;
          case 39:
            if (that.vx == 0.15) {
              that.vx = 0;
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

        for (var i = 0, l = bodies.length; i < l; i++) {
          bodies[i].state.vel.set(this.vx, bodies[i].state.vel.y);
          
          var jumpSize = -0.05;

          if (this.jump && game.player.grounded) {
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

