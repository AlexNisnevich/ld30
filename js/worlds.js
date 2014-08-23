var World = function(attrs) {
  this.attrs = attrs;
};

//Takes in a different world as a parameter
//Averages the attributes of both worlds
World.prototype.combine = function(otherWorld) {
  for(var attr in attrs) {
    this[attr] = avg(this[attr], otherWorld[attr]);
  }

  function avg(obj1, obj2) {
    return (obj1 + obj2) / 2;
  }
};
