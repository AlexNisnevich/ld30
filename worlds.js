World = function(attrs) {
  this.attrs = attrs;
};

World.prototype.combine = function(otherWorld) {
  for(var attr in attrs) {
    this[attr] = avg(this[attr], otherWorld[attr]);
  }

  function avg(obj1, obj2) {
    return (obj1 + obj2) / 2;
  }
};