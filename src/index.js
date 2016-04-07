module.exports.listen = function listenForClickOff(elem, onClickOff, opts) {
	// we use mousedown to check the target because the click could cause the element to be removed and it'll look like it's not in us
	var lastMouseDownWasOutside = false;
	// check again after timeout
	var eventListenerElement = opts.eventListenerElement || document;
	var isInMe = opts.isInMe;

	function mousedownHandler(e) {
		lastMouseDownWasOutside = !(elem === e.target || elem.contains(e.target)) && !(isInMe && isInMe(e.target));
	}

	function mouseupHandler(e) {
		if (lastMouseDownWasOutside) {
			onClickOff(e);
		}
	}
	eventListenerElement.addEventListener('mousedown', mousedownHandler);
	eventListenerElement.addEventListener('mouseup', mouseupHandler);

	return function unbindClickOffListeners() {
		eventListenerElement.removeEventListener(mousedownHandler);
		eventListenerElement.removeEventListener(mouseupHandler);
	};
};
