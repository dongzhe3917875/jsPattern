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
    return (current >= obj.length);
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

var compare = function(iterator1, iterator2) {
  while (!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrentItem() != iterator2.getCurrentItem()) {
      return false;
    }
    iterator1.next();
    iterator2.next();
  }
  return true;
}

var iterator1 = Iterator([1, 2, 3])
var iterator2 = Iterator([1, 2, 3])

compare(iterator1, iterator2);

var stopeach = function(obj, callback) {
  for (var i = 0, l, l = obj.length; i < l; i++) {
    if (callback(i, obj[i]) === false) {
      break;
    }
  }
}

stopeach([1, 2, 3, 4, 5], function(index, ele) {
  if (index > 3) {
    return false;
  }
  console.log(index, ele);
})
