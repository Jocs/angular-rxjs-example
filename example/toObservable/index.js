(function(angular) {

	angular.module('example', ['rx'])
	.controller('MainController', function($scope, $http, rx) {
		$scope.results = []
		$scope.search = ''

		const search = function(item) {
			const promise = $http({
		        url: "http://en.wikipedia.org/w/api.php?&callback=JSON_CALLBACK",
		        method: "jsonp",
		        params: {
		          action: "opensearch",
		          search: item,
		          format: "json"
		        }
		    })

		    return rx.Observable.fromPromise(promise)
		    	.retry(10)
		    	.map(response => response.data[1])
		}

		$scope
		.$toObservable('search')
		.debounce(300)
		.map(data => data.newValue)
		.distinctUntilChanged()
		.flatMapLatest(search)
		.subscribe(data => {
			$scope.results = data
			$scope.$digest()
		})
	})

})(angular)








