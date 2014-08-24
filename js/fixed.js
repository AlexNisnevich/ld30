// A behavior which ensures that "fixed" objects do not move.
Physics.behavior('fixed', function (parent) {
  return {
    init : function (options) {
      parent.init.call(this);
    },
    behave : function (data) {
      var bodies = this.getTargets();

      for (var i = 0, l = bodies.length; i < l; i++) {
        if (bodies[i].fixed) {
          bodies[i].state.vel.set(0, 0);
        }
      }
    }
  };
});
