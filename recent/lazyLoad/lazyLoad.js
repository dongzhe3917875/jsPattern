miniConsole = (function() {
  var cache = [];

  var handler = function(event) {
    if (event.keyCode === 113) {
      var script = document.createElement("script");
      script.onload = function() {
        cache.forEach(function(ele) {
          ele();
        })
      }
      script.src = "miniConsole.js";
      document.querySelector("head").appendChild(script);
      document.body.removeEventListener('keydown', handler);
    }
  }

  document.body.addEventListener('keydown', handler, false);


  return {
    log: function() {
      var args = arguments;
      cache.push(function() {
        miniConsole.log.apply(miniConsole, args);
      })
    }
  }
})()

miniConsole.log(1);
miniConsole.log(1, 4, 5);
