#!/usr/bin/env node

import { LOC } from './utils';
import path from 'path';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2), { '--': true });

const pathName = args['_'][0];
const ignore = args['--'] || [];

const ignoreScoped = ignore
  .filter((p) => p.includes('/'))
  .map((p) => path.resolve(p));

const ignoreUnscoped = ignore.filter((p) => !p.includes('/'));

const reader = new LOC(path.resolve(pathName), ignoreScoped, ignoreUnscoped);

const numberOfLines = reader.readDirectory();

if (numberOfLines) {
  console.log(numberOfLines);
}
