class GameScene {
    constructor({canvas, overlay, level, phase, character}) {
        this.canvas = canvas;
        this.overlay = overlay;
        this.ctx = canvas.getContext('2d');
        this.level = level;
        this.phase = phase;
        this.character = character || 'martian';
        this.input = new window.InputManager();
        this.assetGen = new window.AssetGenerator();
        this.performance = new window.PerformanceManager();
        this.entities = [];
        this.projectiles = [];
        this.enemies = [];
        this.powerups = [];
        this.hazards = [];
        this.player = null;
        this.hud = null;
        this.avatar = null;
        this.phaseIndicator = null;
        this.state = 'play'; // play, pause, win, lose
        this.lastFrame = performance.now();
        // CHANGE: Make level bounds much wider for scrolling
        this.levelBounds = {left: 0, right: GameConfig.canvasWidth * 4, groundY: GameConfig.canvasHeight-30};
        this.spawnTimer = 0;
        this.cameraX = 0; // NEW: camera scroll position

        // --- PHASE TIMER/ENEMY COUNTER ---
        this.phaseDuration = 90; // seconds per phase (can adjust per phase/level)
        this.phaseTimeLeft = this.phaseDuration;
        this.phaseStartTime = performance.now();
        this.phaseTimerActive = true;
        this.phaseEnemyGoal = 30; // Number of enemies to defeat to complete phase (can adjust)
        this.phaseEnemiesDefeated = 0;
        this.phaseEnemiesSpawned = 0;

        // --- POWERUP MESSAGE ---
        this.powerupMessage = null; // {text, time, x, y}
        this.powerupMessageTimer = 0;

        // --- For progression ---
        if (!window.saveManager) window.saveManager = new window.SaveManager();
        this.saveManager = window.saveManager;

        this.init();
    }
    init() {
        if (this.character === 'martian') {
            this.player = new window.PlayerMartian(120, this.levelBounds.groundY-40);
        } else {
            this.player = new window.PlayerEarthling(120, this.levelBounds.groundY-40);
        }
        this.player.currency = 0; // Ensure currency starts at 0
        this.hud = new window.HUD(this.canvas, this.player, null, this.phase);
        this.avatar = new window.AvatarDisplay(this.character);
        this.phaseIndicator = new window.PhaseIndicator(this.level, this.phase);
        this.enemies = [];
        this.projectiles = [];
        this.powerups = [];
        this.hazards = [];
        // Spawn initial enemies
        for (let i = 0; i < 5; ++i) {
            this.spawnRandomEnemy();
        }
        this.phaseEnemiesSpawned = 5;
        this.loop();
    }
    spawnRandomEnemy() {
        // Spawn enemies somewhere in the world, not just the visible area
        const x = MathUtils.randRange(400, this.levelBounds.right-80);
        const y = this.levelBounds.groundY - (Math.random()>0.7?60:40);
        if (Math.random() < 0.22) {
            this.enemies.push(new window.OrkMech(x, y, -1));
        } else if (Math.random() < 0.7) {
            this.enemies.push(new window.OrkInfantry(x, y, -1));
        } else {
            this.enemies.push(new window.Enemy('ork', x, y, -1));
        }
        this.phaseEnemiesSpawned++;
    }
    // Helper: spawn a powerup at x, y of random type
    spawnRandomPowerup(x, y) {
        // 50% chance health, 50% energy, 10% chance currency (coin)
        const r = Math.random();
        if (r < 0.45) {
            this.powerups.push(new window.Powerup(x, y, "hp"));
        } else if (r < 0.9) {
            this.powerups.push(new window.Powerup(x, y, "energy"));
        } else {
            this.powerups.push(new window.Powerup(x, y, "currency"));
        }
    }
    // --- POWERUP MESSAGE: show a word bubble for powerup type ---
    showPowerupMessage(type, x, y) {
        let text = "";
        if (type === "hp") text = "Health!";
        else if (type === "energy") text = "Energy!";
        else if (type === "currency") text = "Salvage!";
        else text = "Powerup!";
        this.powerupMessage = {
            text,
            time: 1.4, // seconds to show
            x: this.player.x,
            y: this.player.y - 60 // above player
        };
        this.powerupMessageTimer = this.powerupMessage.time;
    }
    loop() {
        requestAnimationFrame(() => this.loop());
        const now = performance.now();
        const dt = MathUtils.clamp(now - this.lastFrame, 10, 60);
        this.lastFrame = now;
        this.performance.update();
        this.update(dt);
        this.render();
    }
    update(dt) {
        if (this.state !== 'play') return;

        // --- PHASE TIMER/ENEMY COUNTER LOGIC ---
        if (this.phaseTimerActive) {
            this.phaseTimeLeft -= dt / 1000;
            if (this.phaseTimeLeft < 0) this.phaseTimeLeft = 0;
        }

        // Player
        this.player.update(this.input, dt, this.levelBounds);
        // Player firing
        if (this.player.isFiring && this.player.canFire()) {
            const dir = this.player.facing;
            const px = this.player.x + dir * 32;
            const py = this.player.y - 10;
            this.projectiles.push(new window.Projectile(px, py, dir*GameConfig.projectileSpeed, 0, 'player', '#2cf'));
            this.player.fire();
        }
        // Enemies
        for (const e of this.enemies) {
            e.update(dt, this.player, this.levelBounds);
            if (e.shoot && Math.random()<0.5) {
                this.projectiles.push(new window.Projectile(e.x, e.y-10, -e.facing*GameConfig.enemyProjectileSpeed, 0, 'enemy', '#f24'));
                e.shoot = false;
            }
        }
        // Projectiles
        for (const p of this.projectiles) {
            p.update(dt);
            // Remove if out of bounds (relative to world, not just screen)
            if (p.x < 0 || p.x > this.levelBounds.right || p.y < 0 || p.y > this.canvas.height) p.dead = true;
        }
        // Powerups
        for (const pu of this.powerups) pu.update(dt);
        // Hazards
        for (const hz of this.hazards) hz.update(dt);
        // Collisions: player/enemy
        for (const e of this.enemies) {
            if (!e.dead && CollisionUtils.rectsOverlap(e.getRect(), this.player.getRect())) {
                this.player.hp -= 7;
                e.hp -= 10;
                if (this.player.hp <= 0) this.state = 'lose';
                if (e.hp <= 0) {
                    // --- Drop powerup on enemy death ---
                    if (Math.random() < 0.45) { // 45% chance to drop
                        this.spawnRandomPowerup(e.x, e.y - 18);
                    }
                    e.dead = true;
                    this.phaseEnemiesDefeated++;
                }
            }
        }
        // Projectiles vs. enemies
        for (const p of this.projectiles) {
            if (p.owner === 'player') {
                for (const e of this.enemies) {
                    if (!e.dead && CollisionUtils.rectsOverlap(p.getRect(), e.getRect())) {
                        p.dead = true;
                        e.hp -= 18;
                        if (e.hp <= 0) {
                            // --- Drop powerup on enemy death ---
                            if (Math.random() < 0.45) { // 45% chance to drop
                                this.spawnRandomPowerup(e.x, e.y - 18);
                            }
                            e.dead = true;
                            this.phaseEnemiesDefeated++;
                        }
                    }
                }
            } else if (p.owner === 'enemy') {
                if (CollisionUtils.rectsOverlap(p.getRect(), this.player.getRect())) {
                    p.dead = true;
                    this.player.hp -= 8;
                    if (this.player.hp <= 0) this.state = 'lose';
                }
            }
        }
        // Player vs. powerups
        for (const pu of this.powerups) {
            if (!pu.dead && CollisionUtils.rectsOverlap(pu.getRect(), this.player.getRect())) {
                pu.dead = true;
                if (pu.type === "hp") {
                    this.player.hp = Math.min(this.player.hp+30, GameConfig.playerStartHP);
                } else if (pu.type === "energy") {
                    this.player.energy = Math.min(this.player.energy+15, GameConfig.playerStartEnergy);
                } else if (pu.type === "currency") {
                    this.player.currency = (this.player.currency || 0) + 1;
                }
                // --- Show powerup message above player ---
                this.showPowerupMessage(pu.type, pu.x, pu.y);
            }
        }
        // Remove dead entities
        this.enemies = this.enemies.filter(e => !e.dead);
        this.projectiles = this.projectiles.filter(p => !p.dead);
        this.powerups = this.powerups.filter(pu => !pu.dead);
        // Spawn new enemies
        this.spawnTimer += dt/1000;
        // Only spawn if phase not complete
        if (
            this.spawnTimer > GameConfig.enemySpawnRate &&
            this.enemies.length < GameConfig.enemyMaxOnScreen &&
            (this.phaseEnemiesSpawned < this.phaseEnemyGoal)
        ) {
            this.spawnRandomEnemy();
            this.spawnTimer = 0;
        }
        // --- PHASE WIN/LOSE conditions ---
        if (this.player.hp <= 0) {
            this.state = 'lose';
            setTimeout(() => this.showGameOver(), 1100);
        }
        // Win if: (1) enemy goal reached AND all enemies cleared, OR (2) timer runs out (and all enemies cleared)
        if (
            (this.phaseEnemiesDefeated >= this.phaseEnemyGoal && this.enemies.length === 0) ||
            (this.phaseTimeLeft <= 0 && this.enemies.length === 0)
        ) {
            this.state = 'win';
            setTimeout(() => this.showVictory(), 900);
        }
        // HUD/UI
        this.hud.update(this.player, this.phase);
        this.avatar.setCharacter(this.character);
        this.phaseIndicator.update(this.level, this.phase);

        // CAMERA SCROLLING: Center camera on player, clamp to world bounds
        const halfW = this.canvas.width / 2;
        this.cameraX = MathUtils.clamp(this.player.x - halfW, 0, this.levelBounds.right - this.canvas.width);

        // --- POWERUP MESSAGE TIMER ---
        if (this.powerupMessage) {
            this.powerupMessageTimer -= dt / 1000;
            if (this.powerupMessageTimer <= 0) {
                this.powerupMessage = null;
            }
        }
    }
    render() {
        // Background
        this.assetGen.drawBackground(this.ctx, Date.now(), this.cameraX, this.levelBounds);

        // Hazards
        for (const hz of this.hazards) this.assetGen.drawEnvironmentalHazard(this.ctx, hz.x - this.cameraX, hz.y, hz.type);
        // Powerups
        for (const pu of this.powerups) this.assetGen.drawPowerup(this.ctx, pu.x - this.cameraX, pu.y, pu.type);
        // Enemies
        for (const e of this.enemies) {
            // Only draw if on screen
            if (e.x - this.cameraX < -100 || e.x - this.cameraX > this.canvas.width + 100) continue;
            if (e.type === 'orkmech') this.assetGen.drawOrkMech(this.ctx, e.x - this.cameraX, e.y, e.facing, e.animFrame);
            else if (e.type === 'orkinfantry') this.assetGen.drawOrkInfantry(this.ctx, e.x - this.cameraX, e.y, e.facing, e.animFrame);
            else if (e.type === 'boss') this.assetGen.drawBoss(this.ctx, e.x - this.cameraX, e.y, e.facing, e.animFrame);
            else this.assetGen.drawOrkInfantry(this.ctx, e.x - this.cameraX, e.y, e.facing, e.animFrame);
        }
        // Player
        if (this.player.type === 'martian') this.assetGen.drawPlayerMartian(this.ctx, this.player.x - this.cameraX, this.player.y, this.player.facing, this.player.animFrame);
        else this.assetGen.drawPlayerEarthling(this.ctx, this.player.x - this.cameraX, this.player.y, this.player.facing, this.player.animFrame);
        // Projectiles
        for (const p of this.projectiles) {
            // Only draw if on screen
            if (p.x - this.cameraX < -40 || p.x - this.cameraX > this.canvas.width + 40) continue;
            this.assetGen.drawProjectile(this.ctx, p.x - this.cameraX, p.y, p.color, p.radius);
        }
        // Ground
        this.ctx.save();
        this.ctx.fillStyle = "#313a47";
        this.ctx.shadowColor = "#89e5ef";
        this.ctx.shadowBlur = 10;
        this.ctx.fillRect(0, this.levelBounds.groundY, this.canvas.width, 40);
        this.ctx.restore();

        // --- PHASE TIMER/ENEMY COUNTER UI ---
        this.renderPhaseCounter();

        // --- POWERUP MESSAGE BUBBLE ---
        if (this.powerupMessage) {
            this.renderPowerupBubble();
        }

        // FPS
        this.ctx.font = "14px Segoe UI";
        this.ctx.fillStyle = "#ace";
        this.ctx.fillText("FPS: " + this.performance.getFPS(), 10, 16);
    }
    // --- Draw phase timer and enemy counter ---
    renderPhaseCounter() {
        // Draw top center
        const ctx = this.ctx;
        const w = this.canvas.width;
        ctx.save();
        // Timer
        let t = Math.ceil(this.phaseTimeLeft);
        let min = Math.floor(t/60), sec = t%60;
        let timeStr = `${min}:${sec.toString().padStart(2,'0')}`;
        // Enemy counter
        let enemyStr = `${this.phaseEnemiesDefeated}/${this.phaseEnemyGoal}`;
        // Draw background box
        ctx.globalAlpha = 0.86;
        ctx.fillStyle = "#18223a";
        ctx.strokeStyle = "#2cf";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(w/2-92, 18, 184, 36, 13);
        ctx.fill();
        ctx.stroke();
        ctx.globalAlpha = 1.0;
        // Draw text
        ctx.font = "bold 18px Segoe UI";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText(`Time Left: ${timeStr}   Enemies: ${enemyStr}`, w/2, 41);
        ctx.restore();
    }
    // --- Draw powerup word bubble above player ---
    renderPowerupBubble() {
        const ctx = this.ctx;
        const camX = this.cameraX;
        const px = this.player.x - camX;
        const py = this.player.y - 70;
        const msg = this.powerupMessage.text;
        ctx.save();
        // Bubble shape
        ctx.beginPath();
        ctx.ellipse(px, py, 56, 26, 0, 0, Math.PI*2);
        ctx.moveTo(px-10, py+26);
        ctx.lineTo(px-6, py+38);
        ctx.lineTo(px+8, py+26);
        ctx.closePath();
        ctx.fillStyle = "#fff";
        ctx.globalAlpha = 0.96;
        ctx.shadowColor = "#2cf";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = "#2cf";
        ctx.lineWidth = 2;
        ctx.stroke();
        // Text
        ctx.font = "bold 20px Segoe UI";
        ctx.fillStyle = "#1a2b3f";
        ctx.textAlign = "center";
        ctx.fillText(msg, px, py+7);
        ctx.restore();
    }
    showGameOver() {
        if (window.GameOverScene) {
            this.hud.destroy(); this.avatar.destroy(); this.phaseIndicator.destroy();
            window.gameOverScene = new window.GameOverScene({canvas:this.canvas, overlay:this.overlay, level:this.level, phase:this.phase, character:this.character});
            window.gameOverScene.start();
        }
    }
    showVictory() {
        if (window.VictoryScene) {
            this.hud.destroy(); this.avatar.destroy(); this.phaseIndicator.destroy();
            window.victoryScene = new window.VictoryScene({canvas:this.canvas, overlay:this.overlay, level:this.level, phase:this.phase, character:this.character});
            window.victoryScene.start();
        }
    }
}
window.GameScene = GameScene;