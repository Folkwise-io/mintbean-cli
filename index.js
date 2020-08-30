#!/usr/bin/env node

require = require("esm")(module /*, options*/);
require("./program").createProgram().parse(process.argv);

