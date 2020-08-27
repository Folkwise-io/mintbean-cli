const shell = require('shelljs')

function ghPages(args, outputFolder) {
    shell.exec("npm run build");
    const main = require("node_modules/gh-pages/bin/gh-pages.js");
    main([...args, '-d', outputFolder])
}




module.exports = {
  ghPages,
};