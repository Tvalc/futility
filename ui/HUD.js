class HUD {
    constructor(canvas, player, progression, phase) {
        this.canvas = canvas;
        this.player = player;
        this.progression = progression;
        this.phase = phase;
        this.visible = true;
        this.dom = null;
        this.createDOM();
    }
    createDOM() {
        this.dom = document.createElement('div');
        this.dom.className = 'hud-bar';
        document.getElementById('ui-overlay').appendChild(this.dom);
    }
    update(player, phase) {
        this.player = player;
        this.phase = phase;
        this.render();
    }
    render() {
        if (!this.dom || !this.player) return;
        this.dom.innerHTML = `
            <span class="hp">HP: ${this.player.hp}</span>
            <span class="energy">Energy: ${this.player.energy}</span>
            <span class="phase">Phase: ${this.phase+1}</span>
        `;
    }
    destroy() {
        if (this.dom && this.dom.parentNode) this.dom.parentNode.removeChild(this.dom);
    }
}
window.HUD = HUD;