/**
 * Interactivity Test
 * A test intended to ensure content reacts to user action.
 * Only applicable to screens without animations.
 */
export default async function interactivityTest(intervalID) {
	console.log("Initiating automatic interactivity test... Please wait.");

	const width = window.screen.width;
	const height = window.screen.height;
	console.log("width: " + width);
	console.log("height: " + height);

	let randomX1 = width / 2;
	let randomY1 = height / 2;

	let oldColor = document.elementFromPoint(randomX1, randomY1);
	if (oldColor != null) {
		oldColor = oldColor.style.backgroundColor;
	}

	setTimeout(() => {
		let randomX2 = width - 25;
		let randomY2 = height - 65;
		console.log("randomX2: " + randomX2);
		console.log("randomY2: " + randomY2);

		let elements = document.elementsFromPoint(randomX2, randomY2);
		if (elements != null) {
			elements.forEach((elem, i) => {
				if (elem.style.backgroundColor != null) {
					elem.click();
				}
			});
		}

		let newColor = document.elementFromPoint(randomX1, randomY1);
		if (newColor != null) {
			newColor = newColor.style.backgroundColor;
		}

		if (newColor != oldColor || (newColor != null && oldColor == null) || (oldColor != null && newColor == null)) {
			console.log("Interactivity confirmed.");
			clearInterval(intervalID);
		}
		else {
			console.log("No change.");
		}
	}, 2500);
}
