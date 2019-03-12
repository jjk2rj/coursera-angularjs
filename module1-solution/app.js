(function () {
'use strict';

angular.module('LunchApp', [])
.controller('LunchController', LunchController);

LunchController.$inject = ['$scope'];
function LunchController($scope) {
  $scope.lunch = "";
  $scope.message = "hello";


  $scope.checkLunch = function checkLunch() {
    if(checkInputField()){
      var lunchArray = splitArray($scope.lunch);
      if(lunchArray.length >1){
        console.log(lunchArray.length);
        console.log('Greater than 0');
      }
    };
  }

  function checkInputField(){
    //strip the white space from the input string
    var inputString = $scope.lunch.replace(/\s/g, '');
    console.log("stripped string " + inputString);
    if(inputString == ""){
        $scope.message = "Please enter data first.";
        return false;
    }
    else{ return true; }


  }
  function splitArray(array){
    var words = array.split(',');
    console.log(words);
    return words;
    // expected output: "fox"
  };

}

})();
