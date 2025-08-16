class CreditsScene {
    constructor({canvas, overlay}) {
        this.canvas = canvas;
        this.overlay = overlay;
        this.ctx = canvas.getContext('2d');
        this.panel = null;
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
        this.panel.innerHTML = `
            <h1>Credits</h1>
            <p>
                Solar Siege: Ork Onslaught<br>
                Design & Programming: Snib AI<br>
                Art & Graphics: Procedural Generation<br>
                Platform: Snib AI Game Platform<br>
                <br>
                Thank you for playing!
            </p>
            <button id="btn-back">Back to Menu</button>
        `;
        overlay.appendChild(this.panel);
        document.getElementById('btn-back').onclick = () => {
            this.panel.remove();
            if (window.MenuScene) {
                window.menuScene = new window.MenuScene({canvas:this.canvas, overlay:this.overlay});
                window.menuScene.start();
            }
        };
    }
}
window.CreditsScene = CreditsScene;