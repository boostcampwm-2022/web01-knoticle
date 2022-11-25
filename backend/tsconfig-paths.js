/* eslint-disable @typescript-eslint/no-var-requires */

// import tsConfigPaths from 'tsconfig-paths';
// import tsConfig from './tsconfig.json';

const tsConfigPaths = require('tsconfig-paths');

const tsConfig = require('./tsconfig.json');

tsConfigPaths.register({
  baseUrl: tsConfig.compilerOptions.outDir,
  paths: tsConfig.compilerOptions.paths,
});
