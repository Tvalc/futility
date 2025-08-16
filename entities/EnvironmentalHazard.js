class EnvironmentalHazard {
    constructor(x, y, type="plasma") {
        this.x = x;
        this.y = y;
        this.type = type;
        this.radius = 24;
    }
    update(dt) {
        // Could animate or pulse
    }
    getRect() {
        return {
            x: this.x - this.radius,
            y: this.y - this.radius,
            width: this.radius * 2,
            height: this.radius * 2
        };
    }
}
window.EnvironmentalHazard = EnvironmentalHazard;