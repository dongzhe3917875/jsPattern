var moduleExtend = (function(extendmodule) {
  extendmodule.addsomething = function() {
    console.log("addsomething");
  }
  return extendmodule;
})(module);
var modu = (function(modu){
  modu.hehe = "hehe";
  return modu;
})(modu || {});
console.log(modu);
