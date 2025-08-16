const GameConfig = {
    canvasWidth: 800,
    canvasHeight: 600,
    initialScene: 'BootScene',
    phasesPerLevel: 3,
    totalLevels: 10,
    playerStartHP: 120,
    playerStartEnergy: 100,
    playerSpeed: 4,
    playerJump: 8,
    gravity: 0.42,
    enemyMaxOnScreen: 12,
    enemySpawnRate: 1.25,
    enemyProjectileSpeed: 5,
    projectileSpeed: 8,
    // ...add more config as needed
};

window.GameConfig = GameConfig;