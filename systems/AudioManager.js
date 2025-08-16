class AudioManager {
    constructor() {
        this.enabled = false; // Silence by default (policy)
        // Could extend with procedural WebAudio if allowed
    }
    playSound(name) {
        // No external assets, do nothing or play synth if allowed
    }
    stopAll() {}
}
window.AudioManager = AudioManager;