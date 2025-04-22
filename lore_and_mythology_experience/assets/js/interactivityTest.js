/**
 * Interactivity Test
 * A test intended to ensure content reacts to user action.
 * Only applicable to screens without animations.
 */
export default async function interactivityTest(intervalID) {
	console.log("Initiating automatic interactivity test... Please wait.");

	const width = window.innerWidth;
	const height = window.innerHeight;

	let randomX1 = Math.floor(width / 2);
	let randomY1 = Math.floor(height / 2);
	// let randomX1 = Math.floor(Math.random() * (width + 1));
	// let randomY1 = Math.floor(Math.random() * (height + 1));
	console.log("randomX1: " + randomX1);
	console.log("randomY1: " + randomY1);

	let oldColors = document.elementsFromPoint(randomX1, randomY1);
	console.log("oldColors: " + oldColors);
	let oldColor = oldColors[0];
	if (oldColors != null) {
		for (var elem = 0; elem < oldColors.length; elem++) {
			if (oldColors[elem].style.backgroundColor != null) {
				oldColor = oldColors[elem].style.backgroundColor;
				break;
			}
		}
	}

	let randomX2 = width - 25;
	let randomY2 = height - 65;
	// let randomX2 = Math.floor(Math.random() * (width + 1));
	// let randomY2 = Math.floor(Math.random() * (height + 1));
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

	setTimeout(() => {
		// let randomX2 = width - 25;
		// let randomY2 = height - 65;
		// console.log("randomX2: " + randomX2);
		// console.log("randomY2: " + randomY2);

		// let elements = document.elementsFromPoint(randomX2, randomY2);
		// if (elements != null) {
		// 	elements.forEach((elem, i) => {
		// 		if (elem.style.backgroundColor != null) {
		// 			elem.click();
		// 		}
		// 	});
		// }

		let newColors = document.elementsFromPoint(randomX1, randomY1);
		console.log("newColors: " + newColors);
		let newColor = newColors[0];
		if (newColors != null) {
			for (var elem = 0; elem < newColors.length; elem++) {
				if (newColors[elem].style.backgroundColor != null) {
					newColor = newColors[elem].style.backgroundColor;
					break;
				}
			}
		}

		if (newColor != oldColor || (newColor != null && oldColor == null) || (oldColor != null && newColor == null)) {
			console.log("oldColor: " + oldColor);
			console.log("newColor: " + newColor);
			console.log("Interactivity confirmed.");
			clearInterval(intervalID);
		}
		else {
			console.log("oldColor: " + oldColor);
			console.log("newColor: " + newColor);
			console.log("No change.");
		}
	}, 2500);
}
