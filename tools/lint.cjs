'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const errors=[];let count=0;
for(const file of fs.readdirSync(path.join(root,'src')).filter(f=>/\.(ts|css)$/.test(f))){const text=fs.readFileSync(path.join(root,'src',file),'utf8');count++;if(!text.trim())errors.push(file+': empty source');if(/\b(?:eval|alert|prompt)\s*\(/.test(text))errors.push(file+': forbidden runtime dynamic execution or browser modal');if(/\bTODO\b|lorem ipsum|coming soon|待实现/i.test(text))errors.push(file+': unfinished production marker');if(/\bdebugger\s*;/.test(text))errors.push(file+': debugger statement');if(/\t/.test(text))errors.push(file+': use spaces consistently');if(/\r/.test(text))errors.push(file+': use LF line endings');if(!text.endsWith('\n'))errors.push(file+': missing final newline');if(file.endsWith('.ts')&&!text.includes('namespace LT'))errors.push(file+': unexpected global module');}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}console.log('Custom source hygiene lint: '+count+' files passed. Type safety is checked separately by TypeScript; this is not ESLint.');
