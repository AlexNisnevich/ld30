var KEYCODE_UP = 38;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;

(function (window) {
		function Player(image, x, y) {
				this.initialize(image, x, y);
		}

		Player.prototype.initialize = function (image, x, y) {
				this.velocity = {x:0, y:0};
				this.onGround = false;
		this.doubleJump = false;

				this.image = new createjs.Bitmap(image);

		this.image.x = x;
		this.image.y = y;

				this.canDoubleJump = true;
				this.jumpHeight = 15;
				this.fallSpeed = 0.8;
				this.moveSpeed = 10;
		};

		Player.prototype.tick = function () {
				this.velocity.y += this.fallSpeed;

				// preparing the variables
		var c = 0,
			cc = 0,
			addY = this.velocity.y,
			bounds = getBounds(this.image),
			cbounds,
			collision = null,
			collideables = Game.getCollideables();

		cc=0;
		// for each collideable object we will calculate the
		// bounding-rectangle and then check for an intersection
		// of the Player's future position's bounding-rectangle
		while ( !collision && cc < collideables.length ) {
			cbounds = getBounds(collideables[cc]);
			if ( collideables[cc].isVisible ) {
				collision = calculateIntersection(bounds, cbounds, 0, addY);
			}

			if ( !collision && collideables[cc].isVisible ) {
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
			}
		};

		Player.prototype.isVisible = function () {
			return this.image.isVisible();
		};

		Player.prototype.handleKey = function (keyCode) {
			if (keyCode == KEYCODE_UP) {
				this.jump();
			} else if (keyCode == KEYCODE_LEFT) {
				this.image.x -= this.moveSpeed;
			} else if (keyCode == KEYCODE_RIGHT) {
				this.image.x += 10;
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
