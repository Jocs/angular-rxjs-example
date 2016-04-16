angular
	.module('example', ['rx'])
	.directive('conamiCode', conamiCode)
	.controller('MainController', MainController)

MainController.$inject = ['$scope']
function MainController($scope) {
	$scope.result = () => $scope.conami = true
}

conamiCode.$inject = ['rx']
function conamiCode(rx) {
	return {
		restrict: 'AE',
		scope: {
			conamiCode: '&'
		},
		link: function(scope, element, attrs) {
			const keyCode = e => e.keyCode
			const keyCodeArray = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
			const arrSequence = rx.Observable.fromArray(keyCodeArray)

			rx.Observable.fromEvent(document, 'keyup')
			.map(keyCode)
			.windowWithCount(keyCodeArray.length)
			.flatMap(x => x.sequenceEqual(arrSequence))
			.filter(angular.identity)
			.subscribe(() => scope.$apply(scope.conamiCode))
		}
	}
}