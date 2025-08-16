const ResponsiveUtils = {
    scaleCanvasToFit: (canvas, config) => {
        // Scales canvas to fit viewport while preserving aspect ratio
        const w = config.canvasWidth;
        const h = config.canvasHeight;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const scale = Math.min(vw / w, vh / h);
        canvas.style.width = `${w * scale}px`;
        canvas.style.height = `${h * scale}px`;
    }
};
window.ResponsiveUtils = ResponsiveUtils;

// Auto-resize canvas on window resize
window.addEventListener('resize', () => {
    if (window.GameConfig && window.ResponsiveUtils && document.getElementById('game-canvas')) {
        ResponsiveUtils.scaleCanvasToFit(document.getElementById('game-canvas'), GameConfig);
        ResponsiveUtils.scaleCanvasToFit(document.getElementById('ui-overlay'), GameConfig);
    }
});