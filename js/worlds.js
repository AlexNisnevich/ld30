// Example params
// attrs = {
//   start: [0,0],
//   goal: [50,50],
//   gravityCoefficient: 0
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
  this.goal = attrs.goal;
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

  this.objects = _.map(thingers, function (thinger) {
    return _makeObject(thinger);
  });

  // Moves all the moving objects
  this.moveObjects = function() {
    movingObjects.forEach(function (obj) {
      obj.move();
    });
  };
};

World.prototype.tick = function() {
  this.moveObjects();
};

// Takes in a different world as a parameter
// Averages the number attributes of both worlds
// and adds together the different objects in
// from both worlds
World.prototype.combine = function(otherWorld) {
  for(var attr in this.attrs) {
    if(!isNaN(this.attrs[attr])) { // Averages the numbers
      this.attrs[attr] = avg(this.attrs[attr], otherWorld.attrs[attr]);
    }
  }

  this.objects = this.objects.concat(otherWorld.objects);

  function avg(obj1, obj2) {
    return (obj1 + obj2) / 2;
  }
};
