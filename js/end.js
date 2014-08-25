Physics.behavior('die-offscreen', function (parent) {
  return {
    behave : function (data) {
      var world = this._world;

      _.each(this.getTargets(), function (body) {
        if (body.state.pos.x < 0 || body.state.pos.x > 1000 ||
            body.state.pos.y < 0 || body.state.pos.y > 600) {
          world.emit("die");
        }
      });
    }
  };
});
