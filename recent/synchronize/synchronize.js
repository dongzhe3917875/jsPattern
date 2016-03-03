window.onload = function() {
  var synchronize = function(id) {
    console.log("开始同步id为" + id + "的文件");
    forbidden(id);
    console.log("id为" + id + "的文件同步完成");
  }
  var forbidden = function(id) {
    var item = document.getElementById(id);
    item.setAttribute("disabled", true);
  }
  Array.prototype.removeItem = function(item) {
    this.map(function(ele, index) {
      if (ele == item) {
        this.splice(index, 1);
      }
    }.bind(this))
  }

  var proxySynchronize = (function() {
    var timer = null;
    var cache = [];
    return function(id, index) {
      if (index) {
        cache.push(id);
      } else {
        cache.removeItem(id);
      }
      if (timer) {
        return;
      }
      timer = setTimeout(function() {
        cache.forEach(function(ele) {
          synchronize(ele);
        });
        clearTimeout(timer);
        timer = null;

        cache.length = 0;
      }, 2000)
    }
  })()
  var checkboxs = document.getElementsByTagName('input');
  for (var i = 0, item; item = checkboxs[i++];) {
    item.onclick = function() {
      proxySynchronize(this.id, this.checked)
    }
  }
}
