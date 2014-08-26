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

      if (Math.abs(c.norm.y) >= 0.2 && Math.abs(c.norm.x) <= 0.8) {
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
          
          var pieces    = [];
          
          for (var i = 0; i < numPieces; i++) {
            pieces.push(icePlatform(_.extend(miniOptions, {
              x         : x - (main.length / numPieces * i),
              y         : y + 20,
              npcKiller : 2,
              view      : image("assets/polar_iceShard.png", 10 + 25 * Math.random(), 30 + 20 * Math.random())
            }))());
            pieces.push(icePlatform(_.extend(miniOptions, {
              x         : x + (main.length / numPieces * i),
              y         : y + 20,
              npckiller : 2,
              view      : image("assets/polar_iceShard.png", 10 + 25 * Math.random(), 30 + 20 * Math.random())
            }))());
          }

          _.each(pieces, function (piece) {
            piece.state.angular.acc = 0.003;
          });

          that.physics.add(pieces);

          var timeout = setTimeout(function () { that.physics.remove(pieces) }, 600);
          that.physics.on("reset-objects", function () {
            clearTimeout(timeout);
            that.physics.remove(pieces);
          });
        }
      });

      withProperty("npcKiller", bodyA, bodyB, function (killer, victim) {
        if (victim.killable <= killer.npcKiller) {
          if (typeof victim.laser == "number") {
            that.physics.remove(that.base.behaviors[victim.laser]);
          }

          if (victim.spaceship) {
            sound_laser.play();
          }

          that.physics.removeBody(victim);
        }
      });

      withProperty("stoppable", bodyA, bodyB, function (obj, other) {
        if (!other.passable) {
          that.physics.removeBody(obj);
        }
      });

      withPlayer("killer", bodyA, bodyB, function (obj, other) { 
        if (obj.laser) {
          sound_playerHit.play();
        }

        if (obj.bee) {
          sound_eatenByBees.play();
        }
        
        that.physics.emit("die"); 
      });
      withPlayer("goal", bodyA, bodyB,   function () { that.physics.emit("next-level"); });

      withPlayer("moving", bodyA, bodyB, function (other, player) {
        player.state.vel.set(other.moving.x * 2, player.state.vel.y);
      });
      
      withPlayer("butterfly", bodyA, bodyB, function (butterfly) {
        butterfly.state.vel.set(0, -0.1);
        butterfly.player = true;
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

