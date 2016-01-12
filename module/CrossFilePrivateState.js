var CrossFilePrivateState = (function(my) {
  var _private = my._private = my._private || {},
      _seal = my._seal = my._seal || function() {
        delete my._seal;
        delete my._unseal;
        delete my._private;
      },
      _unseal = my._unseal = my._unseal || function() {
        my._unseal = _unseal;
        my._seal = _seal;
        my._private = _private;
      };
      my.add = function() {
        _private.a++;
        console.log(_private.a);
      }
      _private.a = 1;
      _private.b = function(){
        console.log("b");
      };
      return my
})(CrossFilePrivateState || {});
CrossFilePrivateState.add();
console.log(CrossFilePrivateState._private);
// CrossFilePrivateState._unseal();
// var CrossFilePrivateState = (function(my) {
//     my._private.a = 10;
//     var priv = my._private.a;
//     my.addprivatefunc = function() {
//       console.log( my._private.a = 20);
//     }
//     my.add();
//     // console.log(my._private.a);
//     return my
// })(CrossFilePrivateState || {});
// CrossFilePrivateState.addprivatefunc();
// CrossFilePrivateState._seal();
