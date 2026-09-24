# Asset Acquisition & Generation Plan

This document is mandatory. It defines how GPT-6 Pro should obtain or create production-quality visual and audio assets while preserving provenance and keeping the public repository legally clean.

## 1. Priority order

Use this order whenever several options can satisfy the same asset need:

1. **Original integrated generation** — use Image 2.5 or the highest-quality image generator available in the connected ChatGPT environment for portraits, key art, concept sheets, monsters, environmental art, title art and other visual assets.
2. **Original procedural/programmatic production** — pixel sprites, tile sheets, SVG/UI ornaments, textures, particles, shaders, ambience and SFX that can be created locally and versioned.
3. **Properly licensed external audio** — especially music/SFX libraries that explicitly allow use in games. MaouDamashii / 魔王魂 is an approved candidate source, subject to its current terms.
4. **Never** use ripped commercial-game assets, OST files, screenshots as runtime art, YouTube rips, fan uploads with unclear rights, or files whose license cannot be verified.

A legal, coherent asset of slightly lower fidelity is better than an impressive asset with unclear provenance.

## 2. Image 2.5 directive

If Image 2.5 is available, CALL IT. Do not replace important character art with colored rectangles, emoji, generic SVG people or primitive geometry simply because those are easier to code.

### Minimum visual-generation targets
- 8 protagonist canonical key-art/full-body references
- 8 protagonist expression sheets (neutral, happy, concerned, angry, hurt, surprised, determined)
- principal antagonist/faction key art
- major boss concept sheets
- title/key art
- regional environment mood/concept art for each major biome/settlement group
- monster-family concept sheets where they materially improve visual identity
- UI ornament/logo/icon concept sheets when useful

### Character consistency protocol
Before generation, write `design/characters/<id>_identity.md` with:
- body type / age impression
- face shape
- hair shape and exact color language
- eye color
- costume construction and layers
- main/secondary/accent palette
- signature accessory
- weapon and scale
- silhouette keywords
- cultural/regional motifs
- forbidden drift notes (features that must not change)

Use the canonical image as a reference for later variants whenever reference-image support exists. Generate coherent expression sheets rather than seven unrelated portraits when possible. Reject variants that change identity. Store useful rejected variants instead of deleting them.

### File lineage
For a protagonist named `aria`, an acceptable chain is:

```
assets/prompts/characters/aria_keyart_v01.md
assets/source/characters/aria_keyart_v01.png
assets/prompts/portraits/aria_expression_sheet_v01.md
assets/source/portraits/aria_expression_sheet_v01.png
assets/processed/portraits/aria_neutral.png
assets/processed/portraits/aria_angry.png
assets/processed/characters/aria_sprite_sheet.png
```

Each prompt file should include the exact prompt, date/order, intended use, reference assets, generation ID/seed when exposed, chosen output, rejection notes and processing steps.

## 3. HD-2D visual conversion

Generated illustrations are references/source material, not an excuse to abandon the HD-2D target. Runtime scenes should combine:
- crisp pixel-art or deliberately pixelated characters/props
- dimensional terrain and architecture
- layered foreground/background planes
- dynamic key/fill/rim lights
- local fog/volumetrics
- region-specific particles
- selective depth of field
- restrained bloom
- parallax and cinematic camera framing

At actual gameplay scale, silhouette/readability outranks tiny detail.

## 4. Music: preferred licensed source

Preferred candidate library:
- **MaouDamashii / 魔王魂 BGM**: https://maou.audio/category/bgm/
- Terms/rules to re-check before acquisition: https://maou.audio/rule/

The site can provide fantasy/game-oriented music and loop-ready files. However, it is **not** an ownerless or CC0 library. Always verify the current terms at the moment a track is selected.

As of the production brief date, the published rules state that the music remains copyrighted, may be used in personal/commercial content under the site's conditions, can be edited, requires/requests appropriate attribution depending on the rule path, forbids false authorship, and forbids using the catalog as input/training material for automatic AI composition. The site's redistribution rules must also be respected. Do not rely on this summary in place of the live rule page.

### Maou-specific operating rules for this project
- use tracks as music inside the game, not as a standalone music mirror;
- put the required `音楽：魔王魂` / approved equivalent credit in the in-game Credits and `docs/THIRD_PARTY_NOTICES.md` when applicable;
- never claim a Maou track was composed by this project;
- never use Maou music to train, condition or seed an AI music generator;
- do not upload separate raw-source track collections to this public repository if the current terms prohibit standalone redistribution;
- runtime audio may be included only to the extent permitted as part of the game/content;
- if a raw third-party source cannot be committed legally, preserve the URL, metadata, checksum and reproducible acquisition/import instructions instead of breaking the license.

Other music/SFX sites may be used only after equivalent license verification.

## 5. Audio selection map

Choose tracks intentionally and avoid a random-library feel. Maintain `design/audio/music_map.md` with at least:
- title/opening
- main field motif
- each major regional field theme
- each major town theme
- dungeon family themes
- normal battle
- dangerous/elite battle
- boss battle
- final battle
- melancholy/character scene
- mystery/tension
- victory/results
- ending/credits

Normalize loudness, create clean loop points where permitted, and ensure transitions/crossfades work in-game.

## 6. Vendor manifest

Create `assets/vendor_manifest.json` with one object per external asset. Recommended fields:

```json
{
  "id": "bgm_town_01",
  "kind": "music",
  "provider": "MaouDamashii",
  "title": "TRACK TITLE",
  "author": "Koichi Morita / 森田交一",
  "source_page": "https://...",
  "terms_url": "https://maou.audio/rule/",
  "credit_text": "音楽：魔王魂",
  "acquired_at": "YYYY-MM-DD",
  "original_filename": "...",
  "runtime_path": "public/audio/...",
  "sha256": "...",
  "edits": ["trim", "loop", "normalize", "convert to ogg"],
  "redistribution_notes": "Distributed only as part of the game under provider terms."
}
```

Do not leave blank provenance fields in the final release.

## 7. Credits and notices

`docs/THIRD_PARTY_NOTICES.md` and the in-game Credits must agree. At minimum, identify every external provider and the required attribution. If a provider requires per-track credits, list them per track.

Generated original art should be identified internally as project-generated rather than third-party licensed material, with its source prompt chain preserved.

## 8. Public-repository rule

This is a public GitHub repository. Therefore:
- commit original source assets and prompts aggressively;
- commit third-party runtime files only when the applicable license permits distribution in the game;
- do not turn `assets/source/audio/` into a redistribution archive of third-party libraries;
- where public inclusion of raw files is restricted, keep a reproducible acquisition record and retain only legally distributable derivatives/runtime assets;
- document every exception in `docs/DECISIONS.md`.

## 9. Acceptance test

Asset production is incomplete until:
- no important playable character is represented by a programmer placeholder;
- all protagonist portraits are visually consistent;
- major regions have distinct visual/audio identity;
- music changes appropriately across exploration/town/dungeon/battle/boss/story contexts;
- no missing-file console errors occur;
- all generated-art prompts/raw outputs used by the project are preserved;
- all third-party media has auditable provenance and required credits;
- the public repository contains no clearly prohibited loose redistribution.
