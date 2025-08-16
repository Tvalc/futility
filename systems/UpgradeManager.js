class UpgradeManager {
    constructor(characterData) {
        this.characterData = characterData || {};
        this.unlocked = {};
    }
    unlock(charId, upgradeId) {
        if (!this.unlocked[charId]) this.unlocked[charId] = [];
        if (!this.unlocked[charId].includes(upgradeId)) this.unlocked[charId].push(upgradeId);
    }
    isUnlocked(charId, upgradeId) {
        return this.unlocked[charId]?.includes(upgradeId);
    }
    getAvailable(charId) {
        return (this.characterData[charId]?.upgrades || []);
    }
}
window.UpgradeManager = UpgradeManager;