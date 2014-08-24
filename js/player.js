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
    this.jumpHeight = 12;
    this.baseFallSpeed = 1.2;
    this.moveSpeed = 4;
    this.speedMultiplier = 1;
  };

  Player.prototype.getFallSpeed = function () {
    return this.baseFallSpeed * this.game.getWorld().attrs.gravityCoefficient;
  }

  Player.prototype.tick = function () {
    this.velocity.y += this.getFallSpeed();

    // preparing the variables
    var addY = this.velocity.y;
    var collision = null;
    var collideable = null;
    var _this = this;

    var cc = 0;
    var bounds = getBounds(_this.image);
    var cbounds;
    var collideables = _this.game.getCollideables();

    // for each collideable object we will calculate the
    // bounding-rectangle and then check for an intersection
    // of the Player's future position's bounding-rectangle
    while ( !collision && cc < collideables.length ) {
      var obj = collideables[cc];

      cbounds = getBounds(obj);
      collision = calculateIntersection(bounds, cbounds, 0, addY);

      if (collision && obj.name == 'exit') {
        _this.game.moveToNextLevel();
        return;
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
      // Handle special objects
      if (collideable && collideable.obj) {
        switch(collideable.obj.effectOnPlayer) {
        case 'kill':
          this.die();
          break;
        case 'speedUp':
          if (Math.abs(this.velocity.x) == this.moveSpeed) {
            this.velocity.x *= 2;
          }
          break;
        case 'stop':
          this.velocity = {x:0, y:0};
          this.image.y -= this.getFallSpeed() / 2;
          return;
        case 'bounce':
          this.velocity.x = -1 * this.velocity.x;
          this.velocity.y = -1 * this.velocity.y;
        }
      }

      this.image.y += addY - collision.height;
      if ( addY > 0 ) {
        this.onGround = true;
        this.doubleJump = false;
      }

      if (collideable.obj.shatterVelocity && this.velocity.y > collideable.obj.shatterVelocity) {
        collideable.obj.shatter();
      } else {
        this.velocity.y = 0;
      }
    }

    this.image.x += this.velocity.x;

    if (this.isOffscreen()) {
      this.die();
    }
  };

  Player.prototype.isOffscreen = function() {
    return this.image.x < 0 || this.image.y < 0 || this.image.x > 1000 || this.image.y > 600;
  };

  Player.prototype.die = function () {
    this.image.x = this.startX;
    this.image.y = this.startY;
    this.velocity = {x: 0, y: 0};

    game.resetLevel();
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
      this.velocity.x = 0;
    } else if (keyCode == KEYCODE_RIGHT) {
      this.velocity.x = 0;
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
