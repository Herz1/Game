# Technical Architecture

## Primary target
A fully static-hostable browser build that can be tested in the available environment. Default stack: TypeScript + Vite + Three.js + WebAudio + HTML/CSS/lightweight UI layer.

## Architecture goals
- deterministic-enough battle logic for testing
- data-driven content
- rendering separated from game rules
- save data versioned and validated
- explicit scene/state machine
- reusable interaction/quest triggers
- asset registry with missing-asset detection
- debug tooling that can be disabled in release

## Suggested modules
- App/Game bootstrap
- scene manager
- world renderer
- map loader
- player controller
- interaction system
- NPC system
- quest state machine
- encounter manager
- battle state machine
- action resolver
- AI selector
- combat formulas
- jobs/skills system
- inventory/equipment
- economy/shops
- dialogue runner
- journal/bestiary/glossary
- save manager
- input mapper
- audio mixer
- UI router/focus manager
- asset loader/cache
- debug/telemetry tools

## Data validation
Create scripts that reject:
- duplicate IDs
- missing localization keys
- missing asset references
- impossible quest dependencies
- skill references to unknown status effects
- equipment references to unknown jobs/types
- encounter references to unknown enemies
- dialogue jumps to missing nodes
- map exits to missing maps

## Performance targets
Aim for smooth play on a mid-range desktop browser at 1080p. Prefer stable frame pacing over excessive effects. Provide quality toggles for expensive post-processing if needed.

## Accessibility / usability
- rebindable or clearly documented controls
- volume sliders
- text speed
- screen shake toggle/reduction
- animation speed where feasible
- high-contrast focus indication

## Build
Required scripts should include equivalents of:
- dev
- build
- preview
- typecheck
- lint
- test
- validate:data
- validate:assets

A fresh clone should need only documented package-manager commands.