(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .filter('dolla', dollaDollaBillYall)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController( ShoppingListCheckOffService) {
        var toBuy = this; 
        
        toBuy.list = ShoppingListCheckOffService.getToBuyArray();
        
        toBuy.removeItem = function (index) {
          ShoppingListCheckOffService.removeItem(index);
        }
      }
      
      AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', 'dollaFilter'];
      function AlreadyBoughtController(ShoppingListCheckOffService, dollaFilter) {
        var alreadyBought = this; 
        
        alreadyBought.list = ShoppingListCheckOffService.getAlreadyBoughtArray();
        
        alreadyBought.getTotalPrice = function(index) {
          return alreadyBought.list[index].pricePerItem * alreadyBought.list[index].quantity;
        };

        alreadyBought.useDollaFilter = function() {
          return dollaFilter('$');

        }
    }

    function ShoppingListCheckOffService() {
        var service = this;
      
        var toBuyArray = [
            { name: "Ribeye", quantity: 4, pricePerItem: 9 },
            { name: "Lobsters", quantity: 2, pricePerItem: 14},
            { name: "Scallops", quantity: 8, pricePerItem: 3  },
            { name: "Swordfish", quantity: 5, pricePerItem: 16 },
            { name: "Tuna", quantity: 7, pricePerItem: 8 }
        ];
        var alreadyBoughtArray = [];

        service.getToBuyArray =  function(){
           return toBuyArray;
        }

        service.getAlreadyBoughtArray = function(){
            return alreadyBoughtArray;
         }
        
        service.addToBoughtList = function (item) {
          alreadyBoughtArray.push(item);
        }
        
        service.removeItem = function (index) {
          alreadyBoughtArray.push(toBuyArray[index]);
          toBuyArray.splice(index, 1);
        };
        
        service.getToBuyItem = function(index) {
          return toBuyArray[index];
        }
        
      }
    function dollaDollaBillYall(){
      return function (input) {
        input = input || "";
        input = input.replace("$", "$$$$$$");
        return input;
      };
    }

})();

//minified version ~ it works!
