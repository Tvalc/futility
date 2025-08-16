class VictoryScene {
    constructor({canvas, overlay, level, phase, character}) {
        this.canvas = canvas;
        this.overlay = overlay;
        this.ctx = canvas.getContext('2d');
        this.level = level;
        this.phase = phase;
        this.character = character;
        this.panel = null;
        // --- For progression ---
        if (!window.saveManager) window.saveManager = new window.SaveManager();
        this.saveManager = window.saveManager;
    }
    start() {
        this.drawBackground();
        // --- Unlock next level if phase complete and last phase of level ---
        if (typeof this.level === 'number' && typeof this.phase === 'number') {
            // If this is the last phase of the level, unlock next level
            if (this.phase >= GameConfig.phasesPerLevel - 1) {
                let unlocked = this.saveManager.load('unlockedLevel');
                if (typeof unlocked !== 'number' || unlocked < 0) unlocked = 0;
                if (this.level >= unlocked && this.level < GameConfig.totalLevels - 1) {
                    this.saveManager.save('unlockedLevel', this.level + 1);
                }
            }
        }
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
        this.panel.innerHTML = `
            <h1>Phase Complete!</h1>
            <p>Congratulations, hero!<br>You have defeated the Ork horde.</p>
            <button id="btn-next">Next Phase</button>
            <button id="btn-menu">Main Menu</button>
        `;
        overlay.appendChild(this.panel);
        document.getElementById('btn-next').onclick = () => {
            this.panel.remove();
            if (window.PhaseIntroScene) {
                window.phaseIntroScene = new window.PhaseIntroScene({
                    canvas:this.canvas,
                    overlay:this.overlay,
                    level:this.level,
                    character:this.character
                });
                window.phaseIntroScene.start();
            }
        };
        document.getElementById('btn-menu').onclick = () => {
            this.panel.remove();
            if (window.MenuScene) {
                window.menuScene = new window.MenuScene({canvas:this.canvas, overlay:this.overlay});
                window.menuScene.start();
            }
        };
    }
}
window.VictoryScene = VictoryScene;