class PerformanceManager {
    constructor() {
        this.lastFrameTime = performance.now();
        this.fps = 60;
    }
    update() {
        const now = performance.now();
        const dt = now - this.lastFrameTime;
        this.fps = (this.fps * 0.9) + (1000/dt * 0.1);
        this.lastFrameTime = now;
    }
    getFPS() {
        return Math.round(this.fps);
    }
}
window.PerformanceManager = PerformanceManager;