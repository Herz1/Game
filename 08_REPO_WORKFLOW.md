# Repository & Artifact Preservation Workflow

## Start
Use a brand-new repository. Do not import files from commercial games. Commit the supplied production docs first.

## Preservation
Never overwrite a raw generated asset without first saving the original. Use versioned filenames when materially changing art or audio.

Example:
- `assets/source/portraits/hero_a_v01.png`
- `assets/source/portraits/hero_a_v02.png`
- `assets/processed/portraits/hero_a_ingame.png`
- `assets/prompts/hero_a_portrait.md`

## Archive
Move obsolete but meaningful source material to `archive/` rather than deleting it. Generated build artifacts may be cleaned and regenerated, but the final release build should be retained under `build/release/`.

## Decisions
Every major scope/tech substitution should be recorded in `docs/DECISIONS.md` with:
- date/order
- decision
- reason
- alternatives considered
- consequence

## Commit discipline
Prefer coherent milestone commits. Never leave the final project with all history collapsed into one giant unreviewable commit if repository write access is available.

## Final handoff
`docs/FINAL_HANDOFF.md` must list:
- implemented scope counts
- controls
- dev command
- test commands
- production build command
- deploy instructions
- save-data location/schema version
- asset provenance
- known limitations
- file locations for raw assets and prompts

## Third-party asset preservation in a public repository
The repository is public, so preservation must not become unauthorized redistribution.

For original/Image-2.5-generated assets, preserve the complete source chain in Git whenever practical: prompt, raw generation, working files, processed files and runtime version.

For third-party music/SFX:
- verify current license terms before use;
- create/update `assets/vendor_manifest.json` and `docs/THIRD_PARTY_NOTICES.md`;
- preserve title, author, source URL, terms URL, credit string, date acquired, original filename, runtime filename, checksum and edits;
- include runtime copies only when distribution as part of the game is permitted;
- do not commit a separate high-quality raw-source mirror when the provider prohibits standalone redistribution;
- if raw files cannot be committed legally, preserve a reproducible fetch/import note or script plus the checksum instead of violating the license;
- never delete an original generated asset merely to save space; archive superseded original work under `archive/`.

For MaouDamashii specifically, re-check `https://maou.audio/rule/` at acquisition time and keep the required credit in both the game credits and third-party notices.
