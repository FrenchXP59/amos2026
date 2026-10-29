import {build} from 'vite';
import {fileURLToPath} from 'node:url';
export async function buildConvention() {
  await build({
    configFile:false,
    root:fileURLToPath(new URL('../convention/',import.meta.url)),
    base:'./',
    build:{outDir:fileURLToPath(new URL('../dist/convention/',import.meta.url)),emptyOutDir:true,
      rollupOptions:{output:{manualChunks:{three:['three']}}}},
  });
}
