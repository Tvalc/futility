class OrkMech extends Enemy {
    constructor(x, y, facing=1) {
        super('orkmech', x, y, facing);
        this.hp = 120;
        this.width = 64;
        this.height = 80;
        this.speed = 1.4;
    }
    update(dt, player, levelBounds) {
        super.update(dt, player, levelBounds);
        // Mechs sometimes shoot at player
        if (Math.abs(this.x - player.x) < 320 && Math.random() < 0.009) {
            this.shoot = true;
        } else {
            this.shoot = false;
        }
    }
}
window.OrkMech = OrkMech;