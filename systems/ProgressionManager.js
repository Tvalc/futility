class ProgressionManager {
    constructor() {
        this.level = 0;
        this.phase = 0;
        this.character = null;
        this.upgrades = {};
        this.checkpoints = [];
    }
    advancePhase() {
        this.phase += 1;
        if (this.phase >= GameConfig.phasesPerLevel) {
            this.phase = 0;
            this.level += 1;
        }
    }
    unlockUpgrade(charId, upgradeId) {
        if (!this.upgrades[charId]) this.upgrades[charId] = [];
        this.upgrades[charId].push(upgradeId);
    }
}
window.ProgressionManager = ProgressionManager;