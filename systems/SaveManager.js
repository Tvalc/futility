class SaveManager {
    constructor() {
        // No persistent storage allowed, all in-memory only
        this.state = {};
    }
    save(key, value) {
        this.state[key] = value;
    }
    load(key) {
        return this.state[key];
    }
    clear() {
        this.state = {};
    }
}
window.SaveManager = SaveManager;