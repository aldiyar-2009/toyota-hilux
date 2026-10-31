// Встраивает pickup.glb в index.html (между метками <!--GLB--> и <!--/GLB-->).
// Запуск после каждого экспорта из Blender:  node embed-model.js
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlPath = path.join(dir, 'index.html');
const glbPath = path.join(dir, 'pickup.glb');

const html = fs.readFileSync(htmlPath, 'utf8');
const b64 = fs.readFileSync(glbPath).toString('base64');
const re = /<!--GLB-->[\s\S]*?<!--\/GLB-->/;
if (!re.test(html)) { console.error('В HTML нет меток <!--GLB--> … <!--/GLB-->'); process.exit(1); }

const block = '<!--GLB--><script type="application/octet-stream" id="pickup-glb">' + b64 + '</script><!--/GLB-->';
fs.writeFileSync(htmlPath, html.replace(re, () => block));
console.log('Готово: модель ' + (b64.length / 1048576).toFixed(1) + ' МБ встроена в ' + path.basename(htmlPath));
