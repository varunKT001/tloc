import { readdirSync, readFileSync } from 'fs';
import { DirectoryRecurser } from '../types';
import path from 'path';

export class LOC {
  public files: string[] = [];
  public result: number = 0;

  constructor(public source: string) {}

  private recurseDirectory(source: string): DirectoryRecurser {
    for (const dir of readdirSync(source, { withFileTypes: true })) {
      if (dir.isDirectory()) {
        const file = this.recurseDirectory(path.resolve(source, dir.name));
        if (typeof file === 'string') {
          this.files.push(file);
        }
      } else {
        return path.resolve(source, dir.name);
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
    this.recurseDirectory(this.source);
    this.calculateLines();
    return this.result;
  }
}
