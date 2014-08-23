var World = function(attrs, thinger) {
  this.attrs = attrs;
  this.objects = _makeObject(thinger);

  var _makeObject = function(thinger) {
    if(thinger.type === "platform") {
      return new Platform(thinger);
    }
  };
};

// Takes in a different world as a parameter
// Averages the attributes of both worlds
// Adds together the different objects in
// from both worlds
World.prototype.combine = function(otherWorld) {
  for(var attr in attrs) {
    this[attr] = avg(this[attr], otherWorld[attr]);
  }

  this.objects = this.objects + otherWorld.objects;

  function avg(obj1, obj2) {
    return (obj1 + obj2) / 2;
  }
};

