/**
 * Interactivity Test
 * A test intended to ensure content reacts to user action.
 * Only applicable to screens without animations.
 */
export default async function interactivityTest(intervalID) {
	// console.log("Initiating automatic interactivity test... Please wait.");

	// const width = window.screen.width;
	// const height = window.screen.height;
	// // const originalDisplay = window.canvas.getImageData(0, 0, width, height);

	// let different = false;

	// while (!different) {
	// 	let randomX1 = Math.floor(Math.random() * (width + 1));
	// 	let randomY1 = Math.floor(Math.random() * (height + 1));

	// 	// let oldColor = document.elementFromPoint(randomX, randomY).style.backgroundColor;
	// 	let oldColor = document.elementFromPoint(randomX1, randomY1);
	// 	if (oldColor != null) {
	// 		oldColor = oldColor.style.backgroundColor;
	// 	}

	// 	setTimeout(() => {
	// 		let randomX2 = Math.floor(Math.random() * (width + 1));
	// 		let randomY2 = Math.floor(Math.random() * (height + 1));

	// 		// document.elementFromPoint(randomX, randomY).click();
	// 		let randomElement = document.elementFromPoint(randomX2, randomY2);
	// 		if (randomElement != null) {
	// 			randomElement.click();
	// 		}

	// 		// let newColor = document.elementFromPoint(randomX, randomY).style.backgroundColor;
	// 		let newColor = document.elementFromPoint(randomX1, randomY1);
	// 		if (newColor != null) {
	// 			newColor = newColor.style.backgroundColor;
	// 		}

	// 		// const newDisplay = window.canvas.getImageData(0, 0, width, height);

	// 		if (newColor != null && oldColor != null && newColor != oldColor) {
	// 			different = true;
	// 			clearInterval(intervalID);
	// 			//break;
	// 		}
	// 		else {
	// 			console.log("No change.");
	// 		}

	// 		// for (var i = 0; i < width * height * 4; i++) {
	// 		// 	if (newDisplay.data[i] != originalDisplay.data[i]) {
	// 		// 		different = true;
	// 		// 		break;
	// 		// 	}
	// 		// }
	//     }, 2500);
	// }

	// console.log("Interactivity confirmed.");

	console.log("Initiating automatic interactivity test... Please wait.");

	const width = window.screen.width;
	const height = window.screen.height;

	let randomX1 = Math.floor(Math.random() * (width + 1));
	let randomY1 = Math.floor(Math.random() * (height + 1));

	let oldColor = document.elementFromPoint(randomX1, randomY1);
	if (oldColor != null) {
		oldColor = oldColor.style.backgroundColor;
	}

	setTimeout(() => {
		// let randomX2 = Math.floor(Math.random() * (width + 1));
		// let randomY2 = Math.floor(Math.random() * (height + 1));
		let randomX2 = 140;
		let randomY2 = 600;

		console.log("x = " + randomX2);
		console.log("y = " + randomY2);

		let randomElement = document.elementFromPoint(randomX2, randomY2);
		if (randomElement != null) {
			randomElement.click();
		}

		let newColor = document.elementFromPoint(randomX1, randomY1);
		if (newColor != null) {
			newColor = newColor.style.backgroundColor;
		}

		if (newColor != null && oldColor != null && newColor != oldColor) {
			console.log("Interactivity confirmed.");
			clearInterval(intervalID);
		}
		else {
			console.log("No change.");
		}
	}, 2500);
}
