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
//     speed: 2
//   }
// ]

var World = function(attrs, thingers) {
  this.attrs = attrs;
  this.playerStart = attrs.playerStart;
  this.goal = attrs.goal;

  var _makeObject = function(thinger) {
    if(thinger.type === "platform") {
      return new Platform(thinger);
    } else if(thinger.type == "movingPlatform") {
      return new MovingPlatform(thinger);
    }
  };

  this.objects = _.map(thingers, function (thinger) {
    return _makeObject(thinger);
  });
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
