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

      if (Math.abs(c.norm.y) >= 0.5 && Math.abs(c.norm.x) <= 0.5) {
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

          other.grounded = false;
          
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
              x      : x - (main.length / numPieces * i),
              y      : y + 20,
              killer : true
            }))());
            pieces.push(icePlatform(_.extend(miniOptions, {
              x      : x + (main.length / numPieces * i),
              y      : y + 20,
              killer : true
            }))());
          }

          _.each(pieces, function (piece) {
            piece.state.angular.acc = 0.003;
          });

          that.physics.add(pieces);

          setTimeout(function () { that.physics.remove(pieces) }, 500);
        }
      });

      withProperty("killer", bodyA, bodyB, function (killer, victim) {
        if (victim.killable) {
          that.physics.remove(victim);
        }
      });

      withPlayer("killer", bodyA, bodyB, function () { that.physics.emit("die"); });
      withPlayer("goal", bodyA, bodyB,   function () { that.physics.emit("next-level"); });

      withPlayer("moving", bodyA, bodyB, function (other, player) {
        player.state.vel.set(other.moving.x * 2, player.state.vel.y);
      });
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
      action(bodyB, bodyA);
    } else if (bodyB == that.player && bodyA[property]) {
      action(bodyA, bodyB);
    }
  }
}

