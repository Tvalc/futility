class Projectile {
    constructor(x, y, dx, dy, owner, color, radius=8) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.owner = owner;
        this.color = color;
        this.radius = radius;
        this.dead = false;
    }
    update(dt) {
        this.x += this.dx * dt / 16.6;
        this.y += this.dy * dt / 16.6;
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
window.Projectile = Projectile;