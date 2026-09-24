'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, text) => { const p = path.join(root, file); fs.mkdirSync(path.dirname(p), {recursive:true}); fs.writeFileSync(p, text); };
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const runtime = read('build/runtime.js').replace(/\/\/# sourceMappingURL=.*$/gm, '');
const css = read('src/style.css');
const assets = {};
const embeddedPath = path.join(root, 'assets/processed/embedded.json');
if (fs.existsSync(embeddedPath)) Object.assign(assets, JSON.parse(fs.readFileSync(embeddedPath, 'utf8')));
const candidates = [['title','assets/processed/title.webp'], ...Array.from({length:8}, (_,i)=>['portrait'+i,`assets/processed/portraits/hero-${i}.webp`])];
for (const [id, file] of candidates) {const p=path.join(root,file);if(fs.existsSync(p))assets[id]='data:image/webp;base64,'+fs.readFileSync(p).toString('base64');}
for (const [id,value] of Object.entries(assets)) if(!/^data:image\/(webp|png|jpeg);base64,[A-Za-z0-9+/=]+$/.test(value)) throw new Error('Invalid embedded image: '+id);
const assetLiteral=JSON.stringify(assets).replace(/</g,'\\u003c');
const html=`<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"><meta name="color-scheme" content="dark"><meta name="description" content="Lantern Tides: an original complete eight-traveler fantasy JRPG. Offline, no ads, no telemetry."><title>灯潮 · 第八座灯塔 | Lantern Tides</title><style>${css}</style></head>
<body><main id="game" aria-label="灯潮游戏"><canvas id="canvas" aria-label="探索与战斗场景"></canvas><div id="hud"></div><div id="ui"></div><div id="dialog-layer"></div><div id="tip"></div><div id="toast" role="status" aria-live="polite"></div><div id="touch"><div class="dpad"><span></span><button data-key="w" aria-label="向上">↑</button><span></span><button data-key="a" aria-label="向左">←</button><span></span><button data-key="d" aria-label="向右">→</button><span></span><button data-key="s" aria-label="向下">↓</button><span></span></div><button class="touch-confirm" data-a="interact" aria-label="交互">E</button></div></main><input id="import-save" type="file" accept=".json,application/json" hidden><script>const LT_ASSETS=${assetLiteral};\n${runtime.replace(/<\/script/gi,'<\\/script')}</script></body></html>`;
write('build/release/index.html',html);
const ctx={console};vm.createContext(ctx);vm.runInContext(runtime,ctx,{timeout:10000});const LT=ctx.LT;
const tables={heroes:LT.HEROES,regions:LT.REGIONS,skills:LT.SKILLS,items:LT.ITEMS,enemies:LT.ENEMIES,quests:LT.QUESTS,glossary:LT.GLOSSARY,acts:LT.ACTS,scores:LT.SCORES};
write('build/data/content.json',JSON.stringify(tables,null,2)+'\n');
const maps=[];for(let r=0;r<8;r++)for(const area of ['town','road','dungeon','inn','shop'])maps.push(LT.createWorld(r,area));maps.push(LT.createWorld(8,'final'));
write('build/data/maps.json',JSON.stringify(maps,null,2)+'\n');
write('build/release/BUILD-MANIFEST.json',JSON.stringify({title:LT.TITLE,version:LT.VERSION,format:'one self-contained HTML',html_sha256:sha(Buffer.from(html)),html_bytes:Buffer.byteLength(html),runtime_sha256:sha(Buffer.from(runtime)),assets:Object.entries(assets).map(([id,data])=>({id,sha256:sha(Buffer.from(data.split(',')[1],'base64')),bytes:Buffer.from(data.split(',')[1],'base64').length})),content_counts:Object.fromEntries(Object.entries(tables).map(([k,v])=>[k,v.length])),maps:maps.length,external_runtime_requests:0},null,2)+'\n');
console.log('Built build/release/index.html ('+Buffer.byteLength(html)+' bytes), '+Object.keys(assets).length+' embedded images, '+maps.length+' maps.');
