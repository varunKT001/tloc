#!/usr/bin/env node

import minimist from 'minimist';
import { cli } from './utils';

const args = minimist(process.argv.slice(2), { '--': true });

cli(args);
