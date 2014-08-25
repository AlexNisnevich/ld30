function fallingPlatform(game) {
  Physics.behavior("falling-platform", function (parent) {
    return {
      behave : function (data) {
        _.each(this.getTargets(), function (target) {
          if (game.gravity._acc.y > 0.0005) {
            target.treatment = "kinematic";
            target.state.acc.set(target.state.acc.x, 0.000012);
          } else {
            target.treatment = "static";
            target.state.acc.set(target.state.acc.x, 0);
            target.state.vel.set(target.state.vel.x, 0);
          }
        });
      }
    }
  });
}

Physics.behavior("moving-platform", function (parent) {
  return {
    behave : function (data) {
      var bodies = this.getTargets();
      
      _.each(bodies, function (body) {
        if (body.moving) {
          body.state.vel.set(body.moving.x, body.moving.y);
        }
      });
    }
  };
});
