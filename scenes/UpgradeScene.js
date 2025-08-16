class UpgradeScene {
    constructor({canvas, overlay, character}) {
        this.canvas = canvas;
        this.overlay = overlay;
        this.ctx = canvas.getContext('2d');
        this.character = character || 'martian';
        this.upgrades = (window.characterData && window.characterData[this.character]?.upgrades) || [];
        this.unlocked = [];
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
        this.panel = new window.UpgradeTree(this.character, this.upgrades, this.unlocked, (id) => {
            this.unlocked.push(id);
            this.panel.hide();
            setTimeout(() => {
                if (window.MenuScene) {
                    window.menuScene = new window.MenuScene({canvas:this.canvas, overlay:this.overlay});
                    window.menuScene.start();
                }
            }, 400);
        });
    }
}
window.UpgradeScene = UpgradeScene;