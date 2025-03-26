//import ProgressBar from './progressBar.js';
import testIframe from './progressBar.js';

// const pBar = new ProgressBar(0);
// pBar.initialize();
// pBar.drawProgressBar();

// const pBar = ProgressBar;
// pBar.initialize();
// pBar.drawProgressBar();

// function onClick() {
//     let iframe = document.createElement('iframe');
//     iframe.style = "position: fixed; top: 0px; bottom: 0px; right: 0px; width: 100%; border: none; margin: 0; padding: 0; overflow: hidden; z-index: 999999; height: 100%;";
//     iframe.src = "../pages/amp_context.html";
//     document.body.appendChild(iframe);
// }

window.onClick = function() {
    testIframe();
    let iframe = document.createElement('iframe');
    iframe.style = "position: fixed; top: 0px; bottom: 0px; right: 0px; width: 100%; border: none; margin: 0; padding: 0; overflow: hidden; z-index: 999999; height: 100%;";
    iframe.src = "../pages/amp_context.html";
    document.body.appendChild(iframe);
}

const fadeInSections = document.querySelectorAll('.fade-in-section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });


fadeInSections.forEach(section => {
    observer.observe(section);
});
