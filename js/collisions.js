function collisions(that) {
  return function (data) {
    for (var i = 0, l = data.collisions.length; i < l; i++) {
      var c = data.collisions[i];
      
      c.bodyA.grounded = false;
      c.bodyB.grounded = false;
      
      c.bodyA.iced = false;
      c.bodyB.iced = false;
    }

    for (var i = 0, l = data.collisions.length; i < l; i++) {
      var c = data.collisions[i];
      var bodyA = c.bodyA;
      var bodyB = c.bodyB;

      // Only counts an object as grounded if it is exactly
      // vertical. We can change this to be some reasonable angle
      // later.
      if (Math.abs(c.norm.y) >= 0.8 && Math.abs(c.norm.x) <= 0.2) {
        if (bodyA.state.pos.y <= bodyB.state.pos.y + 4) {
          bodyA.grounded = true;
        }

        if (bodyB.state.pos.y <= bodyA.state.pos.y + 4) {
          bodyB.grounded = true;
        }
      }

      withProperty("ice", bodyA, bodyB, function (body, other) {
        other.iced = true;
      });

      withProperty("breakable", bodyA, bodyB, function (main, other) {
        if (Math.abs(other.state.vel.y) > 0.5) {
          that.physics.remove([main]);

          var numPieces = 5;
          var miniOptions = {
            length    : main.length / numPieces,
            treatment : "dynamic"
          };
          var x = main.state.pos.x;
          var y = main.state.pos.y;

          console.log(x - main.length / 2);

          var pieces    = [];
          
          for (var i = 0; i < numPieces; i++) {
            pieces.push(icePlatform(_.extend(miniOptions, {
              x : x - (main.length / numPieces * i),
              y : y
            })));
            pieces.push(icePlatform(_.extend(miniOptions, {
              x : x + (main.length / numPieces * i),
              y : y
            })));
          }

          _.each(pieces, function (piece) {
            piece.state.angular.acc = 0.003;
          });

          that.physics.add(pieces);

          setTimeout(function () { that.physics.remove(pieces) }, 500);
        }
      });

      withPlayer("killer", bodyA, bodyB, function () { that.physics.emit("die"); });
      withPlayer("goal", bodyA, bodyB,   function () { that.physics.emit("next-level"); });
    }
  }

  function withProperty(property, bodyA, bodyB, action) {
    if (bodyA[property]) {
      action(bodyA, bodyB);
    } else if (bodyB[property]) {
      action(bodyB, bodyA);
    }
  }

  function withPlayer(property, bodyA, bodyB, action) {
    if (bodyA == that.player && bodyB[property]) {
      action(bodyB);
    } else if (bodyB == that.player && bodyA[property]) {
      action(bodyA);
    }
  }
}

