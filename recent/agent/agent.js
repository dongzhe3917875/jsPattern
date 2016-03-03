// 非代理写法
// var myImage = (function() {
//   var imgNode = document.createElement("img");
//   document.body.appendChild(imgNode);
//   var img = new Image();
//   img.onload = function() {
//     imgNode.src = img.src;
//   }
//   return {
//     setSrc: function(src) {
//       imgNode.src = "loading.jpg"
//       img.src = src;
//     }
//   }
// })()
//
// myImage.setSrc("true.jpg");

// 代理写法
var myImage = (function() {
  var imgNode = document.createElement("img");
  document.body.appendChild(imgNode);
  return {
    setSrc: function(src) {
      imgNode.src = src
    }
  }
})()

var prosyImage = (function() {
  var img = new Image();
  img.onload = function() {
    myImage.setSrc(this.src);
  }
  return {
    setSrc: function(src) {
      myImage.setSrc("loading.jpg");
      img.src = src;
    }
  }
})()
prosyImage.setSrc("true.jpg");
