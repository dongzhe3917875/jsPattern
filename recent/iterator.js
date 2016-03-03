var each = function(ary, callback) {
  for (var i = 0, l, l = ary.length; i < l; i++) {
    callback.call(ary[i], i, ary[i])
  }
}
each([1, 2, 3], function(index, ele) {
  console.log(ele);
})

var Iterator = function(obj) {
  var current = 0;
  var next = function() {
    current = current + 1;
  }
  var isDone = function() {
    return current > = obj.length;
  }
  var getCurrentItem = function() {
    return obj[current];
  }
  return {
    next: next,
    isDone: isDone,
    getCurrentItem: getCurrentItem
  }
}
