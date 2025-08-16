// Main game entry point and orchestration
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas');
    const overlay = document.getElementById('ui-overlay');
    if (!canvas) {
        alert('Game canvas missing!');
        return;
    }
    canvas.focus();

    // Boot sequence
    if (window.BootScene) {
        window.bootScene = new window.BootScene({canvas, overlay});
        window.bootScene.start();
    }
});