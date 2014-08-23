// Example params
// attrs = {
//   gravityCoefficient: 0,
//   goal: [50,50]
// }
// thingers = [
//   {
//     type: "platform",
//     x: 10,
//     y: 15,
//     length: 20
//   },
//   {
//     type: "monster",
//     x: 10,
//     y: 30,
//     speed: 2
//   }
// ]
var World = function(attrs, thingers) {
  this.attrs = attrs;
  this.goal = attrs.goal;
  this.objects = [];
  for(var thinger in thingers) {
    this.objects.push(_makeObject(thinger));
  }

  var _makeObject = function(thinger) {
    if(thinger.type === "platform") {
      return new Platform(thinger);
    }
  };
};

// Takes in a different world as a parameter
// Averages the attributes of both worlds and
// adds together the different objects in
// from both worlds
World.prototype.combine = function(otherWorld) {
  for(var attr in attrs) {
    if(!isNaN(this[attr])) {
      this[attr] = avg(this[attr], otherWorld[attr]);
    }
  }

  this.objects = this.objects + otherWorld.objects;

  function avg(obj1, obj2) {
    return (obj1 + obj2) / 2;
  }
};
