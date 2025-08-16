class PlayerMartian extends Player {
    constructor(x, y) {
        super('martian', x, y);
        this.specialReady = true;
        this.specialCooldown = 0;
    }
    update(input, dt, levelBounds) {
        super.update(input, dt, levelBounds);
        // Special: Shield pulse (press 'L')
        if (input.isKeyDown('KeyL') && this.specialReady) {
            this.specialReady = false;
            this.specialCooldown = 3000;
            this.energy -= 18;
        }
        if (!this.specialReady) {
            this.specialCooldown -= dt;
            if (this.specialCooldown <= 0) this.specialReady = true;
        }
    }
}
window.PlayerMartian = PlayerMartian;