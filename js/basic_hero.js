(function (window) {
    function Hero(image) {
        this.initialize(image);
    }
    Hero.prototype = new createjs.Bitmap();

    Hero.prototype.Bitmap_initialize = Hero.prototype.initialize;

    Hero.prototype.initialize = function (image) {
       	this.velocity = {x:0,y:25};
       	this.onGround = false;
		this.doubleJump = false;

        this.Bitmap_initialize(image);
        this.name = 'Hero';
        this.snapToPixel = true;
    }

    Hero.prototype.tick = function () {
        this.velocity.y += 1;

        // preparing the variables
		var c = 0,
			cc = 0,
			addY = this.velocity.y,
			bounds = getBounds(this),
			cbounds,
			collision = null,
			collideables = Game.getCollideables();

		cc=0;
		// for each collideable object we will calculate the
		// bounding-rectangle and then check for an intersection
		// of the hero's future position's bounding-rectangle
		while ( !collision && cc < collideables.length ) {
			cbounds = getBounds(collideables[cc]);
			if ( collideables[cc].isVisible ) {
				collision = calculateIntersection(bounds, cbounds, 0, addY);
			}

			if ( !collision && collideables[cc].isVisible ) {
				// if there was NO collision detected, but somehow
				// the hero got onto the "other side" of an object (high velocity e.g.),
				// then we will detect this here, and adjust the velocity according to
				// it to prevent the Hero from "ghosting" through objects
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
		//  move the hero to it's new position
		if ( !collision ) {
			this.y += addY;
			if ( this.onGround ) {
				this.onGround = false;
				this.doubleJump = true;
			}
		// else move the hero as far as possible
		// and then make it stop and tell the
		// game, that the hero is now "an the ground"
		} else {
			this.y += addY - collision.height;
			if ( addY > 0 ) {
				this.onGround = true;
				this.doubleJump = false;
			}
			this.velocity.y = 0;
		}
    }

    Hero.prototype.jump = function() {
    	// if the hero is "on the ground"
    	// let him jump, physically correct!
		if ( this.onGround ) {
			this.velocity.y = -17;
			this.onGround = false;
			this.doubleJump = true;
		// we want the hero to be able to
		// jump once more when he is in the
		// air - after that, he has to wait
		// to lang somewhere on the ground
		} else if ( this.doubleJump ) {
			this.velocity.y = -17;
			this.doubleJump = false;
		}
	}

    window.Hero = Hero;
} (window));
