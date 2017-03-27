(function(){
	angular.module('maps',['ui.router'])
	.config(function($stateProvider,$urlRouterProvider){
		$stateProvider.state({
			name:'countries',
			url:'/countries',
			controller:'countriesCtrl',
			templateUrl:'html/countries.html'
		});
		$stateProvider.state({
			name:'country',
			url:'/country',
			params:{'country':null},
			controller:'countryCtrl',
			templateUrl:'html/country.html'
		});
		$urlRouterProvider.otherwise('/countries');
	
	}).run(function($state){
		$state.go('countries');
	})
	.controller('countriesCtrl',function($scope,$state){
		$scope.countries=[{
			country:'India',
			latitude:'20.5937',
			longitude:'78.9629',
			url:'',
			cities:[{
				city:'Bangalore',
				latitude:'12.9716',
				longitude:'77.5946'
			},{
				city:'Delhi',
				latitude:'28.7041',
				longitude:'77.1025'
			}]
		},
		{
			country:'US',
			latitude:'37.0902',
			longitude:'-95.7129',
			url:'',
			cities:[{
				city:'New York',
				latitude:'40.7128',
				longitude:'-74.0059'
			},{
				city:'california',
				latitude:'36.7783',
				longitude:'-119.4179'
			}]
		}
		];
		$scope.countryDetails=function(countryObj){
			$state.go('country',{
				country:countryObj
			});
		}
	})
	.controller('countryCtrl',function($scope,$stateParams){
		
		$scope.countryObj=$stateParams.country;
		$scope.selectedCord={};
		$scope.selectedCord.latitude=Number.parseFloat($scope.countryObj.latitude);
		$scope.selectedCord.longitude=Number.parseFloat($scope.countryObj.longitude);
		$scope.cities=[];
		angular.forEach($scope.countryObj.cities,function(cityObj){
			this.push({
				name:cityObj.city,
				obj:cityObj
			});
		},$scope.cities);
		console.log($scope.cities);
		$scope.selectCity=function(city){
			$scope.selectedCord.latitude=Number.parseFloat(city.obj.latitude),
			$scope.selectedCord.longitude=Number.parseFloat(city.obj.longitude);
		}

		$scope.viewInMap=function(){
			map.setCenter({lat: $scope.selectedCord.latitude, lng: $scope.selectedCord.longitude});
			var latlng = new google.maps.LatLng($scope.selectedCord.latitude, $scope.selectedCord.longitude);
 			marker.setPosition(latlng); 
		}

		var uluru = {lat: Number.parseFloat($scope.selectedCord.latitude), lng: Number.parseFloat($scope.selectedCord.longitude)};
        var map = new google.maps.Map(document.getElementById('maps'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
	})
})()