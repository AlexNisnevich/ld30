function zombies(player) {
  Physics.behavior("zombies", function (parent) {
    return {
      behave : function (data) {
        var bodies = this.getTargets();
        var speed = 0.01;

        _.each(bodies, function (zombie) {
          var dx = 0;
          if (player.state.pos.x > zombie.state.pos.x) {
            dx = 1;
            zombie.view = zombie.images.forward;
          } else if (player.state.pos.x < zombie.state.pos.x) {
            dx = -1;
            zombie.view = zombie.images.backward;
          }

          zombie.state.angular.pos = 0;

          zombie.state.pos.x += dx * speed;
        });
      }
    };
  });
}
