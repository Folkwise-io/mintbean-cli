#!/usr/bin/env node

require = require("esm")(module /*, options*/);
require("./program").createProgram(process.argv);

