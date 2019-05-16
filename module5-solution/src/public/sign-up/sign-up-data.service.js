(function () {
"use strict";

angular.module('public')
.service('SignUpDataService', SignUpDataService);

function SignUpDataService() {
  var service = this;
  var userInfo;

  service.setUserInfo = function(userInfo) {
    service.userInfo = userInfo;
  }

  service.getUserInfo = function() {
    return service.userInfo;
  }

}

})();
