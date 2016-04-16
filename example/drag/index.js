angular
	.module('example', ['rx'])
	.controller('MainController', MainController)
	.directive('rxDrag', rxDrag)

MainController.$inject = ['$scope']
function MainController($scope) {
	// controller
}

rxDrag.$inject = ['$document', 'rx']
function rxDrag($document, rx) {
	return {
		restrict: 'A',
		link(scope, element, attrs) {
			const mouseDown = rx.Observable.fromEvent(element, 'mousedown')
			const mouseMove = rx.Observable.fromEvent($document, 'mousemove')
			const mouseUp = rx.Observable.fromEvent(element, 'mouseup')

			const getOffset = e => {
				e.preventDefault()
				return {
					offsetX: e.clientX - element[0].getBoundingClientRect().left,
					offsetY: e.clientY - element[0].getBoundingClientRect().top
				}
			}

			const getPosition = offset => e => {
				e.preventDefault()
				return {
					left: (e.clientX - offset.offsetX) + 'px',
					top: (e.clientY - offset.offsetY) + 'px'
				}
			}

			mouseDown
				.map(getOffset)
				.flatMap(offset => mouseMove.map(getPosition(offset)).takeUntil(mouseUp))
				.subscribe(pos => element.css(pos))
		}
	}
}