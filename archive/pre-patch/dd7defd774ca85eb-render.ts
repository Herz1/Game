declare const LT_ASSETS:Record<string,string>;
namespace LT {
  export const artUrl=(id:string):string=>typeof LT_ASSETS==='undefined'?'':LT_ASSETS[id]||'';
  const C=(width:number,height:number):HTMLCanvasElement=>{const c=document.createElement('canvas');c.width=width;c.height=height;return c;};
  function polygon(c:CanvasRenderingContext2D,pts:number[][],fill:string,stroke=''):void {c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=1;c.stroke();}}
  function ellipse(c:CanvasRenderingContext2D,x:number,y:number,rx:number,ry:number,fill:string):void{c.beginPath();c.ellipse(x,y,Math.max(.01,rx),Math.max(.01,ry),0,0,Math.PI*2);c.fillStyle=fill;c.fill();}
  function rect(c:CanvasRenderingContext2D,x:number,y:number,w:number,h:number,color:string):void{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));}
  export function tint(color:string,n:number):string {const hex=color.replace('#','');if(hex.length!==6)return color;const r=clamp(parseInt(hex.slice(0,2),16)+n,0,255),g=clamp(parseInt(hex.slice(2,4),16)+n,0,255),b=clamp(parseInt(hex.slice(4,6),16)+n,0,255);return `rgb(${r},${g},${b})`;}
  function glow(c:CanvasRenderingContext2D,x:number,y:number,r:number,color='255,196,108',alpha=.22):void {const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${color},${alpha})`);g.addColorStop(.3,`rgba(${color},${alpha*.4})`);g.addColorStop(1,`rgba(${color},0)`);c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);}
  const spriteCache=new Map<string,HTMLCanvasElement>();
  export function sprite(id:number,frame=0,dir=0):HTMLCanvasElement {
    const key=`${id}:${frame}:${dir}`;if(spriteCache.has(key))return spriteCache.get(key)!;
    const c=C(32,48),g=c.getContext('2d')!,h=HEROES[id],edge='#19252c',skin=id===6?'#ad7f60':'#dfbaa0',lite=id===6?'#d5a381':'#f1d0af',coat=h.color,hair=h.hair;
    const stride=frame===1?2:frame===2?-2:0;
    polygon(g,[[8,23],[23,22],[27,38],[20,41],[7,39],[4,35]],edge);
    polygon(g,[[9,23],[22,23],[25,37],[19,39],[8,37],[6,34]],tint(coat,-20));
    rect(g,11,34+stride,4,10-stride,edge);rect(g,18,34-stride,4,10+stride,edge);rect(g,10,43+stride*.4,6,3,'#5a483b');rect(g,18,43-stride*.4,6,3,'#5a483b');
    rect(g,11,34,4,6+stride,'#465059');rect(g,18,34,4,6-stride,'#39434c');
    polygon(g,[[11,21],[21,21],[24,32],[21,37],[10,36],[8,29]],edge);
    polygon(g,[[11,22],[20,22],[22,31],[20,35],[11,34],[10,29]],coat);
    rect(g,15,22,3,12,id===1?'#c7ac79':'#c8c1a4');rect(g,11,32,11,2,'#6c5745');rect(g,16,32,3,2,'#e6bf74');
    polygon(g,[[8,23],[11,24],[10,31+stride],[7,32+stride],[6,29]],tint(coat,-10));rect(g,7,31+stride,3,3,skin);
    polygon(g,[[22,23],[25,24],[26,30-stride],[23,33-stride],[21,29]],tint(coat,12));rect(g,23,31-stride,3,3,lite);
    if(id===1){rect(g,7,22,6,5,'#c4a468');rect(g,20,22,6,5,'#ad895a');rect(g,11,27,12,3,'#dbbf8e');}
    if(id===3||id===2||id===5){polygon(g,[[12,33],[21,33],[24,42],[8,41]],tint(coat,-5));rect(g,9,40,13,2,tint(coat,35));}
    if(id===7){polygon(g,[[9,20],[20,20],[24,26],[20,29],[8,25]],'#bfc8c4');rect(g,12,23,11,3,'#885a65');}
    if(id===0){polygon(g,[[9,21],[16,24],[23,21],[24,28],[16,26],[7,28]],'#68b1b0');rect(g,13,24,3,3,'#d8b464');}
    rect(g,13,18,7,6,skin);ellipse(g,16,14,7,9,edge);ellipse(g,16,14,6,8,skin);rect(g,12,11,9,8,lite);
    ellipse(g,16,9,7,5,hair);rect(g,9,10,3,9,hair);rect(g,21,10,3,8,hair);
    polygon(g,[[10,8],[13,4],[18,4],[23,8],[20,14],[17,9],[12,13]],hair);
    rect(g,13,6,5,1,tint(hair,36));rect(g,10,9,3,3,tint(hair,17));rect(g,21,11,2,5,tint(hair,-12));
    if(dir===2){ellipse(g,16,14,6,7,hair);rect(g,12,13,8,7,hair);rect(g,13,19,6,2,tint(hair,-10));}
    else {rect(g,12,14,3,1,'#51474a');rect(g,18,14,3,1,'#51474a');rect(g,13,15,1,2,'#34454e');rect(g,19,15,1,2,'#34454e');rect(g,16,17,1,1,'#b78470');rect(g,14,19,4,1,'#ac7c70');if(id===1||id===6){rect(g,12,19,9,2,tint(hair,3));rect(g,14,21,5,1,hair);}if(id===2){g.strokeStyle='#c5a978';g.lineWidth=1;g.strokeRect(10.5,13.5,5,4);g.strokeRect(17.5,13.5,5,4);rect(g,16,15,2,1,'#c5a978');}}
    if([2,3,5,7].includes(id)){for(let j=0;j<10;j++)rect(g,id===3?9:22,15+j*1.4,3+(j%2),3,tint(hair,j%2?12:-5));}
    if(id===6){rect(g,10,8,13,2,'#c6a15f');rect(g,11,7,4,3,'#718888');rect(g,18,7,4,3,'#718888');}
    if(id===4){rect(g,8,14,2,3,'#e4c98c');polygon(g,[[8,24],[15,25],[11,29],[7,30]],'#c4acd9');}
    if(id===7){g.strokeStyle='#9b744d';g.lineWidth=2;g.beginPath();g.moveTo(28,19);g.quadraticCurveTo(35,31,27,41);g.stroke();g.strokeStyle='#d9cfb3';g.lineWidth=.5;g.beginPath();g.moveTo(28,19);g.lineTo(27,41);g.stroke();}
    else if(id===2||id===3){rect(g,4,21,2,23,'#9f7a51');ellipse(g,5,20,4,5,id===2?'#b4bdce':'#98c090');rect(g,4,18,2,4,'#e4e0b4');}
    else if(id===1||id===0||id===4){polygon(g,[[27,24],[28,41],[26,44],[25,39],[25,25]],'#9bafba');rect(g,24,25,6,2,'#c6aa72');}
    else if(id===6){rect(g,26,27,2,17,'#8d6a42');rect(g,22,24,10,6,'#c19c64');rect(g,23,24,8,2,'#e0c08b');}
    else {g.strokeStyle='#c8a86a';g.lineWidth=2;g.beginPath();g.moveTo(26,29);g.lineTo(29,34);g.lineTo(26,40);g.lineTo(22,34);g.closePath();g.stroke();}
    if(dir===1||dir===3){const temp=C(32,48),tg=temp.getContext('2d')!;tg.translate(32,0);tg.scale(-1,1);tg.drawImage(c,0,0);if(dir===1){spriteCache.set(key,temp);return temp;}}
    spriteCache.set(key,c);return c;
  }
  const monsterCache=new Map<string,HTMLCanvasElement>();
  export function monster(d:EnemyDef):HTMLCanvasElement {
    if(monsterCache.has(d.id))return monsterCache.get(d.id)!;
    const c=C(144,144),g=c.getContext('2d')!,p=REGIONS[Math.min(d.region,7)].palette,rng=new RNG(d.region*121+d.variant*73+43),base=p[2],light=p[3],edge='#1c2831';
    const line=(pts:number[][],color:string,width=3):void=>{g.beginPath();pts.forEach((a,i)=>i?g.lineTo(a[0],a[1]):g.moveTo(a[0],a[1]));g.strokeStyle=color;g.lineWidth=width;g.stroke();};
    if(d.family===0){
      for(let side=-1;side<=1;side+=2){for(let k=0;k<4;k++){const x=72+side*24,y=78+k*7;line([[x,y],[72+side*(47+k*2),y+6],[72+side*(54+k),117+k*2]],edge,7);line([[x,y],[72+side*(47+k*2),y+6],[72+side*(54+k),117+k*2]],tint(base,-5),4);}line([[72+side*27,72],[72+side*44,55],[72+side*51,53]],light,9);polygon(g,[[72+side*42,55],[72+side*57,29],[72+side*59,47],[72+side*69,35],[72+side*65,65]],base,edge);}
      ellipse(g,72,84,41,30,edge);ellipse(g,72,79,38,27,base);ellipse(g,72,72,29,17,light);polygon(g,[[48,75],[60,59],[85,57],[100,74],[86,92],[60,91]],tint(base,-15));line([[57,77],[72,67],[88,75],[73,87],[57,77]],'#d3b875',2);for(const x of [60,85]){line([[x,65],[x-3,50]],base,5);ellipse(g,x-3,49,4,5,light);rect(g,x-4,46,2,4,edge);}if(d.boss){polygon(g,[[55,64],[58,39],[65,27],[78,24],[87,35],[91,62]],'#988164',edge);ellipse(g,72,38,12,8,'#c5ad7b');rect(g,66,37,12,19,'#e1ce9a');ellipse(g,72,34,8,4,'#f0deac');}
    }else if(d.family===1){
      polygon(g,[[28,68],[10,63],[17,80],[29,89],[38,88],[40,113],[48,118],[53,93],[81,97],[91,117],[103,119],[100,81],[109,69],[116,47],[110,28],[97,42],[79,36],[67,27],[66,48],[50,54]],base,edge);
      polygon(g,[[37,72],[55,59],[76,58],[83,79],[75,90],[51,85],[39,93]],tint(base,20));polygon(g,[[78,48],[94,44],[110,52],[122,66],[107,77],[87,68],[69,70]],light,edge);polygon(g,[[73,48],[73,35],[82,47]],'#966452');polygon(g,[[100,46],[109,33],[108,50]],'#966452');rect(g,91,53,7,3,'#e2cd8d');rect(g,94,54,2,3,edge);polygon(g,[[115,64],[124,65],[119,70]],edge);line([[37,62],[27,54],[34,76]],tint(base,-15),6);for(let i=0;i<10;i++)line([[42+i*4,64],[39+i*4,70]],tint(base,-13),1);
      if(d.boss){polygon(g,[[60,63],[53,44],[67,49],[72,35],[79,49],[96,44],[93,72]],'#a99674',edge);rect(g,62,56,27,5,'#d9bc80');}
    }else if(d.family===2){
      polygon(g,[[68,62],[34,35],[9,23],[17,49],[36,82],[58,104]],base,edge);polygon(g,[[79,60],[108,31],[137,22],[125,57],[107,87],[88,103]],base,edge);
      for(let i=0;i<6;i++){line([[34+i*5,57+i*3],[14+i*7,33+i*4]],light,4);line([[105-i*4,57+i*3],[133-i*6,33+i*4]],light,4);}
      ellipse(g,72,83,29,35,base);ellipse(g,72,64,30,26,light);polygon(g,[[45,50],[39,28],[62,40],[73,33],[86,40],[108,28],[101,52]],base,edge);for(const x of [59,86]){ellipse(g,x,62,13,14,'#e3d5ae');ellipse(g,x,62,8,10,'#6b7f86');ellipse(g,x+1,63,4,7,edge);rect(g,x-3,57,3,3,'#faf1cb');}polygon(g,[[67,69],[77,69],[72,80]],'#d1a861');polygon(g,[[47,105],[69,98],[95,104],[95,119],[70,113],[47,119]],'#d4c7a2',edge);line([[70,100],[70,113]],'#8d7d61',2);for(let i=0;i<4;i++)line([[50,108+i*2],[65,105+i*2]],'#a29276',1);
    }else if(d.family===3){
      for(let i=0;i<8;i++){const a=i*Math.PI/4;line([[72,88],[72+Math.cos(a)*38,107+Math.sin(a)*12],[72+Math.cos(a)*52,121+Math.sin(a)*7]],'#688467',5);}
      polygon(g,[[52,108],[60,68],[83,65],[95,108],[84,124],[64,122]],'#597961',edge);
      for(let i=0;i<9;i++){const a=i*Math.PI*2/9,x=72+Math.cos(a)*24,y=58+Math.sin(a)*22;ellipse(g,x,y,17,22,i%2?'#a5b188':'#d2c29a');line([[x,y],[72,63]],tint(base,-4),1);}
      ellipse(g,72,61,16,19,'#e3d4b1');rect(g,62,58,6,2,edge);rect(g,78,58,6,2,edge);ellipse(g,72,68,2,3,'#9f7e71');line([[62,80],[45,85],[37,69]],'#779970',7);line([[86,81],[110,82],[117,64]],'#779970',7);
      for(let i=0;i<12;i++){const x=37+rng.int(72),y=77+rng.int(42);polygon(g,[[x,y],[x-9,y-7],[x-4,y-13],[x+5,y-7]],tint(base,10),edge);}
    }else if(d.family===4){
      polygon(g,[[73,29],[49,37],[37,59],[35,81],[14,122],[40,113],[52,134],[74,122],[91,138],[103,116],[129,124],[107,83],[103,50],[88,31]],'#343149',edge);polygon(g,[[61,44],[46,72],[45,113],[64,100],[80,123],[96,103],[99,72],[87,42]],'#756587');polygon(g,[[50,79],[45,102],[27,120],[48,113],[58,119],[64,106]],'#aaa0b6');ellipse(g,74,54,22,27,'#d9d2c1');polygon(g,[[54,49],[69,51],[64,58],[56,57]],'#40434e');polygon(g,[[80,51],[95,48],[92,57],[84,59]],'#40434e');line([[73,60],[70,72],[80,68]],'#9b9391',1);line([[78,31],[75,46],[81,51],[77,62]],'#6e6970',1);rect(g,64,75,22,3,'#b19975');
      for(let i=0;i<7;i++){const x=24+rng.int(96),y=22+rng.int(94);rect(g,x,y,2,2,'#ddc6df');}
      if(d.boss){ellipse(g,74,22,27,4,'#beac83');line([[48,22],[40,6],[65,18],[74,4],[82,17],[105,7],[99,22]],'#d1b883',3);}
    }else if(d.family===5){
      polygon(g,[[57,75],[27,36],[7,29],[15,69],[48,104],[74,113],[105,100],[130,48],[119,26],[91,64]],'#587e93',edge);
      for(let i=0;i<7;i++){line([[49,89-i*3],[15+i*4,46-i*2]],'#c8b787',4);line([[93,90-i*3],[128-i*4,45-i*2]],'#c8b787',4);}
      ellipse(g,72,83,19,31,base);ellipse(g,76,56,17,18,light);polygon(g,[[85,57],[106,64],[85,68]],'#c8a35b',edge);rect(g,79,52,6,3,edge);rect(g,80,51,2,2,'#e8debd');polygon(g,[[65,46],[55,24],[72,39],[78,20],[86,42]],'#d1b975',edge);for(let i=0;i<4;i++)line([[63+i*6,104],[52+i*11,133]],'#a7bbc1',4);line([[65,91],[64,69],[89,70],[83,98],[65,91]],'#d4b779',3);for(let i=0;i<4;i++)line([[69+i*4,71],[66+i*4,91]],'#e4d5ac',.7);
    }else if(d.family===6){
      polygon(g,[[45,74],[27,60],[18,71],[15,102],[26,111],[39,96]],'#8a8c80',edge);polygon(g,[[97,73],[114,61],[131,74],[132,100],[119,109],[105,94]],'#9a9479',edge);polygon(g,[[48,92],[61,93],[61,120],[54,132],[36,131],[42,115]],'#6c7772',edge);polygon(g,[[84,93],[97,93],[104,117],[114,131],[87,130],[84,119]],'#6c7772',edge);
      polygon(g,[[44,50],[63,41],[88,43],[102,58],[97,99],[77,112],[50,100]],base,edge);polygon(g,[[53,49],[62,23],[84,22],[95,46],[81,55],[64,55]],light,edge);rect(g,63,34,22,6,edge);rect(g,66,36,16,2,'#f6d18c');ellipse(g,73,77,22,23,edge);ellipse(g,73,77,17,18,'#c39b66');ellipse(g,73,77,10,13,'#f2c988');ellipse(g,73,76,5,8,'#faf0c7');for(let i=0;i<8;i++){const a=i*Math.PI/4;rect(g,72+Math.cos(a)*18,77+Math.sin(a)*19,3,3,'#d5c59e');}rect(g,38,40,5,33,'#979888');rect(g,36,36,9,5,'#c0b8a1');
      if(d.id==='final1'){g.globalAlpha=.9;for(let k=0;k<3;k++){g.strokeStyle=k%2?'#efe6c6':'#9ec8c5';g.lineWidth=2;g.beginPath();g.ellipse(73,67,44+k*7,51+k*7,k*.3,0,Math.PI*2);g.stroke();}g.globalAlpha=1;}
    }else{
      polygon(g,[[45,70],[69,59],[96,71],[104,93],[94,101],[90,125],[83,126],[82,104],[57,101],[52,125],[44,126],[45,101],[34,90]],'#adbfbd',edge);polygon(g,[[85,70],[85,48],[78,38],[85,22],[105,31],[105,56],[97,76]],'#d6dacc',edge);polygon(g,[[96,50],[120,57],[114,65],[100,65]],'#e5e1cf',edge);rect(g,99,42,5,3,'#617b82');line([[89,31],[77,18],[68,9],[70,3]],'#899f9f',4);line([[102,32],[114,18],[119,3]],'#899f9f',4);line([[80,20],[85,6]],'#899f9f',3);line([[77,18],[59,19],[52,8]],'#899f9f',3);line([[113,20],[130,18],[136,8]],'#899f9f',3);line([[115,15],[105,5]],'#899f9f',3);polygon(g,[[91,30],[94,22],[98,31],[94,37]],'#a6d5e0');for(let i=0;i<13;i++)rect(g,45+rng.int(40),73+rng.int(22),3,2,'#dce0d4');polygon(g,[[40,74],[29,64],[20,68],[33,83]],'#d3d9ce',edge);
    }
    g.globalCompositeOperation='source-atop';for(let i=0;i<110;i++){rect(g,rng.int(144),rng.int(144),1+rng.int(3),1,i%3?'rgba(255,246,215,.08)':'rgba(12,22,28,.12)');}g.globalCompositeOperation='source-over';monsterCache.set(d.id,c);return c;
  }
  export class Renderer {
    ctx:CanvasRenderingContext2D;ground:HTMLCanvasElement|null=null;world:World|null=null;camX=0;camY=0;zoom=1.1;propCache=new Map<string,HTMLCanvasElement>();time=0;effects:{event:BattleEvent;born:number}[]=[];shake=0;dir=0;moving=false;titleImage:HTMLImageElement|null=null;
    constructor(public canvas:HTMLCanvasElement){canvas.width=1920;canvas.height=1080;this.ctx=canvas.getContext('2d')!;const url=artUrl('title');if(url){this.titleImage=new Image();this.titleImage.src=url;}}
    iso(x:number,y:number,z=0):{x:number;y:number}{return{x:(x-y)*36,y:(x+y)*18-z};}
    screen(x:number,y:number,z=0):{x:number;y:number}{const p=this.iso(x,y,z);return{x:640+(p.x-this.camX)*this.zoom,y:380+(p.y-this.camY)*this.zoom};}
    unproject(x:number,y:number):{x:number;y:number}{const u=(x-640)/this.zoom+this.camX,v=(y-380)/this.zoom+this.camY;return{x:u/72+v/36,y:v/36-u/72};}
    load(world:World,s:State):void {this.world=world;this.zoom=world.area==='inn'||world.area==='shop'?1.35:1.1;if(this.propCache.size>100)this.propCache.clear();const p=this.iso(s.x,s.y);this.camX=p.x;this.camY=p.y;this.ground=this.makeGround(world);}
    makeGround(w:World):HTMLCanvasElement {
      const c=C(2400,1350),g=c.getContext('2d')!,r=Math.min(w.region,7),p=REGIONS[r].palette,rng=new RNG(w.region*141+7),interior=['inn','shop','dungeon','final'].includes(w.area);
      for(let y=0;y<w.height;y++)for(let x=0;x<w.width;x++){
        const t=w.tiles[y][x];if(t===6)continue;const q=this.iso(x,y);const xx=q.x+1150,yy=q.y+100;
        const shade=rng.int(13)-6;const color=t===2?tint(p[1],-14+shade):t===1?tint(p[3],-35+shade):t===4?tint(p[1],20+shade):tint(p[2],-30+shade);
        if((w.tiles[y+1]?.[x]===6||w.tiles[y]?.[x+1]===6||x===31||y===27)&&t!==2){polygon(g,[[xx,yy+36],[xx+36,yy+18],[xx+36,yy+50],[xx,yy+68]],tint(p[0],-1));polygon(g,[[xx-36,yy+18],[xx,yy+36],[xx,yy+68],[xx-36,yy+50]],tint(p[1],-18));}
        polygon(g,[[xx,yy],[xx+36,yy+18],[xx,yy+36],[xx-36,yy+18]],color);
        if(t===1||t===4){g.globalAlpha=t===1?.20:.32;for(let k=0;k<5;k++){const a=rng.next()*.8+.1,b=rng.next()*.8+.1,px=xx+(a-b)*32,py=yy+(a+b)*16;polygon(g,[[px,py],[px+12,py+6],[px+2,py+11],[px-10,py+5]],k%2?lighten(p[3],-30):p[0]);}g.globalAlpha=1;}
        else if(t===0){for(let k=0;k<7;k++){const a=rng.next(),b=rng.next(),px=xx+(a-b)*33,py=yy+(a+b)*16;rect(g,px,py,1,2+rng.int(3),k%3?tint(p[2],-14):tint(p[2],14));if(r===7&&k%3===0)rect(g,px,py,4,1,'#cbd3cb');}}
        else if(t===2){g.globalAlpha=.3;rect(g,xx-15+rng.int(23),yy+13,12+rng.int(18),1,p[2]);rect(g,xx-9+rng.int(15),yy+24,8,1,p[2]);g.globalAlpha=1;}
      }
      if(interior){g.globalCompositeOperation='source-atop';const grad=g.createLinearGradient(0,0,2000,1200);grad.addColorStop(0,'rgba(25,30,53,.15)');grad.addColorStop(1,'rgba(4,16,29,.28)');g.fillStyle=grad;g.fillRect(0,0,2400,1350);g.globalCompositeOperation='source-over';}
      return c;
    }
    backdrop(g:CanvasRenderingContext2D,r:number,t:number,dark=false):void {
      const p=REGIONS[Math.min(r,7)].palette,grad=g.createLinearGradient(0,0,0,720);grad.addColorStop(0,dark?'#0e1824':p[0]);grad.addColorStop(.5,dark?'#182c35':p[1]);grad.addColorStop(1,dark?'#07151d':p[0]);g.fillStyle=grad;g.fillRect(0,0,1280,720);
      for(let layer=0;layer<3;layer++){const pts:number[][]=[[0,500]];for(let x=-40;x<1360;x+=30){const y=190+layer*72+Math.sin(x*.007+layer*2)*45+Math.sin(x*.019+layer)*20;pts.push([x,y]);}pts.push([1280,720],[0,720]);polygon(g,pts,layer===0?tint(p[1],-12):layer===1?tint(p[0],8):p[0]);}
      g.globalAlpha=.1;for(let i=0;i<25;i++){const x=(i*97+t*6)%1400-50,y=400+i*11;rect(g,x,y,45+i*2,1,p[3]);}g.globalAlpha=1;
    }
    drawProp(g:CanvasRenderingContext2D,p:Prop,r:number,s:State):void {
      const palette=REGIONS[Math.min(r,7)].palette,q=this.iso(p.x,p.y);g.save();g.translate(q.x,q.y);
      const rng=new RNG(Math.round(p.x*773+p.y*347+p.variant*11));
      if(p.type==='house'){
        const foot=this.iso(s.x,s.y);const occluded=Math.abs(foot.x-q.x)<p.w*36+25&&foot.y-q.y> -140&&foot.y-q.y<p.h*18+50&&s.x+s.y<p.x+p.y+p.w+p.h; if(occluded)g.globalAlpha=.28;
        const wx=p.w*36,hy=p.h*18,H=64+(p.variant%3)*9;
        ellipse(g,15,56,95,24,'rgba(5,18,24,.28)');
        polygon(g,[[0,-H],[wx,hy-H],[wx,hy+48],[0,48]],tint(palette[3],-26));
        polygon(g,[[0,-H],[-wx,hy-H],[-wx,hy+48],[0,48]],tint(palette[3],-63));
        for(let k=0;k<4;k++){g.strokeStyle='rgba(39,47,42,.18)';g.lineWidth=1;g.beginPath();g.moveTo(-wx,hy-H+18+k*18);g.lineTo(0,-H+18+k*18);g.lineTo(wx,hy-H+18+k*18);g.stroke();}
        for(const x of [-wx,-wx*.5,0,wx*.5,wx]){const y=Math.abs(x)*.5;polygon(g,[[x-3,y-H],[x+3,y-H],[x+3,y+47],[x-3,y+47]],'#594e42');}
        polygon(g,[[-wx-10,hy-H-3],[0,-H-62],[wx+10,hy-H-3],[0,hy-H+34]],tint(palette[1],18),'#34403d');
        polygon(g,[[0,-H-62],[wx+10,hy-H-3],[0,hy-H+34]],tint(palette[1],-12),'#34403d');
        for(let k=1;k<8;k++){const u=k/8;g.strokeStyle=k%2?'rgba(228,207,161,.23)':'rgba(6,19,24,.26)';g.lineWidth=2;g.beginPath();g.moveTo(-wx-10+(wx+10)*u,hy-H-3+(34)*u);g.lineTo((wx+10)*u,-H-62+(hy+59)*u);g.stroke();}
        polygon(g,[[-6,-H-64],[0,-H-70],[wx+17,hy-H-4],[wx+11,hy-H+1]],'#9b8c6a');
        if(r===7){polygon(g,[[-wx-12,hy-H-6],[0,-H-66],[wx+10,hy-H-7],[3,hy-H+16]],'#c4cec8');}
        polygon(g,[[39,-H-18],[51,-H-24],[51,-H-70],[39,-H-65]],'#928b76');polygon(g,[[51,-H-24],[62,-H-18],[62,-H-64],[51,-H-70]],'#5b665f');
        for(let i=0;i<4;i++){g.globalAlpha*=.6;ellipse(g,52+Math.sin(this.time+i)*4,-H-82-i*14,8+i*3,5+i*2,'#b0b5a2');}g.globalAlpha=occluded?.28:1;
        for(const side of [-1,1])for(let i=0;i<2;i++){const x=side*(31+i*47),y=Math.abs(x)*.5-34;polygon(g,[[x-12,y-21],[x+12,y-21+side*12],[x+12,y+7+side*12],[x-12,y+7]],'#48483e');polygon(g,[[x-9,y-17],[x+9,y-17+side*9],[x+9,y+4+side*9],[x-9,y+4]],'#edbd78');g.strokeStyle='#785e42';g.lineWidth=2;g.beginPath();g.moveTo(x,y-16+side*4);g.lineTo(x,y+5+side*4);g.stroke();glow(g,x,y+side*5,30,'246,184,95',.18);}
        polygon(g,[[-14,12],[-14,-21],[0,-28],[14,-14],[14,41],[0,48],[-14,41]],'#39453e');polygon(g,[[-9,15],[-9,-15],[0,-20],[8,-10],[8,37],[0,42],[-9,37]],'#735c44');rect(g,3,12,2,3,'#dfbe72');
        polygon(g,[[-25,44],[0,57],[25,44],[25,51],[0,66],[-25,52]],'#a59a7c');
        if(p.label){rect(g,-36,3,24,17,'#473d32');g.fillStyle='#e1c88e';g.font='10px serif';g.textAlign='center';g.fillText(p.variant===0?'商':'宿',-24,16);}
        for(let i=0;i<7;i++){const x=-100+rng.int(200);ellipse(g,x,Math.abs(x)*.5+48,5,3,tint(palette[2],-4));if(i%2===0)ellipse(g,x+2,Math.abs(x)*.5+43,2,2,palette[4]);}
      }else if(p.type==='tree'){
        ellipse(g,10,8,32,12,'rgba(4,19,25,.19)');rect(g,-5,-39,10,45,'#665a46');rect(g,-2,-37,3,39,'#8c7a59');
        if(r===7||p.variant===4){for(let k=0;k<4;k++){const y=-36-k*18,ww=39-k*7;polygon(g,[[-ww,y],[0,y-43],[ww,y],[20,y+3],[0,y+9],[-20,y+3]],r===7?(k%2?'#99afaa':'#b3c3ba'):tint(palette[2],-12-k*4));}if(r===7)for(let k=0;k<3;k++)polygon(g,[[-27+k*6,-47-k*20],[0,-65-k*22],[27-k*6,-47-k*20]],'#d5dcd0');}
        else {for(let i=0;i<22;i++){const angle=rng.next()*Math.PI*2,rad=rng.next()*35,x=Math.cos(angle)*rad,y=-49+Math.sin(angle)*rad*.7;ellipse(g,x,y,14+rng.int(10),11+rng.int(6),tint(palette[2],rng.int(37)-23));}for(let i=0;i<16;i++)rect(g,-35+rng.int(68),-77+rng.int(50),3,2,tint(palette[3],-34));}
      }else if(p.type==='rock'){polygon(g,[[-24,2],[-29,-10],[-9,-28],[16,-23],[27,-4],[15,10]],tint(palette[2],-15));polygon(g,[[-24,-6],[-9,-28],[15,-23],[5,-12]],tint(palette[3],-30));lineLocal(g,[[5,-12],[9,2],[21,0]],tint(palette[0],10),1);}
      else if(p.type==='lamp'){rect(g,-2,-51,4,56,'#4c5149');polygon(g,[[-8,-51],[0,-56],[8,-51],[6,-35],[-6,-35]],'#8f7955');rect(g,-4,-49,8,12,'#f6d69a');polygon(g,[[-9,-52],[0,-61],[9,-52]],'#a28e64');glow(g,0,-43,47,'250,187,101',.32);ellipse(g,0,3,10,4,'rgba(1,15,20,.16)');}
      else if(p.type==='fountain'){ellipse(g,0,9,41,20,'#6a7770');ellipse(g,0,3,38,19,'#a9ad98');ellipse(g,0,0,32,15,'#486f73');ellipse(g,0,-2,25,10,'#709999');rect(g,-6,-36,12,35,'#b9b89c');ellipse(g,0,-35,15,7,'#d1c9a9');for(let k=0;k<7;k++){const a=k/7*Math.PI*2;lineLocal(g,[[0,-33],[Math.cos(a)*17,-20],[Math.cos(a)*26,-3]],'rgba(184,218,203,.7)',1);}glow(g,0,-18,32,'146,213,200',.18);}
      else if(p.type==='arch'){for(const side of [-1,1]){polygon(g,[[side*65-10,15],[side*65+10,15],[side*65+10,-76],[side*65-10,-82]],tint(palette[3],-33));rect(g,side*65-13,-82,26,10,tint(palette[3],-10));}polygon(g,[[-78,-74],[-78,-96],[0,-132],[78,-96],[78,-74],[0,-103]],tint(palette[2],-3));lineLocal(g,[[-74,-92],[0,-126],[74,-92]],palette[3],3);ellipse(g,0,-107,8,11,palette[4]);glow(g,0,-107,35,'218,195,132',.24);}
      else if(p.type==='pillar'){polygon(g,[[-13,7],[0,14],[14,7],[14,-58],[0,-65],[-13,-58]],tint(palette[2],-19));rect(g,-13,-63,27,8,tint(palette[3],-38));for(let k=0;k<4;k++)lineLocal(g,[[-11,-47+k*13],[0,-41+k*13],[12,-47+k*13]],tint(palette[0],9),1);}
      else if(p.type==='rug'){polygon(g,[[0,-12],[p.w*18,p.w*9],[(p.w-p.h)*18,(p.w+p.h)*9],[-p.h*18,p.h*9-12]],tint(palette[4],-22));lineLocal(g,[[0,-8],[p.w*18-6,p.w*9],[(p.w-p.h)*18,(p.w+p.h)*9-4],[-p.h*18+6,p.h*9-10],[0,-8]],palette[3],1);}
      else if(p.type==='shelf'){const ww=p.w*24;rect(g,-ww*.5,-40,ww,48,'#655844');for(let k=0;k<3;k++){rect(g,-ww*.5,-34+k*15,ww,3,'#9b8b6d');for(let j=0;j<ww/8;j++)rect(g,-ww*.5+2+j*8,-31+k*15,4,10,[palette[2],palette[4],palette[3]][(j+k)%3]);}}
      else if(p.type==='bed'){polygon(g,[[-29,-17],[20,7],[20,59],[-29,34]],'#7d725b');polygon(g,[[-26,-16],[17,7],[17,49],[-26,27]],'#d4cdb0');polygon(g,[[-26,0],[17,24],[17,49],[-26,27]],palette[2]);polygon(g,[[-23,-12],[13,7],[13,17],[-23,-2]],'#ede2bd');rect(g,-31,-33,5,64,'#77634b');rect(g,18,-8,5,64,'#77634b');}
      else if(p.type==='boat'){polygon(g,[[-74,-15],[51,-25],[90,-9],[57,22],[-61,25],[-90,0]],'#544b3d');polygon(g,[[-65,-13],[48,-21],[76,-8],[53,13],[-55,18],[-76,0]],'#a48a5e');for(let i=0;i<7;i++)lineLocal(g,[[-53+i*18,-13],[-53+i*18,16]],'#5d5445',2);rect(g,-3,-106,5,105,'#ae956b');polygon(g,[[0,-104],[0,-30],[66,-38]],'#ceceb1');lineLocal(g,[[0,-107],[66,-38],[75,-6]],'#9a9d86',1);}
      else if(p.type==='banner'){rect(g,-2,-65,4,68,'#736b50');rect(g,-5,-65,32,3,'#bba777');polygon(g,[[1,-60],[25,-60],[25,-26],[13,-33],[1,-26]],palette[4]);g.fillStyle=palette[0];g.font='14px serif';g.textAlign='center';g.fillText(REGIONS[Math.min(r,7)].motif,13,-42);}
      else {polygon(g,[[-15,-15],[0,-24],[18,-15],[18,10],[0,19],[-15,10]],'#8f7958');polygon(g,[[-15,-15],[0,-24],[18,-15],[0,-6]],'#b29b74');lineLocal(g,[[-13,-10],[0,-3],[16,-11]],'#504b3e',2);lineLocal(g,[[0,-6],[0,18]],'#504b3e',2);}
      g.restore();
    }
    drawEntity(g:CanvasRenderingContext2D,e:Entity,s:State):void {
      if(!entityVisible(s,e))return;const p=this.iso(e.x,e.y),r=Math.min(s.region,7);g.save();g.translate(p.x,p.y);
      if(['recruit','quest','shop','inn'].includes(e.kind)){
        if(e.kind==='shop'&&e.value!== 'trade'||e.kind==='inn'&&e.value!=='rest'){g.restore();return;}
        ellipse(g,0,1,14,5,'rgba(6,19,25,.3)');g.imageSmoothingEnabled=false;g.drawImage(sprite(e.portrait??((r+3)%8)), -20,-57,40,60);g.imageSmoothingEnabled=true;
        if(e.kind==='recruit'&&!s.roster.some(h=>h.id===Number(e.value)))this.marker(g,'＋','#e2c98e');
        if(e.kind==='quest'&&!s.completed.includes(e.value)){const q=QUESTS.find(q=>q.id===e.value)!;this.marker(g,s.accepted.includes(q.id)?questReady(s,q)?'✓':'·':'!',questReady(s,q)?'#baddc0':'#e5cd8e');}
      }else if(e.kind==='enemy'||e.kind==='boss'||e.kind==='elite'){
        if(e.kind==='boss'&&s.flags['boss:'+e.value]){glow(g,0,-13,30,'154,229,212',.5);ellipse(g,0,-5,18,9,'#78a8a0');this.marker(g,'↗','#d9e2bb');}
        else {const d=e.kind==='enemy'?enemyById(`e${r}_${e.value}`)!:enemyById(e.value)!;const sz=e.kind==='enemy'?69:125;ellipse(g,0,0,sz*.3,sz*.12,'rgba(3,14,23,.36)');g.imageSmoothingEnabled=false;g.drawImage(monster(d),-sz/2,-sz+10+Math.sin(this.time*2+e.x)*2,sz,sz);g.imageSmoothingEnabled=true;if(e.kind!=='enemy')this.marker(g,'◆','#d6ba89',-sz+4);}
      }else if(e.kind==='chest'){polygon(g,[[-15,-9],[0,-16],[17,-8],[17,8],[0,16],[-15,8]],'#876342','#d1b777');polygon(g,[[-15,-10],[-12,-20],[0,-25],[14,-18],[17,-8],[0,0]],'#b68e52');rect(g,-3,-5,6,11,'#e5cd82');glow(g,0,-5,25,'236,207,121',.12);}
      else if(e.kind==='switch'){const idx=Number(e.value),order=puzzleOrder(s.area==='final'?0:r),on=order.slice(0,s.puzzles[this.world!.id]||0).includes(idx);polygon(g,[[-12,0],[0,7],[12,0],[12,-22],[0,-29],[-12,-22]],'#6f817d');ellipse(g,0,-28,9,6,on?'#f2dc9d':'#6f848a');if(on)glow(g,0,-31,38,'247,205,126',.4);g.fillStyle=on?'#efdfa9':'#a0b3b1';g.font='11px serif';g.textAlign='center';g.fillText(puzzleLabel(idx),0,-8);}
      else if(e.kind==='save'||e.kind==='finalboat'){rect(g,-3,-29,6,31,'#9e936b');polygon(g,[[-11,-34],[0,-48],[11,-34],[0,-22]],'#e1d6a0');glow(g,0,-35,39,'253,215,134',.32);}
      else if(e.kind==='exit'){g.strokeStyle='#d5c799';g.globalAlpha=.5+.2*Math.sin(this.time*2);g.lineWidth=2;g.beginPath();g.ellipse(0,0,25,12,0,0,Math.PI*2);g.stroke();g.fillStyle='#eddfb7';g.font='19px serif';g.textAlign='center';g.fillText('↗',0,-8);}
      else if(e.kind==='clue'){ellipse(g,0,0,13,5,'rgba(4,16,24,.2)');polygon(g,[[-9,-8],[7,-12],[13,-2],[-5,3]],'#ded6b5');glow(g,0,-7,20,'211,217,168',.35);this.marker(g,'✧','#e7d899',-25);}
      else {rect(g,-2,-20,4,23,'#6e6550');rect(g,-13,-36,27,17,'#9c8965');lineLocal(g,[[-8,-29],[9,-29]],'#e2d3a9',1);lineLocal(g,[[-8,-25],[4,-25]],'#e2d3a9',1);}
      g.restore();
    }
    marker(g:CanvasRenderingContext2D,s:string,color:string,y=-76):void{const bob=Math.sin(this.time*2)*2;polygon(g,[[-10,y+bob],[0,y-6+bob],[10,y+bob],[10,y+14+bob],[0,y+20+bob],[-10,y+14+bob]],'rgba(15,32,40,.85)',color);g.font='13px serif';g.textAlign='center';g.fillStyle=color;g.fillText(s,0,y+12+bob);}
    atmosphere(g:CanvasRenderingContext2D,r:number,t:number,quality=true):void {
      const weather=REGIONS[Math.min(r,7)].weather,n=quality?65:24;g.save();
      if(quality){g.globalCompositeOperation='screen';for(let i=0;i<3;i++){const grad=g.createLinearGradient(140+i*310,0,410+i*310,620);grad.addColorStop(0,'rgba(236,214,154,.048)');grad.addColorStop(1,'rgba(236,214,154,0)');polygon(g,[[140+i*310,0],[210+i*310,0],[740+i*310,720],[610+i*310,720]],grad as unknown as string);}g.globalCompositeOperation='source-over';}
      for(let i=0;i<n;i++){
        const speed=weather==='rain'?130:weather==='sand'?35:12;const x=((i*197.73+t*(weather==='sand'?45:7)+Math.sin(t*.4+i)*13)%1340)-30,y=((i*83.13+t*speed)%770)-25;
        if(weather==='rain'){g.strokeStyle='rgba(182,209,215,.2)';g.lineWidth=.7;g.beginPath();g.moveTo(x,y);g.lineTo(x-5,y+18);g.stroke();}
        else if(weather==='snow'){ellipse(g,x,y,1+(i%3)*.5,1+(i%3)*.5,'rgba(225,237,230,.6)');}
        else if(weather==='leaves'||weather==='petals'){g.save();g.translate(x,y);g.rotate(t+i);ellipse(g,0,0,3,1.4,weather==='leaves'?'rgba(219,150,85,.6)':'rgba(239,210,175,.5)');g.restore();}
        else {const alpha=.2+Math.sin(t*2+i)*.17;if(i%3===0&&quality)glow(g,x,y,6,'224,220,156',alpha);rect(g,x,y,i%3?1:2,i%3?1:2,`rgba(226,225,171,${alpha+.2})`);}
      }
      const v=g.createRadialGradient(640,355,170,640,360,760);v.addColorStop(0,'rgba(0,10,20,0)');v.addColorStop(.7,'rgba(3,14,23,.12)');v.addColorStop(1,'rgba(1,9,16,.68)');g.fillStyle=v;g.fillRect(0,0,1280,720);g.restore();
    }
    worldFrame(s:State,dt:number):void {
      this.time+=dt;const g=this.ctx;g.setTransform(1.5,0,0,1.5,0,0);this.backdrop(g,s.region,this.time,['dungeon','final','shop','inn'].includes(s.area));if(!this.world||!this.ground)return;
      const p=this.iso(s.x,s.y);this.camX+=(p.x-this.camX)*Math.min(1,dt*6);this.camY+=(p.y-this.camY)*Math.min(1,dt*6);
      g.save();g.translate(640-this.camX*this.zoom,380-this.camY*this.zoom);g.scale(this.zoom,this.zoom);g.drawImage(this.ground,-1150,-100);
      for(const h of this.world.hazards){const q=this.iso(h.x,h.y);glow(g,q.x,q.y,36,'183,111,94',.22+.08*Math.sin(this.time*3));ellipse(g,q.x,q.y,18,8,'rgba(202,113,88,.15)');}
      const draws:{z:number;draw:()=>void}[]=this.world.props.map(pr=>({z:pr.x+pr.y+pr.w+pr.h-1,draw:()=>this.drawProp(g,pr,s.region,s)}));
      for(const e of this.world.entities)draws.push({z:e.x+e.y,draw:()=>this.drawEntity(g,e,s)});
      const party=s.active.slice(0,4);party.forEach((id,i)=>{const x=s.x-i*.62,y=s.y-i*.18,q=this.iso(x,y);draws.push({z:x+y+.15,draw:()=>{ellipse(g,q.x,q.y+1,14,5,'rgba(2,15,23,.32)');const f=this.moving?[0,1,0,2][Math.floor(this.time*8+i*.4)%4]:0;g.imageSmoothingEnabled=false;g.drawImage(sprite(id,f,this.dir),q.x-21,q.y-59+(this.moving?Math.sin(this.time*12+i)*.7:0),42,63);g.imageSmoothingEnabled=true;}});});
      draws.sort((a,b)=>a.z-b.z).forEach(d=>d.draw());
      for(const e of this.world.entities.filter(e=>e.kind==='save'||e.kind==='switch')){const q=this.iso(e.x,e.y);if(e.kind==='save')glow(g,q.x,q.y-34,45,'230,192,114',.13);}
      g.restore();this.atmosphere(g,s.region,this.time,s.settings.quality);
    }
    battlePosition(a:Actor,b:Battle):{x:number;y:number;scale:number}{const group=b.actors.filter(x=>x.team===a.team),i=group.indexOf(a);if(a.team==='hero')return{x:205+i*62,y:270+i*46,scale:2.1};const boss=enemyById(a.enemyId)?.boss;return{x:group.length===1?925:790+i*155,y:group.length===1?440:350+(i%2)*68,scale:boss?2.05:1.27};}
    battleFrame(b:Battle,dt:number):void {
      this.time+=dt;const g=this.ctx;g.setTransform(1.5,0,0,1.5,0,0);this.backdrop(g,b.state.region,this.time,true);
      const p=REGIONS[Math.min(b.state.region,7)].palette;
      for(let i=0;i<10;i++){const x=80+i*138;const h=90+Math.sin(i*9)*35;polygon(g,[[x,345],[x+38,322],[x+38,322-h],[x,345-h]],tint(p[1],-7));polygon(g,[[x+38,322],[x+56,333],[x+56,333-h],[x+38,322-h]],tint(p[0],7));}
      const floor=g.createLinearGradient(0,350,0,720);floor.addColorStop(0,'rgba(18,33,40,0)');floor.addColorStop(1,tint(p[0],7));g.fillStyle=floor;g.fillRect(0,350,1280,370);
      for(let y=375;y<730;y+=40){g.strokeStyle='rgba(155,170,157,.08)';g.beginPath();g.moveTo(0,y);g.lineTo(1280,y);g.stroke();}
      g.save();this.shake=Math.max(0,this.shake-dt*22);if(b.state.settings.shake)g.translate(Math.sin(this.time*78)*this.shake,Math.cos(this.time*63)*this.shake*.6);
      const actors=[...b.actors].sort((a,c)=>this.battlePosition(a,b).y-this.battlePosition(c,b).y);
      for(const a of actors){const pos=this.battlePosition(a,b);if(a.hp<=0&&a.team==='enemy')continue;ellipse(g,pos.x,pos.y, a.team==='hero'?37:65,13,'rgba(0,8,15,.4)');
        if(a.key===b.current){g.strokeStyle='#d9c585';g.lineWidth=1;g.beginPath();g.ellipse(pos.x,pos.y+1,a.team==='hero'?41:78,15,0,0,Math.PI*2);g.stroke();glow(g,pos.x,pos.y-25,65,'223,185,98',.15);}
        if(a.team==='hero'){g.save();g.translate(pos.x,pos.y);if(a.hp<=0){g.rotate(-Math.PI/2);g.globalAlpha=.52;}g.imageSmoothingEnabled=false;g.drawImage(sprite(a.heroId,0,3),-32*pos.scale/2,-48*pos.scale,32*pos.scale,48*pos.scale);g.restore();g.imageSmoothingEnabled=true;}
        else {const img=monster(enemyById(a.enemyId)!);const size=144*pos.scale;g.imageSmoothingEnabled=false;g.globalAlpha=a.stagger?.72:1;g.drawImage(img,pos.x-size/2,pos.y-size+12+Math.sin(this.time*1.5)*3,size,size);g.globalAlpha=1;g.imageSmoothingEnabled=true;if(a.charged)glow(g,pos.x,pos.y-size*.5,120,'232,123,86',.18+.08*Math.sin(this.time*5));}
        if(a.barrier>0){g.strokeStyle='rgba(157,215,214,.5)';g.lineWidth=2;g.beginPath();g.ellipse(pos.x,pos.y-55,34,52,0,0,Math.PI*2);g.stroke();}
      }
      this.effects=this.effects.filter(e=>this.time-e.born<1.15);
      for(const fx of this.effects){const age=this.time-fx.born,a=b.actor(fx.event.target);if(!a)continue;const pos=this.battlePosition(a,b),ev=fx.event,alpha=clamp(1-age/1.15,0,1);g.save();g.globalAlpha=alpha;
        if(ev.kind==='hit'&&age<.28&&ev.source!==ev.target){const from=b.actor(ev.source);if(from){const p0=this.battlePosition(from,b);g.strokeStyle=ELEMENT_COLOR[ev.element||'light'];g.lineWidth=age<.1?5:2;g.beginPath();g.moveTo(pos.x-42,pos.y-96);g.lineTo(pos.x+43,pos.y-39);g.stroke();g.globalAlpha*=.22;g.beginPath();g.moveTo(p0.x,p0.y-40);g.lineTo(pos.x,pos.y-65);g.stroke();g.globalAlpha=alpha;glow(g,pos.x,pos.y-70,60,'242,208,151',.35);}}
        const offset=(fx.born%1)*24;g.textAlign='center';g.shadowColor='#07121b';g.shadowBlur=5;g.font=ev.kind==='break'?'bold 34px Georgia':'bold 25px Georgia';g.fillStyle=ev.kind==='heal'?'#b5e0b3':ev.kind==='break'?'#edd396':ev.kind==='status'?'#bcddd8':'#f3e9cf';g.fillText(ev.kind==='hit'||ev.kind==='heal'?`${ev.kind==='heal'?'+':''}${ev.amount}`:ev.text,pos.x+offset,pos.y-90-age*42-offset);if(ev.text&&ev.kind==='hit'){g.font='11px Georgia';g.fillStyle='#ead094';g.fillText(ev.text,pos.x+offset,pos.y-116-age*42-offset);}g.restore();
      }
      g.restore();this.atmosphere(g,b.state.region,this.time,b.state.settings.quality);
    }
    consume(events:BattleEvent[]):void{events.forEach(event=>{this.effects.push({event,born:this.time});if(event.kind==='hit'&&event.amount>0)this.shake=Math.max(this.shake,3.5);if(event.kind==='break')this.shake=6;});}
    titleFrame(dt:number):void {this.time+=dt;const g=this.ctx;g.setTransform(1.5,0,0,1.5,0,0);this.backdrop(g,0,this.time);if(this.titleImage?.complete&&this.titleImage.naturalWidth){const img=this.titleImage,scale=Math.max(1280/img.width,720/img.height)*1.025;g.drawImage(img,(1280-img.width*scale)/2+Math.sin(this.time*.08)*7,(720-img.height*scale)/2,img.width*scale,img.height*scale);}else {g.save();g.translate(930,430);polygon(g,[[-90,100],[-70,-70],[-15,-115],[45,-63],[72,105]],'#182f35');polygon(g,[[-31,-80],[-24,-279],[19,-279],[30,-81]],'#b1b098');rect(g,-29,-278,53,12,'#bfbba0');polygon(g,[[-36,-288],[-1,-321],[34,-288]],'#45605e');rect(g,-23,-285,43,33,'#ecd8a0');glow(g,0,-267,155,'241,217,150',.32);g.restore();}
      const shade=g.createLinearGradient(0,0,1280,0);shade.addColorStop(0,'rgba(5,18,27,.83)');shade.addColorStop(.42,'rgba(6,22,30,.45)');shade.addColorStop(1,'rgba(5,18,27,.06)');g.fillStyle=shade;g.fillRect(0,0,1280,720);this.atmosphere(g,0,this.time,true);
    }
  }
  function lighten(c:string,n:number):string{return tint(c,n);}
  function lineLocal(g:CanvasRenderingContext2D,points:number[][],color:string,width:number):void{g.strokeStyle=color;g.lineWidth=width;g.beginPath();points.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke();}
}
