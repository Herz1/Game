'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../build/release');
const port=Number(process.env.PORT||4173);
http.createServer((req,res)=>{let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end('Bad request');return;}if(name==='/')name='/index.html';const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end('Not found');return;}const ext=path.extname(file);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.webp':'image/webp'})[ext]||'application/octet-stream');res.setHeader('Cache-Control','no-store');fs.createReadStream(file).pipe(res);}).listen(port,'127.0.0.1',()=>console.log('Lantern Tides: http://127.0.0.1:'+port));
