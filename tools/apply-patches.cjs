'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),dir=path.join(__dirname,'patches');
if(!fs.existsSync(dir))process.exit(0);
const ledgerPath=path.join(root,'archive/applied-patches.json');
const ledger=fs.existsSync(ledgerPath)?JSON.parse(fs.readFileSync(ledgerPath,'utf8')):{};
for(const name of fs.readdirSync(dir).filter(n=>n.endsWith('.json')).sort()){
  const changes=JSON.parse(fs.readFileSync(path.join(dir,name),'utf8'));
  for(const change of changes){
    const fingerprint=crypto.createHash('sha256').update(JSON.stringify(change)).digest('hex');
    const file=path.resolve(root,change.file);
    if(!file.startsWith(root+path.sep)||change.file.startsWith('node_modules/')||change.file.includes('.git/'))throw new Error('Unsafe patch path');
    if(ledger[fingerprint])continue;
    const old=fs.readFileSync(file,'utf8');
    if(change.after&&old.includes(change.after)){ledger[fingerprint]={patch:name,file:change.file,status:'already-applied'};continue;}
    if(!old.includes(change.before))throw new Error(name+': neither original nor patched content found in '+change.file);
    const count=old.split(change.before).length-1;
    if(count!==(change.count||1))throw new Error(name+': expected '+(change.count||1)+' matches; found '+count);
    const digest=crypto.createHash('sha256').update(old).digest('hex').slice(0,16),archive=path.join(root,'archive/pre-patch',digest+'-'+path.basename(file));
    fs.mkdirSync(path.dirname(archive),{recursive:true});if(!fs.existsSync(archive))fs.writeFileSync(archive,old);
    fs.writeFileSync(file,old.split(change.before).join(change.after));ledger[fingerprint]={patch:name,file:change.file,status:'applied',before_sha256:digest};console.log(name+': patched '+change.file);
  }
}
fs.mkdirSync(path.dirname(ledgerPath),{recursive:true});fs.writeFileSync(ledgerPath,JSON.stringify(ledger,null,2)+'\n');
