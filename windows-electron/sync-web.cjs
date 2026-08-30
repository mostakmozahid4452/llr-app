const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const dst = path.resolve(__dirname, 'web');

fs.rmSync(dst, { recursive: true, force: true });
fs.mkdirSync(dst, { recursive: true });

const required = [
  'index.html',
  'sw.js'
];

const optional = [
  'manifest.json',
  'manifest-v1.0.11.json',
  'icon-192.png',
  'icon-512.png',
  'icon-192-maskable.png',
  'icon-512-maskable.png',
  'icon-192-v1.0.11.png',
  'icon-512-v1.0.11.png'
];

for (const file of required) {
  const src = path.join(repoRoot, file);
  if (!fs.existsSync(src)) {
    throw new Error(`Required web file missing from repository root: ${file}`);
  }
  fs.copyFileSync(src, path.join(dst, file));
}

for (const file of optional) {
  const src = path.join(repoRoot, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(dst, file));
  }
}

console.log('Latest repository-root web app synced into Windows build.');
