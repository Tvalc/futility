class PlayerEarthling extends Player {
    constructor(x, y) {
        super('earthling', x, y);
        this.specialReady = true;
        this.specialCooldown = 0;
    }
    update(input, dt, levelBounds) {
        super.update(input, dt, levelBounds);
        // Special: Dash (press 'L')
        if (input.isKeyDown('KeyL') && this.specialReady) {
            this.specialReady = false;
            this.specialCooldown = 1600;
            this.energy -= 15;
            this.x += this.facing * 48; // Quick dash
        }
        if (!this.specialReady) {
            this.specialCooldown -= dt;
            if (this.specialCooldown <= 0) this.specialReady = true;
        }
    }
}
window.PlayerEarthling = PlayerEarthling;