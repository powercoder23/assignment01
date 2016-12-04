angular.module('flights')

.service('SearchService', function($http, $q){


	this.getFlightsData = function(){
		return $http.get('./data/data.json').then(function(response){
			return response.data;
		})
	}

	this.searchFlight = function(search){
		var defer = $q.defer();
		search.startDate = new Date(search.startDate);//.setHours(0,0,0,0);
		search.startDate.setHours(0,0,0,0);
		search.endDate = new Date(search.endDate);//.setHours(0,0,0,0);
		search.endDate.setHours(0,0,0,0);
		var resultObj = [];
		var temp = null;


		this.getFlightsData().then(function(data){

			for (var i = 0; i < data.length; i++) {

				var flightDate = new Date(data[i].date).toString().split('00:00:00')[0].split(' ').join('').toLowerCase();
				//var temp = null


				if(data[i].from.toLowerCase() == search.origin.toLowerCase() && 
					data[i].to.toLowerCase() == search.destination.toLowerCase()) {
					
					
					var searchDate = search.startDate.toString().split('00:00:00')[0].split(' ').join('').toLowerCase()
					
					if(flightDate == searchDate){
						temp = {
							oneWay:data[i]
						}
						if(search.oneWay){
							resultObj.push(temp);
							temp = null;
						}
					}
				}

				///console.log(temp)

				if(!search.oneWay){
					if(data[i].from.toLowerCase() == search.destination.toLowerCase() && 
						data[i].to.toLowerCase() == search.origin.toLowerCase()) {

						var searchDate = search.endDate.toString().split('00:00:00')[0].split(' ').join('').toLowerCase()

						
						if(flightDate == searchDate){
							//console.log('mmmmmm',temp)

							if(temp.hasOwnProperty('oneWay') && Object.keys(temp).length == 1){
								temp.return = data[i];
								resultObj.push(temp)
								temp = null;
							}

						}
					}
				}
 					
			}

		

			defer.resolve(resultObj);

		})

		return defer.promise

	}




})