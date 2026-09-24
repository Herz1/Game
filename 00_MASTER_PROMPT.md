# MASTER PROMPT — Original HD-2D Fantasy JRPG

You are the lead game director, technical director, systems designer, narrative director, art director, UI/UX director, level designer, combat designer, economy/balance designer, tools engineer, QA lead, and release engineer for this project.

Your mission is to create, in this single task, a complete, polished, playable original Japanese-style fantasy JRPG with a high-definition pixel-art / 2.5D diorama presentation: pixel characters and props placed in dimensional environments with dynamic lighting, depth of field, parallax, particles, volumetrics, rich post-processing, dramatic camera work, and highly polished menus.

The desired emotional and production target is the sense of craft, adventure, party-building, town exploration, turn-based battles, layered progression, storytelling, and premium presentation associated with top-tier modern Japanese 2.5D pixel-art RPGs. However, this must be an ORIGINAL GAME. Do not copy or trace any existing game's characters, names, story beats, towns, maps, UI layout, icons, item lists, monster designs, audio, dialogue, sprites, portraits, logos, or proprietary assets. Do not extract or reuse copyrighted game files. Use genre-level inspiration only and create a distinct world, cast, visual identity, interface, lore, narrative, mechanics tuning, and content.

## Non-negotiable execution mode

1. Do not stop at planning, a prototype, a vertical slice, a mock-up, or a minimal demo.
2. Do not ask me for routine design choices. Make strong professional decisions yourself and continue.
3. Treat every document in this repository as a minimum specification, not a ceiling. If you can materially improve the game, do so.
4. Work autonomously through preproduction, implementation, content production, polish, QA, optimization, packaging, and handoff in the same task.
5. Preserve ALL intermediate work. Never delete source art, source prompts, drafts, raw data, balance sheets, rejected variants that informed a final asset, map source files, conversion scripts, generated images, processed images, or build scripts. Keep them in clearly named archival/source folders.
6. Keep the repository buildable after each major milestone.
7. Prefer a smaller game that is genuinely complete and polished over a huge broken game, but push scope aggressively after the complete end-to-end experience works.
8. No empty buttons, dead menus, fake settings, placeholder quests, TODO text, lorem ipsum, broken links, missing icons, or "coming soon" content in the final build.
9. If a requested capability is unavailable, implement the best local/programmatic substitute rather than stopping. Record the substitution in docs/DECISIONS.md.
10. Before declaring completion, play through / simulate the critical path, run automated checks, fix defects you find, and produce a final QA report.

## Repository rule

Use the connected empty Git repository as the single source of truth. Create and maintain a clean commit history. Do not scatter the project across chat-only snippets.

Recommended milestone commits:
- chore: initialize project and production docs
- feat: core exploration and rendering pipeline
- feat: battle system and data-driven content
- feat: progression, inventory, economy, quests and save system
- feat: towns, dungeons, world content and encounters
- feat: complete narrative and side content
- feat: original art, portraits, UI and audiovisual polish
- fix: integration and gameplay QA
- perf: optimize loading, rendering and input
- release: final playable build and handoff

## Default technical target

Unless a stronger executable option is definitely available in the environment, build a browser-first game that can be fully verified here:
- TypeScript
- Vite
- Three.js for 2.5D world rendering, lighting, cameras and post effects
- HTML/CSS or a lightweight UI layer for menus/HUD
- WebAudio for music/SFX playback and mixing
- Data-driven JSON/TypeScript content tables
- Local save slots using IndexedDB or localStorage with versioned migration
- Desktop keyboard/gamepad first; mouse/touch support where sensible
- Responsive 16:9 base presentation with graceful resizing
- No required backend
- One-command local development and one-command production build
- GitHub Pages/static-host deployability

You may replace or extend this stack only if the replacement can actually be built and validated in the current environment. Do not choose an engine/toolchain that you cannot run or verify.

## Art and asset rule

Create original assets. If image-generation tools are available, use them for original concept art, character portraits, environment backplates, textures, title art, or other high-value visuals. Save the exact prompts and generation notes for every generated asset under `assets/prompts/` and preserve original outputs under `assets/source/` before processing.

If image generation is unavailable, create original pixel art, SVG, procedural textures, shader-driven effects, geometry, and programmatic illustrations. Do not use copyrighted screenshots or ripped assets as placeholders.

For every asset keep a clear chain:
`prompt/source -> raw source -> processed game asset -> in-game reference`.


## Image 2.5 / integrated image-generation directive

If this ChatGPT environment exposes Image 2.5 or another current high-quality integrated image generator, actively use it for ORIGINAL production art instead of settling for low-detail placeholders. High-value targets include:
- the eight protagonists' key art and dialogue portrait expression sheets
- major allies and antagonists
- boss and monster concept sheets
- title/key art and logo exploration
- environment mood paintings and background plates
- architecture, props, UI ornament and icon concept sheets

Use generated art as part of a controlled production pipeline rather than as disposable chat output. For every generation, preserve the exact prompt, references if used, generation metadata/ID or seed when available, raw output, chosen variant, crop/mask/cleanup operations and final in-game derivative. Put prompts and notes under `assets/prompts/`, untouched outputs under `assets/source/`, and runtime derivatives under `assets/processed/`.

For character consistency, create a compact identity sheet for each important character (face, hair, costume, palette, silhouette, weapon, accessories, age impression, expression language) before generating variants. Prefer one expression-sheet generation that can be cropped into several consistent dialogue faces when practical. Never imitate a living artist or closely reproduce a copyrighted commercial character design.

If Image 2.5 is unavailable, use the best available integrated image tool or an original procedural/pixel-art fallback and record the substitution in `docs/DECISIONS.md`.

## Game quality bar

The finished game should feel authored rather than generated. Prioritize:
- a memorable visual identity
- strong silhouette design
- readable battle states
- expressive portraits
- dense but navigable towns
- rewarding optional exploration
- cohesive world lore
- party banter and character chemistry
- strong boss gimmicks
- sensible economy and progression
- clear, fast menus
- excellent input feel
- restrained but beautiful effects
- consistent terminology and naming
- no generic SaaS visual language

## Required gameplay pillars

Implement all of the following as real, connected systems:
- explorable overworld / regional maps
- towns, interiors, NPCs, shops and inns
- field interaction and discovery
- dungeons with traversal, treasure, hazards and shortcuts
- visible or clearly telegraphed encounters
- turn-based party combat
- enemy weaknesses / defenses / resistances
- a resource that lets players deliberately create burst turns
- break/stagger or guard-pressure gameplay
- jobs/classes with role identity
- skills, passive abilities and equipment
- party composition and formation choices
- status effects, buffs and debuffs
- bosses with multiple phases or changing priorities
- XP, level growth and job/proficiency growth
- items, weapons, armor, accessories and consumables
- shops, loot, treasure chests and quest rewards
- currency and a tuned economy
- main quests and side quests
- party conversations / travel banter
- journal / quest log / bestiary / glossary
- save/load, autosave and settings
- keyboard controls and gamepad mapping
- title screen, pause menu, game over, ending and credits

Do not reproduce any existing game's exact equations or data. Design and tune original numbers.

## Required narrative structure

Create a fresh world and cast. The minimum target is:
- 8 recruitable protagonists with distinct hometowns, jobs, personal conflicts, visual silhouettes, speech patterns and combat roles
- an opening path for each protagonist
- a believable reason for the party to travel together
- one central mystery/conflict that gradually unifies the cast
- personal character arcs that resolve meaningfully
- recurring allies and rivals
- a main antagonist faction with understandable goals
- optional lore threads
- at least one late-game reversal that is foreshadowed rather than arbitrary
- a complete ending and post-ending state

You may compress chapter count if necessary for completeness, but all eight protagonists must matter to the final story.

## Minimum content target

After the complete core loop is stable, expand toward at least:
- 8 playable protagonists
- 8 personal prologues / recruitment chapters
- 5+ major settlements with interiors
- 8+ field / road areas
- 8+ dungeons
- 50+ distinct enemy entries, using families/variants intelligently
- 10+ bosses or elite encounters
- 30+ side quests
- 100+ usable equipment/item entries combined
- 80+ active/passive skills combined
- 20+ NPC archetypes with named notable NPCs
- multiple optional secrets / rare encounters / hidden treasure chains
- 3+ hours of meaningful playable content minimum if authored manually; more if data-driven generation allows it without harming quality

If time or environment constraints make any count unrealistic, keep the game complete and document the final achieved count. Do not leave half-implemented content.

## Visual direction

Create an original Japanese-fantasy visual identity built from:
- detailed pixel characters and props
- dimensional terrain and architecture
- strong warm/cool lighting contrast
- localized fog, dust, pollen, snow, rain, ash, embers or fireflies as region-specific atmosphere
- shallow depth of field used selectively
- bloom used with restraint
- parallax and foreground silhouettes
- expressive portrait art for dialogue and menus
- dramatic battle framing and camera pushes
- handcrafted-looking tiles and props rather than sterile primitives

Avoid copying the exact visual composition of any existing commercial game. Develop your own palette, architecture vocabulary, costume motifs, ornament language and UI framing.

## UI / UX direction

Build a premium game UI, not a web dashboard. Required screens:
- title / continue / new game
- save slot select
- exploration HUD
- battle HUD and turn order
- command menu
- party/status
- equipment
- skills/jobs
- inventory
- quest journal
- map
- bestiary/glossary
- settings
- dialogue / choice UI
- shop / inn UI
- results / rewards screen
- game over
- credits

All screens must be keyboard/gamepad navigable, visually consistent, readable at 1080p, and free of accidental browser/SaaS styling.

## Data and balance

Make all gameplay content data-driven so it can be tuned without rewriting engine code. Keep source tables under `data/` and/or `design/balance/`.

Document:
- level curve
- enemy stat curve
- damage model
- crit model
- accuracy/evasion model if used
- break/stagger rules
- burst-resource gain/spend rules
- status effect rules
- equipment scaling
- XP and job/proficiency progression
- shop price bands
- consumable pricing
- boss target difficulty bands

Run scripted balance simulations for representative low/mid/late-game parties. Fix obvious dominant strategies, impossible fights, infinite loops and economy exploits.

## Narrative asset preservation

Keep:
- world bible
- character bible
- chapter outlines
- final scripts
- discarded/alternate scene drafts that meaningfully influenced the final result
- quest spreadsheet/data
- NPC sheets
- terminology glossary
- localization-ready string tables

Do not hard-code large amounts of dialogue inside rendering code.

## Audio

Do not leave the release silent or filled with generic temporary beeps. Use the strongest legal path available:
1. original music/SFX generation when the environment can genuinely create usable audio;
2. appropriately licensed game-use music/SFX from reputable libraries;
3. procedural/code-generated ambience and effects for gaps.

A preferred external music source is MaouDamashii / 魔王魂 BGM: `https://maou.audio/category/bgm/`. You may also use comparable reputable libraries, but verify each source's CURRENT terms before download/use. For every external track record title, author, source page URL, license/terms URL, required credit, acquisition date, local filename, SHA-256 if practical, edits performed and exact in-game usage in `docs/THIRD_PARTY_NOTICES.md` plus an asset manifest.

For MaouDamashii specifically, do not treat the catalog as CC0 or ownerless material. Follow the site's current rules and attribution requirements; never claim authorship, never use its music to train or seed an AI music-generation system, and do not expose loose source tracks in the public repository when that would constitute prohibited standalone redistribution. Distribution as part of the game must remain within the source's game/content-use terms. If raw third-party files cannot legally be preserved in a public repository, preserve reproducibility instead: exact source URL, filename, checksum, license snapshot/notes and a fetch/import procedure, while retaining the legal runtime derivative only where the license permits it.

If original music generation is available, create original tracks and preserve prompts/stems/source files. Keep `docs/THIRD_PARTY_NOTICES.md` accurate. Never use ripped OSTs, YouTube rips, commercial game files or vaguely labeled "free" audio without a verifiable license.

## Required project structure

Create or adapt this structure:

```
/
  README.md
  CHANGELOG.md
  LICENSE
  package.json
  vite.config.*
  docs/
    PROJECT_CHARTER.md
    GDD.md
    WORLD_BIBLE.md
    NARRATIVE_BIBLE.md
    ART_BIBLE.md
    UI_UX_SPEC.md
    SYSTEMS_SPEC.md
    TECH_ARCHITECTURE.md
    BALANCE_SPEC.md
    CONTENT_MATRIX.md
    DECISIONS.md
    QA_PLAN.md
    QA_REPORT.md
    THIRD_PARTY_NOTICES.md
    FINAL_HANDOFF.md
  design/
    maps/
    flowcharts/
    balance/
    narrative/
    ui/
  assets/
    prompts/
    vendor_manifest.json
    source/
      characters/
      portraits/
      environments/
      props/
      monsters/
      ui/
      audio/
    processed/
      characters/
      portraits/
      environments/
      props/
      monsters/
      ui/
      audio/
  data/
    characters/
    enemies/
    bosses/
    skills/
    jobs/
    items/
    equipment/
    quests/
    dialogue/
    maps/
    shops/
    encounters/
    localization/
  src/
    core/
    rendering/
    world/
    battle/
    systems/
    ui/
    audio/
    content/
    save/
    input/
    debug/
  tools/
  tests/
  public/
  build/
  archive/
```

Do not delete `archive/` or source asset folders during cleanup.

## Internal production phases

Execute these phases yourself without waiting for approval:

### Phase 0 — Production lock
- read all provided docs, including `10_ASSET_ACQUISITION.md`
- choose final title, world premise, tech stack and scope
- write `docs/DECISIONS.md`
- create the repository skeleton
- make the first commit

### Phase 1 — Complete core loop
- title screen
- new game
- exploration
- NPC interaction
- encounter start
- full battle
- victory/reward
- inventory/equipment
- save/load
- one town
- one route
- one dungeon
- one boss
- short narrative chain
- ending state

Do not expand content until this loop actually works.

### Phase 2 — Systems and tooling
- data schemas
- quest system
- jobs/skills
- economy
- status effects
- bestiary/journal
- map tools/content helpers
- debug menu
- automated content validators
- balance simulations

### Phase 3 — World and content expansion
- full cast
- towns
- field regions
- dungeons
- monsters
- bosses
- shops
- quests
- hidden content
- narrative scripts

### Phase 4 — Art and presentation
- character sprites
- portraits
- monster art
- architecture/props
- UI skin
- VFX
- lighting
- camera
- transitions
- title/logo
- dialogue presentation

### Phase 5 — Audio and feel
- music/ambience/SFX
- mixer/settings
- combat timing
- hit feedback
- animation timing
- controller feel

### Phase 6 — QA and optimization
- lint/typecheck
- automated tests
- data validation
- playthrough critical path
- save/load test
- settings test
- gamepad test if possible
- viewport/resolution test
- performance profiling
- memory/leak checks where possible
- broken-asset scan
- narrative continuity check
- economy/balance pass

### Phase 7 — Release
- final production build
- release notes
- final screenshots if possible
- complete README with controls and run commands
- `docs/FINAL_HANDOFF.md`
- final QA report
- final commit

## Definition of done

The project is done only when:
- a fresh clone installs and builds with documented commands
- the game launches into a polished title screen
- a new game can be started without developer tools
- the player can recruit and use the intended party
- exploration, dialogue, quests, combat, rewards, progression and equipment all work
- the main story has a beginning, middle, climax and ending
- side content exists and is completable
- saving and loading works
- there is a functioning final boss and credits/ending sequence
- there are no known progression blockers
- there are no obvious missing assets or placeholder strings in the release path
- source and intermediate files are preserved
- the final build and source tree are both present
- all third-party material, if any, has documented license/provenance

## Final response format

Do not narrate every step while working. Perform the work. When finished, give me only a concise release report containing:
1. game title and one-sentence premise
2. final scope actually achieved
3. how to run the game
4. how to build the release
5. where the final build is located
6. where raw/intermediate assets are located
7. major systems implemented
8. QA status and any remaining limitations
9. final commit hash / repository state if available

Begin now. Make strong decisions. Do not wait for further instructions. Show me the highest-quality complete game you can produce within this environment.