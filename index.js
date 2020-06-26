#!/usr/bin/env node
const { createProgram } = require('./program');

console.log(process.argv);

const program = createProgram();
program.parse(process.argv);
