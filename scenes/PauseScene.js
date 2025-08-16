class PauseScene {
    constructor({canvas, overlay, resumeCallback}) {
        this.canvas = canvas;
        this.overlay = overlay;
        this.ctx = canvas.getContext('2d');
        this.panel = null;
        this.resumeCallback = resumeCallback;
    }
    start() {
        this.showPanel();
    }
    showPanel() {
        const overlay = document.getElementById('ui-overlay');
        this.panel = document.createElement('div');
        this.panel.className = 'menu-panel';
        this.panel.innerHTML = `
            <h1>Paused</h1>
            <button id="btn-resume">Resume</button>
            <button id="btn-exit">Exit to Menu</button>
        `;
        overlay.appendChild(this.panel);
        document.getElementById('btn-resume').onclick = () => {
            this.panel.remove();
            if (this.resumeCallback) this.resumeCallback();
        };
        document.getElementById('btn-exit').onclick = () => {
            this.panel.remove();
            if (window.MenuScene) {
                window.menuScene = new window.MenuScene({canvas:this.canvas, overlay:this.overlay});
                window.menuScene.start();
            }
        };
    }
}
window.PauseScene = PauseScene;