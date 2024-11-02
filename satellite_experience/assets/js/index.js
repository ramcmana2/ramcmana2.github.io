

const launch_sound = new Audio("../audio/launch.wav");

function onClick() {
	//let launch_sound = new Audio("../audio/launch.ogg");
	//launch_sound.play();
	let state = launch_sound.play();
	window.history.pushState(state, "", "main_page.html");
  //window.location.href = "main_page.html";
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
