class GameOverScene {
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
        // --- Do NOT unlock next level on game over ---
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
            <h1>Game Over</h1>
            <p>Your hero has fallen.<br>Level ${this.level+1}, Phase ${this.phase+1}</p>
            <button id="btn-retry">Retry</button>
            <button id="btn-menu">Main Menu</button>
        `;
        overlay.appendChild(this.panel);
        document.getElementById('btn-retry').onclick = () => {
            this.panel.remove();
            if (window.GameScene) {
                window.gameScene = new window.GameScene({
                    canvas:this.canvas,
                    overlay:this.overlay,
                    level:this.level,
                    phase:this.phase,
                    character:this.character
                });
                window.gameScene.start();
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
window.GameOverScene = GameOverScene;