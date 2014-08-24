// Example params
// attrs = {
//   playerStart: [0,0]
//   gravityCoefficient: 0,
//   goal: [50,50]
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
  this.playerStart = attrs.playerStart;
  this.goal = attrs.goal;
  this.objects = [];
  var movingObjects = [];
  for(var thinger in thingers) {
    this.objects.push(_makeObject(thinger));
  }

  // Creates a new object based on the
  // thinger's object type (capitalizing
  // the first letter to get the class name)
  // and adds the object to the movingObject
  // array if the type includes the word
  // "moving"
  var _makeObject = function(thinger) {
    var type = thinger.type;
    capitalize(type);
    obj = new window[type]();
    if(type.indexOf("Moving") > -1) {
      movingObjects.push(obj);
    }
    return obj;
  };

  // Moves all the moving objects
  this.moveObjects = function() {
    movingObjects.forEach(function (obj) {
      obj.move();
    });
  };

  function capitalize(str) {
    str[0] = str[0].toUpperCase();
    return str;
  }
};

World.prototype.tick = function() {
  this.moveObjects();
};

// Takes in a different world as a parameter
// Averages the number attributes of both worlds
// and adds together the different objects in
// from both worlds
World.prototype.combine = function(otherWorld) {
  for(var attr in attrs) {
    if(!isNaN(this[attr])) { // Averages the numbers
      this[attr] = avg(this[attr], otherWorld[attr]);
    }
  }

  this.objects = this.objects + otherWorld.objects;

  function avg(obj1, obj2) {
    return (obj1 + obj2) / 2;
  }
};
