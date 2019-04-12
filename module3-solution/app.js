(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
  var controller = this;

  var promise = MenuSearchService.getMatchedMenuItems("bean");

  // console.log(controller.matchedItemsArray);
  promise.then(function (response) {
    console.log(response);
    controller.resp = response;
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {

    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    
    

    promise.then(function (response) {

      var responseData = response.data;
      var foundItems= [];
      
      for(var i = 0; i < responseData.menu_items.length; i++){

        var name = responseData.menu_items[i].name;
        var nameLowerCased = responseData.menu_items[i].name.toLowerCase();
        var searchTermLowerCased = searchTerm.toLowerCase();
        
        if(nameLowerCased.includes(searchTermLowerCased)){
          foundItems.push(name);
        }
      }
      console.log(foundItems);
      return foundItems;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
    
  };
}
/*
Declare and create MenuSearchService. The service should have the following method:
getMatchedMenuItems(searchTerm). That method will be responsible for reaching out to the server
(using the $http service) to retrieve the list of all the menu items. Once it gets all the menu items,
it should loop through them to pick out the ones whose description matches the searchTerm.
Once a list of found items is compiled, it should return that list (wrapped in a promise).
Remember that the then function itself returns a promise. Your method would roughly look like this:
    return $http(...).then(function (result) {
    // process result and only keep items that match
    var foundItems...

    // return processed items
    return foundItems;
  });

The NarrowItDownController should be injected with the MenuSearchService. The
controller should call the getMatchedMenuItems method when appropriate and store
the result in a property called found attached to the controller instance.

Declare and create foundItems directive. The list should be displayed using this
directive which takes the found array of items specified on it as an attribute
(think one-way binding with '<'). To implement the functionality of the
"Don't want this one!" button, the directive should also provide an on-remove
attribute that will use function reference binding to invoke the parent controller
removal an item from the found array based on an index into the found array.
The index should be passed in from the directive to the controller. (Note that we
implemented almost identical type of behavior in the Lecture 30 Part 2, so as long
as you understood that code, it should be very close to copy/paste). In the NarrowItDownController,
simply remove that item from the found array. You can do that using the Array's splice() method.
For example, to remove an item with the index of 3 from the found array, you would call found.splice(3, 1);.
*/
})();