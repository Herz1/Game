'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');const context={console};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(root,'build/runtime.js'),'utf8'),context,{timeout:15000});const L=context.LT;
const errors=[],results={mode:process.argv[2]||'data',checks:0};
const check=(condition,message)=>{results.checks++;if(!condition)errors.push(message);};
const uniq=(list,name)=>check(new Set(list.map(x=>x.id)).size===list.length,name+' has duplicate IDs');
if(results.mode==='assets'){
  const html=fs.readFileSync(path.join(root,'build/release/index.html'),'utf8'),manifest=JSON.parse(fs.readFileSync(path.join(root,'build/release/BUILD-MANIFEST.json'),'utf8'));
  check(manifest.html_sha256===crypto.createHash('sha256').update(html).digest('hex'),'HTML checksum mismatch');
  check(!/<(?:script|link|img|audio)[^>]+(?:src|href)=["']https?:/i.test(html),'External required asset reference');
  check(!/fetch\s*\(|XMLHttpRequest|new WebSocket/.test(html),'Unexpected runtime network access');
  check(html.includes('const LT_ASSETS='),'Embedded asset registry missing');
  check(html.includes('<canvas id="canvas"'),'Main canvas missing');
  for(const file of ['src/content.ts','src/core.ts','src/world.ts','src/render.ts','src/audio.ts','src/app.ts','src/style.css'])check(fs.statSync(path.join(root,file)).size>100,file+' is empty');
  const assets=/const LT_ASSETS=(\{.*?\});\n/.exec(html);check(!!assets,'Cannot parse embedded registry');
  if(assets){const registry=JSON.parse(assets[1]);for(const item of manifest.assets){const data=registry[item.id];check(!!data,'Missing '+item.id);if(data){const buffer=Buffer.from(data.split(',')[1],'base64');check(buffer.length===item.bytes,'Asset byte count '+item.id);check(crypto.createHash('sha256').update(buffer).digest('hex')===item.sha256,'Asset checksum '+item.id);}}results.embeddedImages=Object.keys(registry).length;}
  results.proceduralHeroSprites=L.HEROES.length;results.proceduralEnemyEntries=L.ENEMIES.length;results.scoreThemes=L.SCORES.length;
} else {
  for(const [name,table] of Object.entries({heroes:L.HEROES,regions:L.REGIONS,skills:L.SKILLS,items:L.ITEMS,enemies:L.ENEMIES,quests:L.QUESTS}))uniq(table,name);
  check(L.HEROES.length===8,'Need eight protagonists');check(L.REGIONS.length===8,'Need eight regions');check(L.QUESTS.length>=30,'Quest count');check(L.ITEMS.length>=100,'Item count');check(L.SKILLS.length>=80,'Skill count');check(L.ENEMIES.length>=50,'Enemy count');
  for(const h of L.HEROES){check(h.prologue.length>=3&&h.resolve.length>=3,'Incomplete personal arc '+h.id);check(!!h.bond&&!!h.need,'Missing personal identity '+h.id);}
  for(const sk of L.SKILLS){check(!!L.HEROES[sk.owner],'Unknown skill owner '+sk.id);check(L.ELEMENTS.includes(sk.element),'Unknown skill element '+sk.id);check(['damage','heal','revive','shield','buff','cleanse','scan'].includes(sk.effect),'Unknown effect '+sk.id);check(!sk.status||['poison','regen','might','slow','ward'].includes(sk.status),'Unknown status '+sk.id);check(Number.isFinite(sk.power)&&sk.power>=0&&Number.isInteger(sk.cost)&&sk.cost>=0,'Invalid skill cost '+sk.id);check(L.skillText(sk).length>8,'Missing skill text '+sk.id);}
  for(const item of L.ITEMS){check(Number.isInteger(item.price)&&item.price>0,'Invalid price '+item.id);check(item.kind!=='weapon'||!!L.HEROES[item.job],'Unknown weapon job '+item.id);}
  for(const e of L.ENEMIES){check(e.weak.length>=2&&e.weak.every(el=>L.ELEMENTS.includes(el)),'Invalid weaknesses '+e.id);check(!!e.description&&!!e.pattern,'Missing bestiary data '+e.id);}
  for(const q of L.QUESTS){check(!!L.REGIONS[q.region],'Unknown quest region '+q.id);check(!!q.request&&!!q.resolution&&!!q.objective,'Incomplete quest '+q.id);}
  const mapResults=[];for(let r=0;r<9;r++){for(const area of r===8?['final']:['town','road','dungeon','inn','shop']){const w=L.createWorld(r,area);check(L.walkable(w,w.spawn.x,w.spawn.y),'Blocked spawn '+w.id);const ids=new Set();for(const e of w.entities){check(!ids.has(e.id),'Duplicate map entity '+e.id);ids.add(e.id);if(e.kind==='exit'){check(e.region>=0&&e.region<8,'Unknown exit region '+e.id);check(['town','road','dungeon','inn','shop'].includes(e.area),'Unknown exit scene '+e.id);}if(e.kind==='quest'||e.kind==='clue')check(L.QUESTS.some(q=>q.id===e.value),'Broken quest entity '+e.id);if(e.kind==='boss'||e.kind==='elite')check(!!L.enemyById(e.value),'Broken encounter '+e.id);
      const route=L.findPath(w,w.spawn.x,w.spawn.y,e.x,e.y);const end=route[route.length-1]||w.spawn;check(Math.hypot(end.x-e.x,end.y-e.y)<=1.75,'Unreachable interaction '+e.id+' at '+e.x+','+e.y);for(const p of route)check(L.walkable(w,p.x,p.y),'Path crossed invalid floor '+e.id);
    }mapResults.push({id:w.id,entities:w.entities.length,props:w.props.length});}}
  results.maps=mapResults;results.content={heroes:L.HEROES.length,regions:L.REGIONS.length,quests:L.QUESTS.length,items:L.ITEMS.length,skills:L.SKILLS.length,enemies:L.ENEMIES.length,bosses:L.ENEMIES.filter(e=>e.boss).length};
}
results.passed=errors.length===0;results.errors=errors;fs.mkdirSync(path.join(root,'build/qa'),{recursive:true});fs.writeFileSync(path.join(root,'build/qa',results.mode+'-validation.json'),JSON.stringify(results,null,2)+'\n');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}console.log('Validated '+results.mode+': '+results.checks+' checks passed.');
