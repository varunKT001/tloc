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

export function cli(args: ParsedArgs): void {
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

function init(info: InitInfo): void {
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
        const length = reader.allFiles.length;

        console.group(
          `${chalk.yellowBright.bold('DETECTED FILES')} (${length})`
        );
        for (let file of reader.allFiles) console.log(file);
        console.groupEnd();
      }

      if (reader.consideredFiles.length) {
        const length = reader.consideredFiles.length;

        console.group(
          `${chalk.yellowBright.bold('CONSIDERED FILES')} (${length})`
        );
        for (let file of reader.consideredFiles) console.log(chalk.green(file));
        console.groupEnd();
      }

      if (reader.ignoredFiles.length) {
        const length = reader.ignoredFiles.length;

        console.group(
          `${chalk.yellowBright.bold('IGNORED FILES')} (${length})`
        );
        for (let file of reader.ignoredFiles) console.log(chalk.red(file));
        console.groupEnd();
      }
    }
  }
}
