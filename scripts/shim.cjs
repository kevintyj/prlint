const fs = require('node:fs');
const path = require('node:path');

const shimPath = path.resolve(__dirname, '../src/shim.js');
const distPath = path.resolve(__dirname, '../dist/index.js');

// Read the contents of shim.js
const shimContent = fs.readFileSync(shimPath, 'utf8');

// Read the contents of index.mjs
const distContent = fs.readFileSync(distPath, 'utf8');

// Combine the contents
const combinedContent = `${shimContent}\n${distContent}`;

// Write the combined content back to index.mjs
fs.writeFileSync(distPath, combinedContent, 'utf8');
