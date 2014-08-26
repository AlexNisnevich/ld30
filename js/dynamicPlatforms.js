function fallingPlatform(game) {
  Physics.behavior("falling-platform", function (parent) {
    return {
      behave : function (data) {
        _.each(this.getTargets(), function (target) {
          if (game.gravity._acc.y > 0.0005) {
            target.treatment = "kinematic";
            target.state.acc.set(target.state.acc.x, 0.000012);
            sound_asteroidFalls.play();
          } else {
            target.treatment = "static";
            sound_asteroidFalls.pause();
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

      if (!this.active && that._world) {
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

Physics.behavior("bear", function (parent) {
  var timeout = 100;
  return {
    behave : function (data) {
      var bodies = this.getTargets();
      
      _.each(bodies, function (body) {
        if (body.bear) {
          timeout--;
          if (timeout <= 0) {
            if (body.mode == 'none') {
              body.mode = 'head';
              body.killer = true;
              timeout = 100;
            } else if (body.mode == 'head') {
              body.mode = 'butt';
              body.killer = false;
              timeout = 40;
            } else if (body.mode == 'butt') {
              body.mode = 'none';
              body.killer = false;
              timeout = 100;
            }
            body.view = body.images[body.mode];
          }
        }
      });
    }
  };
});

Physics.behavior("animateExit", function (parent) {
  var timeout = 20;
  return {
    behave : function (data) {
      var bodies = this.getTargets();
      
      _.each(bodies, function (body) {
        if (body.goal) {
          timeout--;
          if (timeout <= 0) {
            timeout = 20;
            if (Math.random() > 0.5) {
              body.view = body.images[0];
            } else {
              body.view = body.images[1];
            }
          }
        }
      });
    }
  };
});

Physics.behavior("butterfly", function (parent) {
  return {
    behave : function (data) {
      _.each(this.getTargets(), function (body) {
        if (body.butterfly && !body.going) {
          body.going = true;
          
          if (body.open) {
            body.view = body.images.closed;
            body.width = body.width / 2;
          } else {
            body.view = body.images.open;
            body.width = body.width * 2;
          }

          body.open = !body.open;

          setTimeout(function () {
            body.going = false;
          }, 600);
        }
      });
    }
  };
});
