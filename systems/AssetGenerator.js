class AssetGenerator {
    constructor() {}
    drawPlayerMartian(ctx, x, y, facing, frame) {
        // Draw stylized Martian hero: angular helmet, glowing eyes, gradient armor
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(facing, 1);
        // Helmet
        ctx.beginPath();
        ctx.moveTo(0, -32);
        ctx.lineTo(24, 0);
        ctx.lineTo(10, 38);
        ctx.lineTo(-10, 38);
        ctx.lineTo(-24, 0);
        ctx.closePath();
        let helmetGrad = ctx.createLinearGradient(-24, -32, 24, 38);
        helmetGrad.addColorStop(0, '#4ffcff');
        helmetGrad.addColorStop(1, '#0a1f2a');
        ctx.fillStyle = helmetGrad;
        ctx.shadowColor = "#33e0ff";
        ctx.shadowBlur = 9;
        ctx.fill();
        ctx.shadowBlur = 0;
        // Visor
        ctx.beginPath();
        ctx.ellipse(0, 3, 14, 11, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#92f4ffbb';
        ctx.fill();
        // Eyes
        ctx.beginPath();
        ctx.ellipse(-5, 3, 2, 4, 0, 0, Math.PI*2);
        ctx.ellipse(5, 3, 2, 4, 0, 0, Math.PI*2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        // Body armor
        ctx.beginPath();
        ctx.moveTo(-14, 12);
        ctx.lineTo(14, 12);
        ctx.lineTo(18, 38);
        ctx.lineTo(-18, 38);
        ctx.closePath();
        let bodyGrad = ctx.createLinearGradient(-18, 12, 18, 38);
        bodyGrad.addColorStop(0, "#2cffe6");
        bodyGrad.addColorStop(1, "#0a1a1f");
        ctx.fillStyle = bodyGrad;
        ctx.fill();
        ctx.restore();
    }
    drawPlayerEarthling(ctx, x, y, facing, frame) {
        // Draw stylized Earthling hero: round helmet, orange accents, glow
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(facing, 1);
        // Helmet
        ctx.beginPath();
        ctx.arc(0, -18, 28, Math.PI*2, 0);
        let helmetGrad = ctx.createRadialGradient(0, -22, 10, 0, -18, 28);
        helmetGrad.addColorStop(0, "#fff9c6");
        helmetGrad.addColorStop(0.7, "#ffb940");
        helmetGrad.addColorStop(1, "#493c10");
        ctx.fillStyle = helmetGrad;
        ctx.shadowColor = "#ffe763";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
        // Visor
        ctx.beginPath();
        ctx.ellipse(0, -16, 14, 12, 0, 0, Math.PI*2);
        ctx.fillStyle = "#fffbe6bb";
        ctx.fill();
        // Eyes
        ctx.beginPath();
        ctx.ellipse(-5, -16, 2, 3, 0, 0, Math.PI*2);
        ctx.ellipse(5, -16, 2, 3, 0, 0, Math.PI*2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        // Armor
        ctx.beginPath();
        ctx.moveTo(-16, 5);
        ctx.lineTo(16, 5);
        ctx.lineTo(22, 32);
        ctx.lineTo(-22, 32);
        ctx.closePath();
        let bodyGrad = ctx.createLinearGradient(-22, 5, 22, 32);
        bodyGrad.addColorStop(0, '#ffe763');
        bodyGrad.addColorStop(1, '#cfa646');
        ctx.fillStyle = bodyGrad;
        ctx.fill();
        ctx.restore();
    }
    drawOrkMech(ctx, x, y, facing, frame) {
        // Large, spiky green robot with red glowing eyes
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(facing, 1);
        // Body
        ctx.beginPath();
        ctx.moveTo(-30, 0);
        ctx.lineTo(30, 0);
        ctx.lineTo(22, 38);
        ctx.lineTo(-22, 38);
        ctx.closePath();
        let bodyGrad = ctx.createLinearGradient(-30, 0, 30, 38);
        bodyGrad.addColorStop(0, "#23d839");
        bodyGrad.addColorStop(1, "#0e2d1c");
        ctx.fillStyle = bodyGrad;
        ctx.shadowColor = "#38ff3d";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        // Head
        ctx.beginPath();
        ctx.arc(0, -18, 18, 0, Math.PI*2);
        ctx.fillStyle = "#1ad03a";
        ctx.fill();
        // Eyes
        ctx.beginPath();
        ctx.ellipse(-7, -16, 4, 6, 0, 0, Math.PI*2);
        ctx.ellipse(7, -16, 4, 6, 0, 0, Math.PI*2);
        ctx.fillStyle = "#f00";
        ctx.shadowColor = "#f00";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
        // Spikes
        ctx.strokeStyle = '#149c26';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i < 8; ++i) {
            let a = Math.PI * 2 * i / 8;
            ctx.moveTo(Math.cos(a)*18, -18+Math.sin(a)*18);
            ctx.lineTo(Math.cos(a)*28, -18+Math.sin(a)*28);
        }
        ctx.stroke();
        ctx.restore();
    }
    drawOrkInfantry(ctx, x, y, facing, frame) {
        // Small, round greenish Ork infantry with spike helmet
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(facing, 1);
        // Body
        ctx.beginPath();
        ctx.arc(0, 10, 13, 0, Math.PI*2);
        ctx.fillStyle = '#79ff7a';
        ctx.shadowColor = "#44ff77";
        ctx.shadowBlur = 7;
        ctx.fill();
        ctx.shadowBlur = 0;
        // Helmet
        ctx.beginPath();
        ctx.arc(0, -2, 12, Math.PI, 0);
        ctx.fillStyle = '#146b1a';
        ctx.fill();
        // Spike
        ctx.beginPath();
        ctx.moveTo(0, -13);
        ctx.lineTo(4, -22);
        ctx.lineTo(-4, -22);
        ctx.closePath();
        ctx.fillStyle = '#d7f7a8';
        ctx.fill();
        ctx.restore();
    }
    drawBoss(ctx, x, y, facing, frame) {
        // Massive Ork boss: jagged, armored, glowing eyes
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(facing, 1);
        // Body
        ctx.beginPath();
        ctx.moveTo(-60, 0);
        ctx.lineTo(60, 0);
        ctx.lineTo(50, 80);
        ctx.lineTo(-50, 80);
        ctx.closePath();
        let bodyGrad = ctx.createLinearGradient(-60, 0, 60, 80);
        bodyGrad.addColorStop(0, "#2cff43");
        bodyGrad.addColorStop(1, "#12401b");
        ctx.fillStyle = bodyGrad;
        ctx.shadowColor = "#6eff85";
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
        // Head
        ctx.beginPath();
        ctx.arc(0, -30, 42, 0, Math.PI*2);
        ctx.fillStyle = "#1cf04d";
        ctx.fill();
        // Eyes
        ctx.beginPath();
        ctx.ellipse(-18, -25, 8, 11, 0, 0, Math.PI*2);
        ctx.ellipse(18, -25, 8, 11, 0, 0, Math.PI*2);
        ctx.fillStyle = "#fff000";
        ctx.shadowColor = "#fff000";
        ctx.shadowBlur = 30;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
    }
    drawProjectile(ctx, x, y, color, radius) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2);
        let grad = ctx.createRadialGradient(x, y, 1, x, y, radius);
        grad.addColorStop(0, "#fff");
        grad.addColorStop(0.5, color);
        grad.addColorStop(1, "#0000");
        ctx.fillStyle = grad;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.globalAlpha = 0.92;
        ctx.fill();
        ctx.restore();
    }
    drawPowerup(ctx, x, y, type) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Date.now()/500 % (Math.PI*2));
        ctx.beginPath();
        for (let i = 0; i < 8; ++i) {
            let angle = Math.PI * 2 * i / 8;
            let r = (i%2===0) ? 12 : 7;
            ctx.lineTo(Math.cos(angle)*r, Math.sin(angle)*r);
        }
        ctx.closePath();
        ctx.fillStyle = type === "hp" ? "#ff4646" : "#2bffd8";
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 0.88;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
        ctx.restore();
    }
    drawEnvironmentalHazard(ctx, x, y, type) {
        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI*2);
        ctx.fillStyle = "#f9e63b";
        ctx.shadowColor = "#f9e63b";
        ctx.shadowBlur = 18;
        ctx.globalAlpha = 0.75;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
        ctx.restore();
    }
    // --- NEW drawBackground for barren planet with tents/domes and parallax mountains, scrollX ---
    drawBackground(ctx, time, scrollX = 0, levelBounds = {left:0,right:800}) {
        // Parameters
        const w = ctx.canvas.width, h = ctx.canvas.height;
        // Sky gradient
        let grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, "#2b2738");
        grad.addColorStop(0.4, "#4c3c4a");
        grad.addColorStop(1, "#5d4e3b");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Parallax mountains (far)
        ctx.save();
        let farOffset = -((scrollX * 0.18) % w);
        ctx.globalAlpha = 0.38;
        ctx.fillStyle = "#3b2f44";
        for (let i = -1; i < 3; ++i) {
            ctx.beginPath();
            ctx.moveTo(farOffset + i*w, h*0.60);
            ctx.lineTo(farOffset + i*w + w*0.18, h*0.54);
            ctx.lineTo(farOffset + i*w + w*0.33, h*0.62);
            ctx.lineTo(farOffset + i*w + w*0.5, h*0.52);
            ctx.lineTo(farOffset + i*w + w*0.7, h*0.67);
            ctx.lineTo(farOffset + i*w + w*0.9, h*0.60);
            ctx.lineTo(farOffset + i*w + w, h*0.65);
            ctx.lineTo(farOffset + i*w + w, h);
            ctx.lineTo(farOffset + i*w, h);
            ctx.closePath();
            ctx.fill();
        }
        ctx.globalAlpha = 1.0;
        ctx.restore();

        // Parallax mountains (near)
        ctx.save();
        let nearOffset = -((scrollX * 0.36) % w);
        ctx.globalAlpha = 0.55;
        ctx.fillStyle = "#5c4152";
        for (let i = -1; i < 3; ++i) {
            ctx.beginPath();
            ctx.moveTo(nearOffset + i*w, h*0.72);
            ctx.lineTo(nearOffset + i*w + w*0.12, h*0.68);
            ctx.lineTo(nearOffset + i*w + w*0.28, h*0.77);
            ctx.lineTo(nearOffset + i*w + w*0.4, h*0.69);
            ctx.lineTo(nearOffset + i*w + w*0.6, h*0.81);
            ctx.lineTo(nearOffset + i*w + w*0.8, h*0.76);
            ctx.lineTo(nearOffset + i*w + w, h*0.80);
            ctx.lineTo(nearOffset + i*w + w, h);
            ctx.lineTo(nearOffset + i*w, h);
            ctx.closePath();
            ctx.fill();
        }
        ctx.globalAlpha = 1.0;
        ctx.restore();

        // Rocky barren ground (parallax)
        ctx.save();
        let groundOffset = -((scrollX * 0.7) % w);
        ctx.fillStyle = "#7c6b4e";
        for (let i = -1; i < 3; ++i) {
            ctx.beginPath();
            ctx.moveTo(groundOffset + i*w, h*0.88);
            ctx.lineTo(groundOffset + i*w + w*0.08, h*0.86);
            ctx.lineTo(groundOffset + i*w + w*0.18, h*0.89);
            ctx.lineTo(groundOffset + i*w + w*0.32, h*0.87);
            ctx.lineTo(groundOffset + i*w + w*0.45, h*0.91);
            ctx.lineTo(groundOffset + i*w + w*0.62, h*0.89);
            ctx.lineTo(groundOffset + i*w + w*0.75, h*0.93);
            ctx.lineTo(groundOffset + i*w + w, h*0.92);
            ctx.lineTo(groundOffset + i*w + w, h);
            ctx.lineTo(groundOffset + i*w, h);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();

        // TENTS/DOMES: Glass domes over rocky stretches, distributed along the ground
        ctx.save();
        // World coordinates for domes
        let worldW = levelBounds.right;
        let domeSpacing = 340;
        let domeCount = Math.ceil(worldW / domeSpacing) + 2;
        let baseY = h * 0.88;
        for (let i = -1; i < domeCount; ++i) {
            let domeWorldX = i * domeSpacing + 180;
            let domeScreenX = domeWorldX - scrollX;
            if (domeScreenX < -120 || domeScreenX > w + 120) continue;
            // Dome base
            ctx.save();
            ctx.translate(domeScreenX, baseY);
            // Glass dome
            ctx.beginPath();
            ctx.ellipse(0, 0, 62, 34, 0, Math.PI, 0, true);
            let glassGrad = ctx.createRadialGradient(0, -12, 8, 0, 0, 62);
            glassGrad.addColorStop(0, "#c7f6ffcc");
            glassGrad.addColorStop(0.5, "#7fd7e7bb");
            glassGrad.addColorStop(1, "#bcecff22");
            ctx.fillStyle = glassGrad;
            ctx.globalAlpha = 0.93;
            ctx.fill();
            ctx.globalAlpha = 1.0;
            // Dome highlight
            ctx.beginPath();
            ctx.ellipse(-20, -15, 16, 8, Math.PI/7, 0, Math.PI*2);
            ctx.fillStyle = "#fff9";
            ctx.globalAlpha = 0.5;
            ctx.fill();
            ctx.globalAlpha = 1.0;
            // Dome base ring
            ctx.beginPath();
            ctx.ellipse(0, 8, 62, 12, 0, 0, Math.PI*2);
            ctx.fillStyle = "#b9b7b3";
            ctx.globalAlpha = 0.8;
            ctx.fill();
            ctx.globalAlpha = 1.0;
            // Dome shadow
            ctx.beginPath();
            ctx.ellipse(0, 18, 58, 8, 0, 0, Math.PI*2);
            ctx.fillStyle = "#0003";
            ctx.fill();
            // Tent entrance (rectangle)
            ctx.beginPath();
            ctx.rect(-10, 10, 20, 18);
            ctx.fillStyle = "#3b2f2d";
            ctx.globalAlpha = 0.85;
            ctx.fill();
            ctx.globalAlpha = 1.0;
            // Tent flags or antenna
            ctx.beginPath();
            ctx.moveTo(0, -32);
            ctx.lineTo(0, -54);
            ctx.strokeStyle = "#b0e6ff";
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, -56, 4, 0, Math.PI*2);
            ctx.fillStyle = "#fff";
            ctx.globalAlpha = 0.7;
            ctx.fill();
            ctx.globalAlpha = 1.0;
            ctx.restore();
        }
        ctx.restore();

        // Occasional rocks and debris (foreground)
        ctx.save();
        let rockSpacing = 120;
        let rockCount = Math.ceil(w / rockSpacing) + 2;
        for (let i = -1; i < rockCount; ++i) {
            let rx = ((i * rockSpacing + (scrollX * 0.9)) % w);
            let ry = h * 0.93 + Math.sin(i + time/900) * 4;
            ctx.save();
            ctx.translate(rx, ry);
            ctx.rotate((i*13 + time/3000) % Math.PI/7);
            ctx.beginPath();
            ctx.ellipse(0, 0, 18 + (i%3)*4, 8 + (i%2)*2, 0, 0, Math.PI*2);
            ctx.fillStyle = (i%2===0) ? "#7b6d55" : "#a89b7e";
            ctx.globalAlpha = 0.82;
            ctx.fill();
            ctx.globalAlpha = 1.0;
            ctx.restore();
        }
        ctx.restore();

        // Stars (faint, high up)
        ctx.save();
        for (let i = 0; i < 40; ++i) {
            let sx = ((i*97 + Math.sin(time/2300+i)*w*2) % w);
            let sy = ((i*41 + Math.cos(time/1100+i)*h*1.2) % (h*0.38));
            let r = 0.6 + ((i%4)/5) + Math.abs(Math.sin(time/600+i));
            ctx.beginPath();
            ctx.arc(sx, sy, r, 0, Math.PI*2);
            ctx.globalAlpha = 0.18 + 0.5 * Math.abs(Math.sin(time/800+i));
            ctx.fillStyle = "#fff";
            ctx.fill();
        }
        ctx.globalAlpha = 1.0;
        ctx.restore();
    }
}
window.AssetGenerator = AssetGenerator;