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

Physics.behavior("laser", function (parent) {
  return {
    init : function (options) {
      parent.init.call(this);
      this.active = false;

      var defaults = {
        laserType : 1,
        interval  : 200,
        lifetime  : 2000
      };

      this.settings = _.extend(defaults, options);
    },
    behave : function () {
      var that = this;

      if (!this.active) {
        that.active = true;
        var shot = laser(that.settings.laserType, that.settings.options)();
        that._world.addBody(shot);

        if (!that._world.activeLasers) {
          that._world.activeLasers = [];
        }

        that._world.activeLasers.push(shot);

        setTimeout(function () {
          that.active = false;
        }, that.settings.interval);

        setTimeout(function () {
          if (that._world) {
            that._world.removeBody(shot);
            that._world.activeLasers = _.without(that._world.activeLasers, shot);
          }
        }, that.settings.lifetime);
      }
    }
  };
})
