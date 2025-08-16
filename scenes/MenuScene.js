class MenuScene {
    constructor({canvas, overlay}) {
        this.canvas = canvas;
        this.overlay = overlay;
        this.ctx = canvas.getContext('2d');
        this.panel = null;
    }
    start() {
        this.drawBackground();
        this.showMenu();
    }
    drawBackground() {
        if (!window.AssetGenerator) return;
        const ag = new window.AssetGenerator();
        ag.drawBackground(this.ctx, Date.now());
    }
    showMenu() {
        const overlay = document.getElementById('ui-overlay');
        // Remove any existing menu panels before adding a new one
        Array.from(overlay.querySelectorAll('.menu-panel')).forEach(p => p.remove());
        this.panel = document.createElement('div');
        this.panel.className = 'menu-panel';
        this.panel.innerHTML = `
            <h1>Solar Siege: Ork Onslaught</h1>
            <button id="btn-play" tabindex="1">Play</button>
            <button id="btn-character" tabindex="2">Characters</button>
            <button id="btn-settings" tabindex="3">Settings</button>
            <button id="btn-credits" tabindex="4">Credits</button>
        `;
        overlay.appendChild(this.panel);

        // Ensure panel and buttons are visible and focusable
        this.panel.style.display = 'block';
        this.panel.style.opacity = '1';
        this.panel.style.pointerEvents = 'auto';

        // Make sure overlay allows pointer events for the menu
        overlay.style.pointerEvents = 'auto';

        // Focus the first button for accessibility
        setTimeout(() => {
            const btn = document.getElementById('btn-play');
            if (btn) btn.focus();
        }, 0);

        document.getElementById('btn-play').onclick = () => {
            this.panel.remove();
            if (window.LevelSelectScene) {
                window.levelSelectScene = new window.LevelSelectScene({canvas:this.canvas, overlay:this.overlay});
                window.levelSelectScene.start();
            }
        };
        document.getElementById('btn-character').onclick = () => {
            this.panel.remove();
            if (window.CharacterSelectScene) {
                window.characterSelectScene = new window.CharacterSelectScene({canvas:this.canvas, overlay:this.overlay});
                window.characterSelectScene.start();
            }
        };
        document.getElementById('btn-settings').onclick = () => {
            this.panel.remove();
            if (window.SettingsScene) {
                window.settingsScene = new window.SettingsScene({canvas:this.canvas, overlay:this.overlay});
                window.settingsScene.start();
            }
        };
        document.getElementById('btn-credits').onclick = () => {
            this.panel.remove();
            if (window.CreditsScene) {
                window.creditsScene = new window.CreditsScene({canvas:this.canvas, overlay:this.overlay});
                window.creditsScene.start();
            }
        };
    }
}
window.MenuScene = MenuScene;