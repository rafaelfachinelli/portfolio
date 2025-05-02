import esbuild from 'esbuild'

esbuild
  .build({
    entryPoints: ['./server.js'],
    bundle: true,
    platform: 'node',
    target: 'node20',
    outfile: './dist/server.js',
    external: ['next', 'socket.io'],
    format: 'esm',
  })
  .catch(() => process.exit(1))
