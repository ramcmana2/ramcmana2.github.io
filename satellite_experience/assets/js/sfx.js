//const sound = new Audio();
//sound.autoplay = true;
//sound.src = "../audio/launch.wav";

const sound = new Audio();
sound.autoplay = true;

const audioContext = new(window.AudioContext || window.webkitAudioContext)();
audioContext.createMediaElementSource(sound);
sound.src = "../audio/launch.wav";
