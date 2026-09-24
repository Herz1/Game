# Game — GPT-6 Pro Full JRPG Production Repository

This repository is prepared as the single source of truth for a one-shot autonomous GPT-6 Pro game-production run.

## Start here
The agent must read **`00_MASTER_PROMPT.md` first**, then read `01` through `10` in order before starting implementation.

The target is an **original, complete, start-to-finish HD-2D / high-definition pixel-art Japanese fantasy JRPG**, not a mock-up or vertical slice. The production brief deliberately uses modern HD-2D JRPGs as a genre/quality reference while forbidding direct copying of commercial characters, maps, UI, story, art, audio or proprietary game data.

## Mandatory production documents
- `00_MASTER_PROMPT.md` — highest-priority execution instruction
- `01_PROJECT_CHARTER.md` — product promise and success criteria
- `02_GDD.md` — gameplay/system design
- `03_WORLD_NARRATIVE_BIBLE.md` — world, cast and narrative structure
- `04_ART_UI_AUDIO_BIBLE.md` — visual, interface and audio direction
- `05_TECH_ARCHITECTURE.md` — implementation architecture
- `06_CONTENT_BALANCE_SPEC.md` — content/balance targets
- `07_QA_ACCEPTANCE.md` — QA and completion gate
- `08_REPO_WORKFLOW.md` — Git/artifact preservation rules
- `09_FINAL_HANDOFF_CHECKLIST.md` — release checklist
- `10_ASSET_ACQUISITION.md` — Image 2.5 generation + licensed music/SFX acquisition rules

## Asset note
When available, GPT-6 Pro should actively call **Image 2.5** (or the strongest integrated image-generation tool available) for original portraits, expression sheets, title art, monsters and environment concepts, preserving prompts/raw outputs/processed derivatives.

Music may be sourced from properly licensed libraries such as **魔王魂 / MaouDamashii** (`https://maou.audio/category/bgm/`) after re-checking the current terms and recording attribution/provenance. This public repository must not become a loose redistribution mirror of third-party audio.

## Agent instruction
Do not stop after writing a plan. Do not wait for routine design confirmations. Build, test, fix, package and hand off the actual game, preserving source and intermediate work throughout.
