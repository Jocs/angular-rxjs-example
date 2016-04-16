angular
	.module('exmaple', ['rx'])
	.controller('MainController', MainController)

MainController.$inject = ['$scope', 'observeOnScope']
function MainController($scope, observeOnScope) {
	observeOnScope($scope, 'name')
	.subscribe(data => {
		$scope.change = data
		$scope.newValue = data.newValue
		$scope.oldValue = data.oldValue
	})
}