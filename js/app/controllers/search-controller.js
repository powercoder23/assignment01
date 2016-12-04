angular.module('flights')

.controller('SearchCtrl', function($scope, SearchService, $rootScope){

	$scope.search = {
		oneWay : true
	};

	$scope.searchFlights = function(){
		SearchService.searchFlight($scope.search).then(function(response){
			
			$rootScope.$broadcast('displayResult', {
				search: $scope.search,
				result: response
			})
		})

	}

	
})