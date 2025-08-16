class CutsceneScene {
    constructor({canvas, overlay, dialogueId, nextScene}) {
        this.canvas = canvas;
        this.overlay = overlay;
        this.ctx = canvas.getContext('2d');
        this.dialogueId = dialogueId;
        this.nextScene = nextScene;
        this.dialogueBox = null;
        this.dialogueManager = null;
    }
    start() {
        this.drawBackground();
        this.dialogueManager = new window.DialogueManager(window.dialogueData || {});
        this.dialogueManager.start(this.dialogueId, () => {
            this.dialogueBox.hide();
            setTimeout(() => {
                if (this.nextScene) this.nextScene();
            }, 300);
        });
        this.dialogueBox = new window.DialogBox();
        this.showNext();
    }
    drawBackground() {
        if (!window.AssetGenerator) return;
        const ag = new window.AssetGenerator();
        ag.drawBackground(this.ctx, Date.now());
    }
    showNext() {
        if (!this.dialogueManager.active) return;
        this.dialogueBox.show(this.dialogueManager.getCurrent(), () => {
            this.dialogueManager.next();
            this.showNext();
        });
    }
}
window.CutsceneScene = CutsceneScene;