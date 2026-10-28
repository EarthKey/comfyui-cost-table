import {spawnSync} from 'node:child_process';
import './build.mjs';
const result=spawnSync(process.platform==='win32'?'npx.cmd':'npx',['--yes','wrangler@4.154.0','deploy'],{stdio:'inherit',shell:process.platform==='win32'});
process.exit(result.status??1);
