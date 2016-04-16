
angular.module('fly', ['rx'])
	.directive('timeFlyLetter', timeFlyLetter)

timeFlyLetter.$inject = ['rx']
function timeFlyLetter(rx) {
	return {
		district: 'AE',
		link(scope, element, attrs) {
			const mousemove = rx.Observable.fromEvent(document, 'mousemove')
			
			const mouseOffset = mousemove.map(event => ({
				offsetX: event.clientX,
				offsetY: event.clientY
			}))
		
			const letterArray = attrs['timeFlyLetter'].split('')

			angular.forEach(letterArray, (l, i) => {
				const span = document.createElement('span')
				span.textContent = l
				span.style.position = 'absolute'
				element[0].appendChild(span)

				mouseOffset.delay(i * 50).subscribe(e => {
					span.style.top = e.offsetY + 'px'
					span.style.left = (e.offsetX + 15 + i * 15) + 'px'
				})
			})

		}
	}
}