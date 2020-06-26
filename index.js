#!/usr/bin/env node
const { createProgram } = require('./program');

const program = createProgram();
program.parse(process.argv);
