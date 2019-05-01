(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuAppController', MainShoppingListController);


// MainShoppingListController.$inject = ['ShoppingListService'];
// function MainShoppingListController(ShoppingListService) {
//   var mainList = this;
//   mainList.items = [];

//   mainList.$onInit = function () {
//     ShoppingListService.getItems()
//     .then(function (result) {
//       mainList.items = result;
//     });
//   };
// }

})();
