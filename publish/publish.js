$(document).ready(function() {
   // Stuff to do as soon as the DOM is ready
   function Product(id, description) {
     this.getId = function() {
       return id;
     };
     this.getDescription = function() {
       return description;
     };
   }

   function Cart(eventAggregator) {
     var items = [];

     this.addItem = function(item) {
       items.push(item);
     };
   }

   (function() {
     var products = [new Product(1, "Star Wars Lego Ship"),
         new Product(2, "Barbie Doll"),
         new Product(3, "Remote Control Airplane")
       ],
       cart = new Cart();

     function addToCart() {
       var productId = $(this).attr('id');
       var product = $.grep(products, function(x) {
         return x.getId() == productId;
       })[0];
       cart.addItem(product);

       var newItem = $('<li></li>').html(product.getDescription()).attr('id-cart', product.getId()).appendTo("#cart");
     }

     products.forEach(function(product) {
       var newItem = $('<li></li>').html(product.getDescription())
         .attr('id', product.getId())
         .dblclick(addToCart)
         .appendTo("#products");
     });
   })();
});
