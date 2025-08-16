# Game Design Document

## Description
Overall game vision, mechanics, and core design decisions

## Content
```markdown
# GAME DESIGN DOCUMENT

## Game Title:  
**Solar Siege: Ork Onslaught**

---

## 1. GAME VISION

Solar Siege: Ork Onslaught is a narrative-driven, multi-genre action game playable instantly in any web browser. Players experience the epic defense of the solar system against ruthless Space Orks, taking control of two heroes from Mars and Earth and beyond as they traverse 10 planetary levels (Pluto to Earth and beyond), each divided into three distinct gameplay phases. The story unfolds through alternating perspectives, each phase offering a unique gameplay style and narrative, culminating in a joint battle for the fate of humanity and Martian refugees.

---

## 2. CORE GAMEPLAY & SYSTEMS

### 2.1. Gameplay Overview
- **Levels:** 10 (One per major planet/solar waypoint; e.g., Pluto, Neptune, Uranus, Saturn, Jupiter, Asteroid Belt, Mars, Mercury, Earth, and “Finale/Orbit”)
- **Phases per Level:** 3, with the order changing per narrative needs.
- **Play Modes:**
  - **Ground Combat (Phase 1):** Side-scrolling shooter (e.g., Contra)
  - **Endless Runner (Phase 2):** Dodging hazards in a fighter craft (vertical/horizontal scrolling)
  - **Space Shooter (Phase 3):** Ship-to-ship combat (e.g., Galaga-style)
- **Player Characters:** Two protagonists with unique dialogue, cutscenes, and upgrade trees:
  - *Captain Haze Bloom* (Martian Marine, starts on Mercury)
  - *Aykcuf Dubay* (Earth Ace Pilot, joins from Earth)

### 2.2. Core Loop
1. **Narrative Setup & Character/Phase Selection**
2. **Phase Gameplay:** One of three mini-game genres per phase, with objectives (survive X time, defeat X waves, reach end)
3. **Currency/Powerup Collection:** Enemies drop temporary powerups and currency
4. **Upgrade Screen:** Spend currency on permanent upgrades before the next phase
5. **Story/Cutscene:** Advance narrative, switch characters if appropriate
6. **Repeat for 3 phases per level**
7. **Level Complete:** Unlock next planet, repeat with new phase order and increased challenge

---

## 3. PHASE DETAILS

### 3.1. Side-Scrolling Shooter (Ground Combat)
- **Gameplay:** Player navigates left/right, jumps, shoots at Ork infantry and mechanized units; platforming elements.
- **Objectives:** 
  - Survive for a set time (e.g., 3 minutes) with endless waves, or
  - Defeat 10 waves of 5-6 enemies each (with a mini-boss at wave 10).
- **Controls:** Keyboard (arrows/WASD, space, mouse/touch for fire), or touch buttons (mobile).
- **Powerups/Currency:** Health packs, weapon upgrades, shields, dropped currency.

### 3.2. Endless Runner (Flight/Dodging)
- **Gameplay:** Player pilots a fighter, auto-scrolls forward; dodge meteors, debris, enemy fire.
- **Objectives:** 
  - Reach end of course (distance-based), or
  - Survive for a set time (e.g., 2-3 minutes).
- **Controls:** Mouse/touch drag to move up/down/sideways; tap/click for boost or shield.
- **Powerups/Currency:** Temporary invulnerability, speed boost, magnet for currency.

### 3.3. Space Shooter (Ship Battle)
- **Gameplay:** Top-down or side-scrolling space shooter; player’s ship vs. waves of Ork fighters and capital ships.
- **Objectives:** 
  - Defeat 10 enemy waves, or
  - Survive for a set duration with increasingly difficult enemies.
- **Controls:** Mouse/touch drag to move, auto-fire or tap to shoot, special attack button.
- **Powerups/Currency:** Spread shot, shield recharge, missiles, dropped currency.

---

## 4. PLAYER CHARACTERS

### 4.1 Captain Haze Bloom
- **Background:** Martian Marine, tough, resourceful; starts on Mercury.
- **Abilities:** Balanced stats, unique dialogue, Martian-themed upgrades (e.g., plasma rifle, Martian armor).
- **Narrative:** Escapes conquered Mars, leads civilian defense on Mercury, seeks Earth alliance.

### 4.2 Aykcuf Dubay
- **Background:** Earth ace pilot, commando-trained, hotshot but strategic.
- **Abilities:** Advanced fighter controls, unique dialogue, Earth-tech upgrades (e.g., EMP grenades, stealth cloak).
- **Narrative:** Defends Earth orbit, crash-lands, leads resistance against Ork vanguard.

### 4.3 Dual Play & Replay Value
- **Post-Earth Levels:** Players can choose either character per phase; unique dialogue and narrative reveals per choice, encouraging replay.

---

## 5. GAMEPLAY PROGRESSION & NARRATIVE STRUCTURE

### 5.1 Phase Order per Level (Sample)
- **Mercury:** Haze (Ground Combat → Endless Runner → Space Shooter)
- **Earth:** Aykcuf (Space Shooter → Endless Runner → Ground Combat)
- **Mars/Asteroid Belt/Jupiter, etc.:** Mix and match phase order to fit story beats (e.g., escape, chase, sabotage, defense).
- **Finale:** Both characters, tag-team play (player alternates per phase or controls both in co-op mode).

### 5.2 Narrative Delivery
- **Cutscenes:** Brief illustrated/comic panels between phases and levels.
- **Dialogue:** On-screen speech bubbles or text boxes; unique to character and phase.
- **Unlockables:** Completing a level with both characters unlocks bonus lore or upgrades.

---

## 6. SYSTEMS & FEATURES

### 6.1 Upgrade System
- **Currency:** Enemies drop “salvage” coins, used between phases.
- **Permanent Upgrades:**
  - Health increases
  - Rechargeable shields
  - Weapon upgrades (rate of fire, spread, damage)
  - Wingmen/drones (for space shooter)
  - Special abilities (temporary invulnerability, speed boosts)
- **Temporary Powerups:** Dropped in-phase, last until hit or phase end.

### 6.2 Input & Accessibility
- **Touch & Mouse:** All controls must be usable via on-screen touch buttons or mouse/keyboard.
- **Responsive Layout:** UI adapts to phone, tablet, and desktop.
- **Performance:** Sprite-based graphics; limit simultaneous enemies/powerups for browser efficiency.

### 6.3 Replay Value & Progression
- **Character Choice:** Post-Earth, select character per phase for unique dialog and story.
- **Replay Bonus:** Completing all phases as both characters unlocks alternate endings or secret upgrades.
- **Difficulty Options:** Gradually increase enemy speed/AI, projectile density, and phase complexity per new planet.

---

## 7. TARGET AUDIENCE

- **Age:** 12+, casual to midcore players.
- **Platform:** Web browsers (mobile and desktop).
- **Appeal:** Fans of arcade shooters, endless runners, sci-fi, and narrative-driven games; accessible for quick play sessions.

---

## 8. KEY DIFFERENTIATORS

- **Three distinct gameplay genres, seamlessly integrated per level**
- **Narrative-driven multi-character campaign**
- **Responsive, instant-play browser experience**
- **Replay incentive via alternate character perspectives and story reveals**
- **Persistent upgrades and meaningful powerups**

---

## 9. SUCCESS METRICS

- **Session Length:** Target average of 10-15 minutes per play session.
- **Retention:** 40% players return for at least 2 play sessions (track via browser storage).
- **Completion Rate:** 20% reach Earth, 10% finish finale.
- **Replay Rate:** 25%+ play post-Earth levels as both characters.
- **Performance:** 60 FPS on midrange mobile and desktop browsers.

---

## 10. IMPLEMENTATION CONSIDERATIONS

- **HTML5/JavaScript:** Use canvas for graphics, audio APIs for sound, localStorage for save/progress.
- **Asset Loading:** Progressive or lazy-load assets per phase/level for fast initial load.
- **Touch/Mouse Parity:** All controls must work via both input methods.
- **Save System:** Local browser save for upgrades, progress, and unlocked content.
- **Performance:** Optimize for minimal draw calls, pooling for entities, efficient collision detection.

---

## 11. POTENTIAL CONFLICTS / OPEN QUESTIONS

- **No existing documents or mechanics to conflict with.**
- **Character, enemy, and upgrade specifics to be detailed in future documents.**
- **Level/phase order and enemy/obstacle design should align with narrative pacing.**

---

## 12. NEXT STEPS

1. Define character stats, abilities, and upgrade trees in detail.
2. Design core enemy types and boss encounters for each phase.
3. Create wireframes for UI and responsive layouts.
4. Prototype each gameplay mode in isolation, ensuring performance and input handling.
5. Develop initial art style and asset guidelines.

---

## 13. APPENDIX: SAMPLE LEVEL FLOW

**Level 2: Venus**
- *Phase 1:* Endless Runner (Haze escaping Ork patrols in Venusian atmosphere)
- *Phase 2:* Space Shooter (Aykcuf intercepts Ork supply ships)
- *Phase 3:* Side-Scrolling Shooter (Both characters, alternating, sabotage Ork Venus base)

---

*This document sets the foundation for Solar Siege: Ork Onslaught’s design, ensuring a compelling, varied, and browser-friendly gameplay experience. All further documentation should expand on these core systems and narrative elements.*
```



---
*Generated on 8/15/2025*
