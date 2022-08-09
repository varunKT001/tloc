import chalk from 'chalk';
import { readdirSync, readFileSync, existsSync, statSync } from 'fs';
import path from 'path';

export class LOC {
  public allFiles: string[] = [];
  public consideredFiles: string[] = [];
  public ignoredFiles: string[] = [];
  public result: number = 0;

  constructor(
    public source: string,
    public ignoreScopedDirents: string[],
    public ignoreUnscopedDirents: string[]
  ) {}

  private recurseDirectory(source: string): void {
    for (const dir of readdirSync(source, { withFileTypes: true })) {
      const nextPath = path.resolve(source, dir.name);

      this.allFiles.push(nextPath);

      const arr = [nextPath];

      if (this.ignoreScopedDirents.includes(arr[0])) {
        this.ignoredFiles.push(nextPath);
        continue;
      }

      let skip = false;
      this.ignoreUnscopedDirents.forEach((p) => {
        if (process.platform === 'win32') {
          if (nextPath.split('\\').includes(p)) skip = true;
        } else {
          if (nextPath.split('/').includes(p)) skip = true;
        }
      });

      if (skip) {
        this.ignoredFiles.push(nextPath);
        continue;
      }

      if (dir.isDirectory()) {
        this.recurseDirectory(nextPath);
      } else {
        this.consideredFiles.push(nextPath);
      }
    }
  }

  private readNumberOfLinesInFile(filePath: string): number {
    const output = readFileSync(filePath).toString();
    const numberOfLinesInFile = output.split('\n').length;
    return numberOfLinesInFile;
  }

  private calculateLines(): void {
    let numberOfLines = 0;

    for (const filePath of this.consideredFiles) {
      const numberOfLinesInFile = this.readNumberOfLinesInFile(filePath);
      numberOfLines += numberOfLinesInFile;
    }

    this.result = numberOfLines;
  }

  public readDirectory() {
    if (!existsSync(this.source)) {
      console.log(
        `${chalk.red.bold('Error')}: No such file or directory: ${this.source}`
      );

      return;
    }

    const stat = statSync(this.source);

    if (stat.isFile()) {
      this.result = this.readNumberOfLinesInFile(this.source);
    } else if (stat.isDirectory()) {
      this.recurseDirectory(this.source);
      this.calculateLines();
    }

    return this.result;
  }
}
