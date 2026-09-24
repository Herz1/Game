namespace LT {
  export type Area='town'|'road'|'dungeon'|'inn'|'shop'|'final';
  export interface Hero {id:number;level:number;xp:number;jp:number;hp:number;mp:number;weapon:string;armor:string;charm:string;learned:string[];secondary:number;}
  export interface BestiaryEntry {seen:number;kills:number;weak:Element[];}
  export interface Settings {music:number;sfx:number;speed:number;textSpeed:number;shake:boolean;quality:boolean;difficulty:'story'|'normal'|'hard';}
  export interface State {version:number;name:string;start:number;region:number;area:Area;x:number;y:number;roster:Hero[];active:number[];gold:number;bag:Record<string,number>;bells:number[];visited:number[];accepted:string[];completed:string[];evidence:string[];opened:string[];flags:Record<string,boolean>;kills:Record<string,number>;bestiary:Record<string,BestiaryEntry>;puzzles:Record<string,number>;relics:number[];time:number;steps:number;seed:number;finished:boolean;ending:string;settings:Settings;}
  export interface Stats {hp:number;mp:number;atk:number;mag:number;def:number;speed:number;}
  export const DEFAULT_SETTINGS:Settings={music:.35,sfx:.55,speed:1,textSpeed:32,shake:true,quality:true,difficulty:'normal'};
  export const clamp=(n:number,a:number,b:number):number=>Math.min(b,Math.max(a,n));
  export const clone=<T>(v:T):T=>JSON.parse(JSON.stringify(v)) as T;
  export const unique=<T>(v:T[]):T[]=>Array.from(new Set(v));
  export class RNG {constructor(public seed:number) {this.seed=seed>>>0||1;} next():number {let x=this.seed;x^=x<<13;x^=x>>>17;x^=x<<5;this.seed=x>>>0;return this.seed/4294967296;} int(n:number):number{return Math.floor(this.next()*n);}}
  export function stats(h:Hero):Stats {
    const d=HEROES[h.id],l=h.level-1;
    const v:Stats={hp:d.hp+l*21,mp:d.mp+l*3,atk:d.atk+l*3.3,mag:d.mag+l*3.5,def:d.def+l*2.1,speed:d.speed+l*.7};
    for(const id of [h.weapon,h.armor,h.charm]) {const it=itemById(id);if(it) for(const k of ['hp','mp','atk','mag','def','speed'] as const) v[k]+=it[k];}
    if(h.learned.includes(`p${h.id}_0`)) v.hp*=1.18;
    for(const k of Object.keys(v) as (keyof Stats)[]) v[k]=Math.round(v[k]);
    return v;
  }
  export function createHero(id:number,level=1):Hero {const h:Hero={id,level,xp:0,jp:3,hp:1,mp:1,weapon:`w${id}_0`,armor:`a${id%4}_0`,charm:'',learned:[`s${id}_0`,`s${id}_1`],secondary:-1};const s=stats(h);h.hp=s.hp;h.mp=s.mp;return h;}
  export function newState(start=0,settings:Settings=clone(DEFAULT_SETTINGS)):State {
    return {version:VERSION,name:TITLE,start,region:start,area:'town',x:14,y:18,roster:[createHero(start)],active:[start],gold:220,bag:{tea:6,ether:4,feather:2,salt:2,tent:1},bells:[],visited:[start],accepted:[],completed:[],evidence:[],opened:[],flags:{},kills:{},bestiary:{},puzzles:{},relics:[],time:0,steps:0,seed:81237,finished:false,ending:'',settings};
  }
  export const hero=(s:State,id:number):Hero=>{const h=s.roster.find(h=>h.id===id);if(!h)throw new Error('Unknown recruited hero '+id);return h;};
  export function recruit(s:State,id:number):boolean {
    if(s.roster.some(x=>x.id===id))return false;
    const lv=Math.max(1,Math.round(s.roster.reduce((n,h)=>n+h.level,0)/s.roster.length));
    const h=createHero(id,lv);h.jp+=s.bells.length*5;
    s.roster.push(h);if(s.active.length<4)s.active.push(id);return true;
  }
  export function xpFor(level:number):number{return 40+level*28;}
  export function gainXP(h:Hero,amount:number):number {let ups=0;h.xp+=Math.max(0,Math.floor(amount));while(h.level<30&&h.xp>=xpFor(h.level)){h.xp-=xpFor(h.level);h.level++;h.jp+=3;ups++;}if(h.level>=30)h.xp=Math.min(h.xp,xpFor(30)-1);if(ups){const st=stats(h);h.hp=st.hp;h.mp=st.mp;}return ups;}
  export function healParty(s:State):void {s.roster.forEach(h=>{const st=stats(h);h.hp=st.hp;h.mp=st.mp;});}
  export function usableSkills(h:Hero):Skill[] {return SKILLS.filter(sk=>!sk.passive&&(h.learned.includes(sk.id)||(h.secondary===sk.owner&&Number(sk.id.split('_')[1])<2)));}
  export function learn(h:Hero,id:string):boolean {const sk=skillById(id);if(!sk||sk.owner!==h.id||h.learned.includes(id)||h.level<sk.level||h.jp<sk.jp)return false;h.jp-=sk.jp;h.learned.push(id);return true;}
  export function equip(s:State,hid:number,id:string):boolean {const h=hero(s,hid),it=itemById(id);if(!it||it.kind==='consumable'||!(s.bag[id]>0))return false;if(it.kind==='weapon'&&it.job!==h.id&&it.job!==h.secondary)return false;const slot=it.kind;const old=h[slot];s.bag[id]--;if(old)s.bag[old]=(s.bag[old]||0)+1;h[slot]=id;const st=stats(h);h.hp=Math.min(st.hp,h.hp);h.mp=Math.min(st.mp,h.mp);return true;}
  export function buy(s:State,id:string,quantity=1):boolean {const it=itemById(id);if(!it||!Number.isInteger(quantity)||quantity<1||quantity>99||s.gold<it.price*quantity)return false;s.gold-=it.price*quantity;s.bag[id]=(s.bag[id]||0)+quantity;return true;}
  export function sell(s:State,id:string):boolean {const it=itemById(id);if(!it||!(s.bag[id]>0))return false;s.bag[id]--;s.gold+=Math.floor(it.price*.4);return true;}
  export function useFieldItem(s:State,id:string,hid:number):boolean {const it=itemById(id);if(!it||!it.use||!(s.bag[id]>0))return false;const h=hero(s,hid),st=stats(h);if(it.use==='camp'){healParty(s);}else if(it.use==='heal'&&h.hp>0&&h.hp<st.hp)h.hp=Math.min(st.hp,h.hp+Math.ceil(st.hp*(it.power||0)));else if(it.use==='mana'&&h.hp>0&&h.mp<st.mp)h.mp=Math.min(st.mp,h.mp+Math.ceil(st.mp*(it.power||0)));else if(it.use==='revive'&&h.hp===0)h.hp=Math.ceil(st.hp*(it.power||.4));else return false;s.bag[id]--;return true;}
  export function questReady(s:State,q:Quest):boolean {return q.kind==='clue'?s.evidence.includes(q.id):q.kind==='hunt'?(s.kills[q.region]||0)>=3:q.kind==='bell'?s.bells.includes(q.region):!!s.flags[`mail:${(q.region+1)%8}`];}
  export function finishQuest(s:State,id:string):boolean {const q=QUESTS.find(x=>x.id===id);if(!q||!s.accepted.includes(id)||s.completed.includes(id)||!questReady(s,q))return false;s.completed.push(id);s.gold+=q.reward;s.bag.tea=(s.bag.tea||0)+2;s.roster.forEach(h=>{gainXP(h,50+s.bells.length*10);h.jp+=2;});return true;}
  export interface Actor {key:string;team:'hero'|'enemy';heroId:number;enemyId:string;name:string;level:number;hp:number;maxhp:number;mp:number;maxmp:number;atk:number;mag:number;def:number;speed:number;focus:number;guard:number;maxguard:number;weak:Element[];statuses:Partial<Record<Status,number>>;barrier:number;stagger:boolean;phase:number;charged:boolean;defending:boolean;recovering:boolean;}
  export interface BattleEvent {kind:'hit'|'heal'|'break'|'status'|'text';target:string;source:string;amount:number;text:string;element?:Element;}
  export interface Action {type:'attack'|'skill'|'item'|'defend'|'escape';id?:string;target?:string;boost?:number;}
  export class Battle {
    actors:Actor[]=[];queue:string[]=[];current='';round=0;phase:'choose'|'enemy'|'won'|'lost'|'escaped'='choose';events:BattleEvent[]=[];log:string[]=[];rng:RNG;rewarded=false;ids:string[];mandatory:boolean;before:State;
    constructor(public state:State,ids:string[],seed=state.seed) {
      this.ids=[...ids];this.rng=new RNG(seed);this.before=clone(state);this.mandatory=ids.some(id=>enemyById(id)?.boss&&!enemyById(id)?.elite);
      for(const id of state.active){const h=hero(state,id),st=stats(h);this.actors.push({key:`h${id}`,team:'hero',heroId:id,enemyId:'',name:HEROES[id].name,level:h.level,hp:h.hp,maxhp:st.hp,mp:h.mp,maxmp:st.mp,atk:st.atk,mag:st.mag,def:st.def,speed:st.speed,focus:0,guard:0,maxguard:0,weak:[],statuses:{},barrier:0,stagger:false,phase:1,charged:false,defending:false,recovering:false});}
      const level=Math.max(1,1+state.bells.length*2);
      const diff=state.settings.difficulty==='story'?.72:state.settings.difficulty==='hard'?1.2:1;
      ids.forEach((id,i)=>{const d=enemyById(id);if(!d)throw new Error('Unknown enemy '+id);const boss=d.boss;const partyScale=boss?Math.max(.65,state.active.length*.63):1;const hp=Math.round((boss?160+level*32:48+d.variant*11+level*17)*partyScale*diff*(d.elite?1.2:1)*(boss?2.1+level*.18:1.45+level*.16));this.actors.push({key:`e${i}`,team:'enemy',heroId:-1,enemyId:id,name:d.name,level,hp,maxhp:hp,mp:999,maxmp:999,atk:Math.round((boss?15+level*3.3:11+level*2.9+d.variant)*diff),mag:Math.round((boss?17+level*3.4:10+level*3)*diff),def:7+level*2,speed:10+level*.65+d.variant,focus:0,guard:d.guard,maxguard:d.guard,weak:[...d.weak],statuses:{},barrier:0,stagger:false,phase:1,charged:false,defending:false,recovering:false});const seen=state.bestiary[id]||(state.bestiary[id]={seen:0,kills:0,weak:[]});seen.seen++;});
      this.line('察看弱点，积蓄涌势。在破绽出现时一击决定胜负。');this.next();
    }
    actor(key=this.current):Actor|undefined{return this.actors.find(a=>a.key===key);}
    living(team:'hero'|'enemy'):Actor[]{return this.actors.filter(a=>a.team===team&&a.hp>0);}
    line(t:string):void{this.log.push(t);if(this.log.length>70)this.log.shift();}
    event(kind:BattleEvent['kind'],target:Actor,source:Actor,amount:number,text:string,element?:Element):void{this.events.push({kind,target:target.key,source:source.key,amount,text,element});}
    next():void {
      if(!this.living('enemy').length){this.phase='won';this.current='';return;}
      if(!this.living('hero').length){this.phase='lost';this.current='';return;}
      if(!this.queue.length){this.round++;this.living('hero').forEach(a=>a.focus=Math.min(3,a.focus+1));this.queue=this.actors.filter(a=>a.hp>0).sort((a,b)=>b.speed*(b.statuses.slow?.7:1)-a.speed*(a.statuses.slow?.7:1)||a.key.localeCompare(b.key)).map(a=>a.key);}
      const key=this.queue.shift()!;const a=this.actor(key)!;if(a.hp<=0){this.next();return;}
      this.current=key;a.defending=false;
      if(a.stagger){a.stagger=false;a.guard=a.maxguard;a.recovering=a.team==='enemy'&&!!enemyById(a.enemyId)?.boss;this.line(a.name+'失去行动，重新站稳。');this.event('status',a,a,0,'护势重整');this.current='';this.next();return;}
      if(a.statuses.poison){const dot=Math.min(a.hp,Math.ceil(a.maxhp*(a.team==='enemy'&&enemyById(a.enemyId)?.boss?.025:.055)));a.hp-=dot;this.event('hit',a,a,dot,'蚀毒');if(a.hp<=0){this.next();return;}}
      if(a.statuses.regen){const n=Math.min(a.maxhp-a.hp,Math.ceil(a.maxhp*.09));a.hp+=n;this.event('heal',a,a,n,'再生');}
      if(a.team==='hero'){const h=hero(this.state,a.heroId);if(h.learned.includes(`p${h.id}_1`))a.mp=Math.min(a.maxmp,a.mp+2);if(h.learned.includes(`p${h.id}_3`))a.hp=Math.min(a.maxhp,a.hp+Math.ceil(a.maxhp*.04));}
      for(const k of Object.keys(a.statuses) as Status[]){a.statuses[k]=(a.statuses[k]||1)-1;if(!a.statuses[k])delete a.statuses[k];}
      this.phase=a.team==='hero'?'choose':'enemy';
    }
    intent(a:Actor):string {if(a.stagger)return '破绽 · 下次行动跳过';if(a.charged)return '大潮横扫 · 全体';if(a.recovering)return '稳势 · 下次行动前不可再破势';if(enemyById(a.enemyId)?.boss&&this.round%3===0)return '蓄潮 · 准备强击';return a.phase===2?'狂澜 · 强击':'袭击 · 单体';}
    discover(t:Actor,element:Element):void{if(t.team==='enemy'){const b=this.state.bestiary[t.enemyId];if(!b.weak.includes(element))b.weak.push(element);}}
    pressure(t:Actor,a:Actor,n:number):void{if(t.team!=='enemy'||t.stagger||t.recovering||t.hp<=0)return;t.guard=Math.max(0,t.guard-n);if(!t.guard){t.stagger=true;t.charged=false;this.line(t.name+'的护势崩解！');this.event('break',t,a,0,'BREAK');}}
    hurt(t:Actor,a:Actor,amount:number,element:Element,weak=false):void {
      let damage=Math.max(1,Math.round(amount*(t.stagger?1.55:1)*(t.defending?.43:1)*(t.statuses.ward?.7:1)));
      const block=Math.min(t.barrier,damage);t.barrier-=block;damage-=block;t.hp=Math.max(0,t.hp-damage);this.event('hit',t,a,damage,weak?'WEAK':'',element);
      if(weak){this.discover(t,element);this.pressure(t,a,1);}
    }
    act(action:Action):boolean {
      const a=this.actor();if(this.phase!=='choose'||!a||a.team!=='hero')return false;
      const boost=clamp(Math.floor(action.boost||0),0,3);if(boost>a.focus)return false;
      if(action.type==='escape'){if(this.mandatory){this.line('这一次，不能背对灯塔。');return false;}if(this.rng.next()<.8){this.phase='escaped';this.sync();this.line('你们退回了安全的路口。');return true;}this.line('撤退被阻拦！');this.next();return true;}
      if(action.type==='defend'){a.defending=true;a.focus=Math.min(3,a.focus+1);a.mp=Math.min(a.maxmp,a.mp+3);this.event('status',a,a,0,'防御 · 涌势 +1');this.next();return true;}
      if(action.type==='item'){
        const it=itemById(action.id||''),t=this.actor(action.target);if(!it||!it.use||it.use==='camp'||!(this.state.bag[it.id]>0)||!t||t.team!=='hero')return false;
        if(it.use==='revive'){if(t.hp>0)return false;t.hp=Math.ceil(t.maxhp*(it.power||.4));this.event('heal',t,a,t.hp,'苏醒');}
        else if(t.hp<=0)return false;
        else if(it.use==='heal'){const n=Math.min(t.maxhp-t.hp,Math.ceil(t.maxhp*(it.power||0)));if(!n)return false;t.hp+=n;this.event('heal',t,a,n,'回复');}
        else if(it.use==='mana'){const n=Math.min(t.maxmp-t.mp,Math.ceil(t.maxmp*(it.power||0)));if(!n)return false;t.mp+=n;this.event('status',t,a,n,'灵息');}
        else {delete t.statuses.poison;delete t.statuses.slow;this.event('status',t,a,0,'净化');}
        this.state.bag[it.id]--;this.line(a.name+'使用了'+it.name+'。');this.next();return true;
      }
      const h=hero(this.state,a.heroId);
      const basic:Skill={id:'attack',name:'攻击',owner:a.heroId,level:1,jp:0,cost:0,power:1,hits:1,all:false,effect:'damage',element:itemById(h.weapon)?.element||HEROES[h.id].element,text:''};
      const sk=action.type==='attack'?basic:usableSkills(h).find(x=>x.id===action.id);if(!sk||a.mp<sk.cost)return false;
      const friendly=['heal','revive','shield','buff','cleanse'].includes(sk.effect);const team=friendly?'hero':'enemy';
      let targets:Actor[];
      if(sk.all)targets=this.actors.filter(t=>t.team===team&&(sk.effect==='revive'?t.hp===0:t.hp>0));
      else {const t=this.actor(action.target);if(!t||t.team!==team||(sk.effect==='revive'?t.hp>0:t.hp<=0))return false;targets=[t];}
      if(!targets.length)return false;
      a.mp-=sk.cost;a.focus-=boost;this.line(a.name+' · '+sk.name+(boost?'  / 涌势 '+boost:''));
      const power=sk.power*(1+boost*.22);const passive=h.learned.includes(`p${h.id}_2`)?1.1:1;
      for(const t of targets){
        if(sk.effect==='damage'){
          for(let i=0;i<sk.hits+boost;i++){if(t.hp<=0)break;const physical=['blade','pierce','blunt'].includes(sk.element);const stat=physical?a.atk:a.mag;const weak=t.weak.includes(sk.element);const critical=this.rng.next()<.08;const n=Math.max(3,stat*1.25-t.def*.45)*power*passive*(weak?1.16:1)*(a.statuses.might?1.25:1)*(critical?1.4:1)*(.94+this.rng.next()*.12);this.hurt(t,a,n,sk.element,weak);}
          if(sk.status&&t.hp>0){t.statuses[sk.status]=3;this.event('status',t,a,0,sk.status==='poison'?'蚀毒':'迟缓');}
        }else if(sk.effect==='scan'){t.weak.forEach(e=>this.discover(t,e));this.pressure(t,a,1+boost);this.event('status',t,a,0,'弱点显现');}
        else if(sk.effect==='heal'||sk.effect==='cleanse'){const n=Math.min(t.maxhp-t.hp,Math.round((28+a.mag*1.15)*power*(1+boost*.25)));t.hp+=n;if(sk.effect==='cleanse'){delete t.statuses.poison;delete t.statuses.slow;}this.event('heal',t,a,n,sk.effect==='cleanse'?'净化':'回复');}
        else if(sk.effect==='revive'){t.hp=Math.ceil(t.maxhp*clamp(power,0.2,1));this.event('heal',t,a,t.hp,'苏醒');}
        else if(sk.effect==='shield'){const n=Math.round((20+a.def+a.mag*.6)*power);t.barrier=Math.min(t.maxhp,Math.max(t.barrier,n));this.event('status',t,a,n,'护盾');}
        else {const st=sk.status||'might';t.statuses[st]=4+boost;this.event('status',t,a,0,st==='might'?'强攻':st==='regen'?'再生':'守护');}
      }
      this.next();return true;
    }
    enemyTurn():boolean {
      const a=this.actor();if(this.phase!=='enemy'||!a)return false;const d=enemyById(a.enemyId)!;a.recovering=false;
      if(d.boss&&a.phase===1&&a.hp<=a.maxhp*.5){a.phase=2;a.weak=a.weak.map(e=>ELEMENTS[(ELEMENTS.indexOf(e)+2)%8]);a.guard=a.maxguard;this.line(a.name+'改变了姿态，弱点发生变化。');this.event('status',a,a,0,'换相');}
      if(d.boss&&this.round%3===0&&!a.charged){a.charged=true;this.line(a.name+'开始蓄潮！尽快破势，或让全员防御。');this.event('status',a,a,0,'蓄潮');this.next();return true;}
      const alive=this.living('hero');if(!alive.length){this.phase='lost';return false;}
      if(d.boss&&a.phase===2&&this.round%2===0){
        if(d.family===0||d.family===1){a.barrier=Math.round(a.maxhp*.035);this.line(a.name+'修复了外壳，获得短暂护盾。');}
        else if(d.family===2){a.weak=a.weak.map(e=>ELEMENTS[(ELEMENTS.indexOf(e)+1)%8]);this.line('镜面折转，弱点再次改变。');}
        else if(d.family===3||d.family===5){const n=Math.round(a.maxhp*.025);a.hp=Math.min(a.maxhp,a.hp+n);this.event('heal',a,a,n,'汲忆');}
        else if(d.family===4){alive.forEach(t=>t.focus=Math.max(0,t.focus-1));this.line('裂面吸走了每位旅人 1 点涌势。');}
        else if(d.family===6){a.statuses.might=2;this.line('炉心过载，下一击会更猛烈。');}
        else {alive.forEach(t=>t.statuses.slow=2);this.line('霜雪延缓了队伍的行动。');}
      }
      const targets=a.charged?[...alive]:[alive[this.rng.int(alive.length)]];
      const mult=a.charged?1.85:a.phase===2?1.28:1;
      for(const t of targets){const element=ELEMENTS[(d.region+d.variant)%8];this.hurt(t,a,Math.max(4,a.atk*1.32-t.def*.43)*mult*(.94+this.rng.next()*.12),element);if(t.hp>0&&(d.variant===5||d.elite)&&this.rng.next()<.3){t.statuses.poison=3;this.event('status',t,a,0,'蚀毒');}}
      this.line(a.name+(a.charged?'释放了大潮横扫！':'发动袭击。'));a.charged=false;this.next();return true;
    }
    sync():void{for(const a of this.actors.filter(a=>a.team==='hero')){const h=hero(this.state,a.heroId);h.hp=a.hp;h.mp=a.mp;}this.state.seed=this.rng.seed;}
    reward():{gold:number;xp:number;levels:string[]} {
      if(this.phase!=='won'||this.rewarded)return {gold:0,xp:0,levels:[]};this.rewarded=true;this.sync();let gold=0,xp=0;
      const level=1+this.state.bells.length*2;
      for(const id of this.ids){const d=enemyById(id)!;gold+=d.boss?180+level*22:14+level*5;xp+=d.boss?120+level*22:20+level*7;this.state.bestiary[id].kills++;if(d.boss)this.state.flags['boss:'+id]=true;}
      if(this.ids.every(id=>!enemyById(id)?.boss))this.state.kills[this.state.region]=(this.state.kills[this.state.region]||0)+1;
      const levels:string[]=[];for(const h of this.state.roster){const n=gainXP(h,this.state.active.includes(h.id)?xp:Math.floor(xp*.75));h.jp+=this.ids.some(id=>enemyById(id)?.boss)?6:1;if(n)levels.push(HEROES[h.id].name+' +'+n);}
      this.state.gold+=gold;this.state.bag.tea=(this.state.bag.tea||0)+1;
      return {gold,xp,levels};
    }
  }
  export function checksum(text:string):string {let h=2166136261;for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16).padStart(8,'0');}
  export function encodeSave(s:State):string {const payload=JSON.stringify(s);return JSON.stringify({version:VERSION,payload,checksum:checksum(payload)});}
  export function decodeSave(raw:string):State {
    if(raw.length>2000000)throw new Error('存档过大。');
    const envelope=JSON.parse(raw) as Record<string,unknown>;
    let o:unknown;
    if(typeof envelope.payload==='string'){if(envelope.checksum!==checksum(envelope.payload))throw new Error('存档校验失败，原存档未被覆盖。');o=JSON.parse(envelope.payload);}else if(envelope.version===1)o=envelope;else throw new Error('无法识别的存档格式。');
    if(!o||typeof o!=='object')throw new Error('存档结构错误。');
    const s=o as State;
    if(![1,VERSION].includes(s.version)||!Number.isInteger(s.start)||s.start<0||s.start>7||!Number.isInteger(s.region)||s.region<0||s.region>8)throw new Error('地区数据错误。');
    if(!['town','road','dungeon','inn','shop','final'].includes(s.area))throw new Error('场景数据错误。');
    if(!Array.isArray(s.roster)||s.roster.length<1||s.roster.length>8||!Array.isArray(s.active)||s.active.length<1||s.active.length>4)throw new Error('队伍数据错误。');
    if(unique(s.roster.map(h=>h.id)).length!==s.roster.length||unique(s.active).length!==s.active.length)throw new Error('旅人编号重复。');
    for(const h of s.roster){if(!Number.isInteger(h.id)||!HEROES[h.id]||!Number.isInteger(h.level)||h.level<1||h.level>30||!Array.isArray(h.learned)||!h.learned.every(id=>!!skillById(id)))throw new Error('旅人数据错误。');for(const k of ['hp','mp','xp','jp'] as const)if(!Number.isFinite(h[k])||h[k]<0)throw new Error('旅人数值错误。');for(const k of ['weapon','armor','charm'] as const){if(h[k]&&itemById(h[k])?.kind!==k)throw new Error('装备数据错误。');}if(!Number.isInteger(h.secondary)||h.secondary< -1||h.secondary>7)h.secondary=-1;const st=stats(h);h.hp=Math.min(st.hp,h.hp);h.mp=Math.min(st.mp,h.mp);}
    if(!s.active.every(id=>s.roster.some(h=>h.id===id)))throw new Error('存在未招募的出战旅人。');
    if(!Number.isFinite(s.gold)||s.gold<0||s.gold>100000000||!s.bag||typeof s.bag!=='object')throw new Error('物品数据错误。');
    for(const [id,n] of Object.entries(s.bag))if(!itemById(id)||!Number.isInteger(n)||n<0||n>99999)throw new Error('物品数据错误。');
    for(const key of ['bells','visited','relics'] as const)if(!Array.isArray(s[key])||!s[key].every(n=>Number.isInteger(n)&&n>=0&&n<(key==='relics'?4:8)))throw new Error('进度数据错误。');
    for(const key of ['accepted','completed','evidence','opened'] as const)if(!Array.isArray(s[key])||!s[key].every(x=>typeof x==='string'&&x.length<100))throw new Error('任务数据错误。');
    if(!s.accepted.every(id=>QUESTS.some(q=>q.id===id))||!s.completed.every(id=>s.accepted.includes(id)))throw new Error('任务依赖错误。');
    for(const k of ['flags','kills','bestiary','puzzles'] as const)if(!s[k]||typeof s[k]!=='object'||Array.isArray(s[k]))throw new Error('世界数据错误。');
    for(const [id,b] of Object.entries(s.bestiary))if(!enemyById(id)||!b||!Number.isFinite(b.seen)||!Number.isFinite(b.kills)||!Array.isArray(b.weak)||!b.weak.every(e=>ELEMENTS.includes(e)))throw new Error('图鉴数据错误。');
    if(!Number.isFinite(s.x)||!Number.isFinite(s.y))throw new Error('坐标数据错误。');s.x=clamp(s.x,1,30);s.y=clamp(s.y,1,26);
    const se={...DEFAULT_SETTINGS,...s.settings};se.music=clamp(Number.isFinite(se.music)?se.music:.35,0,1);se.sfx=clamp(Number.isFinite(se.sfx)?se.sfx:.55,0,1);se.speed=clamp(Number.isFinite(se.speed)?se.speed:1,.5,3);se.textSpeed=clamp(Number.isFinite(se.textSpeed)?se.textSpeed:32,8,120);if(!['story','normal','hard'].includes(se.difficulty))se.difficulty='normal';s.settings=se;s.time=Number.isFinite(s.time)?Math.max(0,s.time):0;s.steps=Number.isFinite(s.steps)?Math.max(0,s.steps):0;s.seed=s.seed>>>0||1;s.version=VERSION;s.finished=!!s.finished;s.ending=typeof s.ending==='string'?s.ending:'';s.name=TITLE;return s;
  }
  export interface StorageLike {getItem(key:string):string|null;setItem(key:string,value:string):void;removeItem(key:string):void;}
  export class SaveStore {
    constructor(public storage:StorageLike){}
    key(slot:number):string{if(!Number.isInteger(slot)||slot<0||slot>3)throw new Error('存档位无效。');return 'lantern-tides:v2:slot'+slot;}
    write(slot:number,s:State):void{const key=this.key(slot),text=encodeSave(s);decodeSave(text);this.storage.setItem(key+':pending',text);const check=this.storage.getItem(key+':pending');if(check!==text)throw new Error('存储未能写入。');this.storage.setItem(key,text);this.storage.removeItem(key+':pending');}
    read(slot:number):State|null{const text=this.storage.getItem(this.key(slot));return text?decodeSave(text):null;}
    summary(slot:number):string{try{const s=this.read(slot);return s?`${HEROES[s.start].name} · ${s.region===8?'静潮中枢':REGIONS[s.region].name} · 潮铃 ${s.bells.length}/8 · ${Math.floor(s.time/60)} 分钟${s.finished?' · 通关':''}`:'尚未写下的旅途';}catch{return '存档损坏 · 可导入备份或覆盖';}}
  }
}
