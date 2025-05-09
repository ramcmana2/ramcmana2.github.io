/*
 * Instrument Content Manager class
 */

export default class InstrumentContentManager {
    // Constructor
    constructor(spaceScene, mainContainer) {
        this._spaceScene = spaceScene;
        this._mainContainer = mainContainer;

        this._initialize();
    }

    // Close instrument content
    close() {
        this._mainContainer.style.display = 'none';
        this._spaceScene.exitInstrumentDetail();
    }

    // Update content based on bubble id
    updateInstrumentContent(bubbleId) {
        triggered(bubbleId);
        // Maps for instruments
        const instrumentTitleMap = {};
        const instrumentDescriptionMap = {};
        const instrumentImageMap = {};

        this._spaceScene.click(bubbleId);

        fetch('../assets/data/instruments.json')
            .then(response => response.json())
            .then(data => {
                // load instruments info
                for (const key of data) {
                    instrumentTitleMap[String(key.name)] = key.title;
                    instrumentDescriptionMap[String(key.name)] = key.description;
                    instrumentImageMap[String(key.name)] = key.img;
                }

                const instrumentTitle = instrumentTitleMap[bubbleId] || 'No Title';
                const instrumentDescription = instrumentDescriptionMap[bubbleId] || 'No description.';
                const instrumentImage = instrumentImageMap[bubbleId] || '';

                // Content
                const instrumentTitleContent = document.getElementById('instrument-title');
                const instrumentDescriptionContent = document.getElementById('instrument-description');
                const instrumentImageContent = document.getElementById('instrument-image');

                // Update content
                if (instrumentTitleContent && instrumentDescriptionContent && instrumentImageContent) {
                    instrumentTitleContent.textContent = instrumentTitle;
                    instrumentDescriptionContent.textContent = instrumentDescription;

                    if (instrumentImage) {
                        instrumentImageContent.src = instrumentImage;
                        instrumentImageContent.alt = instrumentTitle;
                        instrumentImageContent.style.display = 'block';
                    } else {
                        instrumentImageContent.src = '';
                        instrumentImageContent.alt = '';
                        instrumentImageContent.style.display = 'none';
                    }

                    this._mainContainer.style.display = 'block';
                } else {
                    console.error('Instrument content elements not found.');
                }
            })
            .catch(error => console.error('Error Could not parse instruments.json:', error));
    }

    // Initialize instrument content
    _initialize() {
        // Close button
        document.addEventListener('click', (event) => {
            if (event.target.id === 'instrument-modal-close' 
                && this._mainContainer.style.display === 'block') {
                window.sfxManager.playSound("close");
                this.close();
            }
        });

        document.addEventListener('click', (event) => {
            if (event.target.id === 'left-instrument-transition-button') {
                window.sfxManager.playSound("select");
                this._spaceScene.prevInstrument();
                this.updateInstrumentContent(this._spaceScene.getCurrentInstrument());
            }
        });

        document.addEventListener('click', (event) => {
            if (event.target.id === 'right-instrument-transition-button') {
                window.sfxManager.playSound("select");
                this._spaceScene.nextInstrument();
                this.updateInstrumentContent(this._spaceScene.getCurrentInstrument());
            }
        });
    }
}
