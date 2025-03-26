export default class ProgressBar {
	progress;
	progressBar;
	progressBars;

	constructor(currentProgress) {
		this.progress = currentProgress;
		// this.progressBar = document.createElement("div");
  //       this.progressBar.setAttribute("id", "progressBar");
  //       this.progressBar.setAttribute("style", "width: 100%; height: 20px; background-color: rgba(200, 200, 200, 0.2); top: calc(100vh - 20px)");
  //       this.progressBars = document.createElement("div");
  //       this.progressBars.setAttribute("id", "progressBars");
  //       this.progressBars.setAttribute("style", "width: calc(progress * 10vw); height: 20px; background-color: rgba(0, 200, 0, 0.2); top: calc(100vh - 20px)");
  //       document.body.appendChild(progressBar);
  //       document.body.appendChild(progressBars);
	}

	initialize() {
		this.progressBar = document.createElement("div");
        this.progressBar.setAttribute("id", "progressBar");
        this.progressBar.setAttribute("style", "width: 100%; height: 20px; background-color: rgba(200, 200, 200, 0.2); position: absolute; top: calc(100vh - 20px); z-index: 100; display: block;");
        this.progressBars = document.createElement("div");
        this.progressBars.setAttribute("id", "progressBars");
        this.progressBars.setAttribute("style", "width: calc(progress * 10vw); height: 20px; background-color: rgba(0, 200, 0, 0.2); position: absolute; top: calc(100vh - 20px); z-index: 100; display: block;");
        document.body.appendChild(this.progressBar);
        document.body.appendChild(this.progressBars);
	}

	drawProgressBar() {
		this.progress++;
		// for (var i = 0; i < this.progress; i++) {
		// 	this.progressBars.setAttribute("style", "width: calc(progress * 10vw); height: 20px; background-color: rgba(0, 200, 0, 0.2);");
		// }
		this.progressBars.setAttribute("style", "width: calc(progress * 10vw); height: 20px; background-color: rgba(0, 200, 0, 0.2); position: absolute; top: calc(100vh - 20px); z-index: 100; display: block;");
	}
}