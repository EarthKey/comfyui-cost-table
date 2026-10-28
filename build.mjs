import {readFile,writeFile,mkdir,copyFile,readdir,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(fileURLToPath(import.meta.url));
const assets=["comfyui_video_cost_table.html", "comfyui_image_cost_table.html", "ai_model_comparison_lab.html", "comfyui_3d_cost_table.html", "comfyui_3d_cost_table.css", "comfyui_3d_cost_table.js", "3d-models.json", "og-image.webp", "og-image-lab.webp", "404.html", "robots.txt", "sitemap.xml", "_headers", "_redirects"];
const allowed=new Set([...assets,'index.html']);
await mkdir(path.join(root,'dist'),{recursive:true});
for(const name of await readdir(path.join(root,'dist'))) if(!allowed.has(name)) throw Error('Unexpected dist file: '+name);
for(const name of assets){if(!(await stat(path.join(root,name))).size)throw Error('Empty source: '+name);await copyFile(path.join(root,name),path.join(root,'dist',name));}
const video=await readFile(path.join(root,'comfyui_video_cost_table.html'));
await writeFile(path.join(root,'index.html'),video);
await writeFile(path.join(root,'dist/index.html'),video);
console.log('Built '+allowed.size+' public assets (explicit allowlist).');
