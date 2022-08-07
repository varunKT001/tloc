import {
  readdirSync,
  readFileSync,
  existsSync,
  statSync,
  realpathSync,
} from 'fs';
import { DirectoryRecurser } from '../types';
import path from 'path';

export class LOC {
  public files: string[] = [];
  public result: number = 0;

  constructor(
    public source: string,
    public ignoreScoped: string[],
    public ignoreUnscoped: string[]
  ) {}

  private recurseDirectory(source: string): DirectoryRecurser {
    for (const dir of readdirSync(source, { withFileTypes: true })) {
      const nextPath = path.resolve(source, dir.name);

      const arr = [nextPath];

      if (this.ignoreScoped.includes(arr[0])) continue;

      let skip = false;
      this.ignoreUnscoped.forEach((p) => {
        if (process.platform === 'win32') {
          if (nextPath.split('\\').includes(p)) skip = true;
        } else {
          if (nextPath.split('/').includes(p)) skip = true;
        }
      });

      if (skip) continue;

      if (dir.isDirectory()) {
        this.recurseDirectory(nextPath);
      } else {
        this.files.push(nextPath);
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

    for (const filePath of this.files) {
      const numberOfLinesInFile = this.readNumberOfLinesInFile(filePath);
      numberOfLines += numberOfLinesInFile;
    }

    this.result = numberOfLines;
  }

  public readDirectory() {
    if (!existsSync(this.source)) {
      console.error(`Error: No such file or directory: ${this.source}`);
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
