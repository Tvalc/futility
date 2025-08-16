class Boss extends window.Enemy {
    constructor(x, y) {
        super('boss', x, y, 1);
        this.hp = 450;
        this.width = 120;
        this.height = 170;
        this.phase = 1;
        this.timer = 0;
    }
    update(dt, player, levelBounds) {
        this.timer += dt;
        // Boss AI: pattern: move, stop, shoot, jump
        if (this.timer < 1200) {
            this.x += this.facing * 2.2;
        } else if (this.timer < 2000) {
            // Shoot barrage
            this.shoot = true;
        } else if (this.timer < 2300) {
            // Jump
            this.y -= 22 * Math.random();
        } else {
            this.timer = 0;
            this.shoot = false;
        }
        // Clamp
        this.x = MathUtils.clamp(this.x, levelBounds.left + this.width / 2, levelBounds.right - this.width / 2);
    }
}
window.Boss = Boss;