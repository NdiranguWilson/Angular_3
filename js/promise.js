/**
 * Cytonn Technologies
 * @author Ndirangu Wilson <wndirangu@cytonn.com>
 *
 */

angular.module('promiseApp', [])

.factory('promiseService', function($q, $timeout, $http) {


  var description = function() {
    var deferred = $q.defer();

    $timeout(function() {

      deferred.resolve(["here is a list of countires"]);
    }, 7000);

    return deferred.promise;
  };

  return {
    description: description

  };


})



.controller('promiseCtrl', function($scope, $http, promiseService) {
  $scope.countries = [];
  $scope.keys = [];

  $http({
      method: 'GET',
      url: 'https://restcountries.eu/rest/v1/all'
    })
    .then(function successCallback(response) {

        $scope.keys = Object.keys(response.data);
        for (i = 0; i < response.data.length; i++) {

          $scope.countries.push(response.data[i].name);
        }
        console.log($scope.countries);
        console.log("data received");

      }, function errorCallback(response) {

        alert(" Sorry We couldn't find a country with that name!");
      }

    );

  //console.log($scope.countries);
  $scope.messages = promiseService.description();


});
