function bees(player) {
  Physics.behavior("bees", function (parent) {
    var center = { x : 552, y : 355 };

    var minRadius   = 20;
    var maxRadius   = 100;
    var senseRadius = 150;
    var radius      = minRadius;

    var movementSpeed = 0.5;
    var growSpeed     = 0.1;
    var shrinkSpeed   = 0.05;

    return {
      behave : function (data) {
        var bodies = this.getTargets();
        if (bodies.length < 1) return;

        var dx = player.state.pos.x - center.x;
        var dy = player.state.pos.y - center.y;

        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < senseRadius) {
          radius = Math.min(maxRadius, radius + growSpeed);
        } else {
          radius = Math.max(minRadius, radius - shrinkSpeed);
        }

        _.each(bodies, function (bee) {
          var speed = movementSpeed * radius / minRadius;
          
          bee.state.pos.x += Math.cos(bee.beeAngle) * speed;
          bee.state.pos.y += Math.sin(bee.beeAngle) * speed;

          var dx = bee.state.pos.x - center.x;
          var dy = bee.state.pos.y - center.y;

          if (Math.sqrt(dx * dx + dy * dy) > radius) {
            bee.state.pos.x += (center.x - bee.state.pos.x) / 100;
            bee.state.pos.y += (center.y - bee.state.pos.y) / 100;
            bee.beeAngle += 180 + Math.random() * 30;
          }
        });
      }
    };
  });
}
