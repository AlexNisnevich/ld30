var KEYCODE_UP = 38;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;

(function (window) {
  function Player(image, x, y, game) {
    this.initialize(image, x, y, game);
  }

  Player.prototype.initialize = function (image, x, y, game) {
    this.game = game;
    this.velocity = {x:0, y:0};
    this.onGround = false;
    this.doubleJump = false;

    this.image = new createjs.Bitmap(image);

    this.image.x = x;
    this.image.y = y;
    this.startX = x;
    this.startY = y;

    this.canDoubleJump = false;
    this.jumpHeight = 15;
    this.fallSpeed = 0.8;
    this.moveSpeed = 10;
    this.speedMultiplier = 1;
  };

  Player.prototype.tick = function () {
    this.velocity.y += this.fallSpeed;

    // preparing the variables
    var addY = this.velocity.y,
    collision = null,
    collideable = null,
    _this = this;

    function checkCollision() {
      var cc = 0,
      bounds = getBounds(_this.image),
      cbounds,
      collideables = _this.game.getCollideables();
      // for each collideable object we will calculate the
      // bounding-rectangle and then check for an intersection
      // of the Player's future position's bounding-rectangle
      while ( !collision && cc < collideables.length ) {
        var obj = collideables[cc];

        cbounds = getBounds(obj);
        collision = calculateIntersection(bounds, cbounds, 0, addY);

        if (collision && obj.name == 'exit') {
          _this.game.moveToNextLevel();
        } else if (collision) {
          collideable = obj;
        }

        if (!collision) {
          // if there was NO collision detected, but somehow
          // the Player got onto the "other side" of an object (high velocity e.g.),
          // then we will detect this here, and adjust the velocity according to
          // it to prevent the Player from "ghosting" through objects
          // try messing with the 'this.velocity = {x:0,y:25};'
          // -> it should still collide even with very high values
          if ( ( bounds.y < cbounds.y && bounds.y + addY > cbounds.y )
               || ( bounds.y > cbounds.y && bounds.y + addY < cbounds.y ) ) {
            addY = cbounds.y - bounds.y;
          } else {
            cc++;
          }
        }
      }
    }
    checkCollision();
    this.move(collision, collideable, addY);
  };

  Player.prototype.move = function(collision, collideable, addY) {
    // if no collision was to be found, just
    //  move the Player to it's new position
    if ( !collision ) {
      this.image.y += addY;
      if ( this.onGround ) {
        this.onGround = false;
        if (this.canDoubleJump) {
          this.doubleJump = true;
        }
      }
      // else move the Player as far as possible
      // and then make it stop and tell the
      // game, that the Player is now "an the ground"
    } else {
      this.image.y += addY - collision.height;
      if ( addY > 0 ) {
        this.onGround = true;
        this.doubleJump = false;
      }

      this.velocity.y = 0;

      this.speedMultiplier = 1;
      // Handle special objects
      if (collideable && collideable.obj) {
        switch(collideable.obj.effectOnPlayer) {
        case 'kill':
          this.image.x = this.startX;
          this.image.y = this.startY;
          break;
        case 'speedUp':
          if (Math.abs(this.velocity.x) == this.moveSpeed) {
            this.velocity.x *= 2;
          }
          break;
        }
      }
    }

    this.image.x += this.velocity.x * this.speedMultiplier;
  };

  Player.prototype.isVisible = function () {
    return this.image.isVisible();
  };

  Player.prototype.handleKeyDown = function (keyCode) {
    if (keyCode == KEYCODE_UP) {
      this.jump();
    } else if (keyCode == KEYCODE_LEFT) {
      this.velocity.x = - this.moveSpeed;
    } else if (keyCode == KEYCODE_RIGHT) {
      this.velocity.x = this.moveSpeed;
    }
  };

  Player.prototype.handleKeyUp = function (keyCode) {
    if (keyCode == KEYCODE_LEFT) {
      this.velocity.x += this.moveSpeed;
    } else if (keyCode == KEYCODE_RIGHT) {
      this.velocity.x -= this.moveSpeed;
    }
  };

  Player.prototype.jump = function() {
    // if the Player is "on the ground"
    // let him jump, physically correct!
    if ( this.onGround ) {
      this.velocity.y = - this.jumpHeight;
      this.onGround = false;
      if (this.canDoubleJump) {
        this.doubleJump = true;
      }
      // we want the Player to be able to
      // jump once more when he is in the
      // air - after that, he has to wait
      // to lang somewhere on the ground
    } else if ( this.doubleJump ) {
      this.velocity.y = - this.jumpHeight;
      this.doubleJump = false;
    }
  };

  window.Player = Player;
} (window));
