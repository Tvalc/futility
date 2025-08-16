class DialogueManager {
    constructor(dialogueData) {
        this.dialogueData = dialogueData || {};
        this.current = [];
        this.pointer = 0;
        this.active = false;
        this.callback = null;
    }
    start(dialogueId, cb) {
        this.current = this.dialogueData[dialogueId] || [];
        this.pointer = 0;
        this.active = true;
        this.callback = cb;
    }
    next() {
        this.pointer++;
        if (this.pointer >= this.current.length) {
            this.active = false;
            if (this.callback) this.callback();
        }
    }
    getCurrent() {
        return this.current[this.pointer];
    }
}
window.DialogueManager = DialogueManager;