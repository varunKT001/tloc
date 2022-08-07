#!/usr/bin/env node

import { LOC } from './utils';
import path from 'path';

const pathName = process.argv.slice(2)[0];

const reader = new LOC(path.resolve(pathName));

const numberOfLines = reader.readDirectory();

if (numberOfLines) {
  console.log(numberOfLines);
}
