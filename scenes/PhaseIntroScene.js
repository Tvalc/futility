class PhaseIntroScene {
    constructor({canvas, overlay, level, character}) {
        this.canvas = canvas;
        this.overlay = overlay;
        this.ctx = canvas.getContext('2d');
        this.level = level || 0;
        this.phase = 0;
        this.character = character || 'martian';
        this.panel = null;
        // --- Planet names for display ---
        this.levelNames = [
            "Mercury",
            "Venus",
            "Earth",
            "Mars",
            "Jupiter",
            "Saturn",
            "Uranus",
            "Neptune",
            "Pluto",
            "Finale"
        ];
    }
    start() {
        this.drawBackground();
        this.showPanel();
    }
    drawBackground() {
        if (!window.AssetGenerator) return;
        const ag = new window.AssetGenerator();
        ag.drawBackground(this.ctx, Date.now());
    }
    showPanel() {
        const overlay = document.getElementById('ui-overlay');
        this.panel = document.createElement('div');
        this.panel.className = 'menu-panel';
        let planet = this.levelNames[this.level] || `Level ${this.level+1}`;
        this.panel.innerHTML = `
            <h1>${planet} - Phase 1</h1>
            <p>Prepare for battle!<br>Press Start to deploy.</p>
            <button id="btn-start">Start</button>
            <button id="btn-back">Back</button>
        `;
        overlay.appendChild(this.panel);
        document.getElementById('btn-start').onclick = () => {
            this.panel.remove();
            if (window.GameScene) {
                window.gameScene = new window.GameScene({
                    canvas:this.canvas,
                    overlay:this.overlay,
                    level:this.level,
                    phase:0,
                    character:this.character
                });
                window.gameScene.start();
            }
        };
        document.getElementById('btn-back').onclick = () => {
            this.panel.remove();
            if (window.LevelSelectScene) {
                window.levelSelectScene = new window.LevelSelectScene({canvas:this.canvas, overlay:this.overlay, character:this.character});
                window.levelSelectScene.start();
            }
        };
    }
}
window.PhaseIntroScene = PhaseIntroScene;