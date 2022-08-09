import { LOC } from '../package';
import { ParsedArgs } from 'minimist';
import path from 'path';
import chalk from 'chalk';

interface InitInfo {
  pathName: string;
  ignoreScopedDirents: string[];
  ignoreUnscopedDirents: string[];
  log: boolean;
}

export function cli(args: ParsedArgs) {
  const pathName = args['_'][0];
  const ignore = args['--'] || [];
  const log = args['l'] || args['log'] || false;

  const ignoreScopedDirents = ignore
    .filter((p) => p.includes('/'))
    .map((p) => path.resolve(p));

  const ignoreUnscopedDirents = ignore.filter((p) => !p.includes('/'));

  const info = {
    pathName,
    ignoreScopedDirents,
    ignoreUnscopedDirents,
    log,
  };

  init(info);
}

function init(info: InitInfo) {
  const { pathName, ignoreScopedDirents, ignoreUnscopedDirents, log } = info;

  const reader = new LOC(
    path.resolve(pathName),
    ignoreScopedDirents,
    ignoreUnscopedDirents
  );

  const numberOfLines = reader.readDirectory();

  if (numberOfLines) {
    console.log(
      `${chalk.bold('LINES OF CODE')}: ${chalk.bold.green(numberOfLines)}`
    );

    if (log) {
      if (reader.allFiles.length) {
        console.group(chalk.yellowBright.bold('ALL FILES'));
        for (let file of reader.allFiles) console.log(file);
        console.groupEnd();
      }

      if (reader.consideredFiles.length) {
        console.group(chalk.yellowBright.bold('CONSIDERED FILES'));
        for (let file of reader.consideredFiles) console.log(chalk.green(file));
        console.groupEnd();
      }

      if (reader.ignoredFiles.length) {
        console.group(chalk.yellowBright.bold('IGNORED FILES'));
        for (let file of reader.ignoredFiles) console.log(chalk.red(file));
        console.groupEnd();
      }
    }
  }
}
