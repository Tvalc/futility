class Powerup {
    constructor(x, y, type="hp") {
        this.x = x;
        this.y = y;
        this.type = type;
        this.radius = 16;
        this.dead = false;
        this._floatBase = y;
        this._floatPhase = Math.random() * Math.PI * 2;
        this._spawnTime = Date.now();
        // If temporary, set a lifetime (for powerups dropped by enemies)
        if (type === "hp" || type === "energy" || type === "currency") {
            this.lifetime = 8000; // 8 seconds
        } else {
            this.lifetime = 6000; // fallback
        }
    }
    update(dt) {
        // Bobbing animation
        this.y = this._floatBase + Math.sin((Date.now()/440) + this._floatPhase) * 3;
        // Lifetime countdown
        if (this.lifetime !== undefined) {
            this.lifetime -= dt;
            if (this.lifetime <= 0) this.dead = true;
        }
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
window.Powerup = Powerup;