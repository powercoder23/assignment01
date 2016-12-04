angular.module('flights')

.controller('ResultCtrl', function($scope, SearchService){

	
	$scope.$on('displayResult', function(e, resultData){

		if(resultData.search.oneWay){
			$scope.searchHeadingText = resultData.search.origin + ' > ' + resultData.search.destination;	
		}else{
			$scope.searchHeadingText = resultData.search.origin + ' > ' + resultData.search.destination +' > '+ resultData.search.origin;	
		}

		$scope.searchResult = angular.copy(resultData.result);
		$scope.searchParams = angular.copy(resultData.search);


		
	})

	$scope.getFlightRate = function(f){
		if($scope.searchParams.oneWay){
			return parseFloat(f.oneWay.flightRate) * $scope.searchParams.passengers
		}else{
			return (parseFloat(f.oneWay.flightRate) + parseFloat(f.return.flightRate)) * $scope.searchParams.passengers
		}
	}
	
})