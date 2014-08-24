// Example params
// attrs = {
//   levelNum: 1,
//   start: [0,0],
//   goal: {
//     type: 'exit',
//     x: 50,
//     y: 50,
//     img: 'img/exit1.png',
//   },
//   gravityCoefficient: 0,
//   cantOverlap: [12, 20]
// }
// thingers = [
//   {
//     type: "platform",
//     x: 10,
//     y: 15,
//     length: 20,
//     img: 'img/platform1.png'
//   },
//   {
//     type: "movingPlatform",
//     x: 10,
//     y: 15,
//     length: 20,
//     img: 'img/platform1.png',
//     direction: 'left',
//     speed: 2,
//     leftBound: 6,
//     rightBound: 10
//   }
// ]
var World = function(attrs, thingers) {
  this.attrs = attrs;
  this.start = attrs.start;
  this.levelNum = attrs.levelNum;
  var movingObjects = [];

  // Creates a new object based on the
  // thinger's object type (capitalizing
  // the first letter to get the class name)
  // and adds the object to the movingObject
  // array if the type includes the word
  // "moving"
  var _makeObject = function(thinger) {
    function capitalize(str) {
      return str[0].toUpperCase() + str.slice(1);
    }

    var type = capitalize(thinger.type);
    obj = new window[type](thinger);
    if(type.indexOf("Moving") > -1) {
      movingObjects.push(obj);
    }
    return obj;
  };

  var _setGoal = function() {
    if(attrs.goal.type) {
      this.goal = _makeObject(attrs.goal);
    }
  };

  this.objects = _.map(thingers, function (thinger) {
    return _makeObject(thinger);
  });

  _setGoal();

  // Moves all the moving objects
  this.moveObjects = function(playerPos, world) {
    movingObjects.forEach(function (obj) {
      obj.move(playerPos, world);
    });
  };

  this.canOverlap = function(otherWorld) {
    return !_cantOverlap(otherWorld);
  };

  var _cantOverlap = function(otherWorld) {
    return _.contains(attrs.cantOverlap, otherWorld.levelNum);
  };
};

World.prototype.tick = function(playerPos, world) {
  world = world || this;
  this.moveObjects(playerPos, world);
};

// Combines this world with a different world
World.prototype.combine = function(otherWorld) {
  if (otherWorld !== this) {
    return new CombinedWorld(this, otherWorld);
  } else {
    return this;
  }
};

// A container for two world objects that gets
// almost all of its attributes from the base world
// and the `attrs` and `objects` attributes from both
var CombinedWorld = function(baseWorld, otherWorld) {
  var that = this;

  this.start = baseWorld.start;
  this.goal = baseWorld.goal;
  this.baseWorld = baseWorld;
  this.otherWorld = otherWorld;

  function avg(obj1, obj2) {
    return (obj1 + obj2) / 2;
  }

  // Combines the base world with another world
  // unless the 'otherWorld' is the one of the
  // worlds this class combines (in which case,
  // it returns the baseWorld).
  this.combine = function(otherWorld) {
    if(otherWorld === this.otherWorld || otherWorld === this.baseWorld) {
      return this.baseWorld;
    } else {
      return new CombinedWorld(this.baseWorld, otherWorld);
    }
  };

  // Updates its attributes from two different worlds
  // Uses the attributes of the other world and concats
  // the different objects in from both worlds
  var _updateAttrs = function(baseWorld, otherWorld) {
    that.attrs = otherWorld.attrs;
    that.objects = baseWorld.objects.slice(0).concat(otherWorld.objects);
  };

  this.canOverlap = function(otherWorld) {
    return this.baseWorld.canOverlap(otherWorld);
  };

  _updateAttrs(baseWorld, otherWorld);
};

CombinedWorld.prototype.tick = function(playerPos) {
  this.baseWorld.tick(playerPos, this);
  this.otherWorld.tick(playerPos, this);
};
