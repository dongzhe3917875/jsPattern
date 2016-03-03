Function.prototype.after = function(afterfn) {
    var self = this;
    return function() {
      var ret = self.apply(this, arguments);
      afterfn.call(this, ret);
      return ret;
    }
  }
  // 策略对象
var getPassword = function(id) {
  return document.getElementById(id).value;
}
var strategies = {
  tip: function(tip) {
    return tip;
  },
  isNonEmpty: function(value, errMsg) {
    if (value == "") {
      return errMsg
    }
  },
  minLength: function(value, len, errMsg) {
    if (value.length < len) {
      return errMsg;
    }
  },
  isMobile: function(value, errMsg) {
    if (!/1[3|5|9][0-9]{9}/.test(value)) {
      return errMsg;
    }
  },
  passwordAgain: function(value, id, errMsg) {
    if (value !== getPassword(id)) {
      return errMsg;
    }
  }
}

//Validator 对象
/*
add 定义规则 返回一个规则执行函数的数组
start 执行规则 返回一个错误信息的结果
都将具体的逻辑委托给了strategies 对象
符合了单一职责和开放封闭原则
开放算法的扩展
封闭了Validator的修改
*/

var setStyle = {
  "tip": function(result) {
    this.nextSibling.innerHTML = result; // 加载正常提示的样式
    this.nextSibling.style.color = "blue";
  },
  "success": function(result) {
    this.nextSibling.innerHTML = result; // 加载正确的样式
    this.nextSibling.style.color = "green";
  },
  "error": function(result) {
    this.nextSibling.innerHTML = result; // 加载错误的样式
    this.nextSibling.style.color = "red";
  }
}
var Validator = function() {
  this.cache = [];
}
Validator.prototype.trigger = function(dom, type, func) {
    if (Object.prototype.toString.call(func) == "[object Function]") {
      dom.addEventListener(type, func.bind(this), false);
    } else if (Object.prototype.toString.call(func) == "[object Array]") {
      dom.addEventListener(type, function() {
        for (var item, i = 0; item = func[i++];) {
          if (item()) {
            break;
          }
        }
      }.bind(this), false);
    }
  }
  // 为了做验证拼参数

Validator.prototype.add = function(dom, rules) {
  var ruleForDom = [];
  for (var i = 0, rule; rule = rules[i++];) {
    (function(rule) {
      // 将验证的函数放到cache里面
      var strategArr, errMsg;
      var tipFunc = function() {
        var result;
        var tip = rule.tip;
        return result = strategies["tip"].call(dom, tip);
      }.after(function(result) {
        setStyle.tip.call(dom, result);
      });
      var errFunc = function() {
        strategArr = rule.stratege.split(":");
        errMsg = rule.errMsg;
        var result;
        // 组装参数列表 这里的function都是闭包 里面的变量都不会被销毁
        var stra = strategArr.shift();
        strategArr.push(errMsg);
        strategArr.unshift(dom.value);
        return result = strategies[stra].apply(dom, strategArr);
      }.after(function(result) {
        if (result == undefined) {
          setStyle.success.call(dom, "正确");
        } else {
          setStyle.error.call(dom, result);
        }
      });
      ruleForDom.push(errFunc);
      this.trigger(dom, "focus", tipFunc);
    }.bind(this))(rule)
    this.trigger(dom, "blur", ruleForDom);
    this.cache.push(ruleForDom);
  }
}

// 验证开始
Validator.prototype.start = function() {
  var index = false;
  for (var j = 0, ruleForDom; ruleForDom = this.cache[j++];) {
    for (var k = 0, item; item = ruleForDom[k++];) {
      if (item()) {
        index = true;
        break;
      }
    }
  }
  return index;
}


// 客户端调用
var registerForm = document.getElementById('registerForm');
// var validataFunc = function() {
var validator = new Validator();
validator.add(registerForm.userName, [{
  stratege: 'isNonEmpty',
  errMsg: '用户名不能为空',
  tip: '用户名不能为空'
}, {
  stratege: 'minLength:10',
  errMsg: '用户名长度不能小于10 位',
  tip: '用户名长度不能小于10 位'
}]);
validator.add(registerForm.passWord, [{
  stratege: 'minLength:7',
  errMsg: '密码长度不能小于7 位',
  tip: '密码长度不能小于7 位'
}]);
validator.add(registerForm.phoneNumber, [{
  stratege: 'isMobile',
  errMsg: '手机号码格式不正确',
  tip: '请填入标准的11位手机号码'
}]);
validator.add(registerForm.passWordAgain, [{
  stratege: 'isNonEmpty',
  errMsg: '密码不能为空',
  tip: '密码不能为空'
}, {
  stratege: 'passwordAgain:password',
  errMsg: '两次输入密码不一致',
  tip: '请确认密码'
}]);
// return validator;
// return errorMsg;
// }


registerForm.onsubmit = function() {
  // var validator = validataFunc();
  if (validator.start()) {
    return false;
  }

};

// 策略模式
// 组合 不同类之间的组合
// 委托 将具体的实现委托给算法类
// 多态 发出同一个请求 参数不同 返回的结果也就不同 add start 等等函数
