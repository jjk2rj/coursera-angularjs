(function () {
'use strict';

angular.module('LunchApp', [])
.controller('LunchController', LunchController);

LunchController.$inject = ['$scope'];
function LunchController($scope) {
  $scope.lunch = "";
  $scope.message = "";
  $scope.colorId = "normal";

  $scope.checkLunch = function checkLunch() {
    if(checkInputField()){
      var lunchArray = splitArray($scope.lunch);
      var withoutEmptyStrings = checkForEmpty(lunchArray);
      console.log("withoutEmptyStrings: " + withoutEmptyStrings );
      if(withoutEmptyStrings > 0 && withoutEmptyStrings <= 3){
        $scope.message = "Enjoy!";
        // console.log('Greater than 0');
        $scope.colorId = "validData";
      }
      else if(withoutEmptyStrings > 3){
        $scope.message = "Too much!";
        $scope.colorId = "validData";
      }
    };
  }

  function checkForEmpty(array){
    var withoutEmptyStrings = array.length;
    for(var i=0;i<array.length;i++){
      // strip white space from string
       if(array[i].replace(/^\s+|\s+$/g, '') == "")
          withoutEmptyStrings--;
        }
      return withoutEmptyStrings;
  }

  function checkInputField(){
    // console.log($scope.lunch);
    if($scope.lunch === ""){
        $scope.message = "Please enter data first.";
        $scope.colorId = "enterData";
        return false;
    }
    else{
      // console.log("checkInputField true");
      return true;
    }
  }

  function splitArray(array){
    var words = array.split(',');
    // console.log(words);
    return words;
  };
}
})();
