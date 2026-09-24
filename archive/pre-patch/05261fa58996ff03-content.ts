namespace LT {
  export const VERSION = 2;
  export const TITLE = '灯潮 · 第八座灯塔';
  export type Element = 'blade'|'pierce'|'blunt'|'fire'|'frost'|'wind'|'light'|'shade';
  export const ELEMENTS: Element[] = ['blade','pierce','blunt','fire','frost','wind','light','shade'];
  export const ELEMENT_NAME: Record<Element,string> = {blade:'斩',pierce:'刺',blunt:'锤',fire:'火',frost:'冰',wind:'风',light:'光',shade:'影'};
  export const ELEMENT_COLOR: Record<Element,string> = {blade:'#e0bea0',pierce:'#dacaad',blunt:'#bca480',fire:'#ec9870',frost:'#91d5e2',wind:'#a8d5ae',light:'#f1dba0',shade:'#b49aca'};
  export interface HeroDef { id:number; name:string; full:string; job:string; age:number; color:string; hair:string; element:Element; hp:number; mp:number; atk:number; mag:number; def:number; speed:number; intro:string; need:string; prologue:string[]; resolve:string[]; bond:string; }
  export const HEROES:HeroDef[] = [
    {id:0,name:'澪',full:'澪 · 汐见',job:'听潮士',age:24,color:'#45999b',hair:'#24364b',element:'pierce',hp:116,mp:38,atk:20,mag:23,def:12,speed:19,intro:'她能听见海，却再也想不起母亲的声音。',need:'取回母亲最后一次出航的航线。',prologue:['海没有声音。不是风停了，是整片港湾忘了怎样涨潮。','我的罗盘还指着母亲的船。可船坞的账本说，那艘船从来没有存在过。','老守港人给了我一枚断裂的潮铃：去看看其他七座灯塔。失去声音的，不只这片海。'],resolve:['灯塔底下没有沉船，只有一卷以母亲的记忆制成的灯芯。','我记起了她的歌。还有她临走时没说完的话：不要把怀念，当成活下去的全部。','这一次，由我替她驶向没有航线的地方。'],bond:'罗温替她修好了罗盘。她终于问他：你也是在找一个回不来的人吗？'},
    {id:1,name:'罗温',full:'罗温 · 烬枝',job:'誓垣卫',age:32,color:'#b97a53',hair:'#643d32',element:'blade',hp:151,mp:28,atk:27,mag:13,def:19,speed:12,intro:'守了一生的关隘，正在遗忘他曾保护的人。',need:'找出那份从未签过的撤防命令。',prologue:['我守过这道关十八年。每一道裂缝，我都认得。','昨天，阵亡名册突然空白了。人们庆祝从未发生过的和平，只有我还梦见那场火。','命令盖着守明院的印。我要带着这份空白名册，问清楚谁有权替死者沉默。'],resolve:['命令确实是我签的。那一夜，我求灯塔带走了所有人关于战败的记忆。','我不是为了关隘。我只是受不了自己活下来。','我会把名字一个一个刻回石头。守护，不是让痛苦从未发生。'],bond:'祈禾给他的旧伤换药，没有问勋章。罗温第一次睡了一个不做梦的夜。'},
    {id:2,name:'赛拉',full:'赛拉 · 镜隙',job:'星页师',age:27,color:'#d5ad85',hair:'#994e3f',element:'fire',hp:98,mp:53,atk:14,mag:32,def:10,speed:16,intro:'她的论文证明，一座城市被从历史中删去了。',need:'寻找导师留下的第零卷书。',prologue:['馆藏索引从第一卷开始。可是所有脚注，都引用着第零卷。','导师消失后，人们说他从未在这座学院任教。只有我掌心还留着他教写字时的墨。','不被记录的事，不等于没有发生。我要沿着那些被划掉的字，一直查到灯塔。'],resolve:['第零卷不是书，而是守明院每年清除记忆的账册。导师把自己也写了进去。','他用自己的名字，换回了一城孩子关于家人的记忆。','我要出版这本书。第一页不写我的名字，写所有被抹去的名字。'],bond:'维恩偷走了她的稿纸，又在第二天归还。纸角多了一张真正的暗道地图。'},
    {id:3,name:'祈禾',full:'祈禾 · 南枝',job:'芽灯医',age:25,color:'#86a582',hair:'#344c40',element:'blunt',hp:121,mp:47,atk:17,mag:27,def:14,speed:14,intro:'能治愈伤口的药，为什么让人忘记疼痛的原因？',need:'追查村中失去记忆的病症。',prologue:['村里的药越来越灵了。疼痛消退，悲伤也跟着消退。','奶奶治好了腿，却忘记了教我认药的那条山路。她叫我大夫，不再叫我的小名。','药根正朝着灯塔生长。我带上最后一株没有发光的种子，决定顺着根走。'],resolve:['药根吸收的不是月光，是地下流过的记忆。所谓灵药，正在把病人的人生抽空。','我拔去了第一株药，也亲手放弃了奶奶恢复青春的可能。','她握着我的手，叫了我的小名。我们慢慢走回家。'],bond:'诺娅说，歌也不是为了让人不再难过。祈禾把这句话写在药箱的里面。'},
    {id:4,name:'维恩',full:'维恩 · 无月',job:'隙影客',age:22,color:'#a18abc',hair:'#d8d7db',element:'shade',hp:108,mp:36,atk:25,mag:20,def:10,speed:26,intro:'偷过无数宝物的他，买不起自己的真名。',need:'从记忆交易所取回一张旧契约。',prologue:['在无月埠，名字是可以抵押的。我十岁那年，把自己的名字卖了。','债主说，我早就把它赎回去了。可那个签名，和灯塔长的笔迹一模一样。','既然账算不清，我就亲自去金库。不是偷东西。这次只是拿回属于我的东西。'],resolve:['契约上写着我的名字，也写着一个被我忘记的妹妹。她替我赎了债，代价是我永远记不起她。','我拿走了契约，却没有再偷走任何人的悲伤。','从今以后，我会带着她的名字活。即使还不知道她长什么样。'],bond:'赛拉没问他会不会读字，只把地图推到两人中间。这让维恩觉得，自己也能有一张书桌。'},
    {id:5,name:'诺娅',full:'诺娅 · 弦湾',job:'回声歌者',age:29,color:'#829dbe',hair:'#ccb17a',element:'light',hp:111,mp:49,atk:15,mag:28,def:12,speed:18,intro:'没有人记得那首歌，却人人都会唱最后一句。',need:'拼回被删去的送潮曲。',prologue:['金弦湾一年一度的送潮节，已经一百年没有送走过潮水了。','我的老师说，歌总少一节。他去世以后，连少了什么都没人记得。','我把最后一句唱给海听。远处有七道光，一起回答了我。'],resolve:['最后一节不是赞美灯塔，而是教人如何熄灭灯塔。老师一直在等一个肯听的人。','我不再把它唱得漂亮。我把每个停顿、每次颤抖，都唱了出来。','人们终于哭了。第二天，港口迎来了很多年来第一场退潮。'],bond:'伊瑟听完歌，只说了一句：下次唱慢一些。我想记住。'},
    {id:6,name:'朔',full:'朔 · 沙星',job:'铸星匠',age:36,color:'#bda36c',hair:'#3e3b36',element:'blunt',hp:134,mp:34,atk:25,mag:22,def:17,speed:13,intro:'他造出了永不停止的机器，却不知道燃料是什么。',need:'查清自家灯炉的能源来源。',prologue:['我造的炉子从不熄火。沙星驿的人因此再也不必在冬夜挨冻。','可昨天，徒弟问我他的父亲叫什么。我这才发现，整条街都回答不出来。','炉子没有吃煤。有人把别的东西送进了燃料管。我必须先把自己的作品拆开。'],resolve:['设计图上有一道我亲手删去的阀门。它本该让人们知道，每一夜温暖的代价。','我一直说，机器不应该让人操心。原来我只是替所有人关上了选择的门。','新炉子烧木头，也会熄火。开关留在每一个使用它的人手里。'],bond:'澪不会修机器，却坚持要把每一颗拆下的螺丝排好。朔说，这是很好的开始。'},
    {id:7,name:'伊瑟',full:'伊瑟 · 白棘',job:'霜径猎人',age:26,color:'#8bafbd',hair:'#c4d4dc',element:'pierce',hp:119,mp:35,atk:28,mag:18,def:13,speed:23,intro:'她追踪雪地里的一串脚印，脚印的主人却是自己。',need:'寻找失踪的守林队。',prologue:['每一场雪以后，林地里都会出现八个人的脚印。村民说，这里从来只有我一个守林人。','我在旧营地找到一只手套。内侧缝着我的名字，针脚却不是我的。','如果忘记能让人平安，我宁可带着危险去找他们。'],resolve:['队友们自愿成为了灯芯，阻止白棘原被冰潮吞没。他们请求灯塔，让我忘记。','我不会责怪他们。但这一次，不能再由留下的人替离开的人决定。','我把八双手套挂在树枝上。春天来的时候，它们一起动了。'],bond:'诺娅从不问她为什么不唱。某个雪夜，伊瑟终于轻轻跟上了最后一句。'}
  ];
  export interface Region {id:number;name:string;subtitle:string;road:string;dungeon:string;palette:string[];weather:string;boss:string;motif:string;clue:string;}
  export const REGIONS:Region[] = [
    {id:0,name:'暮汐港',subtitle:'风停之后，灯还记得回家的路',road:'蓝盐海岸',dungeon:'沉钟灯塔',palette:['#183b42','#315f62','#718978','#ceb48b','#ce985f'],weather:'fireflies',boss:'负潮的守钟蟹',motif:'潮',clue:'潮声在前，星光在后，灯火最后回应。'},
    {id:1,name:'烬叶关',subtitle:'石墙会老去，名字不应消失',road:'赤叶古道',dungeon:'无名壁垒',palette:['#342d31','#64503c','#95633c','#bd9b67','#dd8051'],weather:'leaves',boss:'空名的铠卫',motif:'誓',clue:'先望星，再举灯，最后听潮。'},
    {id:2,name:'镜书城',subtitle:'每一扇窗后，都藏着未写完的句子',road:'月镜水径',dungeon:'第零书库',palette:['#252b48','#42496a','#7b86a2','#cfbf9e','#c49ec2'],weather:'motes',boss:'吞页的镜鸮',motif:'知',clue:'灯照旧纸，潮翻书页，星落句末。'},
    {id:3,name:'南根村',subtitle:'根须触不到的地方，仍有春天',road:'芽灯湿地',dungeon:'倒生根庭',palette:['#203b34','#40644b','#80a46a','#c4b17d','#dfc174'],weather:'pollen',boss:'遗忘的花母',motif:'生',clue:'潮声在前，星光在后，灯火最后回应。'},
    {id:4,name:'无月埠',subtitle:'不被月光照见的人，也有名字',road:'雾银栈道',dungeon:'抵押之窟',palette:['#242b3d','#41475b','#697388','#b4a2a0','#ab84b1'],weather:'rain',boss:'契约的裂面',motif:'名',clue:'先望星，再举灯，最后听潮。'},
    {id:5,name:'金弦湾',subtitle:'海风经过琴弦，替远行人道别',road:'鸣弦丘陵',dungeon:'失声剧场',palette:['#233e4a','#467386','#98ac9d','#e4c28d','#dfad64'],weather:'petals',boss:'无声的领唱者',motif:'歌',clue:'灯照旧纸，潮翻书页，星落句末。'},
    {id:6,name:'沙星驿',subtitle:'有人把星星铸进炉火，照亮长夜',road:'琥珀沙路',dungeon:'不眠铸炉',palette:['#47373a','#836347','#b89567','#e1c08a','#df8950'],weather:'sand',boss:'铸炉的空心巨像',motif:'造',clue:'潮声在前，星光在后，灯火最后回应。'},
    {id:7,name:'白棘原',subtitle:'雪会覆盖足迹，不会让远行失去意义',road:'霜痕林径',dungeon:'冬眠观象台',palette:['#293847','#526875','#9baeb0','#d5d6c0','#acbbd8'],weather:'snow',boss:'守夜的白棘鹿',motif:'归',clue:'先望星，再举灯，最后听潮。'}
  ];
  export type Effect = 'damage'|'heal'|'revive'|'shield'|'buff'|'cleanse'|'scan';
  export type Status = 'poison'|'regen'|'might'|'slow'|'ward';
  export interface Skill {id:string;owner:number;name:string;level:number;jp:number;cost:number;power:number;hits:number;all:boolean;element:Element;effect:Effect;status?:Status;passive?:boolean;text:string;}
  const NAMES = [
    ['潮针','归潮','辨潮','回流','碧涛之衣','引潮三叠','夜航灯','潮汐合奏'],
    ['燃刃','护灯','反照之誓','贯甲','长垣','战吼','灼阵','长夜誓约'],
    ['星火','霜页','风刻','解析','焚书之火','冬序','星界','天文终章'],
    ['芽息','净露','藤缚','春雨','翠屏','根须回击','醒芽','万木归春'],
    ['影匕','窃时','毒月','掠光','夜幕','双影','剪烛','无月之舞'],
    ['定弦','小夜曲','振魂','破晓','战歌','终止符','归人曲','八音同鸣'],
    ['锤火','急救','震荡弹','棘轮','架盾','过载','蒸汽幕','群星机巧'],
    ['霜矢','寻迹','冻羽','碎冰','风翼','白棘阵','月下弓','寂雪天穹']
  ];
  const spec = (effect:Effect,element:Element,power:number,cost:number,all=false,hits=1,status?:Status): Partial<Skill> => ({effect,element,power,cost,all,hits,status});
  const SPECS:Partial<Skill>[][] = [
    [spec('damage','pierce',1.15,3),spec('heal','wind',1.2,5),spec('scan','light',0,3),spec('damage','wind',1,8,true),spec('shield','wind',1.2,6),spec('damage','wind',.7,9,false,3),spec('shield','light',1.4,12,true),spec('damage','wind',1.7,18,true,2)],
    [spec('damage','fire',1.2,3),spec('shield','light',1.5,4),spec('buff','light',1,5,false,1,'might'),spec('damage','blade',.9,7,false,2),spec('shield','light',1.8,10,true),spec('buff','fire',1,10,true,1,'might'),spec('damage','fire',1.5,12,true),spec('damage','blade',2.6,17,false,2)],
    [spec('damage','fire',1.35,4),spec('damage','frost',1.35,4),spec('damage','wind',.9,6,false,2),spec('scan','light',0,2,true),spec('damage','fire',1.4,12,true),spec('damage','frost',1.4,12,true,1,'slow'),spec('damage','light',1.6,15,true),spec('damage','light',1.1,20,true,3)],
    [spec('heal','light',1.6,4),spec('cleanse','light',.8,3),spec('damage','wind',1,5,false,1,'poison'),spec('heal','light',1.4,10,true),spec('buff','wind',1,9,true,1,'regen'),spec('damage','blunt',1.3,9,true),spec('revive','light',.5,12),spec('heal','light',2.4,18,true)],
    [spec('damage','shade',1.2,3),spec('damage','wind',1,4,false,1,'slow'),spec('damage','shade',1.1,5,false,1,'poison'),spec('buff','light',1,5,false,1,'might'),spec('shield','shade',1.3,5),spec('damage','pierce',.7,8,false,3),spec('damage','shade',2,11),spec('damage','shade',1.2,16,true,2)],
    [spec('damage','light',1.1,3),spec('heal','light',1.3,5),spec('buff','light',1,8,true,1,'regen'),spec('damage','light',1.1,8,true),spec('buff','light',1,9,true,1,'might'),spec('damage','light',.8,8,false,3),spec('revive','light',.6,12),spec('heal','light',2,17,true)],
    [spec('damage','blunt',1.2,3),spec('heal','light',1.2,5),spec('damage','fire',1.2,8,true),spec('damage','pierce',.8,8,false,3),spec('shield','light',1.4,10,true),spec('buff','fire',1,5,false,1,'might'),spec('cleanse','wind',1.1,10,true),spec('damage','fire',1.5,17,true,2)],
    [spec('damage','pierce',1.2,3),spec('scan','light',0,2),spec('damage','frost',.9,6,false,2),spec('damage','pierce',.75,7,false,3),spec('buff','wind',1,6,false,1,'ward'),spec('damage','wind',1.25,10,true),spec('damage','pierce',2.7,13),spec('damage','frost',1.6,17,true,2)]
  ];
  const passiveNames = [['远航体魄','潮息','看穿浪隙','归航祝福'],['不倒之垣','余烬呼吸','铸刃','守灯之心'],['珍藏页','研习','星芒','墨色回响'],['药根','甘露','生生','绿荫'],['轻身','暗袋','背月','无痕'],['长歌','回音','高音','安魂'],['铜骨','蓄能','精准齿轮','余热'],['越冬','霜息','狩猎直觉','踏雪']];
  export const SKILLS:Skill[] = HEROES.flatMap(h=>{
    const active = NAMES[h.id].map((name,i)=>({id:`s${h.id}_${i}`,owner:h.id,name,level:[1,1,2,3,5,7,9,12][i],jp:[0,0,3,4,5,6,7,10][i],cost:4,power:1,hits:1,all:false,element:h.element,effect:'damage' as Effect,text:'',...SPECS[h.id][i]}));
    const passive = passiveNames[h.id].map((name,i)=>({id:`p${h.id}_${i}`,owner:h.id,name,level:2+i*3,jp:4+i*2,cost:0,power:0,hits:1,all:false,element:h.element,effect:'buff' as Effect,passive:true,text:['最大生命 +18%。','每次行动回复 2 点灵息。','物理与术式伤害 +10%。','每回合恢复最大生命的 4%。'][i]}));
    return [...active,...passive];
  });
  export function skillText(s:Skill):string {
    if(s.passive) return s.text;
    const target=s.all?'全体':'单体';
    const effect=s.effect==='damage'?`${target}${ELEMENT_NAME[s.element]}伤害 ×${s.hits}，威力 ${Math.round(s.power*100)}%`:s.effect==='heal'?`${target}回复生命`:s.effect==='shield'?`${target}获得护盾`:s.effect==='revive'?'使一名倒下的伙伴苏醒':s.effect==='scan'?`揭示${target}弱点，并削减 1 点护势`:s.effect==='cleanse'?`${target}解除毒与迟缓，并回复少量生命`:`${target}获得${s.status==='might'?'强攻':s.status==='ward'?'守护':'再生'} 3 次行动`;
    return effect+(s.status&&s.effect==='damage'?`；附加${s.status==='poison'?'蚀毒':'迟缓'}`:'')+'。花费 '+s.cost+' 灵息。';
  }
  export type ItemKind='weapon'|'armor'|'charm'|'consumable';
  export interface Item {id:string;name:string;kind:ItemKind;tier:number;price:number;job?:number;element?:Element;atk:number;mag:number;def:number;hp:number;mp:number;speed:number;use?:'heal'|'mana'|'revive'|'cleanse'|'camp';power?:number;text:string;}
  const blank:Omit<Item,'id'|'name'|'kind'|'tier'|'price'|'text'>={atk:0,mag:0,def:0,hp:0,mp:0,speed:0};
  export const ITEMS:Item[]=[];
  const metal=['旅人','潮铜','银枝','月镜','辉星','归潮'];
  const weapons=['细潮剑','守灯刃','星页杖','芽木锤','隙影匕','鸣弦琴','棘轮锤','霜羽弓'];
  for(let h=0;h<8;h++) for(let t=0;t<6;t++) ITEMS.push({...blank,id:`w${h}_${t}`,name:metal[t]+weapons[h],kind:'weapon',tier:t,price:45+55*t*t,job:h,element:t===4?ELEMENTS[(h+3)%8]:HEROES[h].element,atk:4+t*7,mag:(h===2||h===3||h===5?6:2)+t*6,text:`${HEROES[h].job}可用。${t===4?'辉星合金改变攻击属性。':'握柄上刻着持有者自己选择的航线。'}`});
  for(let a=0;a<4;a++) for(let t=0;t<6;t++) ITEMS.push({...blank,id:`a${a}_${t}`,name:metal[t]+['软甲','长袍','猎装','重铠'][a],kind:'armor',tier:t,price:40+45*t*t,def:3+t*4+(a===3?5:0),hp:a===3?20+t*8:a===0?10+t*5:0,mp:a===1?8+t*5:0,speed:a===2?3+t: a===3?-2:0,mag:a===1?t*2:0,text:['柔软的织物兼顾防护与耐久。','内衬的星线容纳更多灵息。','轻装便于抢先行动。','厚重铠甲牺牲速度换取生命与防御。'][a]});
  for(let c=0;c<4;c++) for(let t=0;t<6;t++) ITEMS.push({...blank,id:`c${c}_${t}`,name:metal[t]+['罗盘','回声铃','根结','迅羽'][c],kind:'charm',tier:t,price:60+50*t*t,hp:c===2?25+t*15:0,mp:c===1?10+t*6:0,atk:c===0?3+t*3:0,mag:c===1?2+t*2:0,speed:c===3?4+t*2:0,text:['指向仍被记得的地方，提高攻击。','收集旅途的回声，提高灵息与术式。','长路上的护身结，提高生命。','轻羽留下风的轨迹，提高速度。'][c]});
  const supplies:[string,string,Item['use'],number,number][]=[['tea','芽灯茶','heal',.45,28],['tonic','浓缩芽露','heal',.85,75],['ether','星露','mana',.5,42],['elixir','月镜甘露','mana',1,110],['feather','归羽','revive',.4,65],['salt','净潮盐','cleanse',0,22],['tent','旅人营具','camp',1,125],['nectar','归潮蜜','heal',1,140]];
  supplies.forEach(([id,name,use,power,price],i)=>ITEMS.push({...blank,id,name,kind:'consumable',tier:i%3,price,use,power,text:use==='heal'?`回复最大生命的 ${power*100}%。`:use==='mana'?`回复最大灵息的 ${power*100}%。`:use==='revive'?'使倒下的伙伴以 40% 生命苏醒。':use==='camp'?'非战斗时，整支队伍完全恢复。':'清除蚀毒与迟缓。'}));
  export interface EnemyDef {id:string;name:string;region:number;family:number;variant:number;weak:Element[];guard:number;boss:boolean;elite:boolean;description:string;pattern:string;}
  const families=[['盐壳蟹','潮灯鱼','礁羽鸥','漂流贝','珊瑚卫','深汐影'],['烬叶狼','灰羽隼','炉角蜥','锈甲兵','赤苔兽','野火灵'],['墨羽鸮','游页灵','镜面蛾','纸铠卫','封蜡兽','空白影'],['苔伞精','蜜露蜂','根须獾','灯芽鹿','孢子母','枯枝偶'],['雾灯灵','银鳞蛇','裂面偶','暗巷鸦','契约兽','无月影'],['鸣弦鸟','海绒兔','笛角羊','碎琴偶','珀翅蝶','回声灵'],['铜壳虫','砂轮蜥','铆钉卫','蒸汽偶','石英蝎','蓄星炉'],['霜棘鹿','雪羽鸮','冰须狐','冻枝偶','白苔兽','极夜影']];
  export const ENEMIES:EnemyDef[]=[];
  for(let r=0;r<8;r++) for(let v=0;v<6;v++) ENEMIES.push({id:`e${r}_${v}`,name:families[r][v],region:r,family:(r+v%3)%8,variant:v,weak:[ELEMENTS[(r+v+1)%8],ELEMENTS[(r+v+4)%8]],guard:2+v%3,boss:false,elite:false,description:`栖息于${REGIONS[r].road}。${['把遗失的名字藏在壳中。','会跟随携带潮铃的旅人。','在潮水停滞后改变了迁徙路线。','并非真正的敌人，只是被灯芯中溢出的记忆惊扰。','以旧灯塔散出的微光为食。','只有安静倾听，才能听见它模仿的旧歌。'][v]}`,pattern:['啮击','扑袭','流光','警戒','蓄力','侵蚀'][v]});
  for(let r=0;r<8;r++) ENEMIES.push({id:`b${r}`,name:REGIONS[r].boss,region:r,family:r,variant:6,weak:[ELEMENTS[(r+1)%8],ELEMENTS[(r+4)%8],ELEMENTS[(r+6)%8]],guard:4+r%3,boss:true,elite:false,description:`${REGIONS[r].dungeon}的守门者。它保护的不是财宝，而是一枚由记忆凝成的潮铃。半血时会改变弱点，并在蓄力后发动群体攻击。`,pattern:'蓄潮 → 横扫 → 重整护势'});
  for(let r=0;r<4;r++) ENEMIES.push({id:`x${r}`,name:['沉眠的旧船长','遗书典狱者','第九个回声','星砂守望者'][r],region:r*2,family:r*2,variant:7,weak:[ELEMENTS[r],ELEMENTS[r+4]],guard:6,boss:true,elite:true,description:'可选守护者。收集四枚旧灯碎片后，终章会多一段关于普通人的记忆。',pattern:'蓄力与蚀毒；护势厚重'});
  ENEMIES.push({id:'final0',name:'守灯人 · 奥伦',region:8,family:4,variant:8,weak:['blade','wind','light'],guard:7,boss:true,elite:false,description:'守明院的灯塔长。他希望无人再经历失去，却忘记了悲伤与爱来自同一段记忆。',pattern:'宣告静潮 → 集体遗忘 → 换相'});
  ENEMIES.push({id:'final1',name:'白潮之心',region:8,family:6,variant:9,weak:['pierce','fire','shade'],guard:8,boss:true,elite:false,description:'八座灯塔的中枢。它没有恶意，也不理解人们为什么愿意选择一个会受伤的明天。',pattern:'记忆洪流；半血换相；三回合蓄力'});
  export interface Quest {id:string;region:number;name:string;npc:string;kind:'clue'|'hunt'|'bell'|'delivery';request:string;objective:string;resolution:string;late:string;reward:number;}
  const questRows:[string,string,Quest['kind'],string,string,string][] = [
    ['给海的回信','灯邮员 · 安娜','clue','有封寄给海的信，收信地址每天都变。请替我找找收信人。','在蓝盐海岸寻找被潮水送回的信瓶。','瓶里没有地址，只有一位母亲答应孩子回家的日期。安娜把信放回海里，这次写的是：我们过得很好。'],
    ['不再鸣响的浮标','老渔人 · 派克','hunt','鱼群不敢进港，浮标下有东西在争抢灯光。','在本地区击退 3 组普通敌人。','浮标重新响了。派克没有撒网，他留了一夜让鱼群认路。'],
    ['两碗晚饭','船匠 · 芙蕾','bell','丈夫出航那天以后，我总是多摆一副碗筷。大家却说我从未结婚。','唤醒暮汐港的潮铃。','账册上终于重新出现了一个名字。她仍会做两碗饭，只是把其中一碗送给了码头上的孤儿。'],
    ['过期的船票','小贩 · 塔恩','delivery','我从没走过这张票上的航线。能替我看看烬叶关的树还红不红？','拜访烬叶关的旅人信箱。','塔恩把船票撕成了书签。他不是不敢走，只是需要有人告诉他，路还在。'],
    ['空白墓碑','刻石匠 · 埃达','clue','这块碑怎么也刻不出名字。也许旧道上还有认得主人的人。','在赤叶古道调查褪色的徽章。','徽章没有军衔，背面写着一份炖汤的配方。埃达先刻了：一个喜欢做饭的人。'],
    ['会怕火的狼','巡路人 · 乌泽','hunt','狼群被旧炉里的火灵赶到了路上。别只怪狼。','在烬叶关地区击退 3 组普通敌人。','火灵散去，狼回到林中。乌泽在路牌上加了一行：这是它们的家，我们只是经过。'],
    ['胜利纪念日','退伍人 · 乔尔','bell','每年都在庆祝胜利，可我一听鼓声就发抖。','唤醒烬叶关的潮铃。','那不是一场胜利。乔尔拒绝再敲庆功鼓，改在城墙下读出双方死者的名字。'],
    ['借来的勋章','看门人 · 萝莎','delivery','请把这枚勋章交给镜书城的档案员。我要找回它真正的主人。','拜访镜书城的旅人信箱。','勋章属于一位救治双方伤员的医者。萝莎把门房改成了一间不问来历的小药室。'],
    ['最后一页','抄书员 · 兰','clue','每本书都少了最后一页。印刷房说，故事到那里就该结束。','在月镜水径寻找被雨打湿的书页。','最后一页写着：他们没有和好，但仍愿意再见一次。兰把它抄了很多份。'],
    ['偷字的鸟','见习生 · 杰米','hunt','鸟把考试答案叼走了。老师却说这也是一道题。','在镜书城地区击退 3 组普通敌人。','找回的是一窝雏鸟。杰米第一次写了一份没有标准答案的观察记录。'],
    ['未署名的导师','馆长 · 贝莉','bell','有人每年给学院捐书，却坚持不留姓名。最近连书都开始空白。','唤醒镜书城的潮铃。','捐书人正是被除名的导师。贝莉为他留了一张桌子，不再要求任何人证明自己来过。'],
    ['有温度的标本','植物学者 · 斐','delivery','标本夹里的一片叶子还在发热。请带它去南根村。','拜访南根村的旅人信箱。','那是药师用来包饭的叶子。斐终于明白，有些植物的用途不在分类表里。'],
    ['没写完的药方','药童 · 小茵','clue','奶奶的药方最后写着“再加一点”，可到底是什么？','在芽灯湿地寻找药师的旧笔记。','再加一点耐心。小茵坐下来听完病人的故事，才发现他真正需要的是一封家书。'],
    ['拒绝搬家的蜂','园丁 · 莫罗','hunt','花不开了，蜂却不肯走。请找找发光根须旁的异动。','在南根村地区击退 3 组普通敌人。','园丁没有烧毁蜂巢，而是在远离灯根的地方种下了普通的野花。'],
    ['慢一点的春天','老药师 · 青枝','bell','大家都夸新药好。可我不想忘记自己为什么变老。','唤醒南根村的潮铃。','青枝收起了返青药。她把第一次采药时摔伤的疤痕，讲成了一个很长的笑话。'],
    ['没有价格的种子','种子商 · 弥朵','delivery','无月埠有人愿意出高价买这袋种子。替我问一句：他准备种在哪？','拜访无月埠的旅人信箱。','买家想把种子种在母亲旧居。弥朵没有收钱，只要求来年寄一片叶子。'],
    ['消失的欠条','账房 · 阿夙','clue','全城的债都结清了，穷人却一个也不开心。','在雾银栈道寻找暗账副本。','债被换成了关于亲人的记忆。阿夙把自己的账本公开，让每个人知道究竟付出了什么。'],
    ['替影子照路','夜巡人 · 泽','hunt','雾里的影子总走在我前面。它们像是在带路，而不是追我。','在无月埠地区击退 3 组普通敌人。','影子停在收容所旧址。泽重新点亮了那里的一盏灯，灯罩上没有店名。'],
    ['赎回一个称呼','杂货商 · 冬雅','bell','孩子叫我老板，不再叫我妈妈。我是不是做错了什么？','唤醒无月埠的潮铃。','不是她做错了。孩子用那个称呼付了她的药费。这一次，她抱住他，允许他哭很久。'],
    ['给陌生人的请柬','裁衣人 · 绮','delivery','请送这张请柬到金弦湾。收信人已经不认识我了。','拜访金弦湾的旅人信箱。','她没有要求旧友想起来，只在请柬末尾写：我们可以重新认识。'],
    ['一个不准的音','调琴师 · 乌朵','clue','父亲留下的琴总有一个音不准。请找一找他藏起来的调音簿。','在鸣弦丘陵寻找旧调音簿。','那个音是父亲为耳背的母亲特意留下的。乌朵把琴调回了“不准”的样子。'],
    ['不会唱的鸟','海边少年 · 鲁','hunt','鸟都只唱同一段。有人说这样整齐，我觉得它们很难过。','在金弦湾地区击退 3 组普通敌人。','旧剧场的共鸣停止后，鸟唱得参差不齐。少年笑了：现在每一只都听得出来。'],
    ['迟到的谢幕','演员 · 蓓娜','bell','观众总不肯离席。我们已经谢幕了三十年。','唤醒金弦湾的潮铃。','最后一位观众终于站起身。蓓娜没有挽留，她也终于可以去看一次别人的演出了。'],
    ['不能运走的琴','搬运工 · 瓦克','delivery','这架琴太重了。沙星驿的工匠说，也许重的不是木头。','拜访沙星驿的旅人信箱。','琴箱装满了历任主人的信。瓦克分开托运，一封也没扔掉。'],
    ['少了一颗齿轮','学徒 · 泥克','clue','师父说机器绝不能停。可我觉得它像是在喘不过气。','在琥珀沙路寻找旧安全阀图纸。','缺的不是动力，是能停下来的阀门。泥克第一次因为让机器停转而获得夸奖。'],
    ['夜班的灯','驿站长 · 欧南','hunt','废炉的傀儡每天照常上工。替我带它们回到可以休息的地方。','在沙星驿地区击退 3 组普通敌人。','最后一具傀儡停机前，把工牌摆得整整齐齐。欧南把夜班表改成了轮班表。'],
    ['账单背面的画','煤铺主 · 沙雅','bell','送煤的工人总在账单背面画画。这几天，那些画都变白了。','唤醒沙星驿的潮铃。','画重新显现：一间有阳光的屋子。沙雅放弃了新仓库，把空地留作工人们的花园。'],
    ['暖炉的第一位客人','旅店主 · 露可','delivery','第一台新暖炉要送到白棘原。替我看看它暖不暖。','拜访白棘原的旅人信箱。','暖炉没有旧式灯炉亮，但围坐的人记得彼此。露可说，这就足够了。'],
    ['两种脚印','守林人 · 静杉','clue','雪地里一大一小两串脚印，总在同一个地方消失。','在霜痕林径寻找树洞里的手套。','那是母亲背起孩子的地方。静杉把寻找亡者的路，改画成了一条给孩子的安全小径。'],
    ['不冬眠的兽','牧人 · 葛','hunt','林里的兽不肯睡，像是怕一闭眼就会被忘记。','在白棘原地区击退 3 组普通敌人。','牧人守了一夜，让受惊的兽群安心入眠。早晨，他终于也打了一个哈欠。'],
    ['春天的预约','种树人 · 芙','bell','有人约好春天回来。大家说白棘原从来没有春天。','唤醒白棘原的潮铃。','冻土里冒出了第一枚芽。她把预约改成了邀请：来不来都没关系，我会把春天照顾好。'],
    ['第八封家书','邮差 · 洛','delivery','七封信都送到了。最后一封写着：请回到开始的地方。','拜访暮汐港的旅人信箱。','信是邮差年轻时写给自己的。他读完，决定今天早一点回家。']
  ];
  export const QUESTS:Quest[]=questRows.map((q,i)=>({id:`q${i}`,region:Math.floor(i/4),name:q[0],npc:q[1],kind:q[2],request:q[3],objective:q[4],resolution:q[5],reward:120+Math.floor(i/4)*20,late:'潮铃唤醒四座以后，旧日的记忆开始回来。'+q[1].split(' · ')[1]+'想对你说：记起来以后，日子没有变得简单。但现在，选择是我们自己的。'}));
  export const GLOSSARY:[string,string][]=[['潮铃','八枚地域共鸣器。唤醒它们并非积蓄力量，而是让各地被抹去的记忆重新流动。'],['灯芯','以记忆凝成的发光物质。越深刻的感情，能点亮越漫长的夜。'],['守明院','以维持灯塔、安抚潮汐为职责的机构。内部有人坚守旧约，也有人开始质疑以遗忘换取安宁的代价。'],['静潮','潮汐被永久抚平的状态。港口因此安全，但迁徙、季节和人的记忆逐渐停滞。'],['护势与破绽','以敌人的弱点攻击会削减护势。护势归零后，敌人失去下一次行动，期间受到更多伤害。'],['涌势','每回合获得 1 点，最多 3 点。行动前投入涌势可增加命中次数或治疗与护盾强度。未投入的涌势保留到下一轮。'],['第八座灯塔','八座塔之下共同的中枢，不是一座更高的建筑。它存在于所有人同意忘记的那一刻。'],['归潮','接受记忆会带来伤痛，也保留再次相遇、改变和选择的可能。']];
  export const ACTS = [
    ['一 · 分开的路','八座灯塔，让八片海不再涨潮。寻找同路人，调查各地的旧灯芯。'],
    ['二 · 同一枚灯芯','两枚潮铃发出了同一种回声。守明院并非在收集能源，而是在收集人们不愿承受的记忆。'],
    ['三 · 光的代价','四枚潮铃共鸣时，你们看见了自己的签名。每个人都曾在某一刻，请求灯塔替自己忘记。'],
    ['四 · 仍然选择','六枚潮铃苏醒，沿岸开始风雨。奥伦问：你们真的愿意把一个会受伤的世界还给所有人吗？'],
    ['五 · 让海回来','八枚潮铃齐鸣。没有人能够替所有人决定遗忘。驶向静潮中枢，把选择交还给世界。']
  ];
  export const itemById=(id:string):Item|undefined=>ITEMS.find(x=>x.id===id);
  export const skillById=(id:string):Skill|undefined=>SKILLS.find(x=>x.id===id);
  export const enemyById=(id:string):EnemyDef|undefined=>ENEMIES.find(x=>x.id===id);
}
