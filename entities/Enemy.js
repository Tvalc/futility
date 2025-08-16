class Enemy {
    constructor(type, x, y, facing=1) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.facing = facing;
        this.hp = 40;
        this.width = 38;
        this.height = 44;
        this.speed = 1.8;
        this.animFrame = 0;
        this.animTimer = 0;
        this.dead = false;
    }
    update(dt, player, levelBounds) {
        // Basic AI: move toward player if in range
        const dx = player.x - this.x;
        this.facing = dx > 0 ? 1 : -1;
        this.x += this.speed * this.facing;
        // Clamp to level bounds
        this.x = MathUtils.clamp(this.x, levelBounds.left + this.width / 2, levelBounds.right - this.width / 2);
        // Animation
        this.animTimer += dt;
        if (this.animTimer > 100) {
            this.animFrame = (this.animFrame + 1) % 4;
            this.animTimer = 0;
        }
    }
    getRect() {
        return {x: this.x - this.width/2, y: this.y - this.height/2, width: this.width, height: this.height};
    }
}
window.Enemy = Enemy;