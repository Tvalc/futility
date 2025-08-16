class Player {
    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = 48;
        this.height = 60;
        this.facing = 1;
        this.hp = GameConfig.playerStartHP;
        this.energy = GameConfig.playerStartEnergy;
        this.speed = GameConfig.playerSpeed;
        this.jumpPower = GameConfig.playerJump;
        this.isJumping = false;
        this.isFiring = false;
        this.onGround = false;
        this.velX = 0;
        this.velY = 0;
        this.fireCooldown = 0;
        this.animFrame = 0;
        this.animTimer = 0;
        this.currency = 0; // NEW: Track collected currency
    }
    update(input, dt, levelBounds) {
        // Horizontal movement
        let move = 0;
        if (input.isKeyDown('ArrowLeft') || input.isKeyDown('KeyA')) move -= 1;
        if (input.isKeyDown('ArrowRight') || input.isKeyDown('KeyD')) move += 1;
        if (move !== 0) this.facing = move;
        this.velX = move * this.speed;
        // Jumping
        if ((input.isKeyDown('ArrowUp') || input.isKeyDown('KeyW') || input.isKeyDown('Space')) && this.onGround) {
            this.isJumping = true;
            this.onGround = false;
            this.velY = -this.jumpPower;
        }
        // Gravity
        this.velY += GameConfig.gravity;
        // Clamp to level ground
        if (this.y + this.height / 2 + this.velY > levelBounds.groundY) {
            this.y = levelBounds.groundY - this.height / 2;
            this.velY = 0;
            this.onGround = true;
        } else {
            this.y += this.velY;
            this.onGround = false;
        }
        this.x += this.velX;
        // Clamp to level bounds
        this.x = MathUtils.clamp(this.x, levelBounds.left + this.width / 2, levelBounds.right - this.width / 2);
        // Firing
        // CHANGE: Spacebar is jump only, 'KeyJ' and 'KeyK' are attack
        this.isFiring = input.isKeyDown('KeyK') || input.isKeyDown('KeyJ');
        this.fireCooldown = Math.max(0, this.fireCooldown - dt);
        // Animation
        this.animTimer += dt;
        if (this.animTimer > 90) {
            this.animFrame = (this.animFrame + 1) % 4;
            this.animTimer = 0;
        }
    }
    canFire() {
        return this.fireCooldown <= 0;
    }
    fire() {
        this.fireCooldown = 260;
    }
    getRect() {
        return {x: this.x - this.width/2, y: this.y - this.height/2, width: this.width, height: this.height};
    }
}
window.Player = Player;