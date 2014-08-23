var Thinger = function(thinger) {
  for(var thing in thinger) {
    this[thing] = thinger[thing];
  }
};
