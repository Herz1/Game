# Game Design Document

## Core loop
Explore -> observe/interact -> discover quest/treasure/encounter -> fight or solve -> gain currency/items/XP/job growth -> refine party build -> unlock new route -> advance character/world story -> repeat.

## Player fantasy
A band of strangers becomes a deliberate, synergistic traveling party. The player should feel clever for reading enemies, saving resources, building burst turns, finding hidden routes, and combining jobs/gear in expressive ways.

## Exploration
- eight-direction movement or equivalent smooth movement
- layered 2.5D scenes with foreground occluders and depth
- interaction icons only when useful; avoid visual clutter
- treasure, breakable/interactive props, lore points, shortcuts, optional rooms
- NPC schedules or state changes after major quests where feasible
- field hazards and region-specific traversal flavor
- fast travel unlocked through discovery rather than available everywhere immediately

## Combat
Turn-based party combat built around four ideas:
1. Read: identify defenses/weaknesses/status patterns.
2. Pressure: attacks and skills reduce enemy guard/stability under the right conditions.
3. Break: depleting guard produces a short vulnerability/stagger window.
4. Burst: characters accumulate a separate momentum/focus resource that can empower skills, alter timing, or enable role-specific tactical effects.

The exact implementation must be original and clearly documented.

### Battle requirements
- 4 active party members where technically feasible
- clear turn preview / initiative visualization
- multi-target and single-target abilities
- physical and magical damage families
- healing/support/control
- buffs/debuffs/status effects
- defend / escape where appropriate
- visible break/guard state
- visible momentum/focus resource
- weakness discovery recorded in bestiary
- speed controls for common animations without making combat unreadable
- bosses with telegraphed patterns and state changes

## Jobs
Each protagonist has a signature base job. Add secondary jobs or role modules after the core is stable.

Suggested role space:
- Vanguard: mitigation, counterpressure, ally protection
- Duelist: tempo, crits, single-target burst
- Hunter: ranged damage, traps, marked targets
- Arcanist: elemental coverage and burst setup
- Cleric/Herbalist: healing, cleansing, sustain
- Trickster: debuffs, turn manipulation, steal-like utility
- Bard/Envoy: party buffs, morale/focus generation
- Artificer/Merchant: item economy, gadgets, flexible support

These are design roles, not required names. Create original names and lore.

## Progression
Use several parallel progression tracks:
- character level
- job proficiency
- equipment
- passive skill unlocks
- quest-derived utility unlocks
- bestiary/knowledge completion

Avoid excessive grind. Main path parties should stay viable through normal exploration and moderate side content.

## Economy
Currency sinks:
- weapons
- armor
- accessories
- consumables
- inn/services
- optional crafting/upgrade systems only if they improve depth

Do not create junk systems merely to inflate feature count.

## Quests
Main quests should change world state. Side quests should reveal character, local culture, shortcuts, rare encounters, equipment, or lore. Avoid filler fetch quests unless they contain a twist, route choice, character moment, or mechanical challenge.

## Difficulty
Default difficulty should reward system use without demanding perfect optimization. If multiple difficulty settings are added, prefer numeric/timing adjustments over removing mechanics.

## Save
- at least 3 manual slots
- autosave
- save version number
- migration path for data schema changes during development
- protect against corrupt/partial writes where possible