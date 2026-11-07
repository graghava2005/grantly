import fs from 'fs';
import path from 'path';

const viteCmdPath = path.resolve('node_modules', '.bin', 'vite.cmd');
if (fs.existsSync(viteCmdPath)) {
  const content = '@ECHO off\r\nnode "%~dp0..\\vite\\bin\\vite.js" %*\r\n';
  fs.writeFileSync(viteCmdPath, content);
  console.log('Successfully patched node_modules/.bin/vite.cmd for paths with ampersands.');
}
