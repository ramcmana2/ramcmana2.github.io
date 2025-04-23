export default class ProgressTracker {
	triggers = {
		"help": false,
		"settings": false,
		"defaultMode": false,
		"highContrastMode": false,
		"lightMode": false,
		"colorBlindMode": false,
		"volume": false,
		"exploreMission": false,
		"launch": false,
		"gravityAssist": false,
		"orbitA": false,
		"orbitB1": false,
		"orbitD": false,
		"orbitC": false,
		"orbitB2": false,
		"endOfMission": false,
		"exploreInstruments": false,
		"solarArrays1": false,
		"xBandHighGainAntenna": false,
		"multispectralImager": false,
		"deepSpaceOpticalCommunication": false,
		"magnetometer": false,
		"spt140Engines1": false,
		"spt140Engines2": false,
		"solarArrays2": false,
		"backToMain": false
	};
	
	triggered(trigger) {
		this.triggers[trigger] = true;

		let activatedTriggers = 0;

		triggers.forEach((k, v) => {
			if (v) {
				activatedTriggers++;
			}
		});

		let progress = (activatedTriggers / Object.keys(triggers).length) * 100;
		console.log("Your current progress is " + progress);
	}
}
