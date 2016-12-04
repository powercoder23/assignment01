angular.module('flights', [
	'ngRoute'
	])

.config(function($routeProvider){

	$routeProvider
		.when('/', {
			templateUrl: 'templates/app.html',
			controller: 'AppCtrl'
		})

})