namespace LT {
  export interface Prop {id:string;type:'house'|'tree'|'rock'|'lamp'|'fountain'|'crate'|'arch'|'pillar'|'shelf'|'bed'|'rug'|'boat'|'banner';x:number;y:number;w:number;h:number;variant:number;solid:boolean;label?:string;}
  export type EntityKind='recruit'|'quest'|'mail'|'shop'|'inn'|'exit'|'chest'|'enemy'|'boss'|'switch'|'sign'|'clue'|'save'|'elite'|'finalboat';
  export interface Entity {id:string;kind:EntityKind;x:number;y:number;label:string;value:string;region?:number;area?:Area;portrait?:number;}
  export interface World {id:string;name:string;subtitle:string;width:number;height:number;region:number;area:Area;tiles:number[][];props:Prop[];entities:Entity[];spawn:{x:number;y:number};hazards:{x:number;y:number}[];}
  export const puzzleOrder=(r:number):number[]=>r%3===0?[0,1,2]:r%3===1?[1,2,0]:[2,0,1];
  export const puzzleLabel=(i:number):string=>['潮','星','灯'][i];
  export function createWorld(region:number,area:Area):World {
    const r=Math.min(region,7),rng=new RNG(43101+region*829+area.length*71),width=32,height=28;
    const tiles=Array.from({length:height},()=>Array(width).fill(0) as number[]);
    const w:World={id:`${region}:${area}`,name:area==='final'?'静潮中枢':area==='town'?REGIONS[r].name:area==='road'?REGIONS[r].road:area==='dungeon'?REGIONS[r].dungeon:area==='inn'?'归人旅舍':'旅人商会',subtitle:area==='final'?'把一个会受伤的明天，还给所有人':REGIONS[r].subtitle,width,height,region,area,tiles,props:[],entities:[],spawn:{x:15,y:18},hazards:[]};
    const fill=(x:number,y:number,ww:number,hh:number,t:number):void=>{for(let yy=y;yy<y+hh;yy++)for(let xx=x;xx<x+ww;xx++)if(xx>=0&&yy>=0&&xx<width&&yy<height)tiles[yy][xx]=t;};
    const carve=(points:number[][],radius=1,t=1):void=>{for(let i=0;i<points.length-1;i++){let [x,y]=points[i];const [ex,ey]=points[i+1];while(x!==ex||y!==ey){fill(x-radius,y-radius,radius*2+1,radius*2+1,t);if(x!==ex)x+=Math.sign(ex-x);else y+=Math.sign(ey-y);}fill(ex-radius,ey-radius,radius*2+1,radius*2+1,t);}};
    const prop=(type:Prop['type'],x:number,y:number,ww=1,hh=1,variant=0,solid=false,label=''):void=>{w.props.push({id:`p${w.props.length}`,type,x,y,w:ww,h:hh,variant,solid,label});};
    const ent=(kind:EntityKind,x:number,y:number,label:string,value='',extra:Partial<Entity>={}):void=>{w.entities.push({id:`${w.id}:${kind}:${w.entities.length}`,kind,x,y,label,value,...extra});};
    if(area==='town'){
      if(r===0||r===5){fill(0,0,4,height,2);fill(0,24,width,4,2);fill(5,23,7,3,1);prop('boat',8,26,2,1,r);}
      else if(r===2||r===4){fill(0,0,3,height,2);fill(0,24,width,4,2);fill(3,23,8,3,1);}
      carve([[4,20],[15,20],[15,11],[26,11],[26,22]],1);carve([[7,9],[23,9]],1);carve([[10,9],[10,20],[24,20]],1);fill(12,10,9,9,1);
      const houses:[number,number,number,string][]=[[7,4,0,'旅人商会'],[18,4,1,'归人旅舍'],[24,13,2,''],[5,14,3,''],[17,21,4,''],[23,4,5,'']];
      houses.forEach(([x,y,v,label])=>prop('house',x,y,3,3,v,true,label));
      prop('fountain',15,14,1.2,1.2,r,true);prop('banner',13,10,1,1,r);prop('banner',19,10,1,1,r);
      for(const [x,y]of [[11,9],[22,9],[11,18],[21,18],[26,20],[7,22]])prop('lamp',x,y,1,1,r);
      for(const [x,y,v]of [[12,5,0],[16,5,1],[24,19,2],[6,21,0]])prop('crate',x,y,1,1,v,true);
      ent('shop',8.5,8.5,'旅人商会','',{area:'shop'});ent('inn',19.5,8.5,'归人旅舍','',{area:'inn'});
      ent('recruit',15,11.3,HEROES[r].name,String(r),{portrait:r});
      const positions=[[12,12],[20,12],[12,16.5],[20,16.5]];
      QUESTS.filter(q=>q.region===r).forEach((q,i)=>ent('quest',positions[i][0],positions[i][1],q.npc,q.id,{portrait:(r+i+2)%8}));
      ent('mail',10.5,20.5,'旅人信箱',String(r));ent('save',15,19,'归灯 · 记录旅途');
      ent('exit',26,22,'前往 '+REGIONS[r].road,'',{region:r,area:'road'});
      ent('chest',22,7.8,'旧木箱',`town:${r}`);ent('finalboat',7,23,'驶向第八座灯塔');
      ent('sign',15,21,'旅人路牌','八座城镇沿海相连。沿野外道路可进入下一座城镇；寻找当地旅人，一起前往灯塔。已到访城镇可以通过地图快速旅行。');
    } else if(area==='road'){
      w.spawn={x:4,y:23};
      if(r===0||r===2||r===4||r===5){fill(0,0,4,height,2);fill(0,0,width,4,2);fill(15,0,3,14,2);}
      carve([[4,23],[8,23],[8,17],[14,17],[14,10],[25,10],[25,5]],1);
      carve([[14,17],[22,17],[22,23],[28,23]],1);carve([[8,17],[8,7],[12,7]],1);carve([[22,17],[27,17]],1);
      for(const [x,y]of [[7,23],[14,12],[24,7],[23,23]])prop('lamp',x,y,1,1,r);
      prop('arch',25,5,2,1,r);prop('banner',28,22,1,1,r);prop('banner',4,22,1,1,r);
      ent('exit',4,24,'返回 '+REGIONS[r].name,'',{region:r,area:'town'});
      ent('exit',25,5,'进入 '+REGIONS[r].dungeon,'',{region:r,area:'dungeon'});
      ent('exit',28,23,'通往 '+REGIONS[(r+1)%8].name,'',{region:(r+1)%8,area:'town'});
      ent('enemy',8,19,'徘徊的影子',`0`);ent('enemy',14,13,'野外群落',`1`);ent('enemy',21,10,'守径的群落',`2`);
      ent('clue',12,7,'调查遗落之物',`q${r*4}`);ent('chest',27,17,'隐蔽的行囊',`road:${r}:0`);ent('chest',22,24,'旅人的木箱',`road:${r}:1`);
      if(r%2===0)ent('elite',8,8,'旧灯遗迹',`x${r/2}`);
      ent('sign',5,23,'远行告示','路上的敌人清晰可见。靠近会进入战斗，也可以绕行。三盏小灯会告诉你本地灯塔的开门顺序。');
    } else if(area==='dungeon'||area==='final'){
      for(let y=0;y<height;y++)for(let x=0;x<width;x++)tiles[y][x]=6;
      w.spawn={x:4,y:24};
      carve([[4,24],[4,16],[12,16],[12,22],[22,22],[22,12],[15,12],[15,5],[26,5]],1,4);
      fill(2,21,6,5,4);fill(10,19,5,6,4);fill(19,19,6,6,4);fill(13,9,5,6,4);fill(22,2,8,7,4);carve([[22,22],[27,22],[27,17]],1,4);
      if(area==='final') {fill(2,2,5,6,4);carve([[4,16],[4,5],[15,5]],1,4);}
      for(let i=0;i<26;i++){const x=2+rng.int(28),y=2+rng.int(24);if(tiles[y][x]===6&&Math.abs(x-15)+Math.abs(y-12)>2)prop('pillar',x,y,1,1,i%3);}
      for(const [x,y]of [[3,23],[5,17],[11,20],[21,20],[21,12],[14,10],[24,4],[28,4]])prop('lamp',x,y,1,1,r);
      prop('arch',25,3,3,1,r);prop('rug',25,5,3,2,r);
      ent('exit',4,24,area==='final'?'返回暮汐港':'返回 '+REGIONS[r].road,'',{region:area==='final'?0:r,area:area==='final'?'town':'road'});
      ent('sign',5,23,'铭文',area==='final'?'八个声音，各自不同，却可以一同回答。潮 → 星 → 灯。':REGIONS[r].clue);
      const pos=[[4,15],[12,22],[15,11]];pos.forEach(([x,y],i)=>ent('switch',x,y,puzzleLabel(i)+'之灯',String(i)));
      ent('enemy',4,19,'暗处的守卫','3');ent('enemy',20,22,'灯芯聚集体','4');ent('enemy',15,7,'最后的守卫','5');
      ent('chest',11,23,'刻纹宝匣',`dungeon:${region}:0`);ent('chest',27,17,'封存的旅物',`dungeon:${region}:1`);
      ent('boss',26,5,area==='final'?'守灯人 · 奥伦':REGIONS[r].boss,area==='final'?'final0':`b${r}`);
      w.hazards=[{x:12,y:19},{x:22,y:15}];
    } else {
      for(let y=0;y<height;y++)for(let x=0;x<width;x++)tiles[y][x]=6;
      fill(8,7,16,15,4);w.spawn={x:16,y:19};
      for(let x=8;x<24;x+=2)prop('shelf',x,7,1.8,1,r,true);
      if(area==='inn'){for(const x of [10,15,20])prop('bed',x,10,2,3,r,true);prop('rug',16,17,5,3,r);ent('inn',16,15,'旅舍主人','rest');}
      else {for(const x of [10,13,17,20])prop('crate',x,11,1,1,r,true);prop('shelf',12,14,7,1,r,true);ent('shop',16,16,'旅人商人','trade');}
      prop('lamp',9,19,1,1,r);prop('lamp',22,19,1,1,r);ent('exit',16,21,'返回 '+REGIONS[r].name,'',{region:r,area:'town'});
    }
    if(area==='town'||area==='road'){
      for(let i=0;i<170;i++){
        const x=1+rng.int(30),y=1+rng.int(26);if(tiles[y][x]!==0)continue;
        if(w.props.some(p=>Math.abs(p.x-x)<p.w+1&&Math.abs(p.y-y)<p.h+1)||w.entities.some(e=>Math.hypot(e.x-x,e.y-y)<2))continue;
        prop(i%8===0?'rock':'tree',x+.2*rng.next(),y+.2*rng.next(),1,1,rng.int(6),false);
      }
    }
    return w;
  }
  export function walkable(w:World,x:number,y:number):boolean {
    if(x<.6||y<.6||x>w.width-1.1||y>w.height-1.1)return false;
    const t=w.tiles[Math.floor(y)]?.[Math.floor(x)];if(t===undefined||t===2||t===6)return false;
    return !w.props.some(p=>p.solid&&x>p.x-.15&&x<p.x+p.w+.15&&y>p.y-.15&&y<p.y+p.h+.15);
  }
  export function findPath(w:World,sx:number,sy:number,tx:number,ty:number):{x:number;y:number}[] {
    let gx=Math.floor(tx),gy=Math.floor(ty);
    if(!walkable(w,gx+.5,gy+.5)){
      let best=Infinity;for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){const x=Math.floor(tx)+dx,y=Math.floor(ty)+dy;if(walkable(w,x+.5,y+.5)){const d=Math.hypot(x+.5-tx,y+.5-ty);if(d<best){best=d;gx=x;gy=y;}}}if(!Number.isFinite(best))return [];
    }
    const start=[Math.floor(sx),Math.floor(sy)],key=(x:number,y:number)=>y*w.width+x,startKey=key(start[0],start[1]),goal=key(gx,gy);
    const open:{x:number;y:number;g:number;f:number}[]=[{x:start[0],y:start[1],g:0,f:0}],came=new Map<number,number>(),score=new Map<number,number>([[startKey,0]]),closed=new Set<number>();
    const directions=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
    while(open.length){open.sort((a,b)=>a.f-b.f);const c=open.shift()!,ck=key(c.x,c.y);if(closed.has(ck))continue;if(ck===goal){const path:{x:number;y:number}[]=[];let k=goal;while(k!==startKey){path.unshift({x:k%w.width+.5,y:Math.floor(k/w.width)+.5});const prev=came.get(k);if(prev===undefined)return [];k=prev;}return path;}closed.add(ck);
      for(const [dx,dy]of directions){const x=c.x+dx,y=c.y+dy;if(!walkable(w,x+.5,y+.5)||dx!==0&&dy!==0&&(!walkable(w,c.x+dx+.5,c.y+.5)||!walkable(w,c.x+.5,c.y+dy+.5)))continue;const nk=key(x,y),g=c.g+(dx&&dy?1.414:1);if(g<(score.get(nk)??Infinity)){score.set(nk,g);came.set(nk,ck);open.push({x,y,g,f:g+Math.hypot(gx-x,gy-y)});}}
    }return [];
  }
  export function entityVisible(s:State,e:Entity):boolean {if(e.kind==='chest')return !s.opened.includes(e.value);if(e.kind==='clue')return !s.evidence.includes(e.value);if(e.kind==='enemy')return !s.flags['enc:'+e.id];if(e.kind==='elite')return !s.flags['boss:'+e.value];return true;}
  export function interactionLabel(s:State,e:Entity):string {if(e.kind==='recruit')return s.roster.some(h=>h.id===Number(e.value))?e.label+' · 交谈':e.label+' · 同行';if(e.kind==='boss'&&s.flags['boss:'+e.value])return '归航捷径';if(e.kind==='quest'){const q=QUESTS.find(q=>q.id===e.value)!;return s.completed.includes(q.id)?e.label:questReady(s,q)&&s.accepted.includes(q.id)?'委托完成 · '+q.name:e.label+' · 委托';}return e.label;}
}
