class BootScene {
    constructor({canvas, overlay}) {
        this.canvas = canvas;
        this.overlay = overlay;
        this.ctx = canvas.getContext('2d');
        this.nextScene = null;
    }
    start() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = "bold 40px Segoe UI, Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#fff";
        this.ctx.shadowColor = "#4cf";
        this.ctx.shadowBlur = 16;
        this.ctx.fillText("Solar Siege: Ork Onslaught", this.canvas.width/2, this.canvas.height/2 - 22);
        this.ctx.shadowBlur = 0;
        this.ctx.font = "22px Segoe UI, Arial";
        this.ctx.fillStyle = "#ade6ff";
        this.ctx.fillText("Loading...", this.canvas.width/2, this.canvas.height/2 + 38);
        setTimeout(() => {
            if (window.PreloadScene) {
                window.preloadScene = new window.PreloadScene({canvas:this.canvas, overlay:this.overlay});
                window.preloadScene.start();
            }
        }, 860);
    }
}
window.BootScene = BootScene;