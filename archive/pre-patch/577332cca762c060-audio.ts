namespace LT {
  export type MusicScene='title'|'town'|'road'|'dungeon'|'battle'|'boss'|'ending';
  export interface Score {name:string;tempo:number;root:number;mode:number[];melody:number[];chords:number[];voice:'pluck'|'flute'|'bell';}
  export const SCORES:Score[]=[
    {name:'潮汐留下的空白',tempo:84,root:62,mode:[0,2,3,5,7,9,10],melody:[0,2,4,-1,5,4,2,1,0,-1,2,4,3,2,1,-1,4,5,7,6,5,-1,4,2,3,2,0,-1,1,2,0,-1],chords:[0,5,3,4],voice:'flute'},
    {name:'烬叶与誓言',tempo:88,root:57,mode:[0,2,3,5,7,8,10],melody:[0,-1,4,3,2,-1,0,1,2,4,5,4,3,2,1,-1,0,2,3,-1,4,5,4,2,1,-1,2,1,0,-1,-1,-1],chords:[0,3,5,4],voice:'pluck'},
    {name:'第零页的星图',tempo:80,root:65,mode:[0,2,4,6,7,9,11],melody:[0,4,2,5,4,-1,2,0,6,5,4,2,3,-1,2,-1,7,6,4,5,4,2,1,-1,0,2,4,2,1,-1,0,-1],chords:[0,4,1,3],voice:'bell'},
    {name:'不发光的种子',tempo:78,root:60,mode:[0,2,4,5,7,9,11],melody:[0,-1,1,2,4,2,1,-1,3,4,5,-1,4,2,1,0,4,-1,5,7,6,5,4,-1,3,2,1,2,0,-1,-1,-1],chords:[0,3,5,4],voice:'flute'},
    {name:'无月埠的灯影',tempo:90,root:59,mode:[0,2,3,5,7,8,10],melody:[0,2,-1,4,3,-1,2,1,0,-1,6,5,4,3,2,-1,7,6,4,-1,3,4,2,1,3,-1,2,-1,0,-1,-1,-1],chords:[0,5,1,4],voice:'pluck'},
    {name:'送潮曲',tempo:82,root:62,mode:[0,2,4,5,7,9,11],melody:[4,-1,3,2,0,-1,2,4,5,-1,4,2,3,2,1,-1,0,2,4,5,7,-1,6,5,4,3,2,-1,1,2,0,-1],chords:[0,4,5,3],voice:'flute'},
    {name:'可以熄灭的炉火',tempo:94,root:55,mode:[0,2,4,5,7,9,10],melody:[0,2,4,2,0,-1,3,4,5,4,2,-1,1,2,0,-1,4,5,7,5,4,2,3,4,2,1,0,-1,2,1,0,-1],chords:[0,3,4,0],voice:'pluck'},
    {name:'雪下的第八双脚印',tempo:73,root:64,mode:[0,2,3,5,7,9,10],melody:[0,-1,-1,4,3,-1,2,-1,1,2,0,-1,6,-1,4,-1,5,-1,7,6,4,-1,3,2,1,-1,2,-1,0,-1,-1,-1],chords:[0,5,3,4],voice:'bell'}
  ];
  export class AudioEngine {
    context:AudioContext|null=null;music:GainNode|null=null;fx:GainNode|null=null;reverb:ConvolverNode|null=null;ambient:AudioBufferSourceNode|null=null;ambientGain:GainNode|null=null;
    scene:MusicScene='title';region=0;step=0;nextTime=0;timer:number|undefined;settings:Settings=clone(DEFAULT_SETTINGS);voices=0;enabled=false;private noiseBuffer:AudioBuffer|null=null;
    start():void {
      try {if(!this.context){const Constructor=window.AudioContext||(window as unknown as {webkitAudioContext:typeof AudioContext}).webkitAudioContext;this.context=new Constructor();const c=this.context;
        this.music=c.createGain();this.fx=c.createGain();this.music.gain.value=this.settings.music*.55;this.fx.gain.value=this.settings.sfx*.48;
        const compressor=c.createDynamicsCompressor();compressor.threshold.value=-20;compressor.knee.value=16;compressor.ratio.value=3;compressor.connect(c.destination);this.music.connect(compressor);this.fx.connect(compressor);
        this.reverb=c.createConvolver();const ir=c.createBuffer(2,c.sampleRate*1.7,c.sampleRate),rng=new RNG(32191);for(let ch=0;ch<2;ch++){const d=ir.getChannelData(ch);for(let i=0;i<d.length;i++)d[i]=(rng.next()*2-1)*Math.pow(1-i/d.length,2.9)*.27;}this.reverb.buffer=ir;const wet=c.createGain();wet.gain.value=.24;this.reverb.connect(wet);wet.connect(this.music);
        this.noiseBuffer=c.createBuffer(1,c.sampleRate*3,c.sampleRate);const nd=this.noiseBuffer.getChannelData(0);let previous=0;for(let i=0;i<nd.length;i++){previous=(previous+.018*(rng.next()*2-1))/.998;previous=clamp(previous,-1,1);nd[i]=previous*.1+(rng.next()*2-1)*.09;}
        this.ambient=c.createBufferSource();this.ambient.buffer=this.noiseBuffer;this.ambient.loop=true;const filter=c.createBiquadFilter();filter.type='lowpass';filter.frequency.value=650;this.ambientGain=c.createGain();this.ambientGain.gain.value=.08;this.ambient.connect(filter);filter.connect(this.ambientGain);this.ambientGain.connect(this.music);this.ambient.start();
        this.timer=window.setInterval(()=>this.schedule(),90);
      }void this.context.resume();this.enabled=true;this.nextTime=Math.max(this.context.currentTime+.08,this.nextTime);}catch{this.enabled=false;}
    }
    update(settings:Settings):void {this.settings=clone(settings);if(this.context&&this.music&&this.fx){this.music.gain.setTargetAtTime(settings.music*.55,this.context.currentTime,.15);this.fx.gain.setTargetAtTime(settings.sfx*.48,this.context.currentTime,.06);}}
    setScene(scene:MusicScene,region=0):void {if(this.scene===scene&&this.region===region)return;this.scene=scene;this.region=Math.min(region,7);this.step=0;if(this.context){this.nextTime=this.context.currentTime+.25;if(this.music){this.music.gain.cancelScheduledValues(this.context.currentTime);this.music.gain.setTargetAtTime(.005,this.context.currentTime,.08);this.music.gain.setTargetAtTime(this.settings.music*.55,this.context.currentTime+.3,.28);}if(this.ambientGain)this.ambientGain.gain.setTargetAtTime(scene==='dungeon'?.03:scene==='battle'||scene==='boss'?.015:.08,this.context.currentTime,.3);}}
    private pitch(degree:number,score:Score):number {const octave=Math.floor(degree/7),note=((degree%7)+7)%7;return score.root+score.mode[note]+octave*12;}
    schedule():void {
      const c=this.context;if(!this.enabled||!c||c.state!=='running'||!this.music)return;
      const score=SCORES[this.region],combat=this.scene==='battle'||this.scene==='boss',tempo=combat?(this.scene==='boss'?134:121):this.scene==='dungeon'?score.tempo*.85:this.scene==='ending'?76:score.tempo;
      const unit=60/tempo/2;if(this.nextTime<c.currentTime-.5)this.nextTime=c.currentTime+.02;
      while(this.nextTime<c.currentTime+.22){const t=this.nextTime,i=this.step,bar=Math.floor(i/8),chord=score.chords[Math.floor(bar/2)%score.chords.length],n=score.melody[i%score.melody.length];
        if(i%8===0){for(const d of [chord,chord+2,chord+4])this.tone(this.pitch(d,score)-12,t,unit*7.5,'pad',.05,this.music);this.tone(this.pitch(chord,score)-24,t,unit*3.5,'bass',.18,this.music);}
        if(i%8===4)this.tone(this.pitch(chord+4,score)-24,t,unit*3.4,'bass',.12,this.music);
        if(n>=0){const offset=this.scene==='dungeon'?-12:this.scene==='ending'?0:0;this.tone(this.pitch(n,score)+offset,t,unit*(combat?1.2:2.3),combat?'pluck':score.voice,this.scene==='dungeon'?.065:.11,this.music);}
        if(!combat&&this.scene!=='dungeon'&&i%2===1)this.tone(this.pitch(chord+(i%6),score)-12,t,unit*1.6,'pluck',.035,this.music);
        if(combat){if(i%4===0)this.percussion('kick',t,.13,this.music);if(i%8===4)this.percussion('snare',t,.065,this.music);if(i%2===0)this.percussion('hat',t,.025,this.music);if(i%2===1)this.tone(this.pitch(chord+(i%4===1?0:4),score)-12,t,unit*.75,'pluck',.06,this.music);}
        this.nextTime+=unit;this.step++;
      }
    }
    tone(midi:number,time:number,duration:number,voice:string,volume:number,bus:GainNode):void {
      const c=this.context;if(!c||this.voices>70)return;this.voices++;const frequency=440*Math.pow(2,(midi-69)/12),o=c.createOscillator(),harmonic=c.createOscillator(),envelope=c.createGain(),filter=c.createBiquadFilter();o.frequency.value=frequency;harmonic.frequency.value=frequency*(voice==='bell'?2.003:2);o.type=voice==='pad'?'sawtooth':voice==='pluck'?'triangle':'sine';harmonic.type='sine';filter.type='lowpass';filter.frequency.value=voice==='pad'?900:voice==='bass'?650:voice==='pluck'?3000:5500;
      const hg=c.createGain();hg.gain.value=voice==='bell'?.24:voice==='flute'?.12:.07;harmonic.connect(hg);hg.connect(filter);o.connect(filter);filter.connect(envelope);envelope.connect(bus);if(this.reverb&&bus===this.music)envelope.connect(this.reverb);
      const attack=voice==='pad'?.18:voice==='flute'?.045:.008;envelope.gain.setValueAtTime(.0001,time);envelope.gain.exponentialRampToValueAtTime(Math.max(.0002,volume),time+attack);envelope.gain.exponentialRampToValueAtTime(Math.max(.0001,volume*.22),time+duration*.75+attack);envelope.gain.exponentialRampToValueAtTime(.0001,time+duration+.2+attack);
      if(voice==='flute'){o.frequency.setValueAtTime(frequency*.998,time);o.frequency.linearRampToValueAtTime(frequency*1.002,time+duration);}
      o.start(time);harmonic.start(time);o.stop(time+duration+.24+attack);harmonic.stop(time+duration+.24+attack);o.onended=()=>{this.voices--;o.disconnect();harmonic.disconnect();hg.disconnect();filter.disconnect();envelope.disconnect();};
    }
    percussion(type:string,time:number,vol:number,bus:GainNode):void {
      const c=this.context;if(!c)return;
      if(type==='kick'){const o=c.createOscillator(),g=c.createGain();o.frequency.setValueAtTime(120,time);o.frequency.exponentialRampToValueAtTime(38,time+.13);g.gain.setValueAtTime(vol,time);g.gain.exponentialRampToValueAtTime(.0001,time+.2);o.connect(g);g.connect(bus);o.start(time);o.stop(time+.22);o.onended=()=>{o.disconnect();g.disconnect();};return;}
      const n=c.createBufferSource();n.buffer=this.noiseBuffer;const f=c.createBiquadFilter();f.type=type==='hat'?'highpass':'bandpass';f.frequency.value=type==='hat'?7000:1800;const g=c.createGain();g.gain.setValueAtTime(vol,time);g.gain.exponentialRampToValueAtTime(.0001,time+(type==='hat'?.06:.16));n.connect(f);f.connect(g);g.connect(bus);n.start(time);n.stop(time+.2);n.onended=()=>{n.disconnect();f.disconnect();g.disconnect();};
    }
    sfx(kind:'confirm'|'cancel'|'step'|'hit'|'magic'|'heal'|'break'|'reward'|'bell'):void {
      const c=this.context,bus=this.fx;if(!c||!bus||!this.enabled)return;const t=c.currentTime;
      if(kind==='step'){this.percussion('hat',t,.018,bus);return;}
      if(kind==='hit'){this.percussion('snare',t,.16,bus);this.tone(41,t,.08,'bass',.13,bus);return;}
      if(kind==='break'){this.percussion('snare',t,.2,bus);[76,83,88,95].forEach((n,i)=>this.tone(n,t+i*.025,.65,'bell',.09,bus));return;}
      const notes=kind==='cancel'?[60,55]:kind==='reward'?[62,66,69,74]:kind==='heal'?[69,74,78]:kind==='magic'?[74,81,86]:kind==='bell'?[62,69,74,81]:[74,81];
      notes.forEach((n,i)=>this.tone(n,t+i*(kind==='reward'?.12:.065),kind==='bell'?1.4:.25,'bell',kind==='confirm'?.05:.095,bus));
    }
  }
}
