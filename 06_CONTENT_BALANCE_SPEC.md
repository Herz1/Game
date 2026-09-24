# Content & Balance Specification

## Data-first rule
Every repeated content type should be represented as data, not duplicated bespoke code.

## Characters
Each character entry should define:
- ID/name
- base stats and growth profile
- job
- equipment permissions
- skills/passives
- focus/burst behavior
- portrait/sprite asset references
- recruitment flags
- battle barks / key localization IDs

## Enemies
Each enemy defines:
- HP and relevant combat stats
- guard/stability value
- weaknesses/resistances
- AI pattern
- abilities
- status immunities/resistances
- loot/XP/currency
- bestiary text
- region/encounter tags

## Bosses
Every boss must have at least one tactical identity beyond high stats. Examples of mechanic *types*:
- changing weaknesses
- break-window punishment
- adds/support entities
- stance shifts
- battlefield hazards
- telegraphed charged attacks
- resource theft/lock
- party-position pressure
- phase transition with altered priorities

## Items and equipment
Avoid large lists of meaningless +1 upgrades. Create noticeable breakpoints, sidegrades and role-supporting accessories.

## Difficulty bands
Define target battle lengths and resource pressure for:
- trivial encounter
- normal encounter
- elite encounter
- chapter boss
- optional boss
- final boss phase

## Simulation
Write tools to run thousands of simplified battles or damage calculations across representative party states. Use the results to catch:
- runaway damage scaling
- healing that trivializes attrition
- permanently optimal single strategy
- unusable skills
- status-lock exploits
- impossible boss DPS checks
- economy inflation or bankruptcy traps

## Content matrix target
Track completion in a table covering:
- protagonists
- regions
- towns
- routes
- dungeons
- bosses
- enemy families
- side quests
- shops
- treasure sets
- music/ambience
- portraits
- sprites
- narrative chapters

Every row should have status: planned / implemented / integrated / QA passed.