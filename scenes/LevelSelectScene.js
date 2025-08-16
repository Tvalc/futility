class LevelSelectScene {
    constructor({canvas, overlay, character}) {
        this.canvas = canvas;
        this.overlay = overlay;
        this.ctx = canvas.getContext('2d');
        this.character = character || 'martian';
        this.panel = null;
        // --- Track progression in-memory using SaveManager ---
        if (!window.saveManager) window.saveManager = new window.SaveManager();
        this.saveManager = window.saveManager;
        // Level names (planets), in order, first is Mercury
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
        // For compatibility, always use GameConfig.totalLevels
        this.totalLevels = GameConfig.totalLevels;
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
    getUnlockedLevel() {
        // Returns the highest unlocked level index (0-based)
        let unlocked = this.saveManager.load('unlockedLevel');
        if (typeof unlocked !== 'number' || unlocked < 0) unlocked = 0;
        // Clamp to max
        return Math.min(unlocked, this.totalLevels - 1);
    }
    unlockNextLevel(currentLevel) {
        // Unlocks the next level if not already unlocked
        let unlocked = this.getUnlockedLevel();
        if (currentLevel >= unlocked && currentLevel < this.totalLevels - 1) {
            this.saveManager.save('unlockedLevel', currentLevel + 1);
        }
    }
    showPanel() {
        const overlay = document.getElementById('ui-overlay');
        this.panel = document.createElement('div');
        this.panel.className = 'menu-panel';

        // --- Only allow access to unlocked levels, show planet names ---
        let unlockedLevel = this.getUnlockedLevel();
        let btns = '';
        for (let i = 0; i < this.totalLevels; ++i) {
            let planet = this.levelNames[i] || `Level ${i+1}`;
            let locked = i > unlockedLevel;
            btns += `<button class="level-btn" data-level="${i}" ${locked ? 'disabled style="opacity:0.5;filter:grayscale(1);cursor:not-allowed;"' : ''}>${planet}</button>`;
        }

        this.panel.innerHTML = `
            <h1>Select Planet</h1>
            ${btns}
            <button id="btn-back">Back</button>
        `;
        overlay.appendChild(this.panel);
        const levelBtns = this.panel.querySelectorAll('.level-btn');
        levelBtns.forEach(btn => {
            if (btn.disabled) return;
            btn.onclick = () => {
                this.panel.remove();
                if (window.PhaseIntroScene) {
                    window.phaseIntroScene = new window.PhaseIntroScene({
                        canvas:this.canvas,
                        overlay:this.overlay,
                        level:parseInt(btn.dataset.level),
                        character:this.character
                    });
                    window.phaseIntroScene.start();
                }
            };
        });
        document.getElementById('btn-back').onclick = () => {
            this.panel.remove();
            if (window.MenuScene) {
                window.menuScene = new window.MenuScene({canvas:this.canvas, overlay:this.overlay});
                window.menuScene.start();
            }
        };
    }
}
window.LevelSelectScene = LevelSelectScene;