# Character Design Document

## Description
Character profiles, abilities, and backstories

## Content
```markdown
# CHARACTER DESIGN DOCUMENT

## Game Title:  
**Solar Siege: Ork Onslaught**

---

## 1. INTRODUCTION

This document defines the two primary player characters for Solar Siege: Ork Onslaught, detailing their visual design, stats, unique abilities, upgrade trees, narrative function, and gameplay integration for web-based implementation using Phaser.js. The designs prioritize clarity, efficient asset use, and mobile/web responsiveness as required by the Snib AI Game Platform.

---

## 2. CHARACTER OVERVIEW

Solar Siege: Ork Onslaught features two protagonists, each offering distinct playstyles, narrative perspectives, and upgrade options. After initial levels, players can select either character per phase, incentivizing replay and narrative discovery.

| Name              | Origin       | Role                  | Starting Level | Gameplay Focus      |
|-------------------|-------------|-----------------------|----------------|--------------------|
| Captain Haze Bloom| Mars        | Martian Marine        | Mercury        | Balanced Combat    |
| Aykcuf Dubay      | Earth       | Ace Pilot/Commando    | Earth          | Agility & Tech     |

---

## 3. CHARACTER PROFILES

### 3.1. Captain Haze Bloom

**Visual Design**
- **Sprite Style:** 2D pixel art/HD sprite, 128x128px base, WebP/PNG format; SVG for UI avatars.
- **Color Palette:** Martian reds, deep oranges, charcoal, metallic blue accents.
- **Key Features:** Bulky Martian armor (rounded shoulders, glowing blue visor), rugged facial features, plasma rifle held at ready.
- **Animation States:** Idle (breathing), run, jump, shoot (standing/crouching), hit, death, special ability activation.
- **Accessibility:** High-contrast outline for visibility on varied backgrounds.

**Personality**
- Stoic, resourceful, dry wit; natural leader with a survivor’s edge.
- Dialogue Example: "If it breathes, I can stop it. If it doesn't, I'll improvise."

**Narrative Function**
- Drives the Martian refugee storyline, introduces early game mechanics.
- Acts as player’s initial tutorial guide (Mercury), provides lore on Ork invasion and Martian tech.
- Interacts with Aykcuf as a foil—pragmatic vs. brash.

**Gameplay Role**
- **Phases:** Available in all three phase types; "default" for Mercury and Martian levels.
- **Stat Focus:** Balanced health, moderate speed, medium firepower.
- **Specialization:** Versatile upgrades—armor, plasma weapons, battlefield gadgets.

**Base Stats** (Phase-dependent, defaults shown for Side-Scrolling Shooter)
| Stat          | Value      | Notes                           |
|---------------|------------|---------------------------------|
| Health        | 100        | Can be increased via upgrades   |
| Movement Speed| 200 px/sec | Medium baseline                 |
| Jump Height   | 2.5 tiles  | Responsive, not floaty          |
| Weapon Damage | 10         | Plasma Rifle, upgradable        |
| Fire Rate     | 250ms/shot | Moderate, upgradable            |
| Shield        | 25         | Rechargeable, upgradable        |

**Core Abilities**
- **Plasma Rifle:** Standard semi-auto, short charge for double damage.
- **Martian Armor:** Passive 10% damage reduction, upgradable.
- **Gadget Slot:** Equip one unique tech (see Upgrades).
  
**Progression/Upgrades**  
*(Permanent upgrades, purchased between phases)*
- **Health Increase:** +20 per rank, up to +60
- **Shield Recharge:** Faster recovery; +5/sec per rank
- **Plasma Overload:** Charged shots pierce enemies
- **Battlefield Drone:** Summons a short-duration auto-firing drone (space shooter only)
- **Martian Grenade:** Throwable AoE, cooldown-based (ground combat only)
- **Jump Booster:** +0.5 tile jump height per rank

**Powerups (In-Phase)**
- **Temporary Invulnerability**
- **Rapid Fire**
- **Health Pack**
- **Shield Recharge**
- **Plasma Spread (multi-shot for 10s)**

**Touch/Keyboard/Mouse Controls**
- **Ground:** On-screen d-pad or WASD/Arrows; tap/click to fire; jump button.
- **Flight/Space:** Drag to move, tap/click for special.

---

### 3.2. Aykcuf Dubay

**Visual Design**
- **Sprite Style:** 2D pixel art/HD sprite, 128x128px; WebP/PNG, SVG avatar.
- **Color Palette:** Earth greens, steel grey, navy, neon yellow highlights.
- **Key Features:** Sleek pilot armor, helmet with HUD visor (sometimes up), athletic build, compact pulse pistol.
- **Animation States:** Idle (ready stance), run, jump, shoot, roll/dodge, hit, death, special ability.
- **Accessibility:** Distinct color separation from Haze and backgrounds.

**Personality**
- Brash, witty, tactical; never misses a one-liner but always reads the field.
- Dialogue Example: "I’ll take the odds. In fact, I’ll take two."

**Narrative Function**
- Represents Earth’s last line; brings outsider’s perspective to Martian struggle.
- Provides alternate tutorial (Earth), introduces advanced mechanics (stealth, EMP).
- Banters and debates strategy with Haze, reveals backstory via unlockables.

**Gameplay Role**
- **Phases:** Available in all; "default" for Earth and post-Earth levels.
- **Stat Focus:** Higher speed/agility, less base health, enhanced tech-based abilities.
- **Specialization:** Dodging, disabling enemies, burst damage.

**Base Stats** (Phase-dependent, defaults shown for Endless Runner)
| Stat          | Value      | Notes                           |
|---------------|------------|---------------------------------|
| Health        | 80         | Upgradable                      |
| Movement Speed| 250 px/sec | Above average                   |
| Boost Speed   | +200 px/sec| Temporary, on cooldown          |
| Weapon Damage | 8          | Fast pulse shots, upgradable    |
| Fire Rate     | 175ms/shot | Fast, upgradable                |
| Shield        | 10         | Quick recharge, low cap         |

**Core Abilities**
- **Pulse Pistol:** Rapid-fire, slightly less damage per shot.
- **EMP Grenade:** Stuns enemies in AoE (ground/space only), cooldown-based.
- **Stealth Cloak:** Short-term invulnerability, disables firing; 8s cooldown.

**Progression/Upgrades**
- **Health Increase:** +15 per rank, up to +45
- **Pulse Overclock:** +1 damage/rank, up to +3
- **EMP Range:** +20% per rank
- **Cloak Duration:** +0.5s per rank
- **Agility Boost:** Faster movement/dodge cooldowns
- **Wingman Drone:** Follows, auto-fires for 5s when activated (space shooter only)

**Powerups (In-Phase)**
- **Temporary Invulnerability**
- **Speed Boost**
- **Magnet (auto-collect currency)**
- **Rapid Fire**
- **EMP Charge (instant area stun)**

**Touch/Keyboard/Mouse Controls**
- **Ground:** On-screen d-pad or WASD/Arrows; tap/click to fire; boost/dodge button.
- **Flight/Space:** Drag to move, tap/click for EMP or cloak.

---

## 4. CHARACTER PROGRESSION & UPGRADE SYSTEM

- **Currency:** “Salvage” coins, dropped by enemies and collected in all phases.
- **Permanent Upgrades:** Accessible between phases; unique per character, organized in a simple tree (max 2-3 branches per character).
- **Unlockables:** Complete levels/phases with both characters to unlock alternate abilities or narrative reveals.
- **Upgrade Data Structure Example (for Phaser.js):**
    ```js
    {
      "haze": {
        "health": 100,
        "shield": 25,
        "plasmaOverload": false,
        // ...
      },
      "aykcuf": {
        "health": 80,
        "shield": 10,
        "empRange": 1,
        // ...
      }
    }
    ```
- **Upgrade UI:** Responsive, tap/click-based; show current stats, available upgrades, cost, and upgrade preview.

---

## 5. VISUAL & TECHNICAL IMPLEMENTATION

- **Sprite Sheets:** 128x128px per frame; WebP preferred for compression, PNG fallback. Max 2MB per character sheet.
- **Avatars:** SVG for dialogue/UI, <50KB per character.
- **Animations:** 6-8 key states, 4-8 frames per state; keep under 50 frames total per character.
- **Color Accessibility:** Use colorblind-friendly palettes and outlines.
- **Audio:** 3-4 VO quips per character (MP3/OGG, <10s each), unique weapon sounds, all <200KB per clip.
- **Touch/Mobile:** Large tap/click areas for abilities; on-screen buttons for jump, fire, special (30x30px min).
- **Performance:** Sprite pooling, single draw call per character, minimize real-time effects (use pre-baked animations).

---

## 6. GAMEPLAY & NARRATIVE INTEGRATION

- **Dialogue:** Contextual, per phase and character, surfaced via text bubbles or overlay.
- **Cutscenes:** Illustrative comic-panel style, swap dialogue and avatar based on active character.
- **Replayability:** Unique dialogue, narrative branches, and upgrade unlocks per character in each level.
- **Phase-Dependent Mechanics:** Some upgrades/abilities only usable in specific phase types (e.g., drones only in space, grenades only on ground).

---

## 7. FUTURE EXPANSION & MODULARITY

- **Character Modularity:** New characters (e.g., Martian scientist, Earth AI) can be added with minimal UI/code refactoring; follow same stat/upgrade schema.
- **Visual Swaps:** Color palette swaps for alternate costumes/skins (achievement unlocks).
- **Accessibility Expansion:** Add voice/text toggle, adjustable font size.

---

## 8. CONFLICTS & ALIGNMENT CHECK

- **Mechanics:** All referenced upgrades, abilities, and systems align with existing design documents (jump, shoot, run, collect, powerup, health, upgrade).
- **Quest Mechanic:** Not directly referenced in character design; recommend integrating character-driven quests for future expansion.
- **Enemy/Upgrade Specifics:** To be detailed in enemy_design and upgrade_design documents.

---

## 9. SUMMARY TABLE

| Character         | Playstyle         | Strengths               | Weaknesses                | Unique Upgrades                  |
|-------------------|------------------|-------------------------|---------------------------|----------------------------------|
| Haze Bloom        | All-rounder      | Durability, gadgets     | Lower agility             | Plasma Overload, Martian Drone   |
| Aykcuf Dubay      | Speed/Tech       | Agility, disables       | Lower health, short shield| EMP Grenade, Stealth Cloak       |

---

## 10. APPENDIX: ART & DATA PIPELINE

- **Sprite Creation:** Design in 128x128px, export as PNG/WebP; batch in strips/sheets for Phaser.js.
- **Animation JSON:** Define with Phaser’s Animation Manager.
- **Avatar/UI Art:** SVG (preferred), raster fallback.
- **Audio:** MP3/OGG, normalized, <44.1kHz for size.
- **Data Files:** Character data in JSON; upgrades tracked via localStorage.

---

*This document provides a detailed, actionable reference for character implementation in Solar Siege: Ork Onslaught, ensuring consistency, performance, and player engagement across web platforms.*
```



---
*Generated on 8/15/2025*
