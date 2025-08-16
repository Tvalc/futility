# Technical Specification

## Description
Architecture, performance, and platform requirements

## Content
```markdown
# TECHNICAL SPECIFICATION DOCUMENT

## Game Title:  
**Solar Siege: Ork Onslaught**

## Asset Policy:  
**DO NOT USE EXTERNAL ASSETS UNLESS THEY ARE EXPLICITLY PROVIDED BY THE USER, OTHERWISE DRAW ASSETS AS HIGH-FIDELITY AND LOVINGLY CRAFTED AS YOU CAN WITH CSS AND HTML ONLY**

---

## 1. OVERVIEW

This specification details the technical implementation plan for **Solar Siege: Ork Onslaught** under a no-external-assets policy. All in-game graphics, UI, and effects must be generated programmatically using HTML5, CSS3, and JavaScript (with Phaser.js 3.90.0 as primary engine). No third-party images, fonts, or audio may be loaded unless provided by the user at runtime.

This document covers rendering strategy, Phaser.js architecture, browser optimization, asset generation, input handling, responsive design, and performance constraints as required by the Snib platform.

---

## 2. RENDERING & ASSET GENERATION

### 2.1. Visual Asset Generation

**All sprites, background art, and UI elements must be generated at runtime:**
- Use Phaser’s `Graphics` API for drawing shapes, fills, gradients, lines, polygons, circles, and custom paths to produce characters, enemies, projectiles, powerups, ships, and environmental assets.
- Generate textures dynamically and cache them via Phaser’s `generateTexture` methods for performance.
- For high-fidelity or complex scenes, compose multiple layered graphics with gradients, shadows, and outlines.
- Use CSS3 for UI components (menus, dialogs, HUD overlays) with Flexbox/Grid for adaptive layout and CSS transitions/animations for polish.
- Decorative backgrounds can be created with layered gradients, parallax patterns, and repeated procedural elements (e.g., stars, nebulae, planetary rings).

**Examples:**
- Player/Enemy Sprites: Use vector paths to create silhouettes and color regions (e.g., Martian armor, ship hulls, Ork mechs) with highlights and shadow gradients.
- Projectiles/FX: Draw with radial/linear gradients, alpha fades, and animated scaling.
- Powerups/Currency: Use emblematic shapes (e.g., coins as circles with borders and highlights).
- Bosses: Compose from modular geometric parts for animation flexibility.

### 2.2. Animation

- Use Phaser’s `Tween` system for smooth movement, scaling, rotation, and color transitions.
- Animate sprites by modifying Graphics parameters per frame (e.g., changing arc, color, or position for “bobbing” effects).
- For more complex animation, use generated sprite sheets (via Graphics → RenderTexture) and animate via Phaser’s Animation Manager.

### 2.3. Audio

- No audio unless user uploads or specifies tracks; otherwise, use Phaser’s sound API but play only silence or procedural sounds (if permitted by Snib platform).
- If procedural sound is allowed, generate effects using Web Audio API (e.g., oscillator-based laser shots, explosions via filtered noise).

---

## 3. PHASER.JS ARCHITECTURE

### 3.1. Game Structure

- **Scenes:**  
  - `BootScene`: Prepares game, checks browser features.
  - `MenuScene`: Main menu UI, character selection, settings.
  - `CutsceneScene`: Comic panel and dialog delivery.
  - `PhaseScene`: Handles each gameplay phase (Shooter, Runner, Space Shooter) with modular logic.
  - `UpgradeScene`: Upgrade tree, currency spend, stat display.
  - `UIScene`: Persistent overlay (HUD, score, pause, dialogue).

- Use modular scene classes to enable code reuse and hot-swapping for phase changes.

### 3.2. Entity Management

- **Game Objects:**  
  - All entities (player, enemies, powerups, projectiles) are Phaser GameObjects with a reference to a procedurally generated texture or dynamic Graphics object.
  - Use object pools for high-frequency entities (bullets, enemies, FX) to minimize garbage collection and re-allocation.

- **State Management:**  
  - Use a global state store (singleton or Phaser Plugin) for player stats, upgrades, currency, progression.
  - Use `localStorage` for save data; compress payload to fit within 5-10MB quota.

### 3.3. Performance Patterns

- **Draw Calls:** Pre-render as much as possible to RenderTextures; avoid per-frame re-drawing of static elements.
- **Object Pooling:** Pool all high-churn objects (bullets, enemies, coins, powerups) to reduce memory allocation.
- **Collision:** Use simple bounding box/circle checks; batch collision checks per group to minimize performance cost.
- **Update Loops:** Minimize per-frame logic; use Phaser’s built-in step system and only run logic for visible/active objects.

---

## 4. RESPONSIVE & ACCESSIBLE DESIGN

### 4.1. Layout & UI

- All menus and overlays are built with HTML/CSS (DOM overlays) where possible, styled for scalability and touch input.
- Use CSS Grid/Flexbox for layouts that adapt to desktop, tablet, and mobile screen sizes.
- In-game HUD is sized and positioned relative to viewport; use media queries to adjust font/icon size.
- On-screen controls (for touch) are large, visually distinct, and placed to avoid overlap with gameplay.

### 4.2. Input Handling

- **Keyboard:** Support WASD/arrow keys, spacebar, and configurable keys for actions.
- **Mouse:** Click/tap for actions, drag for movement (runner/space modes).
- **Touch:** On-screen semi-transparent buttons, gesture support for movement/boost.
- Input areas use event listeners with pointer down/up/cancel logic; adjust hitboxes for fat-finger tolerance.

### 4.3. Accessibility

- Provide clear visual feedback for focus, selection, and actions.
- Use color + shape contrast for all UI elements to support colorblind accessibility.
- Ensure all actions are accessible by keyboard and touch.

---

## 5. PERFORMANCE & OPTIMIZATION

### 5.1. Loading

- Pre-generate and cache all required textures on game boot (or per phase) to avoid runtime cost during gameplay.
- Lazy-load menu/cutscene UI assets as needed.
- Use compact data storage for saves (compress JSON, only store diffs vs. defaults).

### 5.2. Rendering

- Limit number of simultaneous moving entities to maintain 60 FPS on mid-range mobiles.
- Use RenderTexture for static backgrounds (e.g., parallax starfields) to minimize draw calls.
- Avoid overdraw by culling offscreen entities and effects.

### 5.3. Memory

- Monitor texture and object pool sizes; free/destroy unused objects and textures between phases.
- Total runtime memory, including graphics buffers, must not exceed 500MB.

---

## 6. BROWSER COMPATIBILITY

- Test and confirm support for Chrome 90+, Firefox 88+, Safari 14+, Edge 90+.
- All code must degrade gracefully if a required feature is missing (show error/upgrade browser message).
- Input, rendering, and audio must work on both desktop and mobile browsers, with layout adapting via media queries.

---

## 7. DEPLOYMENT & PLATFORM CONSTRAINTS

- Game is deployed as a static web bundle, loaded via Snib CDN.
- No server-side code or APIs; all logic runs client-side.
- All resources are generated at runtime or provided by the user.
- No offline mode; no service workers.
- Obey CORS: do not attempt to load any external resources.
- All persistent data must fit within browser localStorage constraints.

---

## 8. EXAMPLES & TEMPLATES

### 8.1. Phaser Graphics Example: Player Ship

```js
const graphics = scene.add.graphics();
graphics.fillStyle(0x2eccff, 1);
graphics.beginPath();
graphics.moveTo(0, 20);
graphics.lineTo(20, 0);
graphics.lineTo(40, 20);
graphics.lineTo(20, 60);
graphics.closePath();
graphics.fillPath();
graphics.generateTexture('playerShip', 40, 60);
graphics.destroy();
```
*Creates a stylized, high-fidelity ship shape with color fills.*

### 8.2. CSS UI Example: Responsive Button

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 2vw;
  padding: 1em 2em;
  border-radius: 2em;
  background: linear-gradient(90deg, #2eccff, #6e44ff);
  color: #fff;
  box-shadow: 0 0.25em 0.5em rgba(0,0,0,0.25);
  transition: background 0.3s;
}
.button:active {
  background: linear-gradient(90deg, #6e44ff, #2eccff);
}
```

---

## 9. OPEN QUESTIONS

- **Procedural Audio:** Is use of Web Audio API for synthetic sound effects permitted if no file assets are used?
- **User Asset Injection:** If the user provides an asset at runtime, does it need further processing/sanitization?
- **Cutscene Art:** Should comic panels be pure vector/shape art, or is limited procedural compositing (via code) allowed?

---

## 10. SUMMARY CHECKLIST

- [x] Phaser.js 3.90.0 only; no prohibited engines.
- [x] All assets generated via code (Graphics/CSS/HTML); **no external art** unless user-provided.
- [x] Responsive, accessible UI/UX.
- [x] Performance meets 60 FPS, low memory, fast load guidelines.
- [x] Input parity (touch, mouse, keyboard).
- [x] Browser compatibility and Snib deployment compliance.
- [x] Save/progress via localStorage within size limits.
- [x] Modular scene/entity design for maintainability.

---

*This technical specification ensures Solar Siege: Ork Onslaught delivers a visually rich, responsive, and high-performance browser game experience—without reliance on external assets—fully aligned with Snib platform requirements and the game vision.*
```


---
*Generated on 8/15/2025*
