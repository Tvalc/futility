class PhaseIndicator {
    constructor(level, phase) {
        this.level = level;
        this.phase = phase;
        this.dom = document.createElement('div');
        this.dom.className = 'phase-indicator';
        document.getElementById('ui-overlay').appendChild(this.dom);
        this.render();
    }
    render() {
        this.dom.innerHTML = `Level ${this.level+1} &mdash; Phase ${this.phase+1}`;
    }
    update(level, phase) {
        this.level = level;
        this.phase = phase;
        this.render();
    }
    destroy() {
        if (this.dom && this.dom.parentNode) this.dom.parentNode.removeChild(this.dom);
    }
}
window.PhaseIndicator = PhaseIndicator;