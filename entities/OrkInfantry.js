class OrkInfantry extends Enemy {
    constructor(x, y, facing=1) {
        super('orkinfantry', x, y, facing);
        this.hp = 32;
        this.width = 28;
        this.height = 34;
        this.speed = 2.5;
    }
    update(dt, player, levelBounds) {
        super.update(dt, player, levelBounds);
        // Infantry do not shoot, but jump randomly
        if (Math.random() < 0.003) {
            this.y -= 20 + Math.random()*10;
        }
    }
}
window.OrkInfantry = OrkInfantry;