$(document).ready(function() {
  // 时间聚合
  // 1.Event 用于Handler回调的代码
  // 2. EventAggregator 订阅发布Event
  function Event(name) {
    var handlers = [];
    this.getName = function() {
      return name;
    }
    // 添加
    this.addHandler = function(handler) {
      handlers.push(handler);
    }
    //删除
    this.removerHandler = function(handler) {
      for (var i = 0; i < handlers.length; i++) {
        if (handlers[i] == handler) {
          handlers.splice(i, 1);
          break;
        }
      }
    }
    //执行
    this.fire = function(eventArg) {
      handlers.forEach(function(h) {
        h(eventArg);
      })
    }
  }

  function EventAggregator() {
    var events = [];

    function getEvent(eventName) {
      return $.grep(events, function(event) {
        return event.getName() == eventName
      })[0];
    }

    // 定义所谓的event 发布 执行handler
    this.publish = function(eventName, eventArg) {
      var event = this.getEvent(eventName);
      if (!event) {
        event = new Event(eventName);
        events.push(event);
      }
      event.fire(eventArg);
    }

    // 定义handler 订阅 定义handler
    this.subscribe = function(eventName, handler) {
      var event = this.getEvent(eventName);
      if (!event) {
        event = new Event(eventName);
        events.push(event);
      }
      event.addHandler(handler);
    }
  }
});
function Product(id, description) {
    this.getId = function () {
        return id;
    };
    this.getDescription = function () {
        return description;
    };
}

function Cart(eventAggregator) {
    var items = [];

    this.addItem = function (item) {
        items.push(item);
        // 对item执行了itemAdded所订阅的handler event.handler（item）
        eventAggregator.publish("itemAdded", item);
    };
}


// CartController主要是接受cart对象和事件聚合器，通过订阅itemAdded来增加一个li元素节点，通过订阅productSelected事件来添加product。
function CartController(cart, eventAggregator) {
  // 定义itemAdded event 的handler 每一个itemAdded都是一个event对象
  eventAggregator.subscribe("itemAdded", function(eventArg) {
    var newItem = $('<li></li>').html(eventArg.getDescription()).attr('id-cart', eventArg.getId()).appendTo("#cart");
  });

  eventAggregator.subscribe("productSelected", function(eventArgs) {
    cart.addItem(eventArgs.product);
  });
}

// Repository 获取product数据
function ProductRepository() {
    var products = [new Product(1, "Star Wars Lego Ship"),
            new Product(2, "Barbie Doll"),
            new Product(3, "Remote Control Airplane")];

    this.getProducts = function () {
        return products;
    }
}
