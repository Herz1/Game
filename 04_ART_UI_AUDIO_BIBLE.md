# Art, UI & Audio Bible

## Visual identity
High-definition pixel-art characters exist inside dimensional fantasy dioramas. The contrast between deliberately pixelated subjects and rich lighting/atmosphere should feel intentional.

## Character art
- readable silhouettes at gameplay scale
- 4-direction or 8-direction movement as required by implementation
- idle, walk/run, interaction, battle-ready, attack/cast/hit/victory/death states where appropriate
- portraits should preserve costume/color identity while allowing more detailed facial acting
- avoid tracing or closely reproducing recognizable commercial character designs

## Environments
Each region needs a distinct material language: masonry, timber, plaster, metal, foliage, textiles, signage and ornament. Props should communicate local work and daily life.

Use:
- layered foreground and background planes
- perspective-aware shadows
- dynamic key/fill/rim lighting where feasible
- region-specific fog/particles
- emissive windows, lamps, magical objects or fires
- subtle camera drift and parallax
- depth of field focused on composition, not constantly blurred gameplay

## Battles
Battle scenes should use cinematic composition but preserve tactical clarity. Use quick camera pushes, hit-stop, controlled screen shake, impact particles, weapon trails, elemental lighting, enemy reaction, break effects, and restrained bloom.

## UI style
Invent an original visual language using a combination of engraved fantasy frames, map-paper motifs, metal/wood/cloth or other world-linked materials. Avoid web-dashboard cards, glassmorphism and generic pill buttons.

### UI rules
- 1080p readability first
- visible focus state for keyboard/gamepad
- consistent confirm/cancel mapping
- no essential information encoded by color alone
- menus open/close quickly
- battle numbers readable without covering characters
- tooltips concise but complete
- dialogue nameplates and portraits support emotional scenes

## Portrait set
For each playable protagonist generate or draw at least:
neutral, happy, concerned, angry, hurt, surprised, determined.
Keep originals and processed crops.

## Monsters
Design monster families around local ecology and folklore rather than random fantasy nouns. Variants may share skeletal/shape logic but must differ in color, behavior, weaknesses or abilities.



## Image 2.5 production pipeline
When Image 2.5 is available in the connected ChatGPT environment, use it actively for original high-value art rather than treating visual generation as optional.

### Character pipeline
For every playable protagonist:
1. write a one-page identity sheet covering face, hair, silhouette, costume construction, palette, weapon, accessories, age impression and visual motifs;
2. generate a canonical full-body/key-art reference;
3. generate a coherent expression sheet containing at least neutral, happy, concerned, angry, hurt, surprised and determined expressions;
4. crop/clean the chosen faces into runtime portrait assets;
5. derive or redraw gameplay sprites so their palette/silhouette matches the canonical reference;
6. preserve all raw generations, rejected useful variants, prompts and processing notes.

Apply the same workflow at reduced scope to major NPCs, villains and bosses. Use reference-image/consistency features when available. Do not silently change a character's hair, eye color, costume motifs or weapon between generations.

### Environment / monster / UI generation
Image generation may be used for original environment mood paintings, backdrop plates, monster sheets, boss concepts, title art, textures and ornament studies. Generated images are not automatically production-ready: crop, mask, pixelize, color-grade, optimize, remove artifacts and test them at actual game scale. Keep `source -> processed -> runtime` lineage intact.


## Audio direction
Create a coherent original score palette. Suggested instrumentation can combine chamber strings, woodwinds, plucked strings, hand percussion, folk instruments, bells and restrained synth texture. Each region should have a recognizable motif or instrumentation subset.

Required audio categories:
- title
- field themes
- town themes
- dungeon themes
- normal battle
- boss battle
- final battle
- character/emotional motif
- victory/results
- ambience by region
- UI SFX
- footsteps/material SFX
- battle impacts / magic / healing / status / break

If full music generation is unavailable, prefer original procedural/minimal compositions and strong ambience over stolen or mismatched tracks.

## External music sourcing
The game may source suitable tracks from MaouDamashii / 魔王魂 (`https://maou.audio/category/bgm/`) and other reputable libraries whose CURRENT license clearly permits the intended game use. Prefer fantasy, orchestral, folk, acoustic, healing and game-oriented categories that match each region and scene rather than choosing tracks only because they are free.

Every selected external track must have a manifest entry with:
- role in game (title/town/field/dungeon/battle/boss/emotional/etc.)
- track title and composer/author
- direct source page URL
- terms/license URL
- exact required credit text
- acquisition date
- original filename and runtime filename
- duration/loop information
- edits performed (trim, loop points, loudness, format conversion)
- checksum where practical

MaouDamashii is not public-domain/CC0. Verify its current rules at acquisition time, provide required attribution, do not claim the music as original, do not feed it into AI music training/generation, and avoid publishing loose source downloads when the terms restrict standalone redistribution. Runtime distribution must stay inside the license's game/content-use allowance. Put credits in the in-game credits and `docs/THIRD_PARTY_NOTICES.md`.
