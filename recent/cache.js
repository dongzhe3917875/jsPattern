var addCalc = function() {
  return Array.prototype.reduce.call(arguments, function(a, b) {
    return a + b
  }, 0)
}
var multCalc = function() {
  return Array.prototype.reduce.call(arguments, function(a, b) {
    return a * b
  }, 1)
}

var proxyCache = function(fn) {
  var cache = {};
  return function() {
    var args = Array.prototype.join.call(arguments, ",");
    if (cache[args]) {
      return cache[args];
    }
    return cache[args] = fn.apply(this, arguments);
  }
}
var proxyAdd = proxyCache(addCalc);
proxyAdd(1, 2, 3, 4);
proxyAdd(1, 2, 3, 4);
