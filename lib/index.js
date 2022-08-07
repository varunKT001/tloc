#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const path_1 = __importDefault(require("path"));
const pathName = process.argv.slice(2)[0];
const reader = new utils_1.LOC(path_1.default.resolve(pathName));
console.log(reader.readDirectory());
