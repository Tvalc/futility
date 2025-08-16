class DialogBox {
    constructor() {
        this.dom = document.createElement('div');
        this.dom.className = 'dialog-panel';
        this.dom.style.display = 'none';
        document.getElementById('ui-overlay').appendChild(this.dom);
        this.onNext = null;
        this.dom.addEventListener('click', () => {
            if (this.onNext) this.onNext();
        });
    }
    show(dialogue, onNext) {
        this.dom.innerHTML = `
            <div>${dialogue.text}</div>
            <button>Continue</button>
        `;
        this.dom.style.display = 'block';
        this.onNext = onNext;
    }
    hide() {
        this.dom.style.display = 'none';
        this.onNext = null;
    }
    destroy() {
        if (this.dom && this.dom.parentNode) this.dom.parentNode.removeChild(this.dom);
    }
}
window.DialogBox = DialogBox;