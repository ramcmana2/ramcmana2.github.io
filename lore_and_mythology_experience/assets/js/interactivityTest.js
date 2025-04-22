/**
 * Interactivity Test
 * A test intended to ensure content reacts to user action.
 * Only applicable to screens without animations.
 */
export default function interactivityTest() {
	console.log("Initiating automatic interactivity test... Please wait.");

	const width = window.screen.width;
	const height = window.screen.height;
	// const originalDisplay = window.canvas.getImageData(0, 0, width, height);

	let different = false;

	while (!different) {
		let randomX = Math.floor(Math.random() * (width + 1));
		let randomY = Math.floor(Math.random() * (height + 1));

		// let oldColor = document.elementFromPoint(randomX, randomY).style.backgroundColor;
		let oldColor = document.elementFromPoint(randomX, randomY);
		if (oldColor != null) {
			oldColor = oldColor.style.backgroundColor;
		}

		randomX = Math.floor(Math.random() * (width + 1));
		randomY = Math.floor(Math.random() * (height + 1));

		document.elementFromPoint(randomX, randomY).click();

		// let newColor = document.elementFromPoint(randomX, randomY).style.backgroundColor;
		let newColor = document.elementFromPoint(randomX, randomY);
		if (newColor != null) {
			newColor = newColor.style.backgroundColor;
		}

		// const newDisplay = window.canvas.getImageData(0, 0, width, height);

		if (newColor != null && oldColor != null && newColor != oldColor) {
			different = true;
			break;
		}

		// for (var i = 0; i < width * height * 4; i++) {
		// 	if (newDisplay.data[i] != originalDisplay.data[i]) {
		// 		different = true;
		// 		break;
		// 	}
		// }
	}

	console.log("Interactivity confirmed.");
}
