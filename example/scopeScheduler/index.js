angular
.module('example', ['rx'])
.controller('MainController', function($scope, rx) {
	const scheduler = new rx.ScopeScheduler($scope)
	rx.Observable.interval(1000, scheduler)
	.subscribe(() => $scope.time = +new Date())
})