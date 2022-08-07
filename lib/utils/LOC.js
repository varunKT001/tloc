"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOC = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
class LOC {
    constructor(source) {
        this.source = source;
        this.files = [];
        this.result = 0;
    }
    recurseDirectory(source) {
        for (const dir of (0, fs_1.readdirSync)(source, { withFileTypes: true })) {
            if (dir.isDirectory()) {
                const file = this.recurseDirectory(path_1.default.resolve(source, dir.name));
                if (typeof file === 'string') {
                    this.files.push(file);
                }
            }
            else {
                return path_1.default.resolve(source, dir.name);
            }
        }
    }
    readNumberOfLinesInFile(filePath) {
        const output = (0, fs_1.readFileSync)(filePath).toString();
        const numberOfLinesInFile = output.split('\n').length;
        return numberOfLinesInFile;
    }
    calculateLines() {
        let numberOfLines = 0;
        for (const filePath of this.files) {
            const numberOfLinesInFile = this.readNumberOfLinesInFile(filePath);
            numberOfLines += numberOfLinesInFile;
        }
        this.result = numberOfLines;
    }
    readDirectory() {
        this.recurseDirectory(this.source);
        this.calculateLines();
        return this.result;
    }
}
exports.LOC = LOC;
