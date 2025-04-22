/**
 * Interactivity Test
 * A test intended to ensure content reacts to user action.
 * Only applicable to screens without animations.
 */
export default function interactivityTest() {
	console.log("Initiating automatic interactivity test... Please wait.");

	const width = window.screen.width;
	const height = window.screen.height;
	const originalDisplay = window.canvas.getImageData(0, 0, width, height);

	let different = false;

	while (!different) {
		let randomX = Math.floor(Math.random() * (width + 1));
		let randomY = Math.floor(Math.random() * (height + 1));

		document.elementFromPoint(randomX, randomY).click();

		const newDisplay = window.canvas.getImageData(0, 0, width, height);

		for (var i = 0; i < width * height * 4; i++) {
			if (newDisplay.data[i] != originalDisplay.data[i]) {
				different = true;
				break;
			}
		}
	}

	console.log("Interactivity confirmed.");
}
