// Shim globals in esm bundle
// eslint-disable-next-line unicorn/prefer-node-protocol
import { fileURLToPath } from 'url';

// eslint-disable-next-line unicorn/prefer-node-protocol
import path from 'path';

// eslint-disable-next-line unicorn/prefer-node-protocol
import Module from 'module';

const getFilename = () => fileURLToPath(import.meta.url).toString();
const getDirname = () => path.dirname(getFilename());

const __dirname = getDirname();
const __filename = getFilename();
// eslint-disable-next-line unused-imports/no-unused-vars
const require = Module.createRequire(__dirname);
