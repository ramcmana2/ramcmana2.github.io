import SpaceScene from './SpaceScene.js';
import MainStateManager from './MainStateManager.js';
import HelpModal from './HelpModal.js';
import SettingsModal from './SettingsModal.js';
import InstrumentContentManager from './InstrumentContentManager.js';
import MissionContentManager from './MissionContentManager.js';
import SFXManager from './SFXManager.js';
import interactivityTest from './interactivityTest.js';
//import ProgressTracker from './ProgressTracker.js';

window.addEventListener("DOMContentLoaded", async () => {
    //const progressTracker = new ProgressTracker();

    // Initialize SFX Manager
    const sfxManager = new SFXManager();
    await sfxManager.initialize();
    window.sfxManager = sfxManager;

    // Main elements
    const mainContainer = document.getElementById('main-container');
    const upperButton = document.getElementById('upper-button');
    const lowerButton = document.getElementById('lower-button');

    const helpModal = new HelpModal(progressTracker);

    // Initialize SpaceScene
    let spaceScene = new SpaceScene({
        updateInstrumentContent: (id) => instrumentContentManager.updateInstrumentContent(id),
    }, helpModal);

    // Initialize UI
    const instrumentContentManager = new InstrumentContentManager(spaceScene, mainContainer);
    const missionContentManager = new MissionContentManager(spaceScene, mainContainer);
    const settingsModal = new SettingsModal();
    const mainStateManager = new MainStateManager(spaceScene, mainContainer, upperButton, lowerButton, missionContentManager);

    // Connect settings modal to help modal inactivity timer
    settingsModal.resetInactivityTimer = () => helpModal._setupInactivityTimer();

    let intervalID = setInterval(function() {
        interactivityTest(intervalID);
    }, 3000);
});
