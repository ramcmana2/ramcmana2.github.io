

// Ensure DOM content has loaded
document.addEventListener("DOMContentLoaded", function() {
    // Help modal elements
    var helpModal = document.getElementById("help-modal");
    var helpModalContent = document.getElementById("help-modal-content");

    // Settings modal elements
    var settingsModal = document.getElementById("settings-modal");
    var settingsModalContent = document.getElementById("settings-modal-content");

    // Inject the help modal content
    function openHelpModal() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "help_page.html", true);
        //xhr.open("GET", "help_page_v2.html", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                helpModalContent.innerHTML = xhr.responseText;
                helpModal.style.display = "flex";
            }
        };
        xhr.send();
    }

    // Help icon button
    var helpIconButton = document.getElementById("help-icon-button");
    helpIconButton.addEventListener("click", function() {
        openHelpModal();
    });

    // Close the help modal
    var helpModalCloseButton = document.getElementById("help-modal-close");
    helpModalCloseButton.addEventListener("click", function() {
        helpModal.style.display = "none";
    });

    // Close the help modal if clicking out
    window.onclick = function(event) {
        if (event.target == helpModal) {
            helpModal.style.display = "none";
        }
    };

    // Track user activity
    var inactivityTime = 60000; // 60 second timer
    var inactivityTimer;

    // Open help modal if timer reaches inactivity time
    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(function() {
            // Check that settings page isn't open
            if (settingsModal.style.display !== "flex") {
                openHelpModal();
            }
        }, inactivityTime)
    }

    // Events to reset the inactivity time i.e. user interaction
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);
    window.addEventListener('click', resetInactivityTimer);
    window.addEventListener('touchstart', resetInactivityTimer);
    window.addEventListener('scroll', resetInactivityTimer);

    // Initialize inactivity timer
    resetInactivityTimer();

    // Inject the settings modal content
    function openSettingsModal() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "settings_page.html", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                settingsModalContent.innerHTML = xhr.responseText;
                settingsModal.style.display = "flex";
            }
        };
        xhr.send();

        // Handle Settings radio button selection
        // TODO: connect to mode changes
        if(document.getElementById('high-contrast-mode').checked) {
            // default mode selected
            console.log("Default Mode selected");
            // link.href="../assets/css/styles.css"
            // document.querySelector("link[href='u1.css']").href = "../assets/css/styles.css;
        } else if(document.getElementById('high-contrast-mode').checked) {
            // high contrast mode selected
            console.log("High Constrast Mode selected");
            // link.href="../assets/css/high_contrast_styles.css"
            // document.querySelector("link[href='u1.css']").href = "../assets/css/high_contrast_styles.css;
            // TODO US79 Task 85
        } else if(document.getElementById('light-mode').checked) {
            // light mode selected
            console.log("Light Mode selected");
            // link.href="../assets/css/light_styles.css"
            // document.querySelector("link[href='u1.css']").href = "../assets/css/light_styles.css;
            // TODO US79 Task 108
        } else if (document.getElementById('color-blind-mode').checked) {
            // color-blind mode selected
            console.log("Color-blind Mode selected");
            // link.href="../assets/css/color_blind_styles.css"
            // document.querySelector("link[href='u1.css']").href = "../assets/css/color_blind_styles.css;
            // TODO US79 Task 86
        }
    }

    // Settings icon button
    var settingsIconButton = document.getElementById("settings-icon-button");
    settingsIconButton.addEventListener("click", function() {
        openSettingsModal();
    });


    // Close the settings modal
    var settingsModalCloseButton = document.getElementById("settings-modal-close");
    settingsModalCloseButton.addEventListener("click", function() {
        resetInactivityTimer(); // Reset activity timer so it doesn't pop up as soon as settings is closed
        settingsModal.style.display = "none";
    });

    // Close the settings modal if clicking out
    window.onclick = function(event) {
        if (event.target == settingsModal) {
            settingsModal.style.display = "none";
        }
    };

    // Setup Three.js canvas
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas').appendChild(renderer.domElement);

    // Basic black background
    renderer.setClearColor(0x000000);

    // Basic light
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Model loader
    var loader = new THREE.GLTFLoader();

    // Load satellite model
    loader.load('../assets/models/satellite.glb', function (gltf) {
        var model = gltf.scene;
        model.scale.set(0.25, 0.25, 0.25); // Set model scale
        scene.add(model); // Add model to scene

        // Offset camera from model
        camera.position.z = 5;

        // Basic rotation animation
        function animate() {
            requestAnimationFrame(animate);
            model.rotation.x += 0.002;
            renderer.render(scene, camera);
        }
        animate();
    
    // Log error to console
    }, undefined, function (error) {
        console.error(error);
    });

    // Loading screen
    //let loading = document.getElementById("loading-container");
    let loading = document.getElementById("loading-container_v2");

    setTimeout(function () {
      loading.style.opacity = 0;
      setTimeout(function () {
        loading.style.display = "none";
      }, 3000);
    }, 2000);

    // Update canvas when window resizes
    window.addEventListener('resize', function () {
        // Set new renderer dimensions
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width, height);

        // Update camera
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
});
