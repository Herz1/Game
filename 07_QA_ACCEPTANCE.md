# QA & Acceptance Criteria

## Critical-path test
From a fresh save, verify:
1. title -> new game
2. opening sequence
3. first exploration area
4. dialogue and interaction
5. first battle
6. reward/progression
7. shop/equipment interaction
8. quest acceptance/completion
9. save and reload
10. recruit additional characters
11. traverse multiple regions
12. clear at least one dungeon with shortcut/treasure
13. defeat chapter-level boss
14. trigger shared main-story escalation
15. reach final dungeon
16. defeat final boss
17. view ending/credits
18. load post-ending save or return state as designed

No step may require editing source code or opening developer tools.

## Systems QA
Test:
- all skills execute without exceptions
- all jobs have a functional progression path
- all equipment categories can be equipped as intended
- all status effects expire/stack according to rules
- break/stagger cannot soft-lock combat
- escape cannot bypass mandatory bosses
- battle defeat routes correctly to retry/load/game over
- inventory counts never become negative
- currency never becomes NaN/invalid
- save serialization restores quest/world flags
- map transitions preserve party state

## Content QA
Automated scans for:
- missing images/audio
- missing localization keys
- broken dialogue jumps
- unreachable quest states
- duplicate IDs
- impossible reward references
- missing monster bestiary data

## Visual QA
Check at minimum:
- 1920x1080
- 2560x1440 or equivalent scaling
- one smaller laptop viewport
- UI clipping
- text overflow
- focus states
- combat number readability
- dialogue portrait cropping
- camera collision/occlusion edge cases

## Performance QA
Record approximate:
- initial load time
- largest asset groups
- memory hotspots
- average FPS in most demanding scene
- battle scene FPS

Add quality settings if post effects cause unstable performance.

## Release blocker severity
P0: cannot start, progress, save, load, finish, or severe data loss.
P1: major system broken, repeatable combat lock, missing essential assets, severe UI blocker.
P2: localized visual/content defect without progression loss.

Release requires zero known P0/P1 issues.