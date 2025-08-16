class PreloadScene {
    constructor({canvas, overlay}) {
        this.canvas = canvas;
        this.overlay = overlay;
        this.ctx = canvas.getContext('2d');
    }
    start() {
        // Simulate preloading assets
        setTimeout(() => {
            if (window.MenuScene) {
                window.menuScene = new window.MenuScene({canvas:this.canvas, overlay:this.overlay});
                window.menuScene.start();
            }
        }, 620);
        // Draw animated loading bar
        let t0 = Date.now();
        const draw = () => {
            let t = (Date.now()-t0)/1000;
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.ctx.font = "bold 30px Segoe UI";
            this.ctx.fillStyle = "#fff";
            this.ctx.textAlign = "center";
            this.ctx.fillText("Preparing Briefing...", this.canvas.width/2, this.canvas.height/2-60);
            // Bar
            this.ctx.beginPath();
            this.ctx.roundRect(this.canvas.width/2-120, this.canvas.height/2-10, 240, 28, 14);
            this.ctx.strokeStyle = "#2cf";
            this.ctx.lineWidth = 3.5;
            this.ctx.stroke();
            this.ctx.fillStyle = "#2cf";
            this.ctx.globalAlpha = 0.6;
            this.ctx.fillRect(this.canvas.width/2-120, this.canvas.height/2-10, 240 * ((t % 1.0)), 28);
            this.ctx.globalAlpha = 1.0;
            if (t < 1.5) requestAnimationFrame(draw);
        };
        draw();
    }
}
window.PreloadScene = PreloadScene;