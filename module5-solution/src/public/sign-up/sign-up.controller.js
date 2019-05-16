(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'SignUpDataService', 'menuItems'];

function SignUpController(MenuService, SignUpDataService, menuItems) {
  var $ctrl = this;
  var shortNames = [];
  for (var i = 0; i < menuItems.menu_items.length; i++) {
    shortNames.push(menuItems.menu_items[i].short_name.toLowerCase() + "");
  }
  
  $ctrl.validateFavorite = function() {
    if ($ctrl.user != undefined && $ctrl.user.favorite != undefined) {
      var favorite = $ctrl.user.favorite.toLowerCase();
      if (shortNames.indexOf(favorite) != -1) {
        $ctrl.invalidDish = false;
      } else {
        $ctrl.invalidDish = true;
      }
    } else {
      $ctrl.invalidDish = true;
    }
  }

  $ctrl.submit = function() {
    MenuService.getMenuItemByShortName($ctrl.user.favorite).then(function(result) {
      $ctrl.invalidDish = false;
      $ctrl.user.favoriteMenuItem = result;
      SignUpDataService.setUserInfo($ctrl.user);
      $ctrl.saved = true;
    }, function(error) {
      $ctrl.invalidDish = true;
      $ctrl.saved = false;
    });
  };
}

})();
