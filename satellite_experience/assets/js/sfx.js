//const sound = new Audio("../audio/silence.wav");
// const sound = new Audio();
// sound.autoplay = true;
//sound.src = "../audio/launch.wav";

// const sound = new Audio();
// sound.autoplay = true;

// const audioContext = new(window.AudioContext || window.webkitAudioContext)();
// audioContext.createMediaElementSource(sound);
// sound.src = "../audio/launch.wav";


//sound.autoplay = true;

// const audioContext = new AudioContext();
// const audio = new Audio("../audio/launch.wav");
// const source = audioContext.createMediaElementSource(audio);
// source.connect(audioContext.destination);

// const sound = new Audio();
// sound.autoplay = true;

const audioContext = new AudioContext();
let samples;
console.log("Audio context started");

const samplePaths = ["../audio/launch.mp3", 
					 "../audio/open.mp3", 
					 "../audio/select.mp3", 
					 "../audio/close.mp3"]

async function getFile(filePath) {
	let response = await fetch(filePath);
	const arrayBuffer = await response.arrayBuffer();
	const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
	return audioBuffer;
}

async function setupSamples(paths) {
	console.log("Setting up samples")
	const audioBuffers = [];
	for (const path of paths) {
		const sample = await getFile(path);
		audioBuffers.push(sample);
	}
	console.log("Setting up done");
	return audioBuffers;
}

function playSample(audioBuffer, time) {
	const sampleSource = audioContext.createBufferSource();
	sampleSource.buffer = audioBuffer;
	sampleSource.connect(audioContext.destination);
	sampleSource.start(time);
}

function loop(startSecond, durationMilliseconds) {
	//sound.currentTime = 10;
	sound.currentTime = startSecond;
	//duration = setTimeout(loop, 62000);
	sampleSource.start(samples[0], startSecond);
	let duration = setTimeout(loop(startSecond, durationMilliseconds), durationMilliseconds);
}

function playFirstSample(audioBuffer, time) {
	const sampleSource = audioContext.createBufferSource();
	sampleSource.buffer = audioBuffer;
	sampleSource.connect(audioContext.destination);
	sampleSource.start(samples[0], 0);
	//let duration;
	setTimeout(function() {
		//loop();
		loop(10, 62000);
	}, 72000);
}

setupSamples(samplePaths).then((response) => {
	samples = response;
})
